// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import Icon from './atomics/Icon.vue'
import ALink from './atomics/ALink.vue'
import Link from './atomics/Link.vue'
import Bookmark from './atomics/Bookmark.vue'
import Playable from './atomics/Playable.vue'
import FocalImage from './atomics/FocalImage.js'
import Share from './components/Share.vue'
import TopicArticles from './components/TopicArticles.vue'

import Scroll from './helpers/ScrollDirective'
import ScreenStore from './helpers/ScreenStore'
import Store from './helpers/Store'
import Api from './helpers/Api'
// import Vue2TouchEvents from 'vue2-touch-events'
import Markdown2Html from './helpers/Markdown2Html'

import './main.scss'

if (! Array.prototype.groupBy) {
  Array.prototype.groupBy = function(key) {
    return this.reduce(function(rv, x) {
      const k = String(key).split('.').reduce((o,i)=> o[i], x);
      (rv[k] = rv[k] || []).push(x)
      return rv
    }, {})
  };
}
if (! Array.prototype.keyBy) {
  Array.prototype.keyBy = function(key) {
    return this.reduce(function(rv, x) {
      const k = String(key).split('.').reduce((o,i)=> o[i], x);
      rv[k] = x
      return rv
    }, {})
  };
}


export default function (Vue, { router, head, isClient }) {
  Vue.component('Icon', Icon)
  Vue.component('ALink', ALink)
  Vue.component('Link', Link)
  Vue.component('bookmark', Bookmark)
  Vue.component('playable', Playable)
  Vue.component('FImage', FocalImage)
  Vue.component('Share', Share)
  Vue.component('TopicArticles', TopicArticles)
  //Vue.use(Vue2TouchEvents)
  Vue.use(Store)
  Vue.use(Api)
  Vue.use(Scroll)
  Vue.use(ScreenStore)

  const $t = require(`./strings/${process.env.GRIDSOME_LOCALE}.json`)
  Vue.prototype.$t = require(`./strings/${process.env.GRIDSOME_LOCALE}.json`)
  Vue.prototype.$m2h = Markdown2Html
  Vue.prototype.$j2o = (json) => JSON.parse(json)
  Vue.prototype.$storage_url = process.env.GRIDSOME_BACKEND_URL + '/storage'
  Vue.prototype.$setMessage = (text, opts) => {
    Vue.prototype.$store.message = {
      text, opts
    }
    setTimeout(() => {
      Vue.prototype.$store.message = null
    }, 2000)
  }

  if (isClient && ! process.env.GRIDSOME_DEVELOPMENT) {
    if (process.env.GRIDSOME_CLOUDFLARE_TOKEN) {
      head.script.push({
        src: 'https://static.cloudflareinsights.com/beacon.min.js',
        defer: true,
        async: true,
        'data-cf-beacon': `{"token": "${process.env.GRIDSOME_CLOUDFLARE_TOKEN}"}`,
        body: true
      })
    }

    require('./registerServiceWorker')
  }

  router.options.scrollBehavior = function(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return {selector: to.hash};
    }
    return {x: 0, y: 0}
  }

  Vue.prototype.$typeIcon = (type, excludeArticle, hasTrack) => {
    if (! type) return ''
    switch (String(type).toLowerCase()) {
      case 'video': return `video`
      case 'podcast': return `podcast`
      case 'audio': return `music`
      case 'playlist': return `list-music`
      case 'article': return hasTrack ?
          'waveform' : (excludeArticle ? '' : 'file-alt')
      default: return ''
    }
  }

  Vue.prototype.$authorString = (article) => {
    if (article) {
      if (article.meta && article.meta.as_ac) {
        return $t.site_title
      }
      if (article.authors) {
        return article.authors.map(a => a.name).join(', ')
      }
    }
    return ''
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
      case 'playlist': return `/${$t.slug_playlists}/`
      case 'series': return `/${$t.slug_series}/`
      case 'track': return `/${$t.slug_tracks}/`
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

  head.htmlAttrs = { lang: process.env.GRIDSOME_LOCALE.split('_')[0] }
}
