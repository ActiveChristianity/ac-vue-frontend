<template>
  <div class="banner-article content cursor-pointer py-8 md:py-16">
    <g-link :to="article.slug" class="flex flex-wrap items-center rounded-2xl transform transition-transform duration-300 hover:scale-95" :style="shadow">
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
            <div class="p-2 text-slate-light text-sm">{{ Math.ceil(article.readtime / 60) }} {{ $t.min }} - {{ authors }}</div>
          </div>
        </div>
      </div>
    </g-link>
  </div>
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
    },
    shadow () {
      const [c1, c2, c3, c4] = this.article.image.colors
      const px = 80
      return {
        'box-shadow': `${px}px ${px}px ${px}px -${px}px rgb(${c1.join(',')}), -${px}px ${px}px ${px}px -${px}px rgb(${c2.join(',')}), ${px}px -${px}px ${px}px -${px}px rgb(${c3.join(',')}), -${px}px -${px}px ${px}px -${px}px rgb(${c4.join(',')})`
      }
    }
  }
}
</script>