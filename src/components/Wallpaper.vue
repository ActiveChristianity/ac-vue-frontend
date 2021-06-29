<template>
  <transition name="fade">
    <div v-if="loaded" class="fixed w-screen h-screen z-50 inset-0 bg-black">
      <div class="w-full h-full overflow-y-scroll" style="scroll-behavior: smooth; scroll-snap-type: y mandatory;">

        <div :class="slideClass" :style="slideStyle">
          <f-image :src="image" style="max-width: 90%; max-height: 90%;" class="rounded-2xl shadow-2xl border-black object-center object-contain user-select-none pointer-events-none"></f-image>
          <button v-if="posts" @click="scrollDown" class="absolute bottom-0 mb-2"><icon prefix="fad" name="chevron-down" class="text-white w-8 h-8 hovering"></icon></button>
        </div>

        <div v-if="posts" ref="details" :class="slideClass" :style="slideStyle">
          <div class="w-4/3 h-4/3 rounded bg-white p-2">
            <h3 class="text-xl font-light p-4">{{ $t.read_now }}</h3>
            <template v-for="post in posts">
              <button @click="close(post.slug)" :key="post.id" class="block p-4 text-secondary">
                {{ post.title }}
              </button>
            </template>
          </div>
        </div>

      </div>

      <div class="absolute top-0 inset-x-0 bg-gradient-to-b to-transparent from-black text-white flex justify-between">
        <a :href="downloadUrl" target="_blank" class="p-4"><icon prefix="fad" name="download" class="w-6 h-6"></icon></a>
        <p class="py-2 font-semibold">Daily wallpaper</p>
        <button class="p-4" @click.prevent="close"><icon prefix="fal" name="times" class="w-6 h-6"></icon></button>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Wallpaper.vue",
  data: () => ({
    loaded: false,
    quote: null,
    image: null,
    posts: null,
    slideClass: 'relative w-full h-full flex flex-col items-center justify-center'
  }),
  computed: {
    downloadUrl () {
      return this.loaded ?
          `${process.env.GRIDSOME_BACKEND_URL}/quotes/${this.quote.id}/download/${this.image.id}` : ''
    },
    slideStyle () {
      if (this.loaded) {
        let background = 'black';
        if (this.image?.colors) {
          const [c1, c2, c3, c4] = this.image.colors
          background = `linear-gradient(45deg, rgb(${c1.join(',')}), transparent, transparent),
          linear-gradient(-45deg, rgb(${c2.join(',')}), transparent, transparent),
          linear-gradient(135deg, rgb(${c3.join(',')}), transparent, transparent),
          linear-gradient(-135deg, rgb(${c4.join(',')}), transparent, transparent)`
        }
        return {
          background,
          'scroll-snap-align': 'start'
        }
      }
      return '';
    }
  },
  methods: {
    scrollDown () {
      this.$refs.details.scrollIntoView()
    },
    close (path = '') {
      if (path) {
        this.$router.push(path)
      }
      this.loaded = false
    }
  },
  async mounted () {
    if (this.$route.path === '/' && window.matchMedia('(display-mode: standalone)').matches) {
      const {post, author, topics, images, ...quote} = await this.$api.other.randomQuote()
      if (this.loaded = quote && images?.length) {
        this.quote = quote
        this.image = images[0]
        this.image.alt = quote.content
        const posts = [
          post,
          ...author?.somePosts?.data,
          ...(topics.map(t => t.somePosts.data[0] ?? null))
        ].filter(p => p?.slug)
        this.posts = posts && posts.length ? posts : null
      }
    }
  }
}
</script>

<style scoped>
.hovering {
  animation: MoveUpDown 1s ease-in-out infinite;
}
@keyframes MoveUpDown {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(10px);
  }
}
</style>
