export default function(Vue) {
  const store = Vue.observable({
    locale: process.env.GRIDSOME_LOCALE,
    page: null,
    loggedIn: false,
    playVideo: false,
    playlist: null,
    playing: null,
    fadeIn: false,
    showTopBar: true,
    bookmarks: {},
  })
  Vue.prototype.$store = store
}
