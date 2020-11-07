// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import Icon from '~/atomics/Icon.vue'
import ALink from '~/atomics/ALink.vue'
import Link from '~/atomics/Link.vue'
import Bookmark from '~/atomics/Bookmark.vue'
import Playable from "~/atomics/Playable.vue";
import FocalImage from '~/atomics/FocalImage.vue'
import Scroll from '~/helpers/ScrollDirective'
import ScreenStore from '~/helpers/ScreenStore'
import Store from '~/helpers/Store'
import Api from '~/helpers/Api'
//import Vue2TouchEvents from 'vue2-touch-events'
import Markdown2Html from '~/helpers/Markdown2Html'
// import VueGtm from 'vue-gtm'

import 'typeface-inter'
import 'typeface-merriweather'
import './main.scss'
/*import './assets/fa/scss/fontawesome.scss'
import './assets/fa/scss/light.scss'
import './assets/fa/scss/brands.scss'
import './assets/fa/scss/duotone.scss'*/

if (process.isClient) {
  window.animHScroll = {
    scrolling: false,
    dir: 1,
    lastLeft: 0,
    step() {
      if (animHScroll.scrolling) {
        const left = animHScroll.scrolling.scrollLeft + animHScroll.dir
        animHScroll.scrolling.scrollTo({
          top: 0,
          left,
          behavior: 'smooth'
        });
        if (left !== animHScroll.lastLeft) {
          setTimeout(animHScroll.step, Math.abs(animHScroll.dir))
          animHScroll.lastLeft = left
        } else animHScroll.scrolling = false
      }
    }
  }
}

if (! Array.prototype.groupBy) {
  Array.prototype.groupBy = function(key) {
    return this.reduce(function(rv, x) {
      const k = String(key).split('.').reduce((o,i)=>o[i], x);
      (rv[k] = rv[k] || []).push(x);
      return rv;
    }, {});
  };
}

export default function (Vue, { router, head, isClient }) {
  Vue.component('Icon', Icon)
  Vue.component('ALink', ALink)
  Vue.component('Link', Link)
  Vue.component('bookmark', Bookmark)
  Vue.component('playable', Playable)
  Vue.component('FImage', FocalImage)
  //Vue.use(Vue2TouchEvents)
  Vue.use(Store)
  Vue.use(Api)
  Vue.use(Scroll)
  Vue.use(ScreenStore)

  Vue.prototype.$t = require(`./strings/${process.env.GRIDSOME_LOCALE}.json`)
  Vue.prototype.$m2h = Markdown2Html
  Vue.prototype.$j2o = (json) => JSON.parse(json)
  Vue.prototype.$storage_url = `${process.env.GRIDSOME_BACKEND_URL}/storage`

  Vue.prototype.$typeIcon = (type, excludeArticle, hasTrack) => {
    if (! type) return ''
    switch (String(type).toLowerCase()) {
      case 'video': return `fa-video`
      case 'podcast': return `fa-podcast`
      case 'audio': return `fa-music`
      case 'playlist': return `fa-list-music`
      case 'article': return hasTrack ?
          'fa-waveform' : (excludeArticle ? '' : 'fa-file-alt')
      default: return ''
    }
  }

  Vue.prototype.$typeString = (type, hasTrack) => {
    if (! type) return ''
    if (String(type).toLowerCase() === 'article' && hasTrack) {
      return 'Audio Article'
    }
    return type
  }

  Vue.prototype.$typePrefix = (type) => {
    if (! type) return ''
    switch (String(type).toLowerCase()) {
      case 'playlist': return '/playlists/'
      case 'series': return '/series/'
      case 'track': return '/tracks/'
      default: return '/'
    }
  }

  Vue.prototype.utils = {
    getBrightness(rgbArray) {
      return ((rgbArray[0] * 299) + (rgbArray[1] * 587) + (rgbArray[2] * 114)) / 1000
    },
    rgba(rgbArray, alpha=1) {
      return `rgba(${rgbArray[0]},${rgbArray[1]},${rgbArray[2]},${alpha})`
    },
  }

  head.htmlAttrs = { lang: process.env.GRIDSOME_LOCALE }

  /*if (isClient && process.env.GRIDSOME_GTM) {
    Vue.use(VueGtm, {
      vueRouter: router,
      id: process.env.GRIDSOME_GTM,
      enabled: false,
      debug: false
    })
  }*/
}
