<template>
  <footer class="relative border-t border-gray-200 mt-8 py-8">
    <div class="md:content md:flex items-center flex-wrap">
      <g-link to="/" class="w-full md:w-1/2 p-6 flex items-center">
        <Icon name="icon" class="text-primary w-32 h-full object-center object-contain"></Icon>
        <p class="text-sm mx-4 text-gray-600">{{ $static.m.copyright }}</p>
      </g-link>
      <div class="w-full md:w-1/2 pb-6 flex flex-wrap items-center">
        <div class="flex w-1/2 my-8 px-6 items-center">
          <template v-for="ln in socialLinks">
            <a :href="ln.url" :key="ln.key" :title="ln.key" target="_blank" class="social-link" :class="ln.icon"></a>
          </template>
        </div>
        <div class="flex w-1/2 px-6 items-center">
          <div class="drop-select">
            <p v-if="language" class="w-full text-base px-2 py-1 border border-gray-200 rounded flex items-center justify-between"><span>{{ language.lang }}</span> <i class="text-sm fad fa-chevron-down"></i></p>
            <div class="drop overflow-y-scroll">
              <a v-for="l in langs" :key="l.locale" :href="l.url" rel="noopener" :title="l.title" :class="{'opacity-50': $store.locale == l.locale}" class="px-2 text-6xl">{{ l.lang }}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <g-link to="/editor" class="absolute bottom-0 left-0 py-2 px-4 bg-gray-100 opacity-0 hover:opacity-25">Editor</g-link>
  </footer>
</template>

<static-query>
query FooterInfo {
  m: metadata {
    title
    copyright

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
            icon: `fab fa-${key.toLowerCase()}`,
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
