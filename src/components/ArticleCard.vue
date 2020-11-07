<template>
  <div class="flex-none w-11/12 md:w-1/2 p-2" :class="large ? 'lg:w-1/2' : 'lg:w-1/4'">
    <g-link :to="article.slug" class="flex flex-col h-full cursor-pointer rounded-2xl border border-gray-200 transition-shadow duration-300 hover:shadow-outline">
      <div class="relative w-full" :class="ratio">
        <f-image class="absolute inset-0 w-full h-full object-cover rounded-t-2xl" :src="article.image"></f-image>
        <div class="absolute top-0 right-0 m-3 flex items-center justify-center text-white text-xl">
          <playable :track="article.track" iconClass="fad" :icon="$typeIcon(article.type, true, !! article.track)"></playable>
        </div>
        <span v-if="article.topics && article.topics.length" class="absolute top-0 left-0 m-3 px-1 rounded uppercase text-xs text-gray-700 bg-gray-200 bg-opacity-75">{{ article.topics[0].name }}</span>
      </div>
      <div class="flex-1 flex flex-col px-4 py-2 lg:px-6 lg:py-4">
        <h2 class="text-xl leading-tight tracking-wide font-medium my-2" :class="large ? 'lg:text-2xl' : ''">{{ article.title }}</h2>
        <p class="text-gray-800 text-md my-2" :class="large ? 'lg:text-lg' : ''">{{ article.excerpt }}</p>
        <div v-if="article.authors" class="flex-1 pb-2 text-gray-600 text-sm md:text-md">{{ article.authors.map(a => a.name).join(', ')}}</div>
        <div class="flex items-center justify-between text-gray-600 text-sm pb-1">
          <span aria-label="time2read"><i class="text-md mr-1 fal fa-file-alt"></i> {{ Math.ceil(article.readtime / 60) }} mins</span>
          <bookmark class="rounded w-8 h-8 hover:bg-gray-200 hover:text-blue-600" type="post" :id="article.id" :slug="article.slug"></bookmark>
        </div>
      </div>
    </g-link>
  </div>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
      required: true,
    },
    large: Boolean,
    ratio: { type: String, default: 'h-56' }
  },
}
</script>