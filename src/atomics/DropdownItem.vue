<template>
  <g-link v-if="to" :to="to" :class="itemClass"><slot/></g-link>
  <a v-else-if="href" rel="nofollow" :href="href" :class="itemClass"><slot/></a>
  <li v-else :class="itemClass"><slot/></li>
</template>

<script>
export default {
  name: "DropdownItem",
  props: {
    to: String,
    href: String,
  },
  data () {
    return {
      itemClass: 'block px-4 py-2 text-sm text-gray-800 border-b hover:bg-gray-200'
    }
  }
}
</script>

<style scoped>

</style>
