<template>
  <div class="featured-cards mb-4 p-8 sm:p-4">
    <div class="flex justify-between align-center text-gray-600 text-base">
      <h5 class="flex items-center">
        <Icon name="star" class="w-4 h-4 stroke-current" />
        <span class="mx-2">Featured</span>
      </h5>
    </div>
    <div class="grid-3 py-4">
      <template v-for="card in cards" >
        <FeaturedCard class="grid-3-item"
          :key="card.path"
          :title="card.title"
          :excerpt="card.excerpt"
          :image="card.image"
          :author="card.author ? card.author.name : ''"
          :type="['post', 'podcast', 'ebook', 'post'][Math.floor(Math.random() * 4)]"
          :liked="false"
          :likes="31"
          :views="410"
          :path="card.path"
        ></FeaturedCard>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FeaturedCards',
  props: { cards: Array },
  components: {
    FeaturedCard: () => import('~/components/FeaturedCard.vue')
  }
}

export const def = (V) => ({
  label: 'Featured Cards',
  name: 'FeaturedCards',
  props: [
    {
      key: 'fc',
      label: 'Fetch Posts',
      type: 'query',
      update: 'cards',
      vars: [{
        key: 'limit',
        label: 'Count',
        type: 'number',
        default: 3,
        min: 1,
        max: 10
      }, {
        key: 'page',
        label: 'Page',
        type: 'number',
        default: 1,
        min: 1,
        max: 10
      }, {
        key: 'ids',
        label: 'Specific Posts',
        type: 'multiple',
        options() {
          return V.$gql(`query { posts { data { value: id label: title }}}`, {}, true)
            .then(res => res.posts.data)
        }
      }],
      query: async function(vue, vars) {
        const { data } = await vue.$api.blog.posts(vars.limit || 2, vars.page || 1, vars.ids)
        return data.map(P => ({
          title: P.title,
          excerpt: P.excerpt,
          path: `/${P.slug}`,
          image: P.image,
          author: P.authors.length ? P.authors[0] : null
        }))
      }
    },
    {
      key: 'cards',
      type: 'repeater',
      field: {
        type: 'group',
        fields: [
          {
            key: 'title'
          },
          {
            key: 'excerpt',
            type: 'textarea'
          },
          {
            key: 'path',
          },
          {
            key: 'image',
            type: 'image',
            rules: {
              required: true
            }
          }
        ]
      },
    }
  ]
})
</script>

<style lang="scss">
@media (max-width: 639px) {
  .grid-3 {
    display: flex;
    overflow-x: scroll;
    margin: 0 -2rem;
    padding-left: 2rem;
    scroll-snap-type: x mandatory;

    &:after {
      content: '';
      height: var(--height);
      width: 32px;
      flex-shrink: 0;
    }

    &-item {
      height: var(--height);
      width: calc(100% - 32px);
      margin-right: 16px;
      flex-shrink: 0;
      scroll-snap-align: center;
    }
  }
}
@media (min-width: 640px) {
  .grid-3 {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: 30rem;
    grid-column-gap: 16px;
    grid-row-gap: 16px;

    &-item:nth-child(1) { grid-area: 1 / 1 / 2 / 3; }
    &-item:nth-child(2) { grid-area: 1 / 3 / 2 / 5; }
    &-item:nth-child(3) { grid-area: 2 / 1 / 3 / 3; }
    &-item:nth-child(4) { grid-area: 2 / 3 / 3 / 5; }
  }
}
@media (min-width: 1024px) {
  .grid-3 {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-column-gap: 16px;
    grid-row-gap: 16px;

    &-item:nth-child(1) { grid-area: 1 / 1 / 2 / 2; }
    &-item:nth-child(2) { grid-area: 1 / 2 / 2 / 3; }
    &-item:nth-child(3) { grid-area: 1 / 3 / 2 / 4; }
    &-item:nth-child(4) { grid-area: 1 / 4 / 2 / 5; }
  }
}
</style>