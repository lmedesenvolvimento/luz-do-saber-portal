import { clone } from 'lodash'

let initialAnswer = {
    value: null,
    isValid: null,
    isInvalid: null
}

const state = {
    activity: null,
    answer: clone(initialAnswer)
}

const mutations = {
    SELECT_ACTIVITY(state, activity){
        state.activity = activity
        state.answer = clone(initialAnswer)
    },
    TRIGGER_SUCCESS(state){
        state.answer.isValid = true
        state.answer.isInvalid = !state.answer.isValid
    },
    TRIGGER_FAIL(state){
        state.answer.isValid = false
        state.answer.isInvalid = !state.answer.isValid
    },
    RESET_ANSWER(state){
        state.answer = clone(initialAnswer)
    }
}


const actions = {
    selectActivity({ commit }, activity) {
        commit('SELECT_ACTIVITY', activity)
    },
    emitSuccess({commit, dispatch}){
        commit('TRIGGER_SUCCESS')
        dispatch('showAlertActivitySuccess', null, { root: true })
    },
    emitFail({commit, dispatch}){
        commit('TRIGGER_FAIL')
        dispatch('showAlertActivityFail', null, { root: true })
    },
    resetAnswer({ commit }){
        commit('RESET_ANSWER')
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}