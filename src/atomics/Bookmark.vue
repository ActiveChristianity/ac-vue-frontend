<template>
  <button v-if="id" aria-label="bookmark" @click.stop.prevent="toggle">
    <icon :prefix="iconStyle" name="bookmark" fa />
  </button>
</template>

<script>
export default {
  props: {
    id: {
      required: true
    },
    slug: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'post'
    },
  },
  computed: {
    key() {
      return String(this.type).toLowerCase() + this.id
    },
    iconStyle() {
      return this.active ? 'fad' : 'fal'
    },
    active() {
      return this.$store.bookmarks[this.key]
    },
  },
  methods: {
    toggle () {
      const event = {
        event: 'interaction',
        category: "Bookmark",
        action: "toggle",
        label: this.key,
        value: 1
      }

      if (this.active) {
        event.value = -1
        this.$delete(this.$store.bookmarks, this.key)
      } else {
        this.$set(this.$store.bookmarks, this.key, {
          ts: new Date().toISOString(),
          slug: this.slug,
        })
      }

      this.$gtm?.trackEvent(event);
    }
  }
}
</script>
