export default function(Vue) {
  Vue.prototype.$store = Vue.observable({
    locale: process.env.GRIDSOME_LOCALE,
    page: null,
    loggedIn: false,
    playVideo: false,
    playlist: null,
    playing: null,
    fadeIn: false,
    showTopBar: true,
    bookmarks: {},
    showBookmarks: null,
    showSearch: null,
    message: null,
    headerTop: 0,
  })
}
