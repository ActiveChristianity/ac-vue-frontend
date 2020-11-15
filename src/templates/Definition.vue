<template>
  <main class="fixed bg-white z-20 inset-0 md:content md:relative">
    <div class="fade-in content-lg h-full overflow-y-auto pt-12 pb-24">
      <h1 class="font-medium leading-tight my-6 text-3xl text-center text-blue-900 md:text-4xl">{{ $context.word }}</h1>
      <div class="post_content py-8 content-md" v-html="$context.content"></div>
      <button @click="$router.back()" class="block mx-auto text-blue-600 my-4 py-1 px-2 rounded hover:bg-gray-200"><icon fa name="fad-chevron-left" class="mr-2"/> Return</button>
    </div>
  </main>
</template>

<script>
export default {
  metaInfo() {
    return {
      title: this.$context.word
    }
  }
}
</script>
