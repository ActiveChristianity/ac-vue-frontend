<template>
  <main>
    <div class="content pt-12 md:pt-16 center flex-wrap">
      <div class="center flex-col w-full md:w-1/2 p-8">
        <g-image v-if="author.image" :src="author.image"
                 class="fade-in rounded-full shadow"></g-image>
        <h1 class="fade-in text-3xl text-blue-900 md:text-4xl font-medium leading-tight my-4 order-2">{{ author.name }}</h1>
      </div>
      <div v-if="author.excerpt" class="fade-in w-full md:w-1/2 p-8 text-xl"
        :class="author.name.charCodeAt(0) % 2 ? 'order-3' : 'order-1'">
        <div v-html="author.excerpt"></div>
      </div>
    </div>
    <article-grid :articles="filtered">
      <div v-if="types" class="flex items-center justify-center mb-8 font-medium">
        <button v-if="filter" class="py-1 px-3 bg-gray-100 text-gray-800 hover:text-slate-dark rounded mx-2"
                @click="filter = ''"><icon fa name="fa-times" prefix="fal" /></button>
        <template v-for="(posts, type) in types">
          <button class="py-1 px-3 rounded mx-2 uppercase"
                  :class="filter === type ? 'bg-secondary text-white' : 'bg-gray-200 text-gray-800 hover:text-secondary'"
                  @click="filter = type">{{ type }}</button>
        </template>
      </div>
    </article-grid>
  </main>
</template>

<page-query>
query Author($id: ID!) {
  ql {
    author(id: $id) {
      slug
      name
      excerpt
      image { src alt srcset dataUri sizes size { width height } focal }
      posts {
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
    }
  }
}
</page-query>

<script>
import ArticleGrid from '~/components/ArticleGrid'
import Card from '~/components/Card'

export default {
  metaInfo () {
    const { name } = this.$page.ql.author
    return {
      title: name
    }
  },
  components: {
    Card, ArticleGrid
  },
  data () {
    return {
      filter: ''
    }
  },
  computed: {
    author () {
      return this.$page.ql.author
    },
    posts () {
      return this.author.posts
    },
    types () {
      const types = {}
      let unique = 0
      this.posts.forEach((cur) => {
        if (! types[cur.type]) {
          ++unique
          types[cur.type] = []
        }
        types[cur.type].push(cur)
      })
      return unique > 1 ? types : false
    },
    filtered () {
      if (this.filter && this.types[this.filter]) {
        return this.types[this.filter]
      }
      return this.posts
    },
  },
  mounted () {
    setTimeout(() => {
      this.$store.fadeIn = true
    }, 50)
  }
}
</script>
