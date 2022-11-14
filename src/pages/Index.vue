<template>
  <main class="relative pb-8">
    <client-only>
      <article-banner :article="featured.banner" />
      <article-grid :articles="featured.list" :title="$t.featured" key="grid" />
      <br />
      <latest-grid />
      <br />
      <featured-topics />

      <div class="container mx-auto sm:px-2 md:px-6">
        <div class="bg-slate-lighter text-slate p-4 rounded-lg">
          <Subscribe />
        </div>
      </div>
    </client-only>
  </main>
</template>

<page-query>
query Frontpage {
  metadata {
    title
    about
    url
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
        image { src alt srcset dataUri sizes size { width height } focal colors }
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
import Subscribe from '../components/Subscribe.vue'
import FeaturedTopics from "../single/FeaturedTopics"

export default {
  metaInfo() {
    const { title, about } = this.$page.metadata
    return {
      title: title + ' - ' + this.$t.tagline,
      meta: [
        { key: 'description', name: 'description', content: about }
      ]
    }
  },
  components: {
    FeaturedTopics,
    ArticleBanner,
    LatestGrid,
    ArticleGrid: () => import("~/components/ArticleGrid"),
    Subscribe
},
  data () {
    return {
      bannerIndex: 0,
    }
  },
  mounted() {
    setTimeout(() => {
      this.$store.fadeIn = true
    }, 50)
  },
  computed: {
    featured () {
      const posts = this.$page.ql.posts.data
      this.bannerIndex = Math.floor(Math.random() * posts.length)
      const banner = posts[this.bannerIndex]
      const list = posts.filter(p => p.id !== banner.id)

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