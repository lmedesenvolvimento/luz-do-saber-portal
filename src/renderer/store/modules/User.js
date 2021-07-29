import Vue from 'vue'
import uniqid from 'uniqid'
import { clone, values } from 'lodash'

import db from '@/services/Session'

import router from '@/router'

const state = {
    currentUser: {
        empty: true
    },
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
    createUserDatabase({ commit, dispatch }, payload){
        let snapshot = db.value()
        const path = Vue.$cookies.get('redirectPath')
        if (snapshot.data && !snapshot.data.name) {
            db.set('data.name', payload.name).write()
            db.set('data.code', payload.code).write()

            commit('SET_USER', db.value())
            
            // Update Cookies
            Vue.$cookies.set('userName', payload.name)
            Vue.$cookies.set('userCode', payload.code)

            // Redirects
            if (path) {
                router.replace({ path })
                Vue.$cookies.remove('redirectPath')
            }

            return
        }

        db.defaults({
            data: {
                name: payload.name,
                unique_sessison_id: uniqid()
            },
            friends: {},
            books: {},
            write: {},
            pointings: {
                units: {},
                themes: {},
                modules: {},
                activities: {},
            }
        }).write()

        // Create Cookies
        Vue.$cookies.set('userName', payload.name)

        // Redirects
        if (path) {
            router.replace({ path })
            Vue.$cookies.remove('redirectPath')
        }

        dispatch('recoveryUserDatabase')
    },

    destroyUserDatabase({ commit, dispatch }) {
        resetUser()        
        commit('SET_USER', null)        
        dispatch('Pointings/resetPointings', null, { root: true })   
            
        // delete cookies
        Vue.$cookies.remove('userName')
        // go to first
        // router.replace({ name: 'home-page'}) 
    },

    recoveryUserDatabase({ commit, dispatch }){
        let payload = db.value()
        if (payload.data && payload.data.name) {
            commit('SET_USER', payload)
            dispatch('Books/fetchBooks', null, { root: true })
            dispatch('WriteModule/createWriteModule', null, { root: true })
        }
    },
    addFriend({ commit }, friend){
        commit('ADD_FRIEND', friend)
    }
}

const getters = {
    friends({ currentUser }){
        return currentUser ? values(currentUser.friends) : []
    }
}

function resetUser() {
    return db.set('data.name', null)
        .set('friends', {})
        .set('books', {})
        .set('write', {})
        .set('pointings', {
            units: {},
            themes: {},
            modules: {},
            activities: {},
        }).write()
}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}