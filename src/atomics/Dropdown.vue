<template>
  <div class="relative">
    <slot name="toggle" :open="open" :toggle="toggle">
      <button @click="toggle" class="relative z-20 block tracking-wide rounded my-1 py-1 px-2 hover:bg-gray-200 hover:text-gray-600">
        {{ label }} ▽
      </button>
    </slot>

    <div v-show="open" @click="open = false" class="fixed inset-0 h-full w-full z-20"></div>

    <div v-show="open" class="absolute right-0 mt-2 w-48 bg-white rounded-md overflow-hidden shadow-xl z-30">
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  name: "Dropdown",
  props: {
    label: String,
  },
  data () {
    return {
      open: false
    }
  },
  methods: {
    toggle () {
      this.open = ! this.open
    }
  }
}
</script>
