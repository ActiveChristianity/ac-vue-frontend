<template>
  <main class="relative">
    <Icon name="icon" class="absolute bottom-0 right-0 hidden -mb-d4 -mr-d12 w-1/2 max-h-screen text-d4primary-light opacity-50 md:block"></Icon>

    <ac-form :theForm="this.$context"></ac-form>
  </main>
</template>

<script>
import AcForm from '~/components/Form.vue'

export default {
  metaInfo() {
    const { title } = this.$context
    return {
      title: title  + ' - ' + this.$t.site_title
    }
  },
  mounted() {
    setTimeout(() => {
      this.$store.fadeIn = true
    }, 50)
  },
  components: { AcForm },
}
</script>
