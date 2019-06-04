import Vue from 'vue'
import { clone, chain } from 'lodash'

import { findById } from './helpers/pointings'

const state = {
    activities: {},
    units: {},
    themes: {},
    modules: {},
}

const mutations = {
    add(state, payload){
        const { data, type } = payload
        const collection = clone(state[type])
        collection[data.id] = data
        Vue.set(state, type, collection)
    }
}

const actions = {
    add({ commit }, payload){
        const { data, type } = payload
        return findById(state, data.id, type) ? false : commit('add', payload)
    }
}

const getters = {
    getPointingsActivitiesByUnitId(state){
        return unit_id => {
            return chain(state.activities)
                .values()
                .filter({ unit_id: unit_id })
                .value()
        }
    },
    getPointingsActivity(state, id){
        return findById(state, id, 'activities')
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}