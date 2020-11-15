<template>
  <div v-if="!posts || posts.length">
    <slot :showMore="showMore"></slot>
    <icon v-if="!posts" :class="gridClass" name="icon" class="loading-icon w-40 h-40 mx-auto block my-20"></icon>
    <div :class="gridClass" v-else-if="posts.length">
      <article-card v-for="post in posts"
                    :key="post.id"
                    :article="post"
                    class="w-11/12 md:w-1/2 lg:w-1/4"
      />
    </div>
  </div>
</template>

<script>
import ArticleCard from './ArticleCard.vue'
export default {
  props: {
    limit: {
      type: Number,
      default: 0
    },
    topicSlug: String,
    gridClass: String,
    exclude: String
  },
  data() {
    return {
      posts: null,
      showMore: true,
    }
  },
  methods: {
    async load () {
      if (process.isClient) {
        try {
          const {data} = await this.$fetch(`/${this.$t.slug_topic}/${this.topicSlug}`)
          if (data) {
            const posts = data.ql.topic.posts.filter(P => P.slug !== this.exclude)
            if (this.posts) {
              posts.sort((a, b) => a.date > b.data ? -1 : 1)
              this.showMore = this.posts.length > this.limit;
              this.posts = this.limit ? posts.slice(0, this.limit) : posts
            }
          } else this.posts = []
        } catch (error) {
          console.warn(error)
          this.posts = []
        } finally {
          if (!(this.posts && this.posts.length)) {
            this.$emit('empty')
          }
          this.$store.fadeIn = true
        }
      }
    }
  },
  watch: {
    topicSlug: {
      immediate: true,
      handler () {
        this.load()
      }
    }
  },
  components: { ArticleCard }
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