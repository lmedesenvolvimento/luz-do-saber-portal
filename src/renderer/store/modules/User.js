import Vue from 'vue'
import db from '@/services/Session'

const state = {
    currentUser: null
}

const mutations = {
    SET_USER(state, payload) {
        Vue.set(state, 'currentUser', payload)
    }
}

const actions = {
    createUserDatabase({ commit }, payload){
        db.defaults({
            data: {
                name: payload.name
            },
            friends: {}
        }).write()
        
        let user = db.value()

        commit('SET_USER', user)
    },
    
    recoveryUserDatabase({ commit }){
        let user = db.value()

        if (user.data) {
            commit('SET_USER', user)
        }        
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}