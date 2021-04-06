<template>
  <div class="flex-none p-2">
    <g-link :to="article.slug" class="flex flex-col h-full cursor-pointer rounded-2xl bg-white border border-gray-300 transition-shadow duration-300 hover:shadow-outline">
      <div class="relative w-full" :class="ratio">
        <f-image class="absolute inset-0 w-full h-full object-cover rounded-t-2xl" :src="article.image"></f-image>
        <div class="absolute top-0 right-0 m-3 flex items-center justify-center text-white text-xl">
          <playable :track="article.track" iconStyle="fad" :icon="$typeIcon(article.type, true, !! article.track)"></playable>
        </div>
        <span v-if="article.topics && article.topics.length" class="absolute top-0 left-0 m-3 px-1 rounded uppercase text-xs text-gray-700 bg-gray-200 bg-opacity-75">{{ article.topics[0].name }}</span>
      </div>
      <div class="flex-1 flex flex-col px-4 py-2 xl:px-6 xl:py-4">
        <h2 class="text-slate-dark text-lg md:text-xl leading-tight tracking-wide xl:hover:font-normal my-2"
            :class="large ? 'lg:text-2xl' : ''"
        >{{ article.title }}</h2>
        <p class="lines-2 block-with-text text-slate my-2"
           :class="large ? 'lg:text-lg' : ''"
        >{{ article.excerpt }}</p>
        <div v-if="authors" class="flex-1 pb-2 text-slate-light text-sm">{{ authors }}</div>
        <div class="flex items-center justify-between text-gray-600 text-sm pb-1">
          <span aria-label="time2read">
            <icon class="mr-1" fa name="fal-file-alt" /> {{ Math.ceil(article.readtime / 60) }} {{ $t.min }}
          </span>
          <bookmark class="rounded w-8 h-8 hover:bg-gray-200 hover:text-blue-600" type="post" :id="article.id" :slug="article.slug" />
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
  computed: {
    authors () {
      return this.$authorString(this.article)
    }
  }
}
</script>
