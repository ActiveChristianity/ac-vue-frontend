<template>
  <div class="my-8">
    <heading to="/topics" text="all_topics">Featured Topics</heading>
    <div class="content flex flex-wrap px-4">
      <template v-for="topic in topics">
        <div class="h-32 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 p-2">
          <g-link :to="`${$t.slug_topic}/${topic.slug}`"
                  class="w-full h-full rounded-lg overflow-hidden flex items-center justify-center relative hover:shadow-outline p-2">
            <f-image :src="topic.image" class="absolute w-full h-full object-center object-cover" />
            <div class="absolute inset-0 bg-black opacity-50"></div>
            <h6 class="text-white leading-tight text-sm font-bold content-end break-words z-10 text-center">
              {{ topic.name }}
            </h6>
          </g-link>
        </div>
      </template>
    </div>
  </div>
</template>

<static-query>
query FeaturedTopics {
  ql {
    topics(featured: true, hasPosts: true) {
      id
      name
      slug
      noOfPosts
      image {
        src alt dataUri size { width height } focal
      }
    }
  }
}
</static-query>

<script>
import Heading from "../components/Heading";
export default  {
  components: { Heading },
  computed: {
    topics () {
      return this.$static.ql.topics.filter(({noOfPosts}) => noOfPosts > 2)
    }
  }
}
</script>