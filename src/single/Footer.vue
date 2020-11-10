<template>
  <footer class="relative border-t border-gray-200 mt-8 py-4">
    <div class="md:content center flex-col">
      <div class="w-full p-4 center">
        <template v-for="ln in socialLinks">
          <a :href="ln.url" :key="ln.key" :title="ln.key" target="_blank" class="social-link">
            <icon fa :name="ln.icon" />
          </a>
        </template>
      </div>
      <div class="md:flex items-center justify-between">
        <g-link to="/" class="w-full md:w-1/2 p-6 flex items-center">
          <Icon name="icon" class="text-primary w-32 h-full object-center object-contain"></Icon>
          <p class="text-sm mx-4 text-gray-600">{{ $static.m.copyright }}</p>
        </g-link>
        <p class="text-sm mx-4 text-gray-600 md:w-1/2 md:text-right">{{ $static.m.attribution }}</p>
      </div>
    </div>

    <div class="md:hidden w-full flex justify-around mt-4 pb-3 border border-t-2 border-t-gray-600 fixed z-30 bg-white bottom-0 inset-x-0">
      <g-link to="/contact-us" active-class="font-bold" class="flex flex-col items-center justify-center text-gray-800">
        <icon fa name="fal-info-circle" />
        <span class="block mt-2 text-sm">Contact Us</span>
      </g-link>
      <button aria-label="bookmarks" @click="$store.showBookmarks = ! $store.showBookmarks"
              class="flex flex-col items-center justify-center text-gray-800"
              :class="{'font-bold': $store.showBookmarks}"
      >
        <icon :prefix="Object.keys($store.bookmarks).length ? 'fad' : 'fal'" name="bookmark" fa />
        <span class="block mt-2 text-sm">Bookmarks</span>
      </button>
      <button aria-label="search" @click="$store.showSearch = ! $store.showSearch"
              class="w-16 h-16 flex flex-col items-center justify-center text-gray-800"
              :class="{'font-bold': $store.showSearch}"
      >
        <span class="rounded-full w-12 h-12 block shadow center -mt-8 mb-0 bg-gray-200">
          <icon name="fal-search" fa />
        </span>
        <span class="block mt-2 text-sm">Search</span>
      </button>
      <g-link to="/topics" active-class="font-bold" class="flex flex-col items-center justify-center text-gray-800">
        <icon fa name="fal-file-alt" />
        <span class="block mt-2 text-sm">Topics</span>
      </g-link>
    </div>
  </footer>
</template>

<static-query>
query FooterInfo {
  m: metadata {
    title
    copyright
    attribution

    social_youtube
    social_facebook
    social_instagram
    social_spotify
    social_itunes
  }
  ql {
    sites {
      locale
      lang
      title
      url
    }
  }
}
</static-query>

<script>
export default {
  computed: {
    langs () {
      return this.$static.ql.sites
    },
    socialLinks () {
      const { m } = this.$static

      const links = []
      Object.keys(m).forEach(k => {
        let match = k.match(/^social_(.*)$/)
        if (match) {
          const key = match[0].replace('social_', '')
          links.push({
            key,
            url: m[match[0]],
            icon: key.toLowerCase(),
          })
        }
      })

      return links
    },
    language() {
      return this.langs.find(({locale}) => locale === this.$store.locale)
    }
  }
}
</script>


<style lang="scss">
.dot {
  @apply mx-2 w-1 h-1 inline-block rounded-full bg-gray-600;
}
.social-link {
  @apply text-gray-600 text-3xl p-2 mr-2 cursor-pointer;
  &:hover {
    @apply text-gray-800;
  }
}
.drop-select {
  @apply w-32 relative;
  .drop {
    transition: .4s max-height;
    max-height: 0;
    @apply w-full flex flex-col absolute overflow-y-auto;
    bottom: 100%;

    a {
      @apply w-full text-base px-4 py-2;
    }
  }
  &:hover, &.open {
    .drop {
      max-height: 180px;
      @apply bg-white border border-gray-300 rounded;
    }
  }
}
</style>
