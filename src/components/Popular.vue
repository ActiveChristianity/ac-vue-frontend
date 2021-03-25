<template>
  <div class="popular msm:bg-d4slate-lighter px-4 py-6 max-w-lg sm:rounded-lg">
    <h6 class="text-d4slate-dark mb-8 sm:border-b border-gray-600 sm:pb-6">{{ $t.popular_on_ac }}</h6>
    <div class="snap flex sm:block msm:overflow-x-scroll whitespace-no-wrap my-2 content-between sm:mb-0">
      <template v-for="(card, i) in cards">
        <CardShortTitle class="mr-4 mb-4 w-5/6 snap-item"
          :number="i+1"
          :key="card.path"
          :card="card"
          :path="card.path"
          :title="card.title"
          :excerpt="card.excerpt"
          :image="card.image"
          :readTime="card.readTime"
          :author="card.author"
        />
      </template>
    </div>
  </div>
</template>

<script>
import CardShortTitle from './CardShortTitle'
export default {
  name: 'Popular',
  components: {
    CardShortTitle
  },
  props: {
    cards: {
      type: Array,
    }
  },
}
</script>

<style lang="scss">
.popular {
  background: linear-gradient(180deg, #F5F6F8 0%, rgba(245, 246, 248, 0) 100%);

  .snap {
    scroll-snap-type: x proximity;
  }

  .snap-item {
    scroll-snap-align: start;
  }
}
</style>
