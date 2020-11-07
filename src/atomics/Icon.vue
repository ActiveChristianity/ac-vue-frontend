<template>
  <component v-bind:is="icon" class="d4-icon"></component>
</template>

<script>
const icons = {}
export default {
  name: 'Icon',
  props: {
    name: {
      type: String,
      required: true
    }
  },
  computed: {
    icon() {
      return () => import(/* webpackChunkName: "icons" */ `~/assets/icons/${this.name}.svg`)
    }
  }
}
</script>

<style lang="scss">
  svg.d4-icon {
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    display: inline-block;
    font-style: normal;
    font-variant: normal;
    text-rendering: auto;
    line-height: 1;
    vertical-align: middle;
    transition: .4s color;
    width: 1em;
    height: 1em;
  }
</style>


