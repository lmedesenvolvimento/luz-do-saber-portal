import Vue from 'vue'
import { clone, chain } from 'lodash'
import uniqid from 'uniqid'

import { findById } from './helpers/pointings'

import db from '@/services/Session'

const state = {
    activities: {},
    units: {},
    themes: {},
    modules: {},
}

const mutations = {
    add(state, payload){
        const uid = uniqid()
        const { data, type } = payload
        const collection = clone(state[type])
        collection[uid] = data
        
        Vue.set(state, type, collection)

        // sync with lowdb
        db.set(`pointings.${type}.${uid}`, data).write()
    },
    merge(state, payload){
        const { data, type } = payload
        Vue.set(state, type, data)
    }
}

const actions = {
    add({ commit }, payload){
        const { data, type } = payload
        if (!findById(state, data.id, type)) {
            commit('add', payload)
        }
    },
    recoveryPointingsDatabase({ commit }){
        const units = db.get('pointings.units').value()
        const themes = db.get('pointings.themes').value()
        const modules = db.get('pointings.modules').value()
        const activities = db.get('pointings.activities').value()

        if (units) {
            commit('merge', { data: units, type: 'units' })
            commit('merge', { data: themes, type: 'themes' })
            commit('merge', { data: modules, type: 'modules' })
            commit('merge', { data: activities, type: 'activities' })
        }
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