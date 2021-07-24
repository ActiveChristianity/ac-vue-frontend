<template>
  <div class="fixed z-20 mb-16 md:mb-0 bottom-0 inset-x-0">
    <div class="w-full flex flex-col bg-gray-300 py-4">
      <div class="content-md pb-4 md:pt-4 relative">
        <div class="mx-auto text-center">
          <p v-if="$store.playing" style="text-overflow: ellipsis" class="rounded-xl whitespace-no-wrap overflow-x-hidden max-w-xs inline-block pb-1 px-4 border-2 border-slate-dark bg-gray-300 shadow-2xl">{{ $store.playing.title }}</p>
        </div>
        <vue-plyr ref="plyr" class="rounded-2xl shadow-xl border-2 border-slate-dark -mt-4">
          <audio src="/ping.mp3"></audio>
        </vue-plyr>
        <button class="absolute top-0 right-0 md:mt-4 mr-2 p-1 border-2 border-slate-dark rounded-full bg-gray-300 shadow-2xl" @click="close"><icon name="fad-times" fa/></button>
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
  mounted () {
    this.$nextTick(() => {
      if (this.player) {
        this.player.on('pause', () => {
          this.$set(this.$store.playing, 'paused', true)
        })
        this.player.on('play', () => {
          this.$set(this.$store.playing, 'paused', false)
        })
      }
    })

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