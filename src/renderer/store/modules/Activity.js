import { findIndex } from 'lodash'
import API from '@/services/Http'

const state = {
    activity: null,
    answer: [],
    log: {
        errors: {
            total: 0
        }
    }
}

const mutations = {
    REGISTER_ANSWER(state, { ref, key, data }) { // ref= uid_response, type_response, id_response
        let indexOf = findIndex(state.answer, { ref: ref })
        state.answer[indexOf][key].data = data
    },
    SET_ANSWER_FAIL_STATUS(state, { key, value, ref }) {
        let indexOfAnswer = findIndex(state.answer, { ref: ref })
        let indexOfKey    = findIndex(state.activity.items.keys, { id: key.data.id })
        let indexOfValue  = findIndex(state.activity.items.values, { id: value.data.id })

        // set answer with fail answer
        state.answer[indexOfAnswer].$invalid = true
        state.answer[indexOfAnswer].$invalid = true
        // set key with fail
        state.activity.items.keys[indexOfKey].$invalid = true
        // set value with fail
        state.activity.items.values[indexOfValue].$invalid = true

        console.log(state.activity.items.values, state.activity.items.keys)
    },
    SET_ANSWER_SUCCESS_STATUS(state, { key, value, ref }) {
        let indexOfAnswer = findIndex(state.answer, { ref: ref })
        let indexOfKey = findIndex(state.activity.items.keys, { id: key.data.id })
        let indexOfValue = findIndex(state.activity.items.values, { id: value.data.id })

        // set answer with fail answer
        state.answer[indexOfAnswer].$valid = true
        state.answer[indexOfAnswer].$valid = true
        // set key with fail
        state.activity.items.keys[indexOfKey].$valid = true
        // set value with fail
        state.activity.items.values[indexOfValue].$valid = true
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
            let { module_slug, theme_slug, unit_slug, position } = payload
            let { data } = await API.get(`/game/${module_slug}/${theme_slug}/${unit_slug}/${position}`)
            commit('SET_ACTIVITY', Object.assign(data.question, { position: position }))
        } catch (error) {
            console.warn(error)
        }
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

export default {
    namespaced: true,
    state,
    actions,
    mutations
}