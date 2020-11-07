<template>
    <div class="flex justify-between items-center max-w-lg bg-d4athens border rounded-lg content-center">
      <p class="m-2 font-semibold text-gray-600-dark text-xs">Follow <span class="text-d4slate-dark capitalize">{{ title }}</span> for more resources like this</p>
      <button @click="following = !following" class="m-2 ml-12 py-1 px-2 rounded-lg font-semibold text-gray-600-dark text-xs border border-gray-600">{{following ? 'follow' : 'following'}}</button>
    </div>
</template>

<script>
export default {
  name: 'CardFollow',
  data() {
    return {
      following: Boolean
    }
  },
  props: {
    title: {
      type: String,
      required: true,
    }
  }
}
</script>