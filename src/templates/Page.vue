<template>
  <sectioned v-if="withSections" :sections="withSections" :title="page.title">
    <div class="content-lg post_content">
      <h1 class="fade-in mt-8 text-3xl text-blue-900 md:text-4xl font-medium leading-tight">{{ page.title }}</h1>
      <template v-for="({ type, data }) in content">
        <h2 v-if="type === 'section'" class="sticky top-0\.5" :id="data.slug">{{ data.title }}</h2>
        <div v-else-if="type === 'text'" v-html="data.content" class="post_content py-8"></div>
        <article-grid v-else-if="type === 'featured_items'" :articles="data" />
        <template v-else-if="type === 'embed'">
          <div v-if="data.type === 'youtube'" class="relative overflow-hidden rounded-3xl text-black">
            <f-image v-if="data.poster" :src="data.poster" class="w-full" />
            <div v-else class="w-full h-56 bg-slate-light"></div>
            <playable :video="data"
              class="absolute inset-0 w-full h-full"
              iconClass="text-xl md:text-4xl"
            />
          </div>
        </template>
      </template>
    </div>
  </sectioned>
  <main v-else class="my-12">
    <h1 class="fade-in text-3xl text-center text-blue-900 md:text-4xl font-medium leading-tight">{{ page.title }}</h1>
    <template v-for="({ type, data }) in content">
      <h2 v-if="type === 'section'" class="md:content md:px-2 text-xl" :id="data.slug">{{ data.title }}</h2>
      <div v-else-if="type === 'text'" v-html="data.content" class="post_content py-8"></div>
      <article-grid v-else-if="type === 'featured_items'" :articles="data" />
    </template>
  </main>
</template>

<page-query>
query Page ($id: ID!) {
  ql {
    page(id: $id) {
      id
      title
      flexibleContent
      meta {
        layout
      }
      seo {
        title
        desc
      }
    }
  }
}
</page-query>

<script>
import Sectioned from "../layouts/Sectioned";
export default {
  components: {
    Sectioned,
    ArticleGrid: () => import('~/components/ArticleGrid'),
  },
  metaInfo() {
    if (!this.$page) return null
    const { title, seo } = this.$page.ql.page
    return {
      title: seo.title || title + ' - ' + this.$t.site_title,
      meta: [
        { key: 'description', name: 'description', content: (seo.desc || title) }
      ]
    }
  },
  mounted() {
    setTimeout(() => {
      this.$store.fadeIn = true
    }, 50)
  },
  computed: {
    page () {
      return this.$page.ql.page
    },
    content () {
      const content = this.page.flexibleContent ? JSON.parse(this.page.flexibleContent) : null
      content.forEach(({ type, data }) => {
        if (type === 'featured_items') {
          data.forEach((item) => {
            if (item.type === 'playlist') {
              item.slug = `/${this.$t.slug_playlist}/${item.slug}`
            }
          })
        }
      })
      return content
    },
    withSections () {
      if (this.page.meta?.layout?.indexOf('with-sections') > -1) {
        const sections = {}
        this.content.forEach(({ type, data }) => {
          if (type === 'section') {
            data.slug = this.slugify(data.title)
            sections[data.slug] = data.title
          }
        })
        return sections
      }

      return false
    }
  },
  methods: {
    slugify (txt) {
      return txt.toLowerCase().replace(/[^a-z0-9 -]/g, '')
          // Collapse whitespace and replace by -
          .replace(/\s+/g, '-')
          // Collapse dashes
          .replace(/-+/g, '-')
    }
  }
}
</script>