<template>
  <header class="bg-white">
    <div id="headbar" class="h-16">
      <div class="fixed w-full bg-white flex items-center justify-between border-b border-gray-200 py-2 pl-1 pr-4 md:px-4"
         :style="`transform: translateY(${translateY}px)`"
         :class="scrollY > 64 ? 'z-40 top-0' : 'top- z-30'"
      >
        <button v-if="$route.path !== '/'" title="back" @click="goBack" class="p-3 h-12 md:hidden">
          <icon name="fad-chevron-left" fa />
        </button>

        <g-link to="/" :title="$t.site_title" id="headbar-left" class="flex-1 p-3 h-12 text-4xl">
          <icon name="logo" class="h-full w-auto object-fit md:block" :class="{hidden: $store.showSearch}" />
          <icon name="icon" class="h-full w-12 object-fit" :class="$store.showSearch ? 'block md:hidden' : 'hidden'" />
        </g-link>

        <transition name="fade" mode="out-in">
          <div v-if="! $store.showSearch" class="hidden md:flex flex-1">
            <g-link :to="`/${$t.slug_topic}`" :title="$t.topics"
              exactActiveClass="text-primary"
              class="text-gray-800 tracking-wide rounded m-1 py-1 px-2 focus:bg-gray-200 hover:bg-gray-200"
            >{{ $t.topics }}</g-link>
            <g-link :to="`/${$t.slug_glossary}`" :title="$t.glossary"
              exactActiveClass="text-primary"
              class="text-gray-800 tracking-wide rounded m-1 py-1 px-2 focus:bg-gray-200 hover:bg-gray-200"
            >{{ $t.glossary }}</g-link>
            <g-link :to="`/${$t.slug_about}`" :title="$t.about_us"
              exactActiveClass="text-primary"
              class="text-gray-800 tracking-wide rounded m-1 py-1 px-2 focus:bg-gray-200 hover:bg-gray-200"
            >{{ $t.about }}</g-link>
          </div>

          <search v-else-if="$store.showSearch !== null" :show="$store.showSearch" @close="$store.showSearch = false" />
        </transition>

        <div id="headbar-right" class="hidden md:flex justify-end text-gray-800">
          <button aria-label="search" @click="$store.showSearch = ! $store.showSearch" class="rounded m-1 py-1 px-2 focus:bg-gray-200 hover:bg-gray-200 hover:text-secondary">
            <icon name="fal-search" fa />
          </button>
          <button :aria-label="$t.bookmarks" @click="$store.showBookmarks = ! $store.showBookmarks" class="rounded m-1 py-1 px-2 focus:bg-gray-200 hover:bg-gray-200 hover:text-secondary">
            <icon :name="`${Object.keys($store.bookmarks).length ? 'fad' : 'fal'}-bookmark`" fa />
          </button>
        </div>
      </div>
    </div>

    <div id="topbar" class="items-center justify-between border-b border-gray-200 hidden px-4 h-10 md:flex">
      <div id="topbar-left" class="text-gray-500 text-sm tracking-wide">
        <a class="p-2 inline-block focus:text-gray-900 hover:text-gray-900" rel="nofollow" :href="$t.bcc_link">{{ $t.bcc_text}} <icon name="fal-external-link-alt" fa class="ml-1" /></a>
      </div>
      <div id="topbar-right" class="flex text-gray-500 text-sm px-2">
        <dropdown v-if="$store.currentSite" :label="$store.currentSite ? $store.currentSite.lang : 'Language'">
          <template v-for="site in $store.regionSites">
            <dropdown-item :key="site.locale" :href="site.url" :title="site.title">{{ site.lang }}</dropdown-item>
          </template>
          <hr>
          <dropdown-item v-if="$store.fallbackSite" :key="$store.fallbackSite.locale" :href="$store.fallbackSite.url" :title="$store.fallbackSite.title">Global</dropdown-item>
        </dropdown>
        <!--button aria-label="login" class="tracking-wide rounded my-1 py-1 px-2 hover:bg-gray-600 hover:text-white">Login</button>
        <button aria-label="register" class="tracking-wide rounded my-1 py-1 px-2 hover:bg-gray-600 hover:text-white">Register</button-->
        <g-link :to="`/${$t.slug_contact}`"
          exactActiveClass="text-primary"
          class="tracking-wide rounded my-1 py-1 px-2 focus:bg-gray-200 focus:text-gray-600 hover:bg-gray-200 hover:text-gray-600"
        >{{ $t.contact }}</g-link>
      </div>
    </div>

    <bookmarks v-if="$store.showBookmarks !== null" :show="$store.showBookmarks" @close="$store.showBookmarks = false" />
  </header>
</template>

<script>
import Dropdown from "../atomics/Dropdown";
import DropdownItem from "../atomics/DropdownItem";
export default {
  name: "Header",
  props: {
    top: Number,
    scrollY: Number,
  },
  components: {
    DropdownItem,
    Dropdown,
    search: () => import('./Search'),
    bookmarks: () => import('./Bookmarks'),
  },
  data() {
    return {
      menuOpen: null,
    }
  },
  computed: {
    translateY () {
      return this.$store.showSearch ? 0 : this.top
    },
  },
  methods: {
    goBack() {
      this.$vibrate()

      if (window.history.length) {
        this.$router.back()
      } else {
        this.$router.replace('/')
      }
    }
  },
  watch: {
    '$store.showBookmarks' (show) {
      if (show) {
        this.$store.showSearch = false
      }
    },
    '$store.showSearch' (show) {
      if (show) {
        this.$store.showBookmarks = false
      }
    }
  }
}
</script>
