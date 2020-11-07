<template>
  <div class="bg-white shadow-md rounded-lg w-full my-8 mx-auto max-w-screen-md">
    <div class="flex">
      <div class="w-1/3">
        <div class="pb-square relative overflow-hidden">
          <img class="absolute inset-0 w-full h-full rounded-lg object-cover" src="https://tailwindcss.com/img/card-top.jpg" alt="Album Pic">
        </div>
      </div>
      <div class="w-full md:w-1/2 p-8 flex-1 flex flex-col">
        <div class="flex-1">
          <h3 class="text-2xl text-grey-darkest font-medium">A Sky Full of Stars</h3>
          <p class="text-sm text-grey mt-1">Ghost Stories</p>
        </div>
        <div class="flex justify-between items-center mt-8 text-gray-600">
          <div class="text-grey-darker">
            <svg class="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M6.59 12.83L4.4 15c-.58.58-1.59 1-2.4 1H0v-2h2c.29 0 .8-.2 1-.41l2.17-2.18 1.42 1.42zM16 4V1l4 4-4 4V6h-2c-.29 0-.8.2-1 .41l-2.17 2.18L9.4 7.17 11.6 5c.58-.58 1.59-1 2.41-1h2zm0 10v-3l4 4-4 4v-3h-2c-.82 0-1.83-.42-2.41-1l-8.6-8.59C2.8 6.21 2.3 6 2 6H0V4h2c.82 0 1.83.42 2.41 1l8.6 8.59c.2.2.7.41.99.41h2z"/></svg>
          </div>
          <div class="text-grey-darker">
            <svg class="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M4 5h3v10H4V5zm12 0v10l-9-5 9-5z"/></svg>
          </div>
          <div class="text-orange-600 p-4 rounded-full bg-red-light shadow-lg">
            <svg class="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5 4h3v12H5V4zm7 0h3v12h-3V4z"/></svg>
          </div>
          <div class="text-grey-darker">
            <svg class="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 5h3v10h-3V5zM4 5l9 5-9 5V5z"/></svg>
          </div>
          <div class="text-grey-darker">
            <svg class="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5 4a2 2 0 0 0-2 2v6H0l4 4 4-4H5V6h7l2-2H5zm10 4h-3l4-4 4 4h-3v6a2 2 0 0 1-2 2H6l2-2h7V8z"/></svg>
          </div>
        </div>
      </div>
    </div>
    <div class="px-8 pt-4 pb-6">
      <div class="flex justify-between text-sm text-grey-darker">
        <p>0:40</p>
        <p>4:20</p>
      </div>
      <div class="mt-1">
        <div class="h-2 bg-gray-800 rounded-full">
          <div class="w-1/5 h-2 bg-orange-400 rounded-full relative">
            <span class="w-4 h-4 bg-orange-600 absolute right-0 bottom-0 -mb-1 rounded-full shadow"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted () {

  }
}
</script>