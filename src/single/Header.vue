<template>
  <header class="bg-white pb-12">
    <div id="topbar" class="items-center justify-between border-b border-gray-200 hidden px-4 h-10 md:flex">
      <div id="topbar-left" class="text-gray-500 text-sm tracking-wide">
        <a class="p-2 inline-block hover:text-gray-900" href="https://bcc.africa">Brunstad Christian Church in Africa <icon name="fal-external-link-alt" fa class="ml-1 " /></a>
      </div>
      <div id="topbar-right" class="flex text-gray-500 text-sm px-2">
        <!--button aria-label="login" class="tracking-wide rounded my-1 py-1 px-2 hover:bg-gray-600 hover:text-white">Login</button>
        <button aria-label="register" class="tracking-wide rounded my-1 py-1 px-2 hover:bg-gray-600 hover:text-white">Register</button-->
        <g-link :to="`/${$t.slug_contact}`" class="tracking-wide rounded my-1 py-1 px-2 hover:bg-gray-600 hover:text-white">{{ $t.contact }}</g-link>
      </div>
    </div>

    <div id="headbar" :style="{transform: $store.showSearch ? 'translateY(0)' : `translateY(${top}px)`}" class="fixed z-30 w-full bg-white bg-white flex items-center justify-between border-b border-gray-200 pl-1 pr-4 md:px-4 h-12"
      :class="scrollY > 48 || $store.showSearch ? 'z-50 top-0' : ''"
    >
      <button v-if="$route.path !== '/'" @click="$router.back()" class="p-3 h-12 md:hidden">
        <icon name="fad-chevron-left" fa />
      </button>

      <g-link to="/" id="headbar-left" class="p-3 h-12 text-4xl">
        <icon name="logo" class="h-full w-auto object-fit md:block" :class="{hidden: $store.showSearch}" />
        <icon name="icon" class="h-full w-12 object-fit" :class="$store.showSearch ? 'block md:hidden' : 'hidden'" />
      </g-link>

      <div class="flex-1">
        <div v-if="! $store.showSearch" class="flex justify-center">
          <g-link :to="`/${$t.slug_topic}`" :title="$t.topics" class="hidden md:block text-gray-800 tracking-wide rounded m-1 py-1 px-2 hover:bg-gray-200">{{ $t.topics }}</g-link>
          <g-link :to="`/${$t.slug_glossary}`" :title="$t.glossary" class="hidden md:block text-gray-800 tracking-wide rounded m-1 py-1 px-2 hover:bg-gray-200">{{ $t.glossary }}</g-link>
          <g-link :to="`/${$t.slug_about}`" title="About Us" class="hidden md:block text-gray-800 tracking-wide rounded m-1 py-1 px-2 hover:bg-gray-200">{{ $t.about }}</g-link>
        </div>
        <search v-if="$store.showSearch !== null" :show="$store.showSearch" @close="$store.showSearch = false" />
      </div>

      <div id="headbar-right" class="hidden md:flex text-gray-800">
        <button aria-label="search" @click="$store.showSearch = ! $store.showSearch" class="rounded m-1 py-1 px-2 hover:bg-gray-200">
          <icon name="fal-search" fa />
        </button>
        <button :aria-label="$t.bookmarks" @click="$store.showBookmarks = ! $store.showBookmarks" class="rounded m-1 py-1 px-2 hover:bg-gray-200 hover:text-secondary">
          <icon :name="`${Object.keys($store.bookmarks).length ? 'fad' : 'fal'}-bookmark`" fa />
        </button>
      </div>
    </div>

    <bookmarks v-if="$store.showBookmarks !== null" :show="$store.showBookmarks" @close="$store.showBookmarks = false" />
  </header>
</template>

<static-query>
query FooterInfo {
  m: metadata {
    title
    social
  }
}
</static-query>

<script>
export default {
  name: "Header",
  props: {
    top: Number,
    scrollY: Number,
  },
  components: {
    search: () => import('./Search'),
    bookmarks: () => import('./Bookmarks'),
  },
  data() {
    return {
      menuOpen: null,
    }
  },
  methods: {
    vibrate() {
      window.navigator && window.navigator.vibrate && window.navigator.vibrate(20);
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
