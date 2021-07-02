<template>
  <g-link :to="'/' + article.slug" class="max-w-lg rounded shadow bg-white p-4 flex justify-between ">
    <span class="flex flex-col justify-between pr-1">
      <h5 class="text-base font-bold capitalize text-slate-dark">{{ article.title}}</h5>
      <p class="msm:hidden mb-1">{{ topic.name }}</p>
      <p class="text-sm pt-1 text-gray-600">
        {{ Math.ceil(article.readtime / 60) }} {{ $t.min }} ・ {{ $authorString(article) }}
      </p>
    </span>
    <f-image class="pointer-events-none h-16 w-16 rounded object-cover" :src="article.image"></f-image>
  </g-link>
</template>

<script>
export default {
  name: "ArticleSimple",
  props: ['article'],
  computed: {
    topic () {
      return this.article?.topics.filter(t => ! t.group.is_abstract)[0] || null
    },
  }
}
</script>