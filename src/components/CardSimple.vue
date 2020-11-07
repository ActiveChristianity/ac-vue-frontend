<template>
  <g-link :to="to" class="msm:p-1 msm:w-36 msm:h-20 flex-shrink-0 msm:mr-4 snap-item">
    <div class="bg-primary sm:bg-white w-full h-full msm:rounded-lg p-2 flex items-end">
      <h1 class="text-white sm:text-primary leading-tight text-lg font-bold content-end">{{ title }}</h1>
    </div>
  </g-link>
</template>

<script>
export default {
  name: 'CardSimple',
  props: {
    // faker.lorem.title
    title: {
      type: String,
      required: true
    },
    to: {
      type: String,
      required: true
    }
  }
}
</script>

