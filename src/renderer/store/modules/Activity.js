import { clone, findIndex } from 'lodash'

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
    SET_ANSWER_FAIL_STATUS(state, ref) {
        let indexOf = findIndex(state.answer, { ref: ref })
        state.answer[indexOf].key.$invalid = true
        state.answer[indexOf].value.$invalid = true
    },
    SET_ANSWER_SUCCESS_STATUS(state, ref) {
        let indexOf = findIndex(state.answer, { ref: ref })
        state.answer[indexOf].key.$valid = true
        state.answer[indexOf].value.$valid = true
    },
    SET_ANSWERS(state, payload){
        state.answer = payload
    },
    SELECT_ACTIVITY(state, activity){
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
    selectActivity({ commit }, activity) {
        commit('SELECT_ACTIVITY', activity)
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
            commit('SET_ANSWER_SUCCESS_STATUS', ref)
            return true
        } else {            
            commit('SET_ANSWER_FAIL_STATUS', ref)
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