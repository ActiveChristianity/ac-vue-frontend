import SDK from '../../api_sdk/lib'

export default function(Vue) {
  Vue.prototype.$api = SDK({
    gql_api_url: process.env.GRIDSOME_GQL_URL,
    debug: false
  })
  Vue.prototype.$api.setLocale(process.env.GRIDSOME_LOCALE)
  Vue.prototype.$gql = Vue.prototype.$api.fetch
}
