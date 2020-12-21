import Vue from 'vue'
import Vuex from 'vuex'

import modules from './modules'
import RemoteServerSyncPlugin from './plugins/remote-server-sync'

console.log(modules)

Vue.use(Vuex)

export default new Vuex.Store({
    modules,
    plugins: [RemoteServerSyncPlugin]
})

// export default new Vuex.Store({
//     modules,
//     strict: process.env.NODE_ENV !== 'production'
// })
