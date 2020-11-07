<template>
  <span v-if="!path"><slot></slot></span>
  <a v-else-if="path.indexOf('http') === 0" :href="path" target="_blank" rel="noopener"><slot></slot></a>
  <g-link v-else :to="path"><slot></slot></g-link>
</template>

<script>
export default {
  props: ['path']
}
</script>