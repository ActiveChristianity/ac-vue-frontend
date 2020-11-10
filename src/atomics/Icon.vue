<template>
  <component v-bind:is="icon" class="d4-icon" :class="{fa}"></component>
</template>

<script>
const icons = {}
export default {
  props: {
    prefix: String,
    name: {
      type: String,
      required: true
    },
    fa: Boolean,
  },
  computed: {
    icon() {
      const name = this.prefix ? `${this.prefix}-${this.name}` : this.name
      return () => import(/* webpackChunkName: "icons" */ `~/assets/icons/${name}.svg`)
    }
  }
}
</script>

<style lang="scss">
  svg.d4-icon {
    transition: .4s color;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;

    &.fa {
      width: 1em;
      height: 1em;
      color: inherit;
      display: inline-block;
    }
  }
</style>


