<template>
  <div v-if="!$store.loggedIn" class="fixed inset-0 bg-white z-50 flex items-center justify-center">
    <Auth />
  </div>
  <div v-else>
    <slot></slot>
  </div>
</template>

<script>
import Auth from '~/single/Authenticate'
export default {
  components: { Auth }
}
</script>