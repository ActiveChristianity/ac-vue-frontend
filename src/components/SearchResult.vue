<template>
  <ais-hits class="bg-white">
    <template slot-scope="{ items }">
      <template v-if="items.length == 0">
        <p class="text-sm text-gray-800 p-4"><i>No results...</i></p>
        <RecentSearch @selected="(q) => $emit('recentQuery', q)" />
      </template>
      <div v-else class="flex flex-wrap justify-around">
        <div v-for="result in items" :key="result.id">
          <CardResult :result="result" />
        </div>
      </div>
    </template>
  </ais-hits>
</template>

<script>
import CardResult from '~/components/CardResult.vue'
import RecentSearch from '~/components/RecentSearch.vue'
export default {
  props: {
    results: Array
  },
  components: {
    CardResult, RecentSearch
  }
}
</script>