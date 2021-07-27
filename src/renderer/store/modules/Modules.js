import Http from '@/services/Http'

const karaokeModule = {
    description: null,
    id: 999,
    slug: 'karaoke',
    theme_url: '/game/karaoke/geral',
    themes: [],
    title: 'Karaokê',
    type: 'karaoke'
}

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
        let { data } = await Http.axios.get(`/game/${slug}.json`)
        commit('SET_ACTIVE_MODULE', data)
        return data

    },

    async fetchTargetAudiences(state, slug) {
        console.log(slug)
        let { data } = await Http.axios.get(`/game/${slug}.json`)
        return data
    },

    async fetchModules({ commit }){
        let { data } = await Http.axios.get('/game.json')
        
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