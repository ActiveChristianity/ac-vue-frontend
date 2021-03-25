<template>
  <div class="sm:bg-primary sm:p-10 sm:text-white sm:rounded-lg">
    <h1 class="text-lg sm:text-3xl pb-3 sm:pb-6 font-bold">{{ $t.topics_for_you }}</h1>
    <p class="msm:hidden pb-8 text-xl">{{ subtitle }}</p>
    <div class="tags flex">
      <template v-for="(topic, i) in topics">
        <g-link :key="topic.id" :to="`${$t.slug_topic}/${topic.slug}` ">{{ topic.name }}</g-link>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    topics: {
      type: Array,
      default: () => []
    }
  },
}
</script>

<style lang="scss">

@media (max-width: 639px) {
  .tags {
    &:after {
      content: '';
      height: 5rem;
      width: 1rem;
      flex-shrink: 0;
    }
  }
}

@media (max-width: 767px) {
  .tags {
    display: flex;
    height: auto;
    width: 100vw;
    overflow-x: scroll;
    margin: 0 -2rem;
    padding-bottom: 1rem;
    padding-left: 2rem;
    scroll-padding: 2rem;
    scroll-snap-type: x mandatory;
  }
  .tags a {
    height: 5rem;
    width: 12.3rem;
    margin-right: 1rem;
    flex-shrink: 0;
    scroll-snap-align: start;
    background: var(--primary);
    color: white;
    padding: 0.5rem;
    display: flex;
    align-items: flex-end;
    font-size: 1.125rem;
    font-weight: bold;
    border-radius: 0.5rem;
  }
}

@media (min-width: 768px) {
  .tags {
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 0.5rem;
  }
  .tags a {
    margin: .125rem;
    flex-shrink: 0;
    scroll-snap-align: start;
    background: white;
    color: var(--primary);
    padding: 0.5rem;
    display: flex;
    align-items: flex-end;
    font-size: 1.125rem;
    line-height: 1.25rem;
    font-weight: bold;
  }
}
</style>
