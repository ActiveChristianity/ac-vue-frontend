<template>
  <svg class="d4-icon" :class="{fa}">
    <use :xlink:href="`#${icon}`" />
  </svg>
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
      return this.prefix ? `${this.prefix}-${this.name}` : this.name
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
      width: 1.25em;
      height: 1.25em;
      color: inherit;
      display: inline-block;
      vertical-align: text-top;
    }
  }
</style>