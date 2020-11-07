
<template>
  <ALink v-if="url" :path="url" :class="{alt}"
    class="btn d4icon_link flex p-4 px-5 justify-between items-center">
    <p v-if="label" class="xsmall tracking-widest font-serif uppercase mr-4">{{ label }}</p>
    <i class="icon stroke-2 text-2xl" :class="icon ? icon : 'fal fa-arrow-right'"/>
  </ALink>
  <span v-else :class="{alt}"
    class="btn d4icon_link flex p-4 px-5 justify-between items-center">
    <p v-if="label" class="xsmall tracking-widest font-serif uppercase mr-4">{{ label }}</p>
    <i class="icon stroke-2 text-2xl" :class="icon ? icon : 'fal fa-arrow-right'"/>
  </span>
</template>

<script>
export default {
  props: {
    icon: String,
    label: String,
    url: String,
    alt: Boolean
  }
}
</script>

<style lang="scss">
.d4icon_link {
  transition: .2s color ease, .2s background ease;
  .icon {
    transition: transform .2s ease-in-out;
  }
  &:hover {
    .icon {
      transform: translateX(5px)
    }
  }
}
</style>