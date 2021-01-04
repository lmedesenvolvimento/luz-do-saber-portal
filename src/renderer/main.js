import Vue from 'vue'
import VueAnalytics from 'vue-analytics'
import { sync } from 'vuex-router-sync'
import { VueHammer } from 'vue2-hammer'
import Splitting from 'splitting'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'
import './directives'
import './plugins/v-viewer'
import './plugins/plyr'
import './plugins/bootstrap-vue'
import './plugins/mq-vue'
import './plugins/cookies'
import './plugins/vue-konvas'

import Assets from './services/Assets'
import { asyncAxios } from './services/Http'

// merge router with store
sync(store, router)

Vue.use(VueHammer)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))

Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.prototype.Splitting = Splitting
Vue.prototype.$context = process.env.CONTEXT || 'fundamental'

asyncAxios(({ GA }) => {
    Assets.loadCache()

    if (process.env.NODE_ENV === 'production' && GA){
        console.log('VueAnalytics is enabled', GA)
                
        Vue.use(VueAnalytics, {
            id: GA,
            router
        })
    }    
    
    /* eslint-disable no-new */
    new Vue({
        components: { App },
        router,
        store,
        template: '<App/>'
    }).$mount('#app')
})

