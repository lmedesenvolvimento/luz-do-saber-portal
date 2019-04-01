import Vue from 'vue'
import { filter, findIndex, clone } from 'lodash'
import API from '@/services/Http'
import qs from 'qs'

const state = {
    activity: null,
    answer: [],
    selection: {},
    log: {
        timer: {
            totalSeconds: 0
        },
        errors: {
            total: 0
        }
    }
}

// Ler documentação quando for nessessário atualizar Lista ou multinível
// https://br.vuejs.org/v2/guide/list.html#Limitacoes
// https://br.vuejs.org/v2/guide/reactivity.html#Como-as-Alteracoes-sao-Monitoradas

const mutations = {        
    SET_ANSWERS(state, payload){
        state.answer = payload
    },

    SET_ACTIVITY(state, activity){
        state.activity = activity
    },

    REGISTER_ANSWER(state, { type, data }) { // ref= uid_response, type_response, id_response
        // let indexOf = findIndex(state.answer, { ref: ref })
        // state.answer[indexOf][key].data = data
        state.selection[type] = data
    },
    
    // Dispatch success process on question finish
    TRIGGER_SUCCESS(state){
        return false
    },

    // Dispatch fail process
    TRIGGER_FAIL(state){
        state.log.errors.total += 1
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
    },
    
    // update specific answer
    setAnswer({ commit, dispatch }, { vm, type, data }){
        let answer = clone(state.answer)
        let indexOfAnswer = findIndex(state.answer, a => a.value.data.includes(data))
        
        if (indexOfAnswer === -1){
            vm.invalid = true
            // register total error
            dispatch('emitFail')
        } else {
            // notify user feedback
            vm.valid = true
            // register in store
            answer[indexOfAnswer].valid = true
            // force reactive changes
            Vue.set(answer, indexOfAnswer, answer)
        }
       
        // Check if activity is finish
        let totalCorrectItems = filter(state.answer, { valid: true }).length
        
        if (totalCorrectItems === state.activity.total_correct_items ){
            dispatch('emitSuccess')
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
    emitSuccess({commit, dispatch}){
        commit('TRIGGER_SUCCESS')
        dispatch('showAlertActivitySuccess', null, { root: true })
    },
    
    emitFail({commit}){
        commit('TRIGGER_FAIL')
    }    
}


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