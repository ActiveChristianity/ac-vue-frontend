<template>
  <div :id="id"></div>
</template>

<script>
export default {
  props: ['autoplay', 'floating', 'dismissible'],
  data() {
    return {
      id: 'jwp-' + Date.now() + Math.ceil(Math.random()*100)
    }
  },
  methods: {
    load() {
      if (!this._isDestroyed) {
        if (typeof window.jwplayer !== 'undefined') {
          const opts = {
            'file': 'https://pseudo-streaming-test.cdnsun.com/blenders-big-buck-bunny.mp4',
            'width': 480,
            'height': 320
          }

          if (this.autostart) {
            opts.floating = { autostart: 'viewable'}
          }

          if (this.float) {
            opts.floating = { dismissible: !!this.dismissible}
          }

          jwplayer(this.id).setup(opts);
        } else setTimeout(() => {
          this.load()
        }, 100)
      }
    }
  },
  mounted() {
    if (!process.isClient) return
    if (!window.document.getElementById('jwplayer-script')) {
      const scriptTag = window.document.createElement("script")
      scriptTag.src = "https://cdn.jwplayer.com/libraries/z1ln3udB.js"
      scriptTag.id = "jwplayer-script"
      window.document.head.appendChild(scriptTag)

      window.jwplayer.key="???";

      /* Plugins */
      const plugins = []
      plugins.forEach(src => {
        let pluginTag = window.document.createElement("script")
        pluginTag.src = src
        window.document.head.appendChild(pluginTag)
      })
    }

    setTimeout(() => {
      this.load()
    }, 50)
  }
}
</script>
