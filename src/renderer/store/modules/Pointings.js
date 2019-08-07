import Vue from 'vue'
import { clone, chain, keys } from 'lodash'
import uniqid from 'uniqid'

import { findById, findIndexById } from './helpers/pointings'

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
    update(state, payload) {
        const { data, type, uid } = payload
        const collection = clone(state[type])
        collection[uid] = data

        Vue.set(state, type, collection)

        // sync with lowdb
        db.set(`pointings.${type}.${uid}`, data).write()
    },
    merge(state, payload){
        const { data, type } = payload
        Vue.set(state, type, data)
    },
    reset(state){
        Vue.set(state, 'activities', Object.assign({}))
        Vue.set(state, 'units', {}, Object.assign({}))
        Vue.set(state, 'themes', {}, Object.assign({}))
        Vue.set(state, 'modules', {}, Object.assign({}))
        console.log('IS DISPATCH')
    }
}

const actions = {
    add({ commit, dispatch }, payload){
        const { data, type } = payload
        if (!findById(state, data.id, type)) {
            return commit('add', payload)
        }
        return dispatch('update', payload)
    },
    update({ commit }, payload) {
        const { data, type } = payload
        const indexOf = findIndexById(state, data.id, type)
        const uid = keys(state[type])[indexOf]
        commit('update', { ...payload, uid })
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
    },
    resetPointings({ commit }){
        console.log('resetPointings')
        commit('reset')
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
    getUnitsByThemeId (state) {
        return id => {
            return chain(state.units)
                .values()
                .filter({ theme_id: id })
                .value()
        }
    },
    getThemesByModuleId (state) {
        return (id, target_audience) => {
            const response = chain(state.themes)
                .values()
                .filter({ modulo_id: id })

            return target_audience
                ? response.filter({ target_audience }).value()
                : response.value()
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