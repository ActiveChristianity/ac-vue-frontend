<template>
<div class="flex w-full p-4">
  <div @click="$emit('collapse'), $refs.searchInput.focus()" class="flex flex-auto bg-white rounded-lg items-center px-2" :class="isSmall ? 'h-8' : 'h-12'">
    <Icon name="search" class="w-4"/>
    <button v-if="byType" class="rounded p-1 text-xs ml-2 text-white truncate" :class="byType.color ?  byType.color : 'bg-gray-500'" @click="$emit('clearFilter')">✗ {{ byType.title }}</button>

    <input class="pl-2 w-1/2 flex-grow" ref="searchInput" :value="value" @input="onInput" @change="onInput" type="text" placeholder="Search">

    <button @click="$emit('input', '')" >
      <Icon v-if="value != ''" name="cross" />
    </button>
  </div>
  <button @click="$emit('cancelSearch')" class="pl-2 block text-sm" v-if="isSmall" >Cancel</button>
  <button @click="$emit('onActionToggle')" class="ml-2 bg-white rounded-lg flex-shrink-0 " :class="isSmall ? 'h-8 w-8' : 'w-12 h-12'">
    <Icon name="bible-small" class="w-6" />
  </button>
</div>
</template>

<script>
export default {
  data() {
    return {
      placeholderText: ''
    }
  },
  props: {
    value: String,
    isSmall: Boolean,
    byType: Object
  },
  methods: {
    onInput(e) {
      if (e.target.value !== this.value)
        this.$emit('input', e.target.value)
    }
  },
  watch: {
    byType(t) {
      if (t) this.$emit('collapse')
    }
  }
}
</script>