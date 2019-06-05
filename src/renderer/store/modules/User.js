import Vue from 'vue'
import uniqid from 'uniqid'
import { clone, values } from 'lodash'

import db from '@/services/Session'

const state = {
    currentUser: null
}

const mutations = {
    SET_USER(state, payload) {
        Vue.set(state, 'currentUser', payload)
    },
    ADD_FRIEND(state, payload) {
        let currentUser = clone(state.currentUser)
        let friendRef = uniqid()

        currentUser.friends[friendRef] = payload

        Vue.set(state, 'currentUser', currentUser)
    }
}

const actions = {
    createUserDatabase({ commit }, payload){
        db.defaults({
            data: {
                name: payload.name
            },
            friends: {},
            pointings: {
                units: {},
                themes: {},
                modules: {},
                activities: {},
            }
        }).write()
        
        let user = db.value()

        commit('SET_USER', user)
    },
    
    recoveryUserDatabase({ commit }){
        let user = db.value()

        if (user.data) {
            commit('SET_USER', user)
        }        
    },
    addFriend({ commit }, friend){
        commit('ADD_FRIEND', friend)
    }
}

const getters = {
    friends({ currentUser }){
        return values(currentUser.friends)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}