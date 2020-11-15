<template>
  <div v-if="show" class="fixed z-50 top-0 md:top-auto md:bottom-0 inset-x-0 px-4 p-2 flex items-center justify-between bg-black text-white">
    <div class="pr-4">
      <p class="font-sans text-base inline-block">{{ $static.m.cookie }}
        <g-link :to="$static.m.cookie_page_path" class="inline-block text-sm font-bold hover:underline">{{ $t.consent_general_link }}</g-link>
      </p>
    </div>
    <div class="center flex-col md:flex-row text-sm">
      <button @click="decline" class="bg-gray-200 text-black font-semibold my-2 mx-4 px-4 py-2 uppercase">{{ $t.decline || 'Decline' }}</button>
      <button @click="accept" class="bg-secondary text-secondary-alt font-semibold my-2 mx-4 px-4 py-2 uppercase">{{ $t.accept || 'Accept' }}</button>
    </div>
  </div>
</template>

<static-query>
query CookieInfo {
  m: metadata {
    cookie
    cookie_page_path
  }
}
</static-query>

<script>
export default {
  data() {
    return {
      show: false
    }
  },
  methods: {
    accept () {
      try {
        window.localStorage.setItem('cookie', 'accepted')
        window.localStorage.setItem('cookie_accepted', Date.now())
        this.accepted()
      } catch (e) {}
      this.show = false
    },
    decline () {
      try {
        window.localStorage.setItem('cookie', 'declined')
        this.rejected()
      } catch (e) {}
      this.show = false
    },
    accepted () {
      if (! window.document.getElementById('reftagger-script')) {
        window.refTagger = {
          settings: {
            bibleVersion: "NKJV",
            dropShadow: false,
            roundCorners: true,
            socialSharing: ["twitter","facebook"],
          }
        };
        const scriptTag = window.document.createElement("script")
        scriptTag.async = true
        scriptTag.src = "https://api.reftagger.com/v2/RefTagger.js"
        scriptTag.id = "reftagger-script"
        scriptTag.onload = () => {
          setTimeout(() => {
            window.refTagger.tag && window.refTagger.tag();
          }, 500)
        }
        window.document.head.appendChild(scriptTag)
      }
      this.$gtm.enable(true)
    },
    rejected () {
      this.$gtm.enable(false)
    },
  },
  mounted() {
    if (process.isClient) {
      let show = true
      try {
        if (window.localStorage.getItem('cookie') == 'accepted') {
          show = false
          this.accepted()
        }
      } catch (e) {}
      this.show = show
    }
  }
}
</script>