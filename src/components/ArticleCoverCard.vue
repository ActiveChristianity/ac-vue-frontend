<template>
  <div class="flex-none p-2">
    <g-link :to="`${prefix}${article.slug}`" class="relative overflow-hidden flex flex-col h-full cursor-pointer rounded-2xl border border-gray-200 transition-shadow duration-300 hover:shadow-outline">
      <f-image v-if="article.image" class="absolute w-full h-full object-cover object-center rounded-2xl" :src="article.image.dataUri"></f-image>
      <div v-else class="absolute inset-0 w-full h-full object-cover object-center rounded-2xl bg-gradient-to-br from-gray-800 to-blue-600"></div>
      <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50"></div>
      <div class="relative py-8 px-12">
        <div class="relative w-full pb-square">
          <f-image v-if="article.image" class="absolute w-full h-full object-cover rounded-2xl" :src="article.image"></f-image>
          <div v-else class="absolute inset-0 w-full h-full object-cover object-center rounded-2xl bg-gradient-to-br from-gray-600 to-gray-400"></div>
          <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black rounded-2xl opacity-50"></div>
          <div class="absolute inset-0 flex items-center justify-center text-white text-4xl">
            <playable :track="article.track" iconStyle="fad" :icon="$typeIcon(article.type, true, !! article.track)"></playable>
          </div>
        </div>
      </div>
      <div class="relative flex-1 flex flex-col px-4 py-2 lg:py-4">
        <p class="text-gray-100 text-sm text-center uppercase">{{ $typeString(article.type, !! article.track) }}</p>
        <h2 class="flex-1 text-white text-xl text-center leading-tight tracking-wide font-medium my-2">{{ article.title }}</h2>
        <div class="text-gray-100 text-sm md:text-base border-t border-gray-400 py-2">{{ authors }}</div>
        <div class="flex items-center justify-between text-gray-100 text-sm pb-1">
          <span v-if="article.readtime" aria-label="time2read"><icon class="mr-1" name="fal-file-alt" fa /> {{ Math.ceil(article.readtime / 60) }} mins</span>
          <bookmark class="rounded w-8 h-8 hover:bg-gray-800 hover:text-blue-400 ml-auto" :id="article.id" :slug="article.slug" />
        </div>
      </div>
    </g-link>
  </div>
</template>

<script>
export default {
  props: {
    prefix: {
      type: String,
      default: '/',
    },
    article: {
      type: Object,
      required: true,
    }
  },
  computed: {
    authors () {
      return this.$authorString(this.article)
    }
  }
}
</script>