<template>
  <div class="fixed z-20 mb-16 md:mb-0 bottom-0 inset-x-0">
    <div class="w-full flex flex-col bg-gray-300 py-4">
      <div class="content-md md:py-4 relative">
        <vue-plyr ref="plyr" class="rounded-2xl shadow-xl border-4 border-black overflow-hidden">
          <audio src="/ping.mp3"></audio>
        </vue-plyr>
        <p v-if="$store.playing" class="mt-1 text-center pb-1">{{ $store.playing.title }}</p>
        <button class="absolute top-0 md:bottom-0 right-0 mmd:-mt-4 md:-mr-4 px-1" @click="close"><icon name="fad-times" fa/></button>
      </div>
    </div>
  </div>
</template>

<script>
import VuePlyr from 'vue-plyr/dist/vue-plyr.ssr'
import 'plyr/dist/plyr.css'

export default {
  data () {
    return {
      current: null
    }
  },
  components: {
    VuePlyr
  },
  computed: {
      player () {
        return this.$refs.plyr && this.$refs.plyr.player
      },
      playlist () {
        return this.$store.playlist
      },
      playing: {
        get () {
          return this.$store.playing
        },
        set (val) {
          this.$store.playing = val
        }
      },
      paused () {
        return this.playing && this.playing.paused
      },
  },
  methods: {
    close () {
      if (this.player) {
        this.player.stop()
      }
      this.$store.playing = null
      this.$store.playlist = null
    }
  },
  watch: {
    playlist: {
      immediate: true,
      deep: true,
      handler (pl) {
        this.$nextTick(() => {
          if (! this.current || this.current.url !== pl.url) {
            this.playing = pl
            let source = {
              src: pl.url
            }
            if (pl.isVideo) {
              // Youtube check
              if (pl.url.match(/youtu(\.?)be/gi)) {
                source.provider = 'youtube'
              }

              this.player.source = {
                type: 'video',
                title: pl.title,
                sources: [ source ],
                poster: pl.poster,
              }

              setTimeout(() => {
                this.player.play()
              }, 1000)
            } else {
              this.player.source = {
                type: 'audio',
                title: pl.title,
                sources: [ source ],
              }

              setTimeout(() => {
                this.player.play()
              }, 100)
            }
          }

          if (pl.pause) {
            this.player.pause()
          } else if (this.player.paused) {
            this.player.play()
          }

          this.$store.playing = {
            ...pl,
            player: this.player
          }
        })
      }
    },
    paused (pause) {
      if (pause) {
        this.player.pause()
      } else {
        this.player.play()
      }
    },
  }
}

</script>
