<template>
  <div
    class="pull-down relative"
    v-touch:swipe.up="swipeUp"
    v-touch:start="swipeStart"
    v-touch:moving="swipeMove"
    v-touch:end="swipeEnd"
    :style="{transform: `translateY(${swiping}px)`}">
    <slot/>
  </div>
</template>

<script>
let Y = 0
export default {
  props: {
    height: {
      type: Number,
      default: 80
    }
  },
  data() {
    return {
      swiping: false,
    }
  },
  methods: {
    swipeUp(e) {
      if (!Y && window.scrollY > 10) this.resetSwipe()
    },
    swipeStart(e) {
      if (window.scrollY < 10) {
        this.swiping = this.swiping || 0
        Y = e.touches[0].screenY
      }
    },
    swipeMove(e) {
      if (Y) {
        Y = e.touches[0].screenY - Y
        this.swiping += Y 
        Y = e.touches[0].screenY
        if (this.swiping < 0) this.swiping = 0
        else if (this.swiping > this.height) this.swiping = this.height

        this.$emit('onReveal', this.swiping > this.height/2)
      }
    },    
    swipeEnd(e) {
      if (this.swiping < this.height/2) {
        this.resetSwipe()
      } else this.completeSwipe()
    },
    completeSwipe() {
      this.swiping += 1
      if (this.swiping < this.height) {
        window.requestAnimationFrame(() => this.completeSwipe());
      } else {
        this.swiping = this.height
        this.$emit('onReveal', true)
        Y = 0
      }
    },
    resetSwipe() {
      this.swiping -= 1
      if (this.swiping > 0) {
        window.requestAnimationFrame(() => this.resetSwipe());
      } else {
        this.swiping = 0
        this.$emit('onReveal', false)
        Y = 0
      }
    }
  }
}
</script>

<style lang="scss">
.pull-down {
  transition: transform .1s linear;
}
</style>