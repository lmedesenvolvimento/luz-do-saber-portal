import qs from 'qs'
import { find, values } from 'lodash'

import db from '@/services/Session'

export const PointingsTypes = {
    LostByAttempt: 'lost_a_star_by_attempt',
    LostByTime: 'lost_a_star_by_time'
}

export const ClusterTypes = [
    'atividade-texto-imagem'
]

export const MaxStars = 3

export const initialStateLog = {
    timer: {
        totalSeconds: 0
    },
    errors: {
        total: 0
    },
    pointings: {
        totalStars: 0
    }
}

// Validations
export function validationInAnswer({ state, commit }, { vm, type, data }) {
    let answer = find(values(state.answers), a => a.value.data.includes(data))

    if (!answer) {
        vm.invalid = true
        // register total error
        commit('TRIGGER_FAIL')
    } else {
        // notify user feedback
        vm.valid = true
        commit('COMPUTED_ANSWER', answer.ref)
    }
}

export function validationInSelection({ state, commit }, { vm, type, data }) {
    let { selection } = state

    selection[type] = {
        data,
        vm
    }

    vm.selected = true

    if (selection.key && selection.value) {
        let answer = find( values(state.answers), a => a.key.data === selection.key.data)
        let isCorrect = answer && state.answers[answer.ref].value.data.includes(selection.value.data)

        if (isCorrect) {
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

// HTTP REQUESTS
export function getExtenalParams(question) {
    let external_params = []
    let user = db.value()

    switch (question.external_param_type) {
    case 'substantivo_proprio':
        external_params.push({ 'name': user.data.name })
        break
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