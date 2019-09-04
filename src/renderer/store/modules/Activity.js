import Vue from 'vue'
import { filter, find, clone, values } from 'lodash'
import API from '@/services/Http'

import {
    ClusterTypes,
    PointingsTypes,
    initialStateLog,
    MaxStars,
    validationInAnswer,
    validationInSelection,
    clearConnection,
    getExtenalParams
} from './helpers'

import {
    mapActivity
} from './helpers/pointings'


const state = {
    activity: null,
    answers: null,
    connections: [],
    log: Object.assign({}, initialStateLog),
    selection: {}
}


// Ler documentação quando for nessessário atualizar Lista ou multinível
// https://br.vuejs.org/v2/guide/list.html#Limitacoes
// https://br.vuejs.org/v2/guide/reactivity.html#Como-as-Alteracoes-sao-Monitoradas

const mutations = {
    SET_ANSWERS(state, payload){
        state.answers = payload
    },

    SET_ACTIVITY(state, activity){
        Vue.set(state, 'activity', activity)
    },

    INCREMENT_TIMER(state){
        state.log.timer.totalSeconds += 1
    },

    COMPUTED_ANSWER(state, ref){
        // force update complext object
        let answers = clone(state.answers)
        answers[ref].valid = true
        Vue.set(state, 'answers', answers)
    },

    CLEAR_SELECTION(state) {
        state.selection.key.vm.selected = false
        state.selection.value.vm.selected = false
        Vue.set(state, 'selection', {})
    },

    CLEAR_CONNECTIONS(state) {
        clearConnection(state)
    },

    CLEAR_LOG(state){
        state.log.errors.total = 0
        state.log.timer.totalSeconds = 0
    },

    // Dispatch success process on question finish
    TRIGGER_SUCCESS(state){
        let { pointings } = state.activity
        let penalty = 0
        let lostByAttempt = find(pointings, { type: PointingsTypes.LostByAttempt })
        let lostByTime = find(pointings, { type: PointingsTypes.LostByTime })

        if (lostByAttempt && lostByAttempt.quantity) {
            penalty += Math.floor(state.log.errors.total / lostByAttempt.quantity)
        }

        if (lostByTime && lostByTime.quantity) {
            penalty += Math.floor(state.log.timer.totalSeconds / lostByTime.quantity)
        }

        let totalStars = (MaxStars - penalty)

        state.log.pointings.totalStars = totalStars < 0 ? 0 : totalStars

        return totalStars
    },

    // Dispatch fail process
    TRIGGER_FAIL(state){
        state.log.errors.total ++
    }

}


const actions = {
    async fetchActivity({ commit, dispatch }, payload) {
        try{
            commit('CLEAR_CONNECTIONS')

            let { module_slug, theme_slug, unit_slug, position } = payload.params
            let extenalParams = getExtenalParams(payload.question)
            let { data } = await API.get(`/game/${module_slug}/${theme_slug}/${unit_slug}/${position}.json`, extenalParams)

            commit('SET_ACTIVITY', Object.assign(data.question, { position: position }))
        } catch (error) {
            console.warn(error)
        }

        return true
    },

    // clear list answer
    destroyActivity({ commit }){
        commit('SET_ACTIVITY', null)
        commit('SET_ANSWERS', null)
        commit('CLEAR_CONNECTIONS')
        commit('CLEAR_LOG')
    },

    // update specific answer
    setAnswer({ commit, dispatch, state }, payload){
        // Check if activity types is agroup
        if (ClusterTypes.includes(state.activity.type.slug)) {
            validationInSelection({ state, dispatch, commit }, payload)
        } else {
            validationInAnswer({ state, dispatch, commit }, payload)
        }

        // Check if activity is finish
        let totalCorrectItems = filter(values(state.answers), { valid: true }).length

        if (totalCorrectItems === state.activity.total_correct_items){
            dispatch('triggerSuccess')
        }
    },

    // update list answer
    setAnswers({ commit }, payload){
        let answers = {}
        // Covert array for hash object
        payload.forEach((answer)=> {
            answers[answer.ref] = answer
        })

        commit('SET_ANSWERS', answers)
    },

    setActivityAttrs({ commit, state }, attrs){
        let newState = Object.assign(clone(state.activity), attrs)
        commit('SET_ACTIVITY', newState)
    },

    // Timer Actions
    updateTimer({ commit }, miliseconds){
        commit('SET_TIMER', miliseconds)
    },

    // Feedback Actions
    triggerSuccess({commit, dispatch, state}){
        commit('TRIGGER_SUCCESS')

        // register user progress
        const activity = clone(state.activity)
        const newActivity = Object.assign(activity, state.log)
        const payload = { data: mapActivity(newActivity), type: 'activities' }

        dispatch('Pointings/add', payload, { root: true })
        dispatch('showAlertActivitySuccess', null, { root: true })
    },

    incrementTimer({ commit }){
        commit('INCREMENT_TIMER')
    }
}

const getters = {
    totalStars(state){
        return state.log.pointings.totalStars
    }
}
export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}