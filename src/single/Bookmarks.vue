<template>
  <div id="Bookmarks" class="fixed w-64 inset-y-0 right-0 transition-all duration-300" :class="show ? 'mr-0' : ' -mr-64'">
    <div @click="close" class="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
      <header class="px-4 py-2 md:py-4 flex justify-between items-center shadow">
        <h2 class="text-lg leading-7 font-medium text-gray-900">
          Bookmarks
        </h2>
        <button class="rounded py-1 px-2 hover:bg-gray-200 hover:text-secondary">
          <icon name="fad-chevron-double-right" fa />
        </button>
      </header>
      <div v-if="posts && posts.length" class="relative flex-1 px-2 overflow-y-auto">
        <template v-for="post in posts">
          <article-cover-card :key="post.id" :article="post" class="w-full"/>
        </template>
        <div class="py-12 md:hidden"></div>
      </div>
      <div v-else class="relative flex-1 center flex-col">
        <icon name="loader" v-if="loading" class="w-1/3 my-4 block mx-auto text-secondary rotate-90" />
        <p class="px-4 text-center text-gray-600">Bookmarked posts will show here so you can find and read them later</p>
      </div>
    </div>
  </div>
</template>

<script>
import ArticleCard from '~/components/ArticleCard'
import ArticleCoverCard from '~/components/ArticleCoverCard'

export default {
  props: {
    show: Boolean
  },
  components: {
    ArticleCard, ArticleCoverCard
  },
  data () {
    return {
      posts: [],
      loading: true,
    }
  },
  computed: {
    bookmarks () {
      return this.$store.bookmarks
    },
    screen () {
      return this.$screen
    }
  },
  methods: {
    close () {
      this.$emit('close')
    },
    toggle () {
      document.body.style.marginLeft = ''
      document.body.style.paddingRight = ''
      if (this.show) {
        if (window.innerWidth >= 1024) {
          document.body.style.transition = 'padding .4s ease'
          document.body.style.paddingRight = '16rem'
        } else {
          document.body.style.transition = 'margin .4s ease'
          document.body.style.marginLeft = '-16rem'
        }
      }
    },
  },
  watch: {
    show: {
      immediate: true,
      handler () {
        this.toggle()
      }
    },
    bookmarks: {
      immediate: true,
      deep: true,
      async handler (v) {
          this.loading = true
          if (process.isClient) {
            const res = await Promise.all(Object.values(v).map(({slug}) =>
                this.$fetch(`/${slug}`).catch(() => {
                  console.warn('Could not load bookmark', slug)
                })
            ))
            this.posts = res.filter(r => !!r).map(r => r.data.ql.post)
          }
          this.loading = false
      }
    }
  }
}
</script>