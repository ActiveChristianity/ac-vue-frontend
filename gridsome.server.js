// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const loadTranslations = require('./load-translations')
const fetch = require('node-fetch')
const fs = require('fs')

fs.copyFileSync(`./logos/${process.env.GRIDSOME_LOCALE}.svg`, './src/assets/icons/logo.svg')

function gqlFetch(query) {
  return fetch(process.env.GRIDSOME_GQL_URL, {
    method: 'POST',
    body: JSON.stringify({
      query
    }),
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'Gridsome/0.7 (Building)',
      'x-lang': process.env.GRIDSOME_LOCALE
    }
  }).then(res => res.json()).then(({data}) => data);
}

module.exports = function (api) {
  const metadata = {}
  let updateTranslation;

  api.loadSource(async ({ addMetadata }) => {
    updateTranslation = await loadTranslations()
    const { settings } = await gqlFetch("query { settings { key value } }")

    // Fallback
    new Array(
      'title','slogan','contact_email','contact_tel','social',
      'featured_posts',
      'header_links','top_text','top_link',
      'copyright', 'attribution',
      'cookie','cookie_page_id','privacy_page_id',
      'social_facebook','social_instagram','social_youtube','social_itunes','social_spotify','social_rss','social_podcast',
    ).forEach(k => addMetadata(k, ''))

    if (settings) {
      settings.forEach(s => {
        metadata[s.key] = s.value
        addMetadata(s.key, s.value)
      })
    } else throw new Error('No setttings!!!')


    const { cookiePage, privacyPage } = await gqlFetch(`query {
  cookiePage: page(id: ${metadata.cookie_page_id}) { path } 
  privacyPage: page(id: ${metadata.privacy_page_id}) { path }
}`)

    if (cookiePage) {
      addMetadata('cookie_page_path', cookiePage.path)
    }
    if (privacyPage) {
      addMetadata('privacy_page_path', privacyPage.path)
    }

  })

  api.createManagedPages(async ({ graphql, createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api
    const strings = require(`./src/strings/${process.env.GRIDSOME_LOCALE}.json`)

    const { data: {
      ql: { posts }
    }} = await graphql(`{
      ql {
        posts: thePosts {
          id
          slug
        }
      }
    }`)

    /* Build all blog posts and blog topics */
    posts.forEach(post => {
      createPage({
        path: `/${post.slug}`,
        component: './src/templates/Article.vue',
        context: post
      })
    })

    const { data: {
      ql: { topics }
    }} = await graphql(`{
      ql {
        topics: theTopics(hasPosts: true) {
          id
          slug
        }
      }
    }`)

    if (topics.length) {
      createPage({
        path: `/${strings.slug_topic}`,
        component: './src/templates/Topics.vue'
      })
    }

    topics.forEach(topic => {
      createPage({
        path: `/${strings.slug_topic}/${topic.slug}`,
        component: './src/templates/Topic.vue',
        context: {id: topic.id}
      })
    })

    const { data: {
      ql: { authors }
    }} = await graphql(`{
      ql {
        authors(hasPosts: true, first: 1000) {
          data {
            id
            slug
          }
        }
      }
    }`)

    authors.data.forEach(author => {
      createPage({
        path: `/${strings.slug_ac_author}/${author.slug}`,
        component: './src/templates/Author.vue',
        context: {id: author.id}
      })
    })

    const { data: {
      ql: { allPages }
    }} = await graphql(`{
      ql {
        allPages {
          id
          label
          path
        }
      }
    }`)

    allPages.forEach(page => {
      if (page.path && page.path !== '/') {
        switch (page.label) {
          case 'about-us': updateTranslation('slug_about', page.path.replace(/^\/|\/$/g, ''))
                break;
        }
        createPage({
          path: page.path,
          component: './src/templates/Page.vue',
          context: page
        })
      }
    })

    const { data: {
      ql: { playlists }
    }} = await graphql(`{
      ql {
        playlists {
          id
          slug
        }
      }
    }`)

    playlists.forEach(pl => {
      if (pl) {
        createPage({
          path: `/playlists/${pl.slug}`,
          component: './src/templates/Playlist.vue',
          context: { id: pl.id }
        })
      }
    })

    const { data: {
      ql: { glossary }
    }} = await graphql(`{
      ql {
        glossary {
          word
          slug
          content
        }
      }
    }`)

    if (glossary.length > 5) {
      createPage({
        path: `/${strings.slug_glossary}`,
        component: './src/templates/Glossary.vue'
      })
    }

    glossary.forEach(def => {
      createPage({
        path: `/${strings.slug_glossary}/${def.slug}`,
        component: './src/templates/Definition.vue',
        context: def
      })
    })

    const { data: {
      ql: { allForms }
    }} = await graphql(`{
      ql {
        allForms {
          id
          title
          slug
          excerpt
          fields
          terms
          btn
        }
      }
    }`)

    allForms && allForms.forEach(form => {
      form.fields = form.fields ? JSON.parse(form.fields) : [];
      form.terms = form.terms ? JSON.parse(form.terms) : [];

      if (form.id == 5) {
        updateTranslation('slug_contact', form.slug.replace(/^\/|\/$/g, ''))
      }
      createPage({
        path: `/${form.slug}`,
        component: './src/templates/Form.vue',
        context: form
      })
    })
  })
}
