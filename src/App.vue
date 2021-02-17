
<template>
  <div v-scroll="onScroll" class="relative flex flex-col h-full w-full pb-24 md:pb-0">
    <svg-sprite />
    <g-link v-if="$static.m.top_text && $store.showTopBar" @click="$store.showTopBar = false" :to="$static.m.top_link" class="relative z-10 w-full py-4 text-center bg-gray-900 text-white">
      <p class="xsmall" v-html="$m2h($static.m.top_text)"></p>
      <button class="absolute inset-y-0 right-0 font-bold h-full w-12 bg-white text-black"><icon fa name="chevron-right" prefix="fad"/></button>
    </g-link>

    <Header :top="fixedHeader" :scrollY="scrollY" />

    <div class="flex-1 flex-grow relative">
      <transition name="fade">
        <router-view :key="$route.path" />
      </transition>
    </div>

    <Cookie />
    <Footer />

    <transition name="fade">
      <div v-if="$store.message" class="fixed bg-primary text-white inset-0 z-50 center flex-col p-8">
        <p class="font-medium">{{ $store.message.text }}</p>
      </div>
    </transition>

    <transition name="fade">
      <global-player v-if="$store.playlist"></global-player>
    </transition>
  </div>
</template>

<static-query>
query {
  m: metadata {
    title
    about
    top_text
    top_link
  }
}
</static-query>

<script>
import Header from '~/single/Header.vue'
import Footer from '~/single/Footer.vue'
import Cookie from '~/single/Cookie.vue'
import SvgSprite from "./single/SvgSprite";

let fadeInElements = [];
let delay;
const isElemVisible = (el) => {
  const { top, bottom } = el.getBoundingClientRect()
  return top + 100 < window.innerHeight && bottom >= 0
}
const loadElements = () => {
  if (process.isClient)
    fadeInElements = Array.from(document.getElementsByClassName('fade-in'))
}

export default {
  metaInfo() {
    return {
      title: this.$static.title + ' - ' + this.$t.tagline,
      meta: [
        {
          key: 'og:site_name',
          content: this.$static.title
        },
        {
          key: 'description',
          name: 'description',
          content: this.$static.m.about
        },
      ],
    }
  },
  components: {
    SvgSprite,
    Header,Footer,Cookie,
    GlobalPlayer: () => import('~/single/GlobalPlayer.vue'),
  },
  computed: {
    showHeader () {
      return !this.page || !this.page.hidden
    },
    page () {
      return this.$store.page
    },
    bookmarks () {
      return this.$store.bookmarks
    }
  },
  data() {
    return {
      path: '',
      scrollY: 0,
      fixedHeader: 0,
      theme: "theme-default"
    }
  },
  watch: {
    '$route.path': {
      immediate: true,
      handler() {
        setTimeout(() => {
          this.path = this.$route.path
          delay = setTimeout(() => {
            loadElements()
            process.isClient && window.refTagger && window.refTagger.tag && window.refTagger.tag();
            this.onScroll()
          }, 250)
        }, 250)
        this.$store.playVideo = false
      }
    },
    '$store.fadeIn'(f) {
      if (f) {
        clearTimeout(delay)
        delay = setTimeout(() => {
          loadElements()
          this.onScroll()
        }, 200)
        this.$store.fadeIn = false
      }
    },
    bookmarks: {
      deep: true,
      handler (bm) {
        localStorage.setItem('ac-bookmarks-'+process.env.GRIDSOME_LOCALE, JSON.stringify(bm));
      }
    }
  },
  methods: {
    swipeRightHandler(e) {
      this.$router.back()
    },
    onScroll(e) {
      if (!process.isClient || !this.ready) return
      /* Header Top Fixed */
      this.fixedHeader -= window.scrollY - this.scrollY
      this.scrollY = window.scrollY
      if (this.fixedHeader > 0) this.fixedHeader = 0
      else if (this.fixedHeader < -90) this.fixedHeader = -90

      if (!fadeInElements.length) return

      const { $nextTick } = this
      let i = 0;
      let t = 200;
      fadeInElements.forEach((el) => {
        if (isElemVisible(el)) {
          $nextTick(() => {
            fadeInElements.splice(fadeInElements.indexOf(el), 1)
            setTimeout(() => {
              el.classList.remove('fade-in')
            }, ++i * t)
          })
          t -= 20
          if (t < 50) t = 50
        }
      })
    },
    reload () {
      window.location.reload();
    }
  },
  mounted () {
    if (typeof window !== 'undefined') {
      this.$store.bookmarks = JSON.parse(localStorage.getItem('ac-bookmarks-'+process.env.GRIDSOME_LOCALE) || "{}");
      window.document.body.classList.add('ready')
      this.$nextTick(() => {
        if (typeof this.$store.bookmarks !== 'object') {
            this.$store.bookmarks = {}
        }
        loadElements()
        this.ready = true
        this.onScroll()

        if (this.$store.showTopBar) {
          setTimeout(() => {
            this.$store.showTopBar = false
          }, 10000)
        }
      })
    }
  }
}
</script>
