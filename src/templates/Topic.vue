<template>
  <main class="content">
    <div class="fade-in pt-12 md:pt-24">
      <h1 class="text-3xl text-blue-900 md:text-4xl font-medium leading-tight mb-8">{{ topic.name }}</h1>

      <div id="archive-banner" class="my-4 md:flex md:items-stretch md:mb-16">
        <article-cover v-if="first" :article="first" class="flex-1 md:mr-4" />

        <sidebar-list v-if="popular && popular.length" class="md:w-1/3 hidden md:flex flex-col"
          title="Popular" :posts="popular" />
      </div>
    </div>
    <div class="mt-6 md:mt-12">
      <article-grid :articles="filtered">
        <div v-if="types" class="flex items-center justify-center mb-8 font-medium">
          <button v-if="filter" class="py-1 px-3 bg-gray-100 text-gray-800 hover:text-slate-dark rounded mx-2"
              @click="filter = ''"><i class="fal fa-times"></i></button>
          <template v-for="(posts, type) in types">
            <button class="py-1 px-3 rounded mx-2 uppercase"
                    :class="filter === type ? 'bg-secondary text-white' : 'bg-gray-200 text-gray-800 hover:text-secondary'"
                @click="filter = type">{{ type }}</button>
          </template>
        </div>
      </article-grid>
    </div>
  </main>
</template>

<page-query>
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
  image { src alt dataUri size { width height } focal }
  authors { name }
  views
}
query Topic ($id: ID!) {
  ql {
    topic(id: $id) {
      slug
      name
      popular: somePosts(first: 5, orderBy: {column: VIEWS, order: DESC}) {
        data {
          ...PostItem
        }
      }
      posts {
        ...PostItem
      }
    }
  }
}
</page-query>

<script>
import ArticleCover from '~/components/ArticleCover'
import ArticleGrid from '~/components/ArticleGrid'
import SidebarList from '~/components/SidebarList'
import Card from '~/components/Card'

export default {
  metaInfo() {
    const { name } = this.$page.ql.topic
    return {
      title: name
    }
  },
  components: {
    Card, ArticleCover, ArticleGrid, SidebarList
  },
  data () {
    return {
      filter: ''
    }
  },
  computed: {
    topic() {
      return this.$page.ql.topic
    },
    first() {
      return this.topic.posts[0]
    },
    rest() {
      return this.topic.posts.slice(1)
    },
    popular() {
      return this.topic.popular.data
    },
    types() {
      const types = {}
      let unique = 0
      this.rest.forEach((cur) => {
        if (! types[cur.type]) {
          ++unique
          types[cur.type] = []
        }
        types[cur.type].push(cur)
      })
      return unique > 1 ? types : false
    },
    filtered() {
      if (this.filter && this.types[this.filter]) {
        return this.types[this.filter]
      }
      return this.rest
    },
  },
  mounted() {
    setTimeout(() => {
      this.$store.fadeIn = true
    }, 50)
  }
}
</script>
