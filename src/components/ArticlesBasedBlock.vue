<template>
    <div class="p-4">
      <div class="flex mb-4">
        <p class="text-d4slate-dark mr-2">Based On Your Reading History</p>
      </div>
      <div>
        <template v-for="article in articles">
          <ArticleCard :article="article" :key="article.path" />
        </template>
      </div>
      <CardFollow title="follow" />
    </div>
</template>

<script>
import ArticleCard from '~/components/ArticleCard'
import CardFollow from '~/components/CardFollow'
export default {
  name: 'ArticlesBasedBlock',
  props: {
    topic: String,
    type: String,
    articles: Array
  },
  components: {
    ArticleCard,
    CardFollow
  }
}
</script>