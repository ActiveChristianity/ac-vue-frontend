<template>
  <main class="relative">
    <article-banner v-if="featuredPost" :article="featuredPost" />

    <latest-grid />
    <br />
    <featured-topics />
  </main>
</template>

<page-query>
fragment Image on ql_Image {
  src
  alt
  dataUri
  size {
    width
    height
  }
  focal
}

fragment PostItem on ql_Post {
	id
  title
  type
  excerpt
  slug
  readtime
  topics(group_id: 4) {
    name
    slug
  }
  track {
    title
    url
  }
  image {
    ...Image
  }
  authors { name }
  views
}

query Frontpage {
  metadata {
    title
    about
    url
  }
  ql {
    post(featured: true) {
      ...PostItem
    }
  }
}
</page-query>

<script>
import ArticleBanner from '~/components/ArticleBanner'
import LatestGrid from '~/single/LatestGrid'
import ArticleList from '~/components/ArticleList'
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
    ArticleList,
  },
  mounted() {
    setTimeout(() => {
      this.$store.fadeIn = true
    }, 50)
  },
  computed: {
    featuredPost () {
      return this.$page.ql.post
    },
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

<style lang="scss">
</style>
