<template>
  <video
    :id="id"
    ref="videoPlayer"
    class="video-js vjs-theme-city"
    preload="auto"
    playsinline
    disableRemotePlayback
    v-scroll="onScroll"
    :muted="isMuted && 'muted'"
    :loop="loop && 'loop'"
    :autoplay="autoplay && 'autoplay'"
    :controls="controls && 'controls'"
    :poster="poster"
  >
    <source v-if="youtube" :src="youtube" type="video/youtube" />
    <source v-if="m3u8" :src="m3u8" type="application/x-mpegURL" />
    <source v-if="mp4" :src="mp4" type="video/mp4" />
    <source v-if="webm" :src="webm" type="video/webm" />
    <p class="vjs-no-js">
      To view this video please enable JavaScript, and consider upgrading to a
      web browser that
      <a href="https://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>
    </p>
  </video>
</template>

<script>
export default {
  props: ['youtube', 'm3u8', 'mp4', 'webm', 'controls', 'poster', 'loop', 'autoplay', 'muted'],
  data() {
    return {
      id: 'vjs-' + Date.now() + Math.ceil(Math.random()*100),
      isMuted: typeof(this.muted) == 'string' || this.muted
    }
  },
  methods: {
    onScroll(event, element) {
      if (this.autoplay) {
        const { top, bottom } = element.getBoundingClientRect()
        if (top <= window.innerHeight && bottom >= 0) {
          if (element.paused) {
            element.play()
          }
        } else {
          element.pause()
        }
      }
    },
    load() {
      if (!this._isDestroyed) {
        if (typeof window.videojs !== 'undefined') {
          const opts = {
            fluid: true,
            controls: !!this.controls,
            loop: !!this.loop,
            autoplay: !!this.autoplay,
            muted: !!this.muted || !!this.autoplay,
            youtube: {
              hl: process.env.GRIDSOME_LOCALE,
              cc_lang_pref: process.env.GRIDSOME_LOCALE,
              cc: 1
            }
          }

          window.videojs(this.$refs.videoPlayer, opts);

        } else setTimeout(() => {
          this.load()
        }, 100)
      }
    }
  },
  watch: {
    muted(mute) {
      this.$refs.videoPlayer.muted = this.isMuted = !!mute
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.onScroll(null, this.$refs.videoPlayer)
    })
  }
}
</script>
