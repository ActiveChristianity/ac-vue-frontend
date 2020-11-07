<template>
  <g-link :to="article.slug" class="banner-article content cursor-pointer my-8 md:my-16 flex flex-wrap items-center rounded-2xl transition-shadow duration-300 border border-gray-200 md:border-0 hover:shadow-outline">
    <div class="w-full md:w-1/2 lg:w-2/3">
      <div class="relative wide rounded-2xl">
        <f-image class="absolute inset-0 w-full h-full object-cover rounded-2xl" :src="article.image"></f-image>
      </div>
    </div>
    <div class="w-full md:w-1/2 lg:w-1/3">
      <div class="p-4 md:py-8 md:px-8">
        <a class="uppercase text-gray-600 text-sm font-normal tracking-wide rounded py-2 hover:text-blue-800 cursor-pointer">{{ article.type || 'article' }}</a>
        <h2 class="text-2xl lg:text-3xl leading-tight tracking-wide font-medium my-2">{{ article.title }}</h2>
        <p class="text-gray-800 text-lg lg:text-xl my-4">{{ article.excerpt }}</p>
        <div class="flex items-center">
          <bookmark class="text-blue-500 rounded w-8 h-8 hover:bg-gray-200" :id="article.id" :slug="article.slug" />
          <div class="p-2 text-gray-600 text-sm md:text-md">{{ Math.ceil(article.readtime / 60) }} mins - {{ article.authors.map(a => a.name).join(', ') }}</div>
        </div>
      </div>
    </div>
  </g-link>
</template>

<script>
// AC
export default {
  name: 'ArticleBanner',
  props: {
    article: Object,
  },
}
</script>
