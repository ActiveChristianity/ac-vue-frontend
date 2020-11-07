<template>
  <g-link :to="path" class="relative overflow-hidden hover:shadow-md h-120 rounded-xl flex flex-col justify-end">
    <img
      class="absolute h-full w-full top-0 left-0 object-cover object-center"
      :style="style" height="800" width="600"
      :src="(image && typeof image === 'object' ? image.src : image)"/>
    <div class="bg-grad-dark relative z-10 rounded-xl p-6">
      <div v-if="type !== 'post'"
        :class="type === 'ebook' ? 'items-end' : 'items-center'"
        class="m-auto relative h-48 mb-8 relative bg-cover flex flex-row justify-center rounded-lg">
        <div class="relative z-10 w-1/2">
          <f-image class="w-full" :src="image" />
          <div v-if="type === 'ebook'" class="book-bg absolute left-0 top-0 w-1 h-full rounded-tl-lg rounded-bl-lg"></div>
          <div v-if="type === 'ebook'" class="book-bg-right absolute left-0 top-0 ml-1 w-2 h-full"></div>
        </div>
        <div v-if="type === 'ebook'" class="absolute bottom-0 inset-x-0 -mb-4">
          <Icon name="shelf" style="display: block" class="mx-auto w-2/3" />
        </div>
      </div>
      <div class="z-10 text-white">
        <h1 class="text-2xl font-bold mb-2">{{ title }}</h1>
        <h2 class="font-bold border-b border-gray-600 pb-4 mb-2">{{ subtitle }}</h2>
        <div class="flex justify-between">
          <p>{{ author }}</p>
          <div class="flex">
            <Icon name="eye" class="w-4 mr-2" />
            <p class="mr-4">{{ views }}</p>
            <Icon name="heart" class="w-4 mr-2" />
            <p>{{ likes }}</p>
          </div>
        </div>
      </div>
    </div>
  </g-link>
</template>

<script>
export default {
  props: {
    type: String,
    image: [Object, String],
    title: String,
    path: String,
    subtitle: String,
    author: String,
    views: Number,
    likes: Number,
    liked: Boolean
  },
  computed: {
    style() {
      switch(this.type) {
        case 'podcast':
        case 'ebook': return "filter: blur(3px); transform: scale(3); transform-origin: center"

        default : return ""
      }
    }
  }
}
</script>

<style lang="scss">
.bg-grad-dark {
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.72) 100%);
}
.book-bg {
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.64) 29.17%, rgba(255, 255, 255, 0) 100%);
}
.book-bg-right {
  background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.56) 50%, rgba(255, 255, 255, 0) 100%);
}
</style>>