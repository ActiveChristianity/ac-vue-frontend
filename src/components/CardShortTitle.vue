<template>
  <g-link :href="path" class="sm:flex card w-auto select-none block rounded-lg sm:rounded-none shadow msm:hover:shadow-md sm:shadow-none flex-shrink-0 max-w-lg w-32 bg-white sm:bg-transparent msm:text-gray-600 sm:text-d4slate-dark">
    <f-image class="sm:hidden custom-rounded w-full object-cover h-32 rounded-b-none" :src="image" width="84" height="112"></f-image>
    <p class="msm:hidden text-4xl font-semibold text-gray-400 leading-none mr-6">0{{number}}</p>
    <div>
      <div class="msm:p-4">
        <h5 class="font-bold leading-none text-d4slate-dark">{{ title }}</h5>
        <p class="sm:hidden font-medium text-gray-600-dark block-with-text lines-2">{{excerpt.slice(0,100)}}...</p>
        <div class="sm:hidden flex justify-between ">
          <p class="text-sm pt-1 text-gray-600-dark">{{readTime > 60 ? '60' : readTime }} min read ・ {{author}}</p>
        </div>
      </div>
      <div class="msm:hidden">
        <p>{{ author }} in {{ topic }}</p>
        <p class="text-gray-600-dark">{{ date }} • {{readTime > 60 ? '60' : readTime }} min read</p>
      </div>
    </div>
  </g-link>
</template>

<script>
export default {
    name: 'CardShortTitle',
    props: {
      number: Number,
      title: {
        type: String,
        required: true
      },
      // faker.lorem.paragraph
      excerpt: String,
      //
      date: {
        type: String,
        default: "Mar 24, 2019"
      },
      topic: {
        type: String,
        default: "Bible"
      },
      // Image
      image: [Object, String],
      readTime: Number,
      author: {
        type: String,
        required: true
      },
      path: {
        type: String,
        required: true
      }
    }
}
</script>

<style lang="scss">
.custom-rounded {
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
}
</style>