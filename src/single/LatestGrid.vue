<template>
  <article-grid :articles="$static.ql.posts.data" title="Latest" to="/latest" />
</template>

<static-query>
query LatestPosts {
  ql {
    posts(first: 6, featured: false) {
      data {
        id
        title
        excerpt
        slug
        type
        readtime
        track {
          title
          url
        }
        topics (group_id: 4) {
          name
          slug
        }
        image { src alt dataUri size { width height } focal }
        authors { name }
        views
      }
    }
  }
}
</static-query>

<script>
import ArticleGrid from '~/components/ArticleGrid'

export default {
  components: { ArticleGrid },
}
</script>