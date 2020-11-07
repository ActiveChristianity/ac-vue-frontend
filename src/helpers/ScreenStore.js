/**
 * Exposes $screen with current that can be checked
 */

export default (Vue) => {
  let screen = Vue.observable({
    mobile: 640,
    tablet: 960,
    desktop: 1280,
    current: 480
  })

  function onResize() {
    let w = window.innerWidth
    if (window.innerWidth < 641) w = 640
    else if (window.innerWidth < 961) w = 960
    else if (window.innerWidth < 1281) w = 1280
    if (w !== screen.current) Vue.set(screen, 'current', w)
  }

  if (typeof window !== 'undefined') {
    window.addEventListener('resize', onResize);
    setTimeout(() => {
      onResize()
    }, 100)
  }

  Vue.prototype.$screen = screen
}