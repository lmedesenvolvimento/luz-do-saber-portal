import '@/assets/styles/main.scss'

import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import BootstrapVue from 'bootstrap-vue'
import { VueHammer } from 'vue2-hammer'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'
import './directives'

// merge router with store
sync(store, router)

Vue.use(BootstrapVue)
Vue.use(VueHammer)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

window.onload = () => {
    /* eslint-disable no-new */
    new Vue({
        components: { App },
        router,
        store,
        template: '<App/>'
    }).$mount('#app')
}

