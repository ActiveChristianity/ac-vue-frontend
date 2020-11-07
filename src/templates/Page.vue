<template>
  <main class="relative">
    <div :html="page.content"></div>
    <g-link v-if="$store.loggedIn" class="fixed bottom-0 left-0 z-50 m-4 py-1 px-2 text-white bg-blue-800 font-medium text-sm rounded shadow"
            :to="`/editor?type=page&id=${page.id}&lang=${$store.locale}`">Open Editor</g-link>
  </main>
</template>

<page-query>
query Page ($id: ID!) {
  ql {
    page(id: $id) {
      id
      path
      title
      content
    }
  }
}
</page-query>

<script>
export default {
  metaInfo() {
    if (!this.$page) return null
    const { title, excerpt } = this.$page.ql.page
    return {
      title,
      meta: [
        { key: 'description', name: 'description', content: excerpt }
      ]
    }
  },
  mounted() {
    setTimeout(() => {
      this.$store.fadeIn = true
    }, 50)
  },
  computed: {
    page() {
      return this.$page.ql.page
    }
  }
}
</script>
