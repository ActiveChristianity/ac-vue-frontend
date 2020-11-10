<template>
  <div class="items-center justify-center py-8 hidden md:flex">
    <g-link :to="to" class="text-blue-600 text-sm align-middle py-1 px-2 rounded hover:bg-gray-200">
      <slot></slot>
      <icon class="ml-2" fa name="fad-chevron-right" />
    </g-link>
  </div>
</template>

<script>
export default {
  props: {
    to: String
  }
}
</script>