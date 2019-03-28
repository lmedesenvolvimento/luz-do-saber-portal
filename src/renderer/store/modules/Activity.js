import Vue from 'vue'
import { findIndex, clone } from 'lodash'
import API from '@/services/Http'
import qs from 'qs'

const state = {
    activity: null,
    answer: [],
    log: {
        errors: {
            total: 0
        }
    }
}

// Ler documentação quando for nessessário atualizar Lista ou multinível
// https://br.vuejs.org/v2/guide/list.html#Limitacoes
// https://br.vuejs.org/v2/guide/reactivity.html#Como-as-Alteracoes-sao-Monitoradas

const mutations = {
    REGISTER_ANSWER(state, { ref, key, data }) { // ref= uid_response, type_response, id_response
        let indexOf = findIndex(state.answer, { ref: ref })
        state.answer[indexOf][key].data = data
    },
    SET_ANSWER_FAIL_STATUS(state, { key, value, ref }) {        
        let answer = clone(state.answer)
        let activity = clone(state.activity)

        let indexOfAnswer = findIndex(answer, { ref: ref })
        let indexOfKey    = findIndex(activity.items.keys, { id: key.data.id })
        let indexOfValue  = findIndex(activity.items.values, { id: value.data.id })

        // set answer with fail answer
        answer[indexOfAnswer].$invalid = true
        // set key with fail
        activity.items.keys[indexOfKey].$invalid = true
        // set value with fail
        activity.items.values[indexOfValue].$invalid = true

        Vue.set(state, 'answer', answer)
        Vue.set(state, 'activity', activity)
    },
    SET_ANSWER_SUCCESS_STATUS(state, { key, value, ref }) {
        let answer = clone(state.answer)
        let activity = clone(state.activity)

        let indexOfAnswer = findIndex(answer, { ref: ref })
        let indexOfKey = findIndex(activity.items.keys, { id: key.data.id })
        let indexOfValue = findIndex(activity.items.values, { id: value.data.id })

        // set answer with success answer
        answer[indexOfAnswer].$valid = true
        // set key with fail
        activity.items.keys[indexOfKey].$valid = true
        // set value with fail
        activity.items.values[indexOfValue].$valid = true


        Vue.set(state, 'answer', answer)
        Vue.set(state, 'activity', activity)
    },
    SET_ANSWERS(state, payload){
        state.answer = payload
    },
    SET_ACTIVITY(state, activity){
        state.activity = activity
    },
    TRIGGER_SUCCESS(state){
        state.answer.isValid = true
        state.answer.isInvalid = !state.answer.isValid
    },
    TRIGGER_FAIL(state){
        state.answer.isValid = false
        state.answer.isInvalid = !state.answer.isValid
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
    destroyActivity({ commit }){
        commit('SET_ACTIVITY', null)
        commit('SET_ANSWERS', [])
    },
    setAnswer({ commit, dispatch }, payload){
        commit('REGISTER_ANSWER', payload)
        dispatch('triggerValidation')
    },
    setAnswers({ commit }, payload){
        commit('SET_ANSWERS', payload)
    },
    emitSuccess({commit, dispatch}){
        commit('TRIGGER_SUCCESS')
        dispatch('showAlertActivitySuccess', null, { root: true })
    },
    emitFail({commit, dispatch}){
        commit('TRIGGER_FAIL')
        dispatch('showAlertActivityFail', null, { root: true })
    },
    triggerValidation({ state, dispatch, commit }){        
        let errors = state.answer.map((response) => isValidate(response, commit))
        // check if all reponses is answered
        if (errors.length === state.activity.total_correct_items) {
            // if all responses is right
            if (!errors.includes(false)) {
                dispatch('emitSuccess')
            }
        }
    }
}

const isValidate = (response, commit) => {
    let { key, value, ref } = response
    if (key.data && value.data) {
        // if value id is present in key
        if (key.data.value_ids.includes(value.data.id)) {
            commit('SET_ANSWER_SUCCESS_STATUS', { key, value, ref })
            return true
        } else {            
            commit('SET_ANSWER_FAIL_STATUS', { key, value, ref })
            commit('TRIGGER_FAIL')
            return false
        }
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