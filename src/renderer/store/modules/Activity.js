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
    }
}


const actions = {
    selectActivity({ commit }, activity) {
        commit('SELECT_ACTIVITY', activity)
    },
    emitSuccess({commit}){
        commit('TRIGGER_SUCCESS')
    },
    emitFail({commit}){
        commit('TRIGGER_FAIL')
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}