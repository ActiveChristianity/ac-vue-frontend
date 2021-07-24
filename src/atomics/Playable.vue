<template>
  <button v-if="track || video" @click.prevent.stop="toggle" class="center py-1 px-2 rounded hover:text-slate hover:bg-gray-200 hover:bg-opacity-50"
          :class="isPlaying ? 'bg-gray-200 bg-opacity-50 text-gray-800': 'hover-play'"
          :title="isPlaying ? 'Pause' : 'Play'"
  >
    <icon v-if="isCurrent" :class="iconClass" prefix="fal" :name="isPlaying ? 'pause' : 'play'" fa />
    <icon v-else :class="iconClass" :prefix="iconStyle" :name="icon" fa />
  </button>
  <icon v-else-if="icon" :class="iconClass" :prefix="iconStyle" :name="icon" fa></icon>
</template>

<script>
export default {
  props: {
    track: [Object, Boolean],
    video: [Object, Boolean],
    iconClass: String,
    iconStyle: {
      type: String,
      default: 'fal'
    },
    icon: {
      type: String,
      default: 'play'
    }
  },
  computed: {
    isCurrent () {
      let src = this.track || this.video
      return src
          && this.$store.playing
          && src.url === this.$store.playing.url
    },
    isPlaying () {
      return this.isCurrent && ! this.$store.playing.paused
    }
  },
  methods: {
    toggle () {
      let src = this.track
      if (this.video) {
        src = this.video
        src.isVideo = true
      }
      if (src) {
        if (! this.isCurrent) {
          this.$store.playlist = {
            ...src,
          }
        } else {
          this.$set(this.$store.playing, 'paused', this.isPlaying)
        }
      }
    },
  }
}
</script>

<style lang="scss">
.hover-play:hover {
  transition: .2s all;
  i {
    &:before {
     content: "\f04b" !important;
    }
    &:after {
      content: unset;
    }
    &.fad:after {
      content: '\f04b';
      opacity: 0;
    }
  }
}
</style>