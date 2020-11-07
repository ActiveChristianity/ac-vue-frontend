<template>
  <g-link :href="path" class="card-widget block rounded msm:shadow msm:hover:shadow-md msm:p-4 max-w-lg msm:bg-white text-d4slate-dark">
    <span class="flex justify-between items-center border-b border-solid border-gray-400 pb-1 sm:hidden">
      <h4 class="text-base font-semibold capitalize">{{topic}}</h4>
      <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 6H15M15 6L10 1M15 6L10 11" stroke="#384156" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </span>
    <span class="flex pt-3 sm:pt-0 pb-3">
      <span class="flex flex-col justify-between pr-1">
        <h5 class="text-base font-bold capitalize sm:text-d4slate-dark sm:mb-1">{{title}}</h5>
        <p class="msm:hidden mb-1">{{ topic }}</p>
        <p class="text-sm pt-1 text-gray-600"><span class="sm:hidden">{{ date }} ・ </span>{{readTime > 60 ? '60' : readTime }} min read<span class="hidden sm:inline">・ {{author}}</span></p>
      </span>
      <span class="flex-auto w-1/5 pl-1 flex justify-end sm:hidden" v-if="image">
        <f-image class="pointer-events-none h-16 w-16 rounded object-cover" :src="image" width="64" height="64"></f-image>
      </span>
    </span>
  </g-link>
</template>

<script>
export default {
  name: 'WidgetCard',
  props: {
    author: {
      type: String,
      required: true
    },
    topic: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    // faker.lorem.paragraph
    excerpt: String,
    path: {
      type: String,
      required: true
    },
    // Image
    image: {
      type: [Object, String],
      required: true
    },
    readTime: Number,
    date: {
      type: String,
      default: "Feb 14, 2018"
    }
  }
}
</script>