<template>
  <main class="content-lg my-12">
    <h1 class="fade-in text-3xl text-center text-blue-900 md:text-4xl font-medium leading-tight">{{ page.title }}</h1>
    <template v-for="({ type, data }) in content">
      <div v-if="type === 'text'" v-html="data.content" class="post_content py-8"></div>
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
      seo {
        title
        desc
      }
    }
  }
}
</page-query>

<script>
export default {
  metaInfo() {
    if (!this.$page) return null
    const { title, seo } = this.$page.ql.page
    return {
      title: seo.title || title,
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
      return this.page.flexibleContent ? JSON.parse(this.page.flexibleContent) : null
    }
  }
}
</script>
