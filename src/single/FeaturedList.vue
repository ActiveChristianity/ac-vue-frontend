<template>
  <div>
    <heading>Featured</heading>
    <div class="md:content w-full overflow-x-scroll flex items-stretch md:flex-wrap scroll-snap-x p-4">
      <template v-for="article in coverArticles">
        <article-cover-card :key="article.id" :article="article"
                            class="w-11/12 md:w-1/2 lg:w-1/4"
        />
      </template>
      <template v-for="article in cardArticles">
        <article-card :key="article.id" :article="article"
                      class="w-11/12 md:w-1/2 lg:w-1/4"
        />
      </template>
      <div class="flex-none w-4 md:hidden"></div>
    </div>
  </div>
</template>

<static-query>
fragment PostItem on ql_Post {
	id
  title
  type
  excerpt
  slug
  readtime
  track {
    title
    url
  }
  topics(group_id: 4) {
    name
    slug
  }
  image { src alt dataUri focal }
  authors { name }
  views
}

query FeaturedPosts {
  ql {
    podcast: post(type: Podcast, featured: true) {
    ...PostItem
    }
    playlists(featured: true) {
      id
      title
      slug
      image { src alt dataUri size { width height } focal }
    }
    featured: posts(first: 3, featured: true) {
      data {
        ...PostItem
      }
    }
  }
}
</static-query>

<script>
import ArticleCard from '~/components/ArticleCard'
import ArticleCoverCard from '~/components/ArticleCoverCard'
import Heading from '~/components/Heading'

export default {
  components: { ArticleCard, ArticleCoverCard, Heading },
  computed: {
    coverArticles () {
      const { podcast, playlists } = this.$static.ql
      const playlist = playlists[Math.floor(Math.random() * playlists.length)]
      playlist.type = 'playlist'
      const articles = [playlist]
      if (podcast) {
        articles.push(podcast)
      }
      return articles
    },
    cardArticles () {
      const { podcast, featured } = this.$static.ql
      if (! podcast) {
        return featured
      }

      const articles = featured.data.filter(a => a.id !== podcast.id)
      return articles.slice(0, 2)
    }
  }
}
</script>