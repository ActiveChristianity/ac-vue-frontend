<template>
  <main class="relative">
    <article-banner :article="featuredPost" />

    <latest-grid />
    <article-list title="Featured" :coverArticles="coverArticles" :cardArticles="cardArticles" />

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
  ql {
    page(id: 1) {
      id
      slug
      title
      content
    }
    podcast: post(type: Podcast, featured: true) {
      ...PostItem
    }
    playlists(featured: true) {
      id
      title
      slug
      image { ...Image }
    }
    featured: posts(first: 4, featured: true) {
      data {
        ...PostItem
      }
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
    const { title, excerpt } = this.$page.ql.page
    return {
      title,
      meta: [
        { key: 'description', name: 'description', content: excerpt }
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
      return this.$page.ql.featured.data[0]
    },
    page () {
      return this.$page.ql.page
    },
    coverArticles () {
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
    }
  }
}
</script>

<style lang="scss">
</style>
