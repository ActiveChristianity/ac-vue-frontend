<template>
  <g-link :to="article.slug" class="block relative overflow-hidden rounded-2xl transition-shadow duration-300 hover:shadow-outline">
    <f-image class="absolute inset-0 w-full h-full object-cover rounded-2xl" :src="article.image" />
    <div class="absolute inset-0 bg-gradient-to-tr from-black opacity-75 rounded-2xl"></div>
    <div class="relative md:absolute inset-0 p-8 lg:pr-64 text-white flex flex-col">
      <div class="flex-1 lg:pt-8">
        <h2 class="text-2xl md:text-3xl lg:text-4xl leading-tight tracking-wide font-medium md:my-2">{{ article.title }}</h2>
        <p class="text-lg md:text-xl lg:text-2xl my-4 text-gray-100">{{ article.excerpt }}</p>
      </div>
      <div class="flex justify-between">
        <playable :track="article.track" iconClass="text-4xl lg:text-5xl fal" :icon="$typeIcon(article.type, true, !! article.track)"></playable>
      </div>
    </div>
  </g-link>
</template>


<script>
export default {
  name: 'ArticleCover',
  props: {
    article: {
      type: Object,
      required: true,
    }
  },
  computed: {
    track () {
      return this.article.track
    },
  }
}
</script>