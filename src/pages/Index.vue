<template>
  <main class="relative pb-8">
    <article-banner :article="featured.banner" />
    <article-grid :articles="featured.list" title="Featured Articles"/>
    <br />
    <featured-topics />
    <br />
    <latest-grid />
  </main>
</template>

<page-query>

query Frontpage {
  metadata {
    title
    about
    url
    featured_posts
  }
  ql {
    posts (featured: true) {
      data {
        id
        title
        type
        excerpt
        slug
        readtime
        topics(group_id: 4) { name slug }
        track { title url }
        image { src alt srcset dataUri sizes size { width height } focal }
        meta { as_ac }
        authors { name }
        views
      }
    }
  }
}
</page-query>

<script>
import ArticleBanner from '~/components/ArticleBanner'
import LatestGrid from '~/single/LatestGrid'
import ArticleGrid from '~/components/ArticleGrid'
import FeaturedTopics from "../single/FeaturedTopics"

export default {
  metaInfo() {
    const { title, about } = this.$page.metadata
    return {
      title,
      meta: [
        { key: 'description', name: 'description', content: about }
      ]
    }
  },
  components: {
    FeaturedTopics,
    ArticleBanner,
    LatestGrid,
    ArticleGrid,
  },
  mounted() {
    setTimeout(() => {
      this.$store.fadeIn = true
    }, 50)
  },
  computed: {
    featured () {
      const [banner_id] = JSON.parse(this.$page.metadata.featured_posts)
      const posts = this.$page.ql.posts.data
      let banner = posts.find(p => p.id === banner_id)
      let list;
      if (! banner) {
        banner = posts[0]
        list = posts.slice(1)
      } else {
        list = posts.filter(p => p.id !== banner_id)
      }

      return {
        banner,
        list,
      }
    }
    /*coverArticles () {
      const { podcast, playlists } = this.$page.ql
      const playlist = playlists[Math.floor(Math.random() * playlists.length)]
      playlist.type = 'playlist'
      const articles = [playlist]
      if (podcast) {
        articles.push(podcast)
      }
      return articles
    },
    cardArticles () {
      const { podcast, featured } = this.$page.ql
      if (! podcast) {
        return featured
      }

      const articles = featured.data.filter(a => a.id !== podcast.id)
      return articles.slice(1, 3)
    }*/
  }
}
</script>
