
<template>
  <div v-scroll="onScroll" class="relative flex flex-col h-full w-full pb-24 md:pb-0">

    <g-link v-if="$static.m.top_text && $store.showTopBar" @click="$store.showTopBar = false" :to="$static.m.top_link" class="relative z-10 w-full py-4 text-center bg-gray-900 text-white">
      <p class="xsmall" v-html="$m2h($static.m.top_text)"></p>
      <button class="absolute inset-y-0 right-0 font-bold h-full w-12 bg-white text-black"><icon fa name="chevron-right" prefix="fad"/></button>
    </g-link>

    <Header />

    <div class="flex-1 flex-grow relative">
      <transition name="fade">
        <router-view :key="$route.path" />
      </transition>
    </div>

    <transition name="fade">
      <div v-if="$store.message" class="fixed bg-primary text-white inset-0 z-50 center flex-col p-8">
        <p class="font-medium">{{ $store.message.text }}</p>
      </div>
    </transition>

    <Cookie />
    <Footer />

    <transition name="fade">
      <global-player v-if="$store.playlist"></global-player>
    </transition>
  </div>
</template>

<static-query>
query {
  m: metadata {
    siteName
    siteDescription
    top_text
    top_link
  }
}
</static-query>

<script>
import Header from '~/single/Header.vue'
import Footer from '~/single/Footer.vue'
import Cookie from '~/single/Cookie.vue'

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
      title: this.$static.m.siteName,
      meta: [
        {
          key: 'description',
          name: 'description',
          content: this.$static.m.siteDescription
        },
        {
          key: 'lang',
          name: 'lang',
          content: this.$store.locale
        }
      ],
    }
  },
  components: {
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
      this.scrollY = window.scrollY > 0 ? window.scrollY : 0
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
              el.style.opacity = 1
              el.style.transform = 'scale(1)'
              setTimeout(() => {
                el.classList.remove('fade-in')
              }, 500)
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
      if (typeof this.$store.bookmarks !== 'object') {
        this.$nextTick(() => {
          this.$store.bookmarks = {}
        })
      }
      setTimeout(() => {
        loadElements()
        this.ready = true
        window.document.body.classList.add('ready')
        this.onScroll()
      }, 100)
      setTimeout(() => {
        this.$store.showTopBar = false
      }, 10000)
    }
  }
}
</script>
