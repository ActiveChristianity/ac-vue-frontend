<template>
  <div :class="{'bg-gray-900 text-white': !lightTheme}" class="w-full py-d6">
    <div class="w-full max-w-br mx-auto">
      <div v-if="title" class="pb-20">
        <p>{{ pre }}</p>
        <h4 class="my-6">{{ title }}</h4>
      </div>
      <div class="w-full flex items-stretch" :class="grid ? 'flex-wrap' : 'overflow-x-auto'">
        <template v-for="(card, I) in cards">
          <div :key="I" class="px-8 py-4"
            :class="grid ? 'w-full sm:w-1/2 md:w-1/3 hd:1/4' : 'w-2/3 md:w-3/5 hd:2/5'">
            <Card v-bind="card" :lightTheme="lightTheme" class="h-full"></Card>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    grid: Boolean,
    lightTheme: Boolean,
    cards: Array
  },
  components: {
    Card: () => import('./Card.vue')
  }
}
</script>