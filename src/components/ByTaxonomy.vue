<template>
  <transition name="collapse">
    <div v-if="!value" class="taxonomy-cards">
      <div v-if="!minimized" class="flex justify-between px-4 mb-2">
        <h1 class="pr-2 font-medium">By Taxonomy</h1>
        <button class="border border-blue-500 text-blue-700 font-semibold rounded text-xs px-1">View All</button>
      </div>
      <ais-refinement-list attribute="tags.name">
        <div slot-scope="{ items }" class="p-2 content-between flex" :class="minimized ? 'minimized' : 'flex-wrap'">
          <div :class="{'w-1/2': !minimized}" class="p-2" v-for="tag in items.map(i => ({
              title: i.value,
              count: i.count,
              image: demoImage()
            }))" :key="tag.title">
            <button @click="select(tag)" class="taxonomy-card h-10 sm:h-14 bg-white flex rounded-lg items-center w-full px-2" :class="{small: minimized}">
              <f-image class="hidden sm:block pointer-events-none object-contain w-8 h-8" :src="tag.image"></f-image>
              <h1 class="text-sm text-left font-medium truncate flex-grow pr-2 sm:px-4">{{ tag.title }}</h1>
              <p class="text-xs opacity-75">{{ tag.count }}</p>
            </button>
          </div>
        </div>
      </ais-refinement-list>
    </div>
  </transition>
</template>

<script>
// import CardTaxonomy from '~/components/CardTaxonomy.vue'
export default {
  props: {
    value: Object,
    minimized: Boolean
  },
  methods: {
    select(type) {
      this.$emit('input', type)
    },
    demoImage() {
      return [
        require('~/assets/imgs/Books.png'),
        require('~/assets/imgs/Folders.png'),
        require('~/assets/imgs/Microphone.png'),
        require('~/assets/imgs/PenInk.png'),
        require('~/assets/imgs/Podium.png'),
        require('~/assets/imgs/QuestionMark.png'),
        require('~/assets/imgs/SpeechBubble.png')
      ][Math.round(Math.random() * 6)]
    },
  }
  // components: {CardTaxonomy}

}
</script>

<style lang="scss">
.taxonomy-cards {
  .minimized {
    @apply overflow-x-scroll whitespace-no-wrap pt-0 ;
  }


  .taxonomy-card {
    transition: .4s ease;

    &.small {
      @apply h-8 w-auto text-left rounded-lg p-2;

      img {
        display: none;
      }

      @apply flex items-center h-full;
      
      p {
        @apply pl-2 block;
      }
    }

  }
}
</style>