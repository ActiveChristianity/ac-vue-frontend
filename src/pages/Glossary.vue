<template>
  <main class="content py-12 md:py-24">
    <h1 class="text-3xl text-blue-900 md:text-4xl font-medium leading-tight mb-8">{{ $t.glossary }}</h1>

    <div class="column-layout">
      <template v-for="group in groups">
        <div :key="group.key" class="pb-2 mb-2 border-b border-gray-300">
          <h3 class="avoid-after font-medium text-secondary text-xl p-2 uppercase">{{ group.key }}</h3>
          <template v-for="def in group.defs">
            <g-link :key="def.slug" :to="`/${$t.slug_glossary}/${def.slug}`" class="block p-2 rounded hover:bg-gray-200">
              {{ def.word }}
            </g-link>
          </template>
        </div>
      </template>
    </div>
  </main>
</template>

<page-query>
query Glossary {
  ql {
    glossary {
      word
      slug
      content
    }
  }
}
</page-query>

<script>
export default {
  metaInfo() {
    return {
      title: this.$t.glossary + ' - ' + this.$t.site_title
    }
  },
  computed: {
    groups () {
      const set = {}
      this.$page.ql.glossary.forEach(def => {
        const c = def.word.charAt(0)
        if (! set[c]) {
          set[c] = []
        }
        set[c].push(def)
      })

      const groups = []
      Object.keys(set).forEach(key => {
        set[key].sort((a,b) => a.word > b.word ? 1 : -1)
        groups.push({
          key,
          defs: set[key]
        })
      })
      groups.sort((a,b) => a.key > b.key ? 1 : -1)

      return groups
    }
  }
}
</script>
