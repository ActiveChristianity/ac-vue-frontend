<template>
  <div>
    <heading>{{ title }}</heading>
    <div class="md:content w-full overflow-x-scroll md:overflow-hidden flex items-stretch md:flex-wrap scroll-snap-x p-4">
      <template v-for="article in coverArticles">
        <article-cover-card :prefix="$typePrefix(article.type)" :key="article.id"
                            :article="article"
                            class="w-11/12 md:w-1/2 lg:w-1/4"
        />
      </template>
      <template v-for="article in cardArticles">
        <article-card :key="article.id" :article="article" class="w-11/12 md:w-1/2 lg:w-1/4" />
      </template>
      <div class="flex-none w-4 md:hidden"></div>
    </div>
  </div>
</template>

<script>
import ArticleCard from '~/components/ArticleCard'
import ArticleCoverCard from '~/components/ArticleCoverCard'
import Heading from '~/components/Heading'

export default {
  components: { ArticleCard, ArticleCoverCard, Heading },
  props: {
    title: String,
    coverArticles: Array,
    cardArticles: Array,
  }
}
</script>