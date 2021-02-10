<template>
  <main class="fixed bg-blue-900 z-30 inset-0">
    <div class="flex flex-col h-full md:content">
      <div class="center fade-in font-medium leading-tight py-12 text-center text-white text-3xl md:text-4xl">
        <button @click="$router.back()" class="text-xl -ml-12 mr-2 rounded-full w-8 h-8 hover:text-gray-400"><icon fa name="fad-chevron-left" /></button>
        <h1>{{ $context.word }}</h1>
      </div>
      <div class="flex-1 overflow-hidden flex items-stretch rounded-t-3xl bg-white">
        <div class="content-lg h-full max-h-full overflow-y-auto pt-4 pb-32">
          <div class="post_content py-4" v-html="$context.content"></div>
          <button @click="$router.back()" class="block mx-auto text-blue-600 my-4 py-1 px-2 rounded hover:bg-gray-200"><icon fa name="fad-chevron-left" class="mr-2"/> Return</button>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  metaInfo() {
    return {
      title: this.$context.word + ' - ' + this.$t.site_title
    }
  }
}
</script>
