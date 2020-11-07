<template>
  <transition name="collapse">
    <div v-if="!value">
      <h1 v-if="!minimized" class="px-4 mb-2 font-medium">By Type</h1>
      <ais-refinement-list attribute="categories.name">
        <div slot-scope="{ items }" class="snap px-2 py-4 overflow-x-scroll whitespace-no-wrap flex content-between" :class="minimized ? 'pt-0' : ''">
          <div v-for="type in items.map(i => ({
                title: i.value,
                count: i.count,
                color: actypes[i.value].color,
                image: actypes[i.value].image
              }))" :key="type.title">
            <button @click="select(type)" class="card-type snap-item mx-2" :class="[type.color, {minimized}]">
              <f-image class="pointer-events-none w-full rounded-t-xl object-contain h-32 px-4" :src="type.image"></f-image>
              <div class="px-2">
                <h1 class="text-white text-sm font-medium truncate">{{ type.title }}</h1>
                <p class="text-white text-xs opacity-75">{{ type.count }} <span>resources</span></p>
              </div>
            </button>
          </div>
        </div>
      </ais-refinement-list>
    </div>
  </transition>
</template>

<script>
// import CardType from '~/components/CardType.vue'

export default {
  data() {
    return {
      actypes: {
        "Edification": {
          "color": "bg-primary",
          "image": require("~/assets/imgs/Podium.png")
        },
        "Testimonies": {
          "color": "bg-d4secondary",
          "image": require("~/assets/imgs/PenInk.png")
        },
        "Questions": {
          "color": "bg-pink-500",
          "image": require("~/assets/imgs/QuestionMark.png")
        },
        "Commentary": {
          "color": "bg-green-500",
          "image": require("~/assets/imgs/SpeechBubble.png")
        },
        "Songs": {
          "color": "bg-blue-500",
          "image": require("~/assets/imgs/Songs.png")
        },
        "Podcast": {
          "color": "bg-yellow-500",
          "image": require("~/assets/imgs/Podcast.png")
        },
        "Messages": {
          "color": "bg-d4red",
          "image": require("~/assets/imgs/Microphone.png")
        },
        "Video": {
          "color": "bg-d4green",
          "image": require("~/assets/imgs/Videos.png")
        },
        "Audio Playlists": {
          "color": "bg-primary",
          "image": require("~/assets/imgs/Playlist.png")
        }
      }
    }
  },
  props: {
    value: Object,
    minimized: Boolean,
    types: {
      type: Array
    },
  },
  mounted() {
    console.log(this.actypes)
  },
  // components: {CardType},
  methods: {
    select(type) {
      this.$emit('input', type)
    },
    demoImage() {
      return [
        require('~/assets/imgs/Books.png'),
        require('~/assets/imgs/Folders.png'),
        require('~/assets/imgs/Microphone.png'),
        require('~/assets/imgs/PenInk.png'),
        require('~/assets/imgs/Podium.png'),
        require('~/assets/imgs/QuestionMark.png'),
        require('~/assets/imgs/SpeechBubble.png')
      ][Math.round(Math.random() * 6)]
    },
  }

}
</script>

<style lang="scss">
.card-type {
  @apply h-48 w-32 text-center rounded-xl;
  transition: .4s ease;

  &.minimized {
    @apply h-8 w-auto text-left rounded-lg;

    img {
      display: none;
    }

    >div {
      @apply flex items-center h-full;
      h1 {
        @apply flex-1 text-left;
      }
      p {
        @apply pl-2;
        span {
          display: none;
        }
      }
    }
  }

}
</style>