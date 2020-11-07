<template>
  <main class="max-w-desktop m-auto">
    <ArticleBanner v-if="posts.length" :article="posts[0]" />
    <LatestCards v-if="posts.length" :cards="[posts[2], posts[0], posts[1], posts[3], posts[2], posts[0]]" />
    <FeaturedCards :cards="posts" />
    <div class="grid-4">
      <ArticlesBlock class="div1-2" topic="Generation Gap" type="Popular" :articles="[posts[1], posts[2]]" />
      <ArticlesBlock class="div3-4" topic="Time" type="Suggested" :articles="[posts[0], posts[1]]" />
      <ArticlesBlock class="div5" topic="Time" type="Suggested" :articles="[posts[2]]" />
      <div class="div6 p-4">
        <StoryItem class="md:rounded-xl" label="New for you" />
      </div>
      <div class="div7 p-4">
        <Popular :articles="posts" />
      </div>
      <ArticlesBasedBlock class="div8" />
      <TopicsList class="div9 md:m-4 md:w-auto" />
      <ArticlesBlock class="div10" topic="Time" type="Suggested" :articles="[posts[3], posts[0]]" />
    </div>
  </main>
</template>

<page-query>
query {
  ql {
    posts(first: 10, page: 1) {
      data {
        id
        title
        excerpt
        path: slug
        readtime
        author {
          name
        }
        image { src srcset dataUri sizes size { width height } colors }
      }
    }
  }
}
</page-query>

<script>
import ArticleBanner from '~/components/ArticleBanner.vue'
import LatestCards from '~/components/LatestCards.vue'
import StoryItem from '~/components/StoryItem.vue'
import FeaturedCards from '~/components/FeaturedCards.vue'
import TopicsList from '~/components/TopicsList.vue'
import ArticlesBlock from '~/components/ArticlesBlock.vue'
import ArticlesBasedBlock from '~/components/ArticlesBasedBlock.vue'
import Popular from '~/components/Popular.vue'

export default {
  components: {
    StoryItem,
    FeaturedCards,
    ArticleBanner,
    LatestCards,
    TopicsList,
    ArticlesBlock,
    ArticlesBasedBlock,
    Popular
  },
  metaInfo: {
    title: 'TTWP Website'
  },
  data() {
    return {
      limit: 10,
      page: 2,
      posts: [],
      data: [],
    }
  },
  mounted() {
    this.$store.page = null
    this.posts = this.$page.ql.posts.data
    //this.loadArticles()
  },
  methods: {
    async loadArticles() {
      const { pager: { pages, total }, data } = await this.$api.blog.posts(this.limit, this.page)
      if (this.page < pages) ++this.page;
      this.data = [...this.data, ...data]
    }
  },
  computed: {
    firstArticle: function () {
      return this.data[0]
    }
  }
}
</script>

<style lang="scss">
@media (max-width: 639px) {
  .grid-4 {
    display: block;
    scroll-snap-type: y mandatory;
  }
  .grid-4>div {
    height: auto;
    width: 100%;
    margin: 1rem 0;
    scroll-snap-align: start;
  }
  .grid-4 .div1-2 { order: 1; }
  .grid-4 .div3-4 { order: 3; }
  .grid-4 .div5 { order: 5; }
  .grid-4 .div6 { order: 2; }
  .grid-4 .div7 { order: 4; }
  .grid-4 .div8 { order: 9; }
  .grid-4 .div9 { order: 6; height: 15rem; }
  .grid-4 .div10 { order: 5; }
  .grid-4 .div11, .grid-4 .div12 { order: 7; }
  .grid-4 .div13 { order: 10; }
}
@media (min-width: 640px) {
  .grid-4 {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: 2rem;
    grid-column-gap: 16px;
    grid-row-gap: 16px;
  }

  .grid-4 .div1-2 { grid-area: 1 / 1 / 21 / 3; }
  .grid-4 .div3-4 { grid-area: 21 / 1 / 41 / 3; }
  .grid-4 .div5 { grid-area: 31 / 3 / 41 / 5; }
  .grid-4 .div6 { grid-area: 1 / 3 / 11 / 5; }
  .grid-4 .div7 { grid-area: 11 / 3 / 21 / 5; }
  .grid-4 .div8 { grid-area: 21 / 3 / 31 / 5; }
  .grid-4 .div9 { grid-area: 41 / 1 / 45 / 5; height: var(--height-50); }
  .grid-4 .div10, .grid-4 .div11, .grid-4 .div12, .grid-4 .div13 { grid-column-end: span 2; grid-row-end: span 8; }
}
@media (min-width: 768px) {
  .grid-4 .div9 { grid-area: 41 / 1 / 51 / 5; background: var(--primary); margin: auto 0; padding: 2.5rem; height: auto; }
}
@media (min-width: 1024px) {
  .grid-4 .div1-2 { grid-area: 1 / 1 / 13 / 4; }
  .grid-4 .div3-4 { grid-area: 13 / 1 / 25 / 4; }
  .grid-4 .div5 { grid-area: 25 / 1 / 31 / 4; }
  .grid-4 .div6 { grid-area: 1 / 4 / 11 / 5; }
  .grid-4 .div7 { grid-area: 11 / 4 / 21 / 5; }
  .grid-4 .div8 { grid-area: 21 / 4 / 31 / 5; }
  .grid-4 .div9 { grid-area: 31 / 1 / 41 / 5; }
  .grid-4 .div10, .grid-4 .div11, .grid-4 .div12, .grid-4 .div13 { grid-row-end: span 10; }
}
</style>