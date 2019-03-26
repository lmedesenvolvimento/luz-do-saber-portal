import API from '@/services/Http'

const state = {
    theme: {}
}

const mutations = {
    SET_THEME(state, payload){
        state.theme = payload
    }
}

const actions = {
    async fetchTheme({ commit }, params){
        let { data } = await API.get(`/game/${params.module_slug}/${params.theme_slug}`)
        commit('SET_THEME',data)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}