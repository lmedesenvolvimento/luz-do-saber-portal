import axios from 'axios'

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
        let { data } = await axios.get(`${process.env.BASE_API_URL}/game/${params.module_slug}/${params.theme_slug}`)
        commit('SET_THEME',data)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}