/**
 * A Page Scroll Directive
 *
 * @usage
 * <template>
 *  <div v-scroll="onScroll"></div>
 * </template>
 *
 * <script>
 * export default {
 *   methods: {
 *     onScroll(event, element) {
 *       if (window.scrollY > 100)
 *         // DO SOMETHING
 *     }
 *   }
 * }
 * </script>
 */

export default function (Vue) {
  const upsert = (el, binding, vNode, vOldNode) => {
    window.removeEventListener('scroll', (vOldNode || vNode).__onScroll)
    let ready = true
    vNode.__onScroll = (evt) => {
      if (ready) {
        /*ready = false
        setTimeout(() => {
          ready = true
        }, 40)*/
        binding.value(evt, el)
      }
    }
    window.addEventListener('scroll', vNode.__onScroll, { capture: false, passive: true })
  }
  Vue.directive('scroll', {
    inserted: upsert,
    unbind(el, binding, vNode) {
      window.removeEventListener('scroll', vNode.__onScroll)
    },
    update: upsert
  })
}