<template functional>
  <div class="w-full py-d6" :class="{'bg-gray-900': props.isDark}">
    <div class="w-full max-w-br mx-auto" :class="{'border-b border-gray-600': !props.noBorder}"></div>
  </div>
</template>

<script>
export default {
  name: 'Divider',
  props: {
    isDark: Boolean,
    noBorder: Boolean
  }
}
</script>