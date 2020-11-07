<template>
  <main class="w-full p-d6 max-w-br">
    <div class="flex pb-6">
      <button class="mx-6 hover:text-gray-900" :class="theTopic == null ? 'border-b font-medium border-primary text-primary' : 'text-gray-600'" @click="theTopic = null">{{ $store.locale == 'en' ? 'All' : 'Alle' }}</button>
      <template v-for="T in topics">
        <button class="mx-6 hover:text-gray-900" :class="theTopic == T ? 'border-b font-medium border-primary text-primary' : 'text-gray-600'" :key="T.slug" @click="theTopic = T">{{ T.name }}</button>
      </template>
    </div>
    <div class="flex flex-wrap items-stretch w-full overflow-x-auto d4snap-column pb-d6">
      <template v-for="(p, i) in filteredPosts">
        <div :key="p.id" class="p-6 w-full md:w-1/2 lg:w-1/3 hd:w-1/4">
          <Card v-bind="p" :lightTheme="!dark"
            class="shadow-xl h-full border border-white rounded" />
        </div>
      </template>
    </div>
  </main>
</template>

<static-query>
query {
  ql {
    topics(group_id: 2) {
      name
      slug
      posts {
        id
        image { src srcset dataUri sizes size { width height } }
        title
        excerpt
        date: published
        path: slug
      }
    }
  }
}
</static-query>

<script>
import Card from '~/components/Card.vue'
export default {
  components: {
    Card
  },
  props: [ 'dark' ],
  data() {
    return {
      theTopic: null
    }
  },
  computed: {
    topics() {
      return this.$static.ql.topics.filter(T => T.posts && T.posts.length)
    },
    allPosts() {
      const posts = {}
      this.$static.ql.topics.forEach(t => {
        t.posts.forEach(p => posts[p.id] = p)
      })
      return Object.values(posts)
    },
    filteredPosts() {
      let posts;
      if (this.theTopic && this.theTopic.posts) {
        posts = this.theTopic.posts
      } else posts = this.allPosts

      posts.sort((a,b) => a.date > b.date ? -1 : 1)
      return posts
    }
  }
}
export const def = (V) => ({
  name: 'Blog',
  label: 'Blogg Artikler',
  props: [{
    key: 'dark',
    label: 'Dark Cards',
    type: 'checkbox'
  }]
})
</script>