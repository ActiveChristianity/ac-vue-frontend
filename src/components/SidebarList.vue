<template>
  <div class="bg-gradient-to-b from-gray-300 to-white rounded-2xl">
    <h3 class="text-xl font-light p-4">{{ title }}</h3>

    <div class="flex-1 flex flex-col">
      <template v-for="post in posts">
        <g-link :to="post.slug" :key="post.id" class="flex items-start p-4 rounded-2xl transition-shadow duration-300 hover:shadow-outline">
          <div class="bg-white text-gray-600 rounded-full flex-none w-10 h-10 center">
            <icon class="text-xl text-center" fa :name="`fal-${$typeIcon(post.type)}`" />
          </div>
          <div class="pl-4">
            <h4 class="text-gray-800 text-lg leading-tight tracking-wide">{{ post.title }}</h4>
            <p class="text-gray-600 text-sm mt-2">
              <span aria-label="time2read"><i class="mr-1 fal fa-file-alt"></i> {{ Math.ceil(post.readtime / 60) }} mins</span>
              <span aria-label="views" class="ml-2"><i class="mr-1 fal fa-eye"></i> {{ post.views}}</span>
            </p>
          </div>
        </g-link>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    posts: Array,
  }
}
</script>