<template>
  <div class="latest-cards p-8 sm:p-4 z-10">
    <div class="flex justify-between items-start border-b pb-2">
      <h5 class="flex items-center">
        <Icon name="clock" />
        <span class="mx-3 text-d4slate-dark leading-normal text-lg">{{ title }}</span>
      </h5>
      <button class="flex items-center border border-gray-600 px-2 rounded-full">
        <p class="leading-loose text-xs">Done For Today</p>
        <Icon name="checkmark" />
      </button>
    </div>
    <div class="my-2 relative" v-touch:swipe.left="showNextCard">
      <transition-group name="card-stack" tag="div" class="card-stack">
        <template v-for="(card, i) in cards">
          <Card
            :key="card.path+i"
            :card="card"
            type="Article"
            class="stack-card"
            :class="{last: (tab + 2) % cards.length === i, next: (tab + 1) % cards.length === i, current: tab === i}"
          ></Card>
        </template>
      </transition-group>
    </div>
  </div>
</template>

<script>
import vtouch from 'vue2-touch-events'
import Vue from 'vue'

Vue.use(vtouch)
export default {
  name: 'LatestCards',
  props: {
    title: {
      type: String,
      default: 'Latest',
    },
    cards: Array
  },
  data() {
    return {
      tab: 0
    }
  },
  methods: {
    showNextCard() {
      this.tab = (this.tab + 1) % this.cards.length
    }
  },
  components: {
    Card: () => import('~/components/Card.vue')
  }
}

export const def = (V) => ({
  label: 'Latest Cards',
  name: 'LatestCards',
  props: [
    {
      key: 'title',
      rules: {
        required: true
      }
    },
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
          slug: P.slug,
          image: P.image
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
            key: 'slug',
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
@screen msm {
  .latest-cards .card {
    transition: all 0.7s;
  }
  .card-stack-item {
    transition: all 0.7s;
    position: absolute;
    z-index: 2;
  }

  .card-stack-leave-to, .card-stack-enter {
    transform: scale(1) translateX(-200%) !important;
  }
  .card-stack-leave-active {
    position: absolute;
  }

  .stack-card {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 3;
    transform: scale(1) translateX(-200%);
    transform-origin: center left;

    &.current {
      position: relative;
      z-index: 3;
      transform: scale(0.96);
      transform-origin: center left;
    }
    &.next {
      position: absolute;
      z-index: 2;
      top: 0;
      left: 0;
      width: 100%;
      transform: scale(0.86) translateX(14%);
      transform-origin: center left;
      @apply bg-gray-100;
    }
    &.last {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 1;
      transform: scale(0.8) translateX(24%);
      transform-origin: center left;
      @apply bg-gray-300;
    }
  }
}
@screen sm {
  .card-stack {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: var(--height);
    grid-column-gap: 16px;
    grid-row-gap: 16px;
  }
  .stack-card:nth-child(1) { grid-area: 1 / 1 / 2 / 3; }
  .stack-card:nth-child(2) { grid-area: 1 / 3 / 2 / 5; }
  .stack-card:nth-child(3) { grid-area: 2 / 1 / 3 / 3; }
  .stack-card:nth-child(4) { grid-area: 2 / 3 / 3 / 5; }
  .stack-card:nth-child(5) { grid-area: 3 / 1 / 4 / 3; }
  .stack-card:nth-child(6) { grid-area: 3 / 3 / 4 / 5; }
}
@media (min-width: 1024px) {
  .stack-card:nth-child(1) { grid-area: 1 / 1 / 2 / 2; }
  .stack-card:nth-child(2) { grid-area: 1 / 2 / 2 / 3; }
  .stack-card:nth-child(3) { grid-area: 1 / 3 / 2 / 5; }
  .stack-card:nth-child(4) { grid-area: 2 / 1 / 3 / 3; }
  .stack-card:nth-child(5) { grid-area: 2 / 3 / 3 / 4; }
  .stack-card:nth-child(6) { grid-area: 2 / 4 / 3 / 5; }
}
</style>