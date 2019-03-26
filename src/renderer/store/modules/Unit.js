import axios from 'axios'

const state = {
    unit: null
}

const mutations = {
    SET_UNIT(state, payload){
        state.unit = payload
    }
}

const actions = {
    async fetchUnit({ commit }, params){
        let { data } = await axios.get(`${process.env.BASE_API_URL}/game/${params.module_slug}/${params.theme_slug}/${params.unit_slug}`)
        commit('SET_UNIT', data)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}