import Http from '@/services/Http'

const state = {
    theme: null
}

const mutations = {
    SET_THEME(state, payload){
        state.theme = payload
    }
}

const actions = {
    async fetchTheme({ commit }, params){
        let { data } = await Http.axios.get(`/game/${params.module_slug}/${params.theme_slug}.json`)
        commit('SET_THEME',data)
        return data
    },

    destroyTheme({ commit }){
        commit('SET_THEME', {})
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}