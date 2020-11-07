<template>
<div class="bg-white flex justify-between">
  <g-link class="w-full max-w-mobile inline-block p-4 bg-white flex justify-between" :key="result.objectID">
    <div>
      <p class="bg-d4athens text-tiny w-auto inline-block px-1 rounded font-bold text-gray-600-dark mb-1">{{ result.type.toUpperCase() }}</p>
      <h1 class="text-d4slate-dark leading-tight font-bold pr-1 pb-1">{{ result.title }}</h1>
      <p class="text-gray-600-dark font-medium text-sm block-with-text lines-2 pr-1 pb-1" v-html="result.excerpt"></p>
      <div class="flex items-center">
        <Icon name="bookmark" class="h-4 w-4" />
        <p class="text-sm text-gray-600-dark">5 min read</p>
      </div>
    </div>
    <img class="w-28 h-28 rounded-xl object-cover" :src="result.featured_media.source_url" alt="random unsplash">
  </g-link>
</div>
</template>

<script>
export default {
  props: {
    result: Object
  }
}
</script>
