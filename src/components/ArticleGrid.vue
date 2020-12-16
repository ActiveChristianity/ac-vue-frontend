<template>
  <div class="bg-gray-100 pt-2 md:pt-0 md:bg-transparent">
    <heading v-if="title" class="fade-in" :to="to">{{ title }}</heading>
    <slot></slot>
    <transition-group name="transform" tag="div" class="pl-4 md:pl-0 md:content w-full overflow-x-scroll md:overflow-hidden flex items-stretch md:flex-wrap scroll-snap-x py-4">
      <template v-for="(article, i) in articles">
        <article-card :key="article.id"
                      :article="article"
                      :large="large[i % 9]"
                      ratio="pb-16/9 md:pb-56"
                      class="fade-in transition-all duration-300 md:w-1/2"
                      :class="[baseWidth, large[i % 9] ? 'lg:w-1/2' : 'lg:w-1/4']"
        />
      </template>
      <div key="end" class="flex-none w-4 md:hidden"></div>
    </transition-group>
    <foot-link v-if="to" :to="to">View more</foot-link>
  </div>
</template>

<script>
import ArticleCard from './ArticleCard'
import Heading from './Heading'
import FootLink from './FootLink'

export default {
  props: {
    articles: Array,
    title: String,
    to: String,
  },
  components: { ArticleCard, Heading, FootLink },
  computed: {
    baseWidth () {
      return this.articles?.length === 1 ? 'w-full' : 'w-3/4'
    },
    large () {
      if (this.articles.length <= 2) {
        return [ true, true ]
      }
      if (this.articles.length <= 4) {
        return [ false, false, false, false ]
      }

      return [
        false,
        false,
        true,
        true,
        false,
        false,
        false,
        true,
        false,
      ];
    }
  },
  mounted () {
    setTimeout(() => {
      this.$store.fadeIn = true
    }, 100)
  }
}
</script>

<style>
.transform-enter, .transform-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.transform-leave-active {
  position: absolute;
}
</style>