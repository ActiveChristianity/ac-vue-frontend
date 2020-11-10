<template>
  <div v-if="!posts || posts.length">
    <slot></slot>
    <Icon v-if="!posts" :class="gridClass" name="icon" class="loading-icon w-40 h-40 mx-auto block my-20"></Icon>
    <div :class="gridClass" v-else-if="posts.length">
      <article-card v-for="post in posts"
                    :key="post.id"
                    :article="post"
                    class="w-11/12 md:w-1/2 lg:w-1/4"
      />
    </div>
    <h4 v-else :class="gridClass" class="py-d12 px-d4 text-primary">{{ $t.no_results }}</h4>
  </div>
  <div v-else class="py-8 text-center">
    <g-link :to="`/${$t.slug_blog}`" class="inline-block font-detail py-d2 px-d4 border-2 border-gray-600 hover:text-primary hover:border-primary">{{ $t.read_more }}</g-link>
  </div>
</template>

<script>
import ArticleCard from './ArticleCard.vue'
export default {
  props: {
    limit: Boolean,
    topicSlug: String,
    gridClass: String,
    exclude: String
  },
  data() {
    return {
      posts: null
    }
  },
  mounted() {
    this.$nextTick(async () => {
      try {
        const { data } = await this.$fetch(`/${this.$t.slug_topic}/${this.topicSlug}`)
        if (data) {
          const posts = data.ql.topic.posts.filter(P => P.slug !== this.exclude)
          posts.sort((a,b) => a.date > b.data ? -1 : 1)
          this.posts = this.limit ? posts.slice(0,2) : posts
        } else this.posts = []
      } catch (error) {
        console.log(error)
        this.posts = []
      }
      this.$store.fadeIn = true
    })
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