<template>
  <main class="center flex-col p-8 text-secondary">
    <h1 class="text-gray-200" style="font-size: 120px; text-shadow: -1px -1px 0 var(--secondary), 0 0 1px var(--secondary), 4px 4px 0 var(--secondary)">404</h1>
    <h2 class="text-lg">{{ $t.page_not_found }}</h2>
    <div class="center mx-auto">
      <g-link to="/" class="bg-gray-200 rounded hover:bg-primary hover:text-white m-4 px-8 py-2 uppercase">Home</g-link>
      <g-link to="/topics" class="bg-gray-200 rounded hover:bg-primary hover:text-white m-4 px-8 py-2 uppercase">Topics</g-link>
    </div>
  </main>
</template>