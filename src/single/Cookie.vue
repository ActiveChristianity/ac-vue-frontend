<template>
  <div v-if="show" class="fixed z-50 top-0 md:top-auto md:bottom-0 inset-x-0 px-4 p-2 flex items-center justify-between bg-black text-white">
    <div class="pr-4">
      <p class="font-sans text-base inline-block">{{ $static.m.cookie }}
        <g-link :to="$static.m.cookie_page_path" class="inline-block text-sm font-bold">{{ $t.consent_general_link }}</g-link>
      </p>
    </div>
    <div class="center flex-col md:flex-row text-sm">
      <button @click="decline" class="bg-white text-black m-1 px-2 py-1 uppercase">{{ $t.decline || 'Decline' }}</button>
      <button @click="accept" class="bg-secondary text-secondary-alt m-1 px-4 py-1 uppercase">{{ $t.accept || 'Accept' }}</button>
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
    accept() {
      try {
        window.localStorage.setItem('cookie', 'accepted')
        window.localStorage.setItem('cookie_accepted', Date.now())
        this.$gtm.enable(true)
      } catch (e) {}
      this.show = false
    },
    decline() {
      try {
        window.localStorage.setItem('cookie', 'declined')
        this.$gtm.enable(false)
      } catch (e) {}
      this.show = false
    }
  },
  mounted() {
    if (process.isClient) {
      let show = true
      try {
        if (window.localStorage.getItem('cookie') == 'accepted') {
          show = false
          this.$gtm.enable(true)
        }
      } catch (e) {}
      this.show = show
    }
  }
}
</script>