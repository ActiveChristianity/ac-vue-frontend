<template>
  <main class="flex flex-col md:flex-row">
    <div class="md:w-1/4 relative bg-gray-100">
      <div class="md:fixed md:h-screen md:w-1/4 md:inset-y-0 flex flex-col items-stretch justify-center text-gray-800">
        <a key="top" href="#" class="block px-8 py-4 text-lg font-medium text-center hover:text-gray-900">
          {{ title }}
        </a>
        <template v-for="(lbl, hash) in sections">
          <a :key="hash" :href="`#${hash}`" class="block px-8 py-4 text-lg font-medium text-center hover:text-gray-900">
            {{ lbl }}
          </a>
        </template>
      </div>
    </div>
    <div class="flex-1 relative">
      <slot></slot>
    </div>
  </main>
</template>

<script>
export default {
  props: {
    sections: {
      type: Object,
      required: true
    },
    title: String,
  }
}
</script>