import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import { VueHammer } from 'vue2-hammer'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'
import './directives'
import './plugins/v-viewer'
import './plugins/vue-touch'
import './plugins/plyr'
import './plugins/bootstrap-vue'
import './plugins/mq-vue'

import Assets from './services/Assets'

// merge router with store
sync(store, router)

Vue.use(VueHammer)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))

Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.prototype.$context = process.env.CONTEXT || 'fundamental'

Assets.loadCache()

/* eslint-disable no-new */
new Vue({
    components: { App },
    router,
    store,
    template: '<App/>'
}).$mount('#app')
