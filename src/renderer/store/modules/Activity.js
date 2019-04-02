import Vue from 'vue'
import { filter, find, findIndex, clone } from 'lodash'
import API from '@/services/Http'
import qs from 'qs'

import { ClusterTypes, PointingsTypes, initialStateLog, MaxStars } from './helpers'


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

    REGISTER_ANSWER(state, { type, data }) { // ref= uid_response, type_response, id_response
        // let indexOf = findIndex(state.answer, { ref: ref })
        // state.answer[indexOf][key].data = data
        state.selection[type] = data
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

// Validations
function validationInAnswer({ state, dispatch, commit }, { vm, type, data }){
    let indexOfAnswer = findIndex(state.answer, a => a.value.data.includes(data))

    if (indexOfAnswer === -1) {
        vm.invalid = true
        // register total error
        commit('TRIGGER_FAIL')
    } else {
        // notify user feedback
        vm.valid = true

        commit('COMPUTED_ANSWER', indexOfAnswer)
    }
}

function validationInSelection({ state, dispatch, commit }, { vm, type, data }){
    let { selection } = state

    selection[type] = {
        data,
        vm
    }

    vm.selected = true

    if (selection.key && selection.value) {
        let indexOfAnswer = findIndex(state.answer, a => a.key.data === selection.key.data)
        let isCorrect = ( indexOfAnswer !== -1 ) && state.answer[indexOfAnswer].value.data.includes(selection.value.data)
        
        if (isCorrect){
            // notify user feedback
            selection.key.vm.valid = true
            selection.value.vm.valid = true
            
            commit('CLEAR_SELECTION')
            commit('COMPUTED_ANSWER', indexOfAnswer)
        } else {
            // notify user feedback
            selection.key.vm.invalid = true
            selection.value.vm.invalid = true

            commit('CLEAR_SELECTION')
            commit('TRIGGER_FAIL')
        }
    }
}



// Helpers
function getExtenalParams(question){
    let external_params = []

    switch (question.external_param_type) {
        case 'substantivo_proprio':
            external_params.push({ 'name': 'Ronaldo' })
            break;    
        default:
            break;
    }
    if (external_params.length) {
        return {
            params: { external_params },
            paramsSerializer: (params) => {
                return qs.stringify(params, { encode: false });
            }
        }
    } else { 
        return { params: null }
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}