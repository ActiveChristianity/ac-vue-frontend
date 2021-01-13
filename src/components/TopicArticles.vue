<template>
  <article-grid v-if="posts && posts.length" :articles="posts" :title="title" :to="hasMore ? url : null"></article-grid>
  <div v-else class="center">
    <icon name="icon" class="loading-icon w-40 h-40 mx-auto block my-20"></icon>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    limit: {
      type: Number,
      default: 0
    },
    topicSlug: String,
    exclude: String
  },
  data() {
    return {
      posts: null,
      hasMore: true,
    }
  },
  methods: {
    async load () {
      try {
        this.url = `/${this.$t.slug_topic}/${this.topicSlug}`
        const {data} = await this.$fetch(this.url)
        if (data && data.ql) {
          const posts = data.ql.topic.posts.filter(P => P.slug !== this.exclude)
          if (posts) {
            posts.sort((a, b) => a.date > b.data ? -1 : 1)
            this.hasMore = posts.length > this.limit;
            this.posts = this.limit ? posts.slice(0, this.limit) : posts
          }
        }
      } catch (error) {
        console.warn(error)
        this.posts = []
      } finally {
        if (! this.posts?.length) {
          this.posts = null
          this.$emit('empty')
        }
        this.$store.fadeIn = true
      }
    }
  },
  watch: {
    topicSlug: {
      immediate: true,
      handler () {
        if (process.isClient) {
          this.$nextTick(() => {
            this.load()
          })
        }
      }
    }
  },
  components: {
    ArticleGrid: () => import('~/components/ArticleGrid')
  }
}
</script>

<style lang="scss">
.loading-icon {
  transform-origin: center;
  animation: 10s ease-in-out 0s infinite rotatingY;
}
@keyframes rotatingY {
  0% {
    transform: rotateY(0deg);
  }
  10% {
    transform: rotateY(360deg);
  }
  30% {
    transform: rotateY(360deg);
  }
  50% {
    transform: rotateY(3600deg);
  }
  100% {
    transform: rotateY(0deg);
  }
}
</style>