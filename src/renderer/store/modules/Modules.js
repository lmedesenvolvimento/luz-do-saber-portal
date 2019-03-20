import axios from 'axios'

const state = {
    activeModule: {},
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
        let { data } = await axios.get(`${process.env.BASE_API_URL}/game/${slug}`)
        commit('SET_ACTIVE_MODULE', data)

    },
    async fetchModules({ commit }){
        let { data } = await axios.get(`${process.env.BASE_API_URL}/game`)
        commit('SET_MODULES', data)
    }
}

export default { 
    namespaced: true,
    state, 
    mutations,
    actions
}