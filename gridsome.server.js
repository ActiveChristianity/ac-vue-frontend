// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const loadTranslations = require('./load-translations')
const fetch = require('node-fetch')

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

  api.loadSource(async ({ addMetadata }) => {
    await loadTranslations()
    const { settings } = await gqlFetch("query { settings { key value } }")

    // Fallback
    ['title','slogan','contact_email','contact_tel','social',
      'header_links','top_text','top_link',
      'cookie','cookie_page_id','privacy_page_id'].forEach(k => addMetadata(k, ''))

    if (settings) {
      settings.forEach(s => {
        metadata[s.key] = s.value
        addMetadata(s.key, s.value)
      })
    } else console.log('No setttings!!!')

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
      ql: { allPosts }
    }} = await graphql(`{
      ql {
        allPosts {
          id
          slug
        }
      }
    }`)

    /* Build all blog posts and blog topics */
    allPosts.forEach(post => {
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
        topics(hasPosts: true) {
          id
          slug
        }
      }
    }`)

    topics.forEach(topic => {
      createPage({
        path: `/${strings.slug_topic}/${topic.slug}`,
        component: './src/templates/Topic.vue',
        context: {id: topic.id}
      })
    })

    const { data: {
      ql: { allPages }
    }} = await graphql(`{
      ql {
        allPages {
          id
          path
        }
      }
    }`)

    allPages.forEach(page => {
      if (page.path && page.path !== '/') {
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
      createPage({
        path: `/${form.slug}`,
        component: './src/templates/Form.vue',
        context: form
      })
    })
  })
}
