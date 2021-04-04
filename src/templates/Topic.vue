<template>
  <main>
    <div class="content py-12 md:pt-16">
      <h1 class="fade-in text-3xl text-blue-900 md:text-4xl font-medium leading-tight mb-8">{{ topic.name }}</h1>

      <div id="archive-banner" class="fade-in my-4 md:flex md:items-stretch md:mb-16">
        <article-cover v-if="first" :article="first" class="flex-1 md:mr-4" style="min-height: 440px" />

        <sidebar-list v-if="popular && popular.length" class="fade-in my-4 md:my-0 md:w-1/3 flex flex-col" style="min-height: 440px"
          title="Popular" :posts="popular" />
      </div>
    </div>
    <article-grid :articles="filtered">
      <div v-if="types" class="flex items-center justify-center mb-8 font-medium">
        <button v-if="filter" class="py-1 px-3 bg-gray-100 text-gray-800 hover:text-slate-dark rounded mx-2"
            @click="filter = ''"><icon fa prefix="fal" name="fa-times" /></button>
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
query Topic ($id: ID!) {
  ql {
    topic(id: $id) {
      slug
      name
      posts {
        id
        title
        type
        excerpt
        slug
        published
        readtime
        track {
          title
          url
        }
        topics(group_id: 4) {
          name
          slug
        }
        image { src alt srcset dataUri sizes size { width height } focal }
        authors { name }
        meta {
          as_ac
        }
        views
      }
    }
  }
}
</page-query>

<script>
import ArticleCover from '~/components/ArticleCover'
import ArticleGrid from '~/components/ArticleGrid'
import SidebarList from '~/components/SidebarList'

export default {
  metaInfo() {
    const { name } = this.$page.ql.topic
    return {
      title: name + ' | ' + this.$t.topics + ' - ' + this.$t.site_title
    }
  },
  components: {
    ArticleCover, ArticleGrid, SidebarList
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
      const all = this.topic.posts
      if (all.length <= 1) return []
      all.sort((a,b) => a.views > b.views ? -1 : 1)
      const popular = all.slice(0,5)
      all.sort((a,b) => a.published > b.published ? -1 : 1)
      return popular
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
