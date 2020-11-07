<template>
  <div class="relative flex-1 max-w-sm" v-if="! loading">
    <input class="w-full px-3 py-1 rounded shadow-md" type="text"
           v-model="searchTerm"
           @keydown.enter="enter"
           @keydown.down="down"
           @keydown.up="up"
           @keydown.esc="close"
           ref="input"
           placeholder="Search"
    />
    <ul class="absolute max-h-screen overflow-y-auto bg-white rounded shadow z-50 border-t-2 border-secondary" v-if="searchResults && searchResults.length" style="width:100%">
      <li v-for="(result, i) in searchResults"
          @click="close"
          class="block"
          :class="{'bg-gray-200 text-secondary': active === i}"
          @mouseover="active = i"
      >
        <g-link
            :key="result.id"
            :to="result.node.slug"
            class="p-2 w-full flex items-center">
          <div class="rounded-full bg-gray-100 center w-8 h-8 mr-2">
            <i class="fal" :class="$typeIcon(result.node.type, false, !! result.node.track)"/>
          </div>
          <span>{{ result.title }}</span>
        </g-link>
      </li>
    </ul>
  </div>
  <div v-else class="flex-1 max-w-sm bg-gray-200 text-gray-600 py-1 text-center rounded">Loading...</div>
</template>

<script>
import FlexSearch from 'flexsearch'

export default {
  data: () => ({
    loading: true,
    searchTerm: '',
    open: false,
    active: 0,
  }),
  $search: null,
  computed: {
    searchResults () {
      const searchTerm = this.searchTerm
      if (searchTerm.length < 3) return []
      return this.$search.search({ query: searchTerm, limit: 12 })
    },
    current () {
      return this.searchResults[this.active]
    }
  },
  watch: {
    $route (to, from) {
      this.searchTerm = ''
    },
    searchTerm (n, o) {
      this.active = 0
    },
  },
  methods: {
    enter() {
      if (this.current) {
        this.$router.push(this.current.node.slug)
      }
      this.close()
    },
    up() {
      if(this.active > 0)
        this.active--;
    },
    down() {
      if(this.active < this.searchResults.length - 1)
        this.active++;
    },
    isActive(index) {
      return index === this.active;
    },
    close() {
      this.active = 0
      this.searchTerm = ''
      this.$emit('close')
    },
  },
  async mounted () {
    this.$search = new FlexSearch(this.$flexsearch.flexsearch)
    await this.$flexsearch.loadIndex(this.$search)
    this.loading = false
    this.$nextTick(() => {
      this.$refs.input.focus()
    })
  },
}
</script>