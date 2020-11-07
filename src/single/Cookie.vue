<template>
  <div v-if="show" class="fixed z-50 bottom-0 inset-x-0 px-4 p-2 flex items-center justify-between bg-black text-white">
    <div class="pr-4">
      <p class="font-sans text-base">{{ $static.m.cookie }}</p>
      <g-link to="/cookies" class="text-sm font-bold">{{ $t.more_cookies }}</g-link>
    </div>
    <div class="flex items-center">
      <button @click="decline" class="bg-gray-400 text-black m-1 px-3 py-2 text-sm uppercase">{{ $t.decline || 'Decline' }}</button>
      <button @click="accept" class="bg-white text-black m-1 px-6 py-2 text-base uppercase">{{ $t.accept || 'Accept' }}</button>
    </div>
  </div>
</template>

<static-query>
query CookieInfo {
  m: metadata {
    cookie
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