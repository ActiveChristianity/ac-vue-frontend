<template>
  <div class="story">
    <div class="flex justify-between p-4">
      <h4 class="text-d4slate-dark text-lg font-bold">{{label}}</h4>
      <div>
        <Link title="Customise" />
          <span class="text-d4slate-light mx-1">|</span>
        <Link title="See All" />
      </div>
    </div>
    <transition-group name="card-slide" tag="div" class="cards
      relative pt-20 pb-4 justify-center overflow-x-hidden
      sm:pt-4 sm:flex sm:items-start sm:flex-wrap sm:w-full">
      <template v-for="(card, i) in cards">
        <button :key="i" @click="tab = i" :class="{active: tab === i}" class="topic-btn">
          <Icon class="h-8 w-8" :name="card.topic.icon" />
        </button>
      </template>
      <div key="marker" class="absolute bottom-0 mb-3 ml-4 w-4 h-1 block bg-gray-600 marker rounded sm:hidden"></div>
      <template v-for="(card, i) in cards">
        <div
          :key="card.path"
          class="card w-full sm:w-3/4 sm:flex-grow-1"
          :class="[`order-${i+1}`, {
            prev: tab > i,
            next: tab < i,
            current: tab === i
          }]">
          <WidgetCard
            :topic="card.topic.name"
            :title="card.title"
            :path="card.path"
            :image="card.image"
            :read-time="card.readtime"
            :author="card.author"
          />
        </div>
      </template>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: 'Story',
  props: {
    label: String
  },
  data() {
    return {
      loop: false,
      tab: 0,
      cards: [{
        title: "Director",
        excerpt: "Et neque suscipit eveniet nostrum et assumenda ipsa qui repellendus. Non tempore fugiat enim qui ut. Molestiae ut est blanditiis omnis sed voluptatibus omnis minus voluptatem. Autem maxime porro omnis et.",
        path: "Cambridgeshire",
        image: "https://source.unsplash.com/random?641/481",
        topic: {
          name: "Radnom 123",
          icon: "eye"
        },
        readtime: 44,
        author: "GZA"
      }, {
        title: "hard drive",
        excerpt: "Qui delectus adipisci quas alias vel fugit. Temporibus ducimus cupiditate rem cupiditate iste consequatur facilis voluptatem et. Veritatis nihil necessitatibus vel. Sint nisi excepturi tenetur cupiditate ipsum rerum et. Nesciunt repellendus qui voluptate corporis ut assumenda nostrum commodi. Earum commodi consequatur.",
        path: "hard-drive",
        image: "https://source.unsplash.com/random?642/482",
        topic: {
          name: "Strategist",
          icon: "headset"
        },
        readtime: 24,
        author: "GZA"
      }, {
        title: "experiences",
        excerpt: "Corporis minima ea ut ullam ea. Ab est omnis est et dolor aut sit provident doloribus. Non aut quae sint non ea error libero ut. Ea omnis omnis et. Deserunt reprehenderit velit suscipit odit ducimus aspernatur aliquam.",
        path: "Incredible",
        image: "https://source.unsplash.com/random?643/483",
        topic: {
          name: "pink Soft",
          icon: "heart"
        },
        readtime: 14,
        author: "GZA"
      }, {
        title: "Need Based",
        excerpt: "Adipisci sit architecto et odit. Magni eligendi autem. Facilis nisi aperiam quia exercitationem error expedita aut quisquam. Beatae atque eum tempora ut. Dolorum necessitatibus sed unde. Exercitationem saepe commodi ut et corrupti tempore.",
        path: "baby",
        image: "https://source.unsplash.com/random?644/484",
        topic: {
          name: "DAy4 pink Soft",
          icon: "hashtag"
        },
        readtime: 43,
        author: "GZA"
      }]
    }
  },
  methods: {
    showNextCard() {
      this.tab = (this.tab + 1) % this.cards.length
    },
    showPrevCard() {
      if (this.tab == 0) {
        this.tab = this.cards.length - 1
      } else {
        this.tab = (this.tab - 1) % this.cards.length
      }
    }
  },
  components: {
    Link: () => import('./Link'),
    WidgetCard: () => import ('./WidgetCard')
  }
}
</script>

<style lang="scss">
.story {
  background: linear-gradient(180deg, var(--slate-lighter) 0%, rgba(237, 241, 250, 0) 100%);

  .marker {
    left: 0;
    top: 3.5rem;
    transition: .3s left ease-in;
  }
  @for $i from 1 through 6 {
    .topic-btn:nth-child(#{$i}) {
      left: #{($i - 0.75) * 64}px;
      order: #{$i};
    }
    .topic-btn.active:nth-child(#{$i}) {
      ~ .marker {
        left: #{($i - 0.75) * 64}px;
      }
    }
  }

  .topic-btn {
    @apply w-12 h-12 p-2 rounded-full bg-white mr-4;
  }
@media (max-width: 640px) {
  background: var(--slate-lighter);

  .topic-btn {
    position: absolute;
    top: 0;
  }
  .cards {
    &>div.card {
      top: 5rem;
      left: 0;
      width: 100%;
      transition: 1s transform;
      padding: 0 1rem;

      flex-shrink: 0;
      z-index: 1;
      position: absolute;
      transform-origin: center left;

      &.current {
        top: 0;
        position: relative;
        z-index: 3;
        transform: translateX(0);
      }
      &.next {
        transform: translateX(100%);
      }
      &.prev {
        transform: translateX(-100%);
      }
    }
  }
}
  .card-slide-item {
    position: absolute;
    z-index: 2;
  }

  .card-slide-leave-to, .card-slide-enter
  /* .card-slide-leave-active below version 2.1.8 */ {
    transform: translateX(200%) !important;
  }
  .card-slide-leave-active {
    position: absolute;
  }

}
</style>