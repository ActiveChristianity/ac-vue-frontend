<template>
  <transition name="slide-up">
    <div
      v-if="active"
      class="border top absolute w-full shadow rounded-xl bg-white px-4 overflow-hidden overflow-y-scroll"
    >
      <div class="flex flex-wrap pb-24">
        <div
          class="flex w-full items-center justify-between pt-4 pb-2 text-lg border-b border-gray-300 mb-4 sticky top-0 bg-white"
        >
          <h2>Old Testament</h2>
          <button title="Close"
              @click="$emit('toggleBible')"
              class="rounded bg-gray-300 p-2"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L6 6M11 11L6 6M6 6L11 1M6 6L1 11" stroke="#4F4F4F" stroke-linecap="round"></path></svg>
          </button>
        </div>
        <!-- OLD TESTAMENT BOOKS -->
        <div
          v-for="book in bible.old"
          :key="book.no"
          class="w-1/2 sm:1/4 md:1/6 py-2 inline-block"
          :style="{order: book.id}"
        >
          <button title="Toggle old testament book"
            @click="(e) => toggleActive(e, book)"
            :class="activeBook == book ? 'bg-d4slate-dark text-white' : 'text-d4slate-dark bg-white'"
            class="border border-gray-600 hover:border-d4slate-dark rounded-lg py-1 px-2 font-semibold"
          >{{book.name}}</button>
        </div>

        <div
          class="flex w-full items-center justify-between pt-4 pb-2 text-lg border-b border-gray-300 mb-4 sticky top-0 bg-white"
          :style="{order: bible.new[0].id}"
        >
          <h2>New Testament</h2>
          <button class="rounded bg-gray-300 p-2" aria-label="close" @click="$emit('toggleBible')">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L6 6M11 11L6 6M6 6L11 1M6 6L1 11" stroke="#4F4F4F" stroke-linecap="round"></path></svg>
          </button>
        </div>
        <!-- NEW TESTAMENT BOOKS -->
        <div
          v-for="book in bible.new"
          :key="book.no"
          class="w-1/2 sm:1/4 md:1/6 py-2 inline-block"
          :style="{order: book.id}"
        >
          <button title="Toggle new testament book"
            @click="(e) => toggleActive(e, book)"
            :class="activeBook == book ? 'bg-d4slate-dark text-white' : 'text-d4slate-dark bg-white'"
            class="border border-gray-300 hover:border-d4slate-dark rounded-lg py-1 px-2 font-semibold"
          >{{book.name}}</button>
        </div>
        <!-- CHAPTERS -->
        <transition name="fade">
          <div
            v-if="activeBook"
            :key="activeBook.no"
            class="w-full p-2 rounded-lg bg-d4athens flex flex-wrap justify-start"
            :style="{order: activeBook.id % 2 ? activeBook.id + 1 : activeBook.id}"
          >
            <template v-for="chpt in availableChapters">
              <button
                v-if="chpt.a"
                :key="chpt.v"
                @click="select(chpt.v)"
                class="w-8 text-center py-1 text-d4secondary font-semibold"
              >{{chpt.v}}</button>
              <span
                v-else
                :key="chpt.v"
                class="w-8 text-center py-1 text-gray-600 font-light"
              >{{chpt.v}}</span>
            </template>
          </div>
        </transition>
      </div>
    </div>
  </transition>
</template>

<script>
import localJson from '~/data/acbible.json'
export default {
  methods: {
    toggleActive(e, book) {
      this.activeBook = this.activeBook !== book ? book : null;
      e.target.scrollIntoView({behavior: 'smooth', block: "center", inline: "center"})
    },
    select(chpt) {
      this.$emit('selected', `${this.activeBook.name} ${chpt}`)
      window.scrollTo(0, 0);
      this.$emit('toggleBible')
    }
  },
  computed: {
    availableChapters() {
      if (this.activeBook.chpts) return this.activeBook.chpts;
      const all = [];
      for (let i = 1; i <= this.activeBook.total; ++i) {
        all.push({
          v: i,
          a: this.activeBook.chapters.indexOf(i) > -1
        });
      }
      this.$set(this.activeBook, "chpts", all);
      return all;
    }
  },
  mounted() {
    let i = 0;
    this.bible.old.forEach(b => (b.id = ++i));
    this.bible.new.forEach(b => (b.id = ++i));
  },
  props: {
    active: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      activeBook: null,
      bible: localJson
    };
  }
};
</script>

<style>
.top {
  top: 5em;
}
.fade-enter-active,
.fade-leave-active {
  transition: 0.3s;
  max-height: 400px;
  overflow: hidden;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  max-height: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: 0.5s ease;
}
.slide-up-enter,
.slide-up-leave-to {
  transform: translateY(100vh);
  height: 0;
}
</style>
