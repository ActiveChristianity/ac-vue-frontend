<template>
  <header class="bg-white">
    <div id="topbar" class="items-center justify-between border-b border-gray-200 hidden px-4 md:flex">
      <div id="topbar-left" class="text-gray-500 text-sm font-light tracking-wide">
        <a class="p-2 inline-block hover:text-gray-900" href="bcc.no">Brunstad Christian Chruch <icon class="ml-1" name="fal-external-link-alt"/></a>
      </div>
      <div id="topbar-right" class="flex text-gray-500 text-sm px-2">
        <!--button aria-label="login" class="font-light tracking-wide rounded my-1 py-1 px-2 hover:bg-gray-600 hover:text-white">Login</button>
        <button aria-label="register" class="font-light tracking-wide rounded my-1 py-1 px-2 hover:bg-gray-600 hover:text-white">Register</button-->
        <button aria-label="contact" class="font-light tracking-wide rounded my-1 py-1 px-2 hover:bg-gray-600 hover:text-white">Contact</button>
        <span class="my-2 border-l border-gray-200"></span>
        <select aria-label="Select Language" class="cursor-pointer my-1 py-1 px-2 font-light tracking-wide hover:bg-gray-200">
          <option>English</option>
        </select>
      </div>
    </div>

    <div id="headbar" class="flex items-center justify-between border-b border-gray-200 px-4">
      <g-link to="/" id="headbar-left" class="p-3 h-12 text-4xl">
        <Icon name="logo" class="md:block h-full object-fit text-primary" />
      </g-link>
      <div id="headbar-center" class="justify-center text-gray-800 text-md font-light tracking-wide hidden md:flex">
        <g-link to="/topics" class="headbar-center-link">Topics</g-link>
        <a to="/search" class="headbar-center-link">Explore</a>
      </div>
      <template name="fade">
        <search v-if="openSearch" @close="openSearch = false" />
      </template>
      <div id="headbar-right" class="flex text-gray-800 text-md">
        <button aria-label="search" @click="openSearch = ! openSearch" class="rounded m-1 py-1 px-2 hover:bg-gray-200"><i class="fal fa-search"></i></button>
        <button aria-label="menu" class="rounded m-1 py-1 px-2 hover:bg-gray-200"><i class="fal fa-bars"></i></button>
      </div>
    </div>
  </header>
</template>

<static-query>
query FooterInfo {
  m: metadata {
    title
    social
  }
}
</static-query>

<script>
export default {
  name: "Header",
  components: {
    search: () => import('./Search')
  },
  data() {
    return {
      menuOpen: false,
      openSearch: false,
    }
  },
  methods: {
    vibrate() {
      window.navigator && window.navigator.vibrate && window.navigator.vibrate(20);
    }
  }
}
</script>

<style lang="scss">
nav {
  @screen mmd {
    @apply fixed w-screen h-screen text-white px-8 pt-32 bg-gray-800 inset-0 z-10 overflow-y-auto;
    transform: translateX(100%);
    transition: transform .6s cubic-bezier(.19,1,.22,1);

    &.menuOpen {
      transform: translateX(0);
    }

    .nav-link {
      @apply p-2 text-xl;

      span {
        @apply block mt-2 text-sm font-semibold;
      }

      .nav-dropdown {
        opacity: 1;
        transform: translateY(0);
      }
    }
  }
}
</style>