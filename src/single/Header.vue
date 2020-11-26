<template>
  <header class="bg-white pt-12 md:pt-0" :class="$store.showSearch ? 'pb-12' : ''">
    <div id="topbar" class="items-center justify-between border-b border-gray-200 hidden px-4 h-10 md:flex">
      <div id="topbar-left" class="text-gray-500 text-sm tracking-wide">
        <a class="p-2 inline-block hover:text-gray-900" href="https://bcc.africa">Brunstad Christian Church in Africa <icon name="fal-external-link-alt" fa class="ml-1 " /></a>
      </div>
      <div id="topbar-right" class="flex text-gray-500 text-sm px-2">
        <!--button aria-label="login" class="tracking-wide rounded my-1 py-1 px-2 hover:bg-gray-600 hover:text-white">Login</button>
        <button aria-label="register" class="tracking-wide rounded my-1 py-1 px-2 hover:bg-gray-600 hover:text-white">Register</button-->
        <g-link to="/contact-us" class="tracking-wide rounded my-1 py-1 px-2 hover:bg-gray-600 hover:text-white">Contact</g-link>
      </div>
    </div>

    <div id="headbar" class="fixed top-0 z-30 w-full bg-white md:relative bg-white flex items-center justify-between border-b border-gray-200 pl-1 pr-4 md:px-4 h-12"
      :class="$store.showSearch ? 'fixed top-0 inset-x-0 md:mt-10 z-50' : ''"
    >
      <button v-if="$route.path !== '/'" @click="$router.back()" class="p-3 h-12 md:hidden">
        <icon name="fad-chevron-left" fa />
      </button>

      <g-link to="/" id="headbar-left" class="p-3 h-12 text-4xl">
        <icon name="logo" class="h-full object-fit md:block" :class="{hidden: $store.showSearch}" />
        <icon name="icon" class="h-full object-fit" :class="$store.showSearch ? 'block md:hidden' : 'hidden'" />
      </g-link>

      <div v-if="! $store.showSearch" class="flex flex-1 justify-center">
        <g-link to="/topics" :title="$t.topics" class="hidden md:block text-gray-800 tracking-wide rounded m-1 py-1 px-2 hover:bg-gray-200">{{ $t.topics }}</g-link>
        <g-link to="/glossary" :title="$t.glossary" class="hidden md:block text-gray-800 tracking-wide rounded m-1 py-1 px-2 hover:bg-gray-200">{{ $t.glossary }}</g-link>
      </div>

      <search v-if="$store.showSearch !== null" :show="$store.showSearch" @close="$store.showSearch = false" />

      <div id="headbar-right" class="hidden md:flex text-gray-800">
        <button aria-label="search" @click="$store.showSearch = ! $store.showSearch" class="rounded m-1 py-1 px-2 hover:bg-gray-200">
          <icon name="fal-search" fa />
        </button>
        <button aria-label="bookmarks" @click="$store.showBookmarks = ! $store.showBookmarks" class="rounded m-1 py-1 px-2 hover:bg-gray-200 hover:text-secondary">
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
  }
}
</script>

<style lang="scss">
nav {
  @screen mmd {
    @apply fixed w-screen h-screen text-white px-8 pt-32 bg-gray-800 inset-0 z-10 overflow-y-auto;
    transform: translateX(100%);
    transition: transform .6s cubic-bezier(.19,1,.22,1);

    &.menuOpen {
      transform: translateX(0);
    }

    .nav-link {
      @apply p-2 text-xl;

      span {
        @apply block mt-2 text-sm font-semibold;
      }

      .nav-dropdown {
        opacity: 1;
        transform: translateY(0);
      }
    }
  }
}
</style>