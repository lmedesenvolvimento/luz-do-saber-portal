import Vue from 'vue'
import { filter, find, clone } from 'lodash'
import API from '@/services/Http'

import { 
    ClusterTypes, 
    PointingsTypes, 
    initialStateLog, 
    MaxStars,
    validationInAnswer,
    validationInSelection,
    getExtenalParams
} from './helpers'


const state = {
    activity: null,
    answer: [],
    selection: {},
    log: Object.assign({}, initialStateLog)
}


// Ler documentação quando for nessessário atualizar Lista ou multinível
// https://br.vuejs.org/v2/guide/list.html#Limitacoes
// https://br.vuejs.org/v2/guide/reactivity.html#Como-as-Alteracoes-sao-Monitoradas

const mutations = {        
    SET_ANSWERS(state, payload){
        state.answer = payload
    },

    SET_ACTIVITY(state, activity){
        Vue.set(state, 'activity', activity)
    },

    INCREMENT_TIMER(state, activity){
        state.log.timer.totalSeconds += 1
    },    

    COMPUTED_ANSWER(state, indexOfAnswer){
        let answer = clone(state.answer)
        // register in store
        answer[indexOfAnswer].valid = true
        // force reactive changes
        Vue.set(answer, indexOfAnswer, answer)
    },

    CLEAR_SELECTION(state) {
        state.selection.key.vm.selected = false
        state.selection.value.vm.selected = false
        Vue.set(state, 'selection', {})
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

        if (lostByAttempt) {
            penalty += Math.floor(state.log.errors.total / lostByAttempt.quantity)
        }

        if (lostByTime) {
            penalty += Math.floor(state.log.timer.totalSeconds / lostByTime.quantity)
        }

        let totalStars = (MaxStars - penalty)

        state.log.pointings.totalStars = totalStars < 0 ? 0 : totalStars

        return penalty
    },

    // Dispatch fail process
    TRIGGER_FAIL(state){
        state.log.errors.total ++
    }
    
}


const actions = {
    async fetchActivity({ commit }, payload) {
        try{
            let { module_slug, theme_slug, unit_slug, position } = payload.params
            let extenalParams = getExtenalParams(payload.question)            
            let { data } = await API.get(`/game/${module_slug}/${theme_slug}/${unit_slug}/${position}`, extenalParams)

            commit('SET_ACTIVITY', Object.assign(data.question, { position: position }))
        } catch (error) {
            console.warn(error)
        }
    },
    
    // clear list answer
    destroyActivity({ commit }){
        commit('SET_ACTIVITY', null)
        commit('SET_ANSWERS', [])
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
        let totalCorrectItems = filter(state.answer, { valid: true }).length
        
        if (totalCorrectItems === state.activity.total_correct_items){
            dispatch('triggerSuccess')
        }
    },
    
    // update list answer
    setAnswers({ commit }, payload){
        commit('SET_ANSWERS', payload)
    },

    // Timer Actions
    updateTimer({ commit }, miliseconds){
        commit('SET_TIMER', miliseconds)
    },
    
    // Feedback Actions
    triggerSuccess({commit, dispatch}){
        commit('TRIGGER_SUCCESS')
        dispatch('showAlertActivitySuccess', null, { root: true })
    },

    incrementTimer({ commit }){
        commit('INCREMENT_TIMER')
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}