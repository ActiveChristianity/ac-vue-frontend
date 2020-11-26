<template>
  <transition name="fade">
    <div v-if="show" class="relative flex-1 max-w-sm">
      <input class="w-full px-3 py-1 rounded bg-gray-800 text-secondary-alt" type="text"
             v-model="searchTerm"
             :disabled="loading"
             @keydown.enter="enter"
             @keydown.down="down"
             @keydown.up="up"
             @keydown.esc="close"
             ref="input"
             :placeholder="loading ? 'Loading…' : 'Search'"
      />
      <ul class="absolute max-h-screen overflow-y-auto bg-white rounded shadow z-50 border-t-2 border-secondary" style="width:100%" v-if="searchTerm.length > 2">
        <li v-if="! searchResults || ! searchResults.length" class="block text-gray-600 text-center text-sm p-2">No results found</li>
        <template v-else>
          <li v-for="(result, i) in searchResults"
              @click="close"
              class="block"
              :class="{'bg-gray-200 text-secondary': active === i}"
              @mouseover="active = i"
          >
            <g-link
                :key="result.id"
                :to="nodePath(result.node)"
                class="p-2 w-full flex items-center">
              <div class="rounded-full bg-gray-100 center w-8 h-8 mr-2">
                <icon v-if="result.node.type" prefix="fal" :name="$typeIcon(result.node.type, false, !! result.node.track)" fa />
                <p v-else class="uppercase font-semibold font-serif">{{ result.node.title.charAt(0) }}</p>
              </div>
              <span>{{ result.title }}</span>
            </g-link>
          </li>
        </template>
      </ul>
    </div>
  </transition>
</template>

<script>
import FlexSearch from 'flexsearch'

export default {
  props: {
    show: Boolean
  },
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
    $route () {
      this.searchTerm = ''
    },
    searchTerm (n, o) {
      this.active = 0
    },
    show (v) {
      if (v) {
        this.$nextTick(() => {
          this.$refs.input.focus()
        })
      }
    }
  },
  methods: {
    enter() {
      if (this.current) {
        this.$router.push(this.nodePath(this.current.node))
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
    nodePath(node) {
      if (node.type) {
        return `/${node.slug}`
      }
      return `/${this.$t.slug_glossary}/${node.slug}`
    }
  },
  async mounted () {
    this.$search = new FlexSearch(this.$flexsearch.flexsearch)
    await this.$flexsearch.loadIndex(this.$search)
    this.loading = false
    this.$nextTick(() => {
      if (this.$refs.input) {
        this.$refs.input.focus()
      }
    })
  },
}
</script>