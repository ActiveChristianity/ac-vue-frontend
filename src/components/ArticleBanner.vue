<template>
  <g-link :to="article.slug" class="banner-article content cursor-pointer my-8 md:my-16 flex flex-wrap items-center rounded-2xl transition-shadow duration-300 hover:shadow-outline">
    <div class="w-full md:w-1/2 xl:w-7/12">
      <div class="wide rounded-2xl">
        <f-image class="absolute inset-0 w-full h-full object-cover rounded-2xl" :src="article.image"></f-image>
      </div>
    </div>
    <div class="w-full md:w-1/2 xl:w-5/12">
      <div class="p-4 md:p-8 lg:px-12">
        <g-link :to="pre.to || '/'" class="uppercase text-gray-600 text-xs md:text-sm font-normal tracking-wide rounded py-2 hover:text-blue-800 cursor-pointer">{{ pre.text }}</g-link>
        <h2 class="text-2xl lg:text-3xl text-slate-dark leading-tight tracking-wide font-medium my-2">{{ article.title }}</h2>
        <p class="text-slate lg:text-lg my-4">{{ article.excerpt }}</p>
        <div class="flex items-center">
          <bookmark class="text-blue-500 rounded w-8 h-8 hover:bg-gray-200" :id="article.id" :slug="article.slug" />
          <div class="p-2 text-slate-light text-sm">{{ Math.ceil(article.readtime / 60) }} {{ $t.mins }} - {{ authors }}</div>
        </div>
      </div>
    </div>
  </g-link>
</template>

<script>
export default {
  name: 'ArticleBanner',
  props: {
    article: Object,
  },
  computed: {
    authors () {
      return this.$authorString(this.article)
    },
    pre () {
      if (this.article.topics?.length) {
        const { name, slug } = this.article.topics[0]
        return {
          text: name,
          to: `/${this.$t.slug_topic}/${slug}`
        }
      }

      return {
        text: this.article.type || 'article'
      }
    }
  }
}
</script>
