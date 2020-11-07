<template>
  <div>
    <heading v-if="title" :to="to">{{ title }}</heading>
    <slot></slot>
    <transition-group name="transform" tag="div" class="md:content w-full overflow-x-scroll md:overflow-hidden flex items-stretch md:flex-wrap scroll-snap-x p-4">
      <template v-for="(article, i) in articles">
        <article-card :key="article.id" :article="article" :large="large[i]" class="transition-all duration-300" />
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
  data: () => ({
    large: {
      0: false,
      1: false,
      2: true,
      3: true,
      4: false,
      5: false,
      6: false,
      7: true,
      8: false,
    }
  })
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