<template functional>
  <g-image :src="props.src" :class="[data.staticClass, typeof props.src === 'object' ? props.src.objectPosition : null]" />
</template>

<script>
export default {
  props: {
    src: {
      validator: function (value) {
        if (typeof value === 'object') {
          if (! value.srcset) {
            value.srcset = value.src + ' 600w'
          }
          if (! value.sizes) {
            value.sizes = '600vw'
          }
          value.objectPosition = value.focal ? `object-${value.focal}` : 'object-center'
        }

        return !! value
      }
    }
  },
}
</script>

