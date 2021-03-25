<template>
  <g-link :to="card.slug" class="card select-none
    block rounded-xl shadow p-4 bg-white text-gray-800
    sm:flex sm:flex-col sm:shadow-none sm:border sm:border-gray-400er sm:p-0 sm:h-120
    hover:shadow-md">
    <div class="flex flex-1 flex-row sm:flex-col">
      <div class="flex-1 sm:px-4 sm:pt-4">
        <h6 class="capitalize sm:mb-2">{{card.title}}</h6>
        <span class="flex text-base text-gray-600 items-stretch">
          <span class="flex-1 pr-1 h-20 sm:h-auto overflow-y-hidden text-gray-600 sm:text-gray-600-dark">
            <p class="font-bold">{{card.sub}}</p>
            <p class="mt-2">{{card.excerpt}}</p>
          </span>
        </span>
      </div>
      <span class="relative w-full h-56 sm:order-first hidden sm:block sm:w-full pl-1 sm:pl-0 flex justify-end" style="min-width: 84px" v-if="card.image">
        <f-image v-if="card.image" class="pointer-events-none w-full h-full rounded block rounded-t-xl object-cover sm:rounded-b-none" :src="card.image"></f-image>
      </span>
    </div>
    <span class="flex justify-between items-center mt-4 sm:px-4 sm:pb-4">
      <p class="sm:hidden text-sm text-blue-500">{{ $t.read_more }}</p>
      <p class="hidden sm:block text-sm text-gray-600-dark">{{card.readtime / 60 > 60 ? '60' : Math.round(card.readtime / 60) }} {{ $t.mins }} ・ {{ card.authors.map(a => a.name).join(', ') }}</p>
      <Icon name="heart" class="w-5 h-5 text-blue-500" />
    </span>
  </g-link>
</template>

<script>
export default {
  name: 'Card',
  props: {
    card: Object,
    type: String
  }
}
</script>
