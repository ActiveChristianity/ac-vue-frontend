<template>
  <div class="p-4 flex flex-col">
    <div class="flex mb-4">
      <h5 class="text-d4slate-dark mr-2">{{ topic }}</h5>
      <p class="text-d4slate-light italic xsmall font-sans">{{ type }} topic</p>
    </div>
    <div class="articles-list flex-1 flex flex-col">
      <template v-for="article in articles">
        <ArticleCard v-if="article" :article="article" :key="article.path" class="md:h-rect" />
      </template>
    </div>
  </div>
</template>

<script>
import ArticleCard from './ArticleCard'
export default {
  name: 'ArticlesBlock',
  props: {
    topic: String,
    type: String,
    articles: Array
  },
  components: {
    ArticleCard
  }
}
</script>

<style lang="scss">
@media (max-width: 640px) {
  .articles-list {
    a:not(:last-child) {
      .opt-border {
        @apply border-b border-gray-400 pb-2;
      }
    }
  }
}
</style>