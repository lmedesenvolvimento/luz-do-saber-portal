import API from '@/services/Http'

const state = {
    activeModule: null,
    modules: []
}

const mutations = {
    SET_ACTIVE_MODULE(state, payload){
        state.activeModule = payload
    },
    SET_MODULES(state, payload){
        state.modules = payload
    }
}

const actions = {
    async fetchModule({ commit }, slug){
        let { data } = await API.get(`/game/${slug}`)
        commit('SET_ACTIVE_MODULE', data)
        return data

    },
    async fetchModules({ commit }){
        let { data } = await API.get('/game')
        commit('SET_MODULES', data.modulos)
        return data
    },

    destroyModule({commit}) {
        commit('SET_ACTIVE_MODULE', null)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}