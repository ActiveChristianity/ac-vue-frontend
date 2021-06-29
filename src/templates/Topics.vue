<template>
  <main class="content py-12 md:py-24">
    <div class="fade-in">
      <h1 class="text-3xl text-blue-900 md:text-4xl font-medium leading-tight mb-8">{{ $t.topics }}</h1>
    </div>

    <div class="my-8 flex flex-wrap">
      <template v-for="group in groups">
        <template v-for="topic in group.topics">
          <div v-if="topic.image" :key="topic.id" class="h-32 w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2">
            <g-link :to="`/${$t.slug_topic}/${topic.slug}`"
                    class="avoid-inside w-full h-full rounded-lg overflow-hidden flex items-center justify-center relative hover:shadow-outline p-2">
              <f-image :src="topic.image" class="absolute w-full h-full object-center object-cover" />
              <div class="absolute inset-0 bg-black opacity-50"></div>
              <h6 class="text-white leading-tight text-sm font-bold content-end break-words z-10 text-center">
                {{ topic.name }}
              </h6>
            </g-link>
          </div>
        </template>
      </template>
    </div>

    <div class="column-layout">
      <template v-for="group in groups">
        <div :key="group.id" class="pb-2 mb-2 border-b border-gray-200">
          <h3 class="avoid-after font-medium text-secondary text-xl p-2 uppercase">{{ group.name }}</h3>
          <template v-for="topic in group.topics">
            <g-link :key="topic.id" :to="`/${$t.slug_topic}/${topic.slug}`" class="block my-1 p-2 rounded hover:bg-gray-200">
              {{ topic.name }} <span class="mr-2 text-sm rounded bg-gray-100 text-gray-600 px-1">{{ topic.noOfPosts }}</span>
            </g-link>
          </template>
        </div>
      </template>
    </div>
  </main>
</template>

<page-query>
query Topics {
  ql {
    topicGroups(abstract: false) {
      id
      name
      topics (hasPosts: true) {
        id
        name
        slug
        noOfPosts
        image { src size { width height } dataUri focal }
      }
    }
  }
}
</page-query>

<script>
export default {
  metaInfo() {
    return {
      title: this.$t.topics + ' - ' + this.$t.site_title
    }
  },
  computed: {
    groups () {
      const groups = this.$page.ql.topicGroups.filter(g => g.topics.length)
      groups.sort((a, b) => a.name > b.name ? 1 : -1)
      groups.forEach(g => g.topics.sort((a, b) => a.name > b.name ? 1 : -1))
      return groups.filter(g => g.topics.length)
    }
  }
}
</script>
