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
    if (window.innerWidth < 640) w = 640 - 1
    else if (window.innerWidth < 768) w = 768 - 1
    else if (window.innerWidth < 1024) w = 1024 -1
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