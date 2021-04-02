<template>
  <div class="px-2 md:px-4 mt-4 mb-2 md:content">
    <div class="flex items-center justify-between border-b mx-2">
      <h3 class="text-lg"><slot /></h3>
      <g-link v-if="to" :to="to"
        :title="$t[text]"
        class="text-blue-600 md:whitespace-no-wrap text-sm align-middle py-1 px-2 rounded hover:bg-gray-200"
      >{{ $t[text] }}
        <icon class="ml-2" fa name="fad-chevron-right" />
      </g-link>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    to: String,
    text: { type: String, default: 'show_more' }
  }
}
</script>
