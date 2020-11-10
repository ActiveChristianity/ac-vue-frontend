<template>
  <div>
    <heading v-if="title" :to="to">{{ title }}</heading>
    <slot></slot>
    <transition-group name="transform" tag="div" class="md:content w-full overflow-x-scroll md:overflow-hidden flex items-stretch md:flex-wrap scroll-snap-x py-4">
      <template v-for="(article, i) in articles">
        <article-card :key="article.id"
                      :article="article"
                      :large="large[i % 9]"
                      class="transition-all duration-300 w-11/12 md:w-1/2"
                      :class="large[i % 9] ? 'lg:w-1/2' : 'lg:w-1/4'"
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
    large() {
      if (this.articles && this.articles.length < 5) {
        return [
            true, true, true, true
        ]
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