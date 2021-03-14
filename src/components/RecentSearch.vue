<template>
  <div class="p-4 bg-white">
    <h1 class="font-semibold text-d4slate-dark pb-6">{{ $t.recent_searches }}</h1>
      <div v-if="searches.length == 0">
        <p class="text-sm text-gray-800 pb-4"><i>{{ $t.search_history_empty }}</i></p>
      </div>
      <div v-for="(search, index) in searches" :key="index">
        <transition name="fade">
          <div class="flex justify-between items-baseline">
            <button @click="$emit('selected', search.searchinput)">
              <p class="font-medium text-d4secondary pb-6">{{ search.searchinput }}</p>
            </button>
            <button @click="searches.splice(searches.indexOf(search), 1)">
              <Icon name="cross" class="mr-2" />
            </button>
          </div>
        </transition>
      </div>
    <p @click="searches = []" class="text-black text-sm rounded-xl border border-gray-600 py-2 px-4 w-content uppercase m-auto">{{ $t.clear_recent_searches }}</p>
  </div>
</template>

<script>
import searches from '~/data/searchinput.json'
export default {
  data() {
    return {
      searches: searches
    }
  }
}
</script>
