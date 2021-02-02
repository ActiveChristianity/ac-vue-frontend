/* eslint-disable no-console */

import { register } from 'register-service-worker'
import Vue from 'vue'

if (process.env.NODE_ENV === 'production') {
    register(`/service-worker.js`, {
        ready() {
            console.log('App is being served from cache by a service worker.')
        },
        cached() {
            console.log('Content has been cached for offline use.')
        },
        updatefound() {
            console.log('Updating content')
        },
        updated() {
            if (Vue.prototype.$setMessage) {
                Vue.prototype.$setMessage('App updated. Reloading page')
            }
            setTimeout(() => {
                window.location.reload(true)
            }, 1000)
        },
        offline() {
            console.log('No internet connection found. App is running in offline mode.')
        },
        error(error) {
            console.error('Error during service worker registration:', error)
        },
    })
}
