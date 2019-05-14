import Vue from 'vue'
import qs from 'qs'
import { filter, find, values } from 'lodash'

import db from '@/services/Session'
import LeaderLine from '@/services/LeaderLine'

export const PointingsTypes = {
    LostByAttempt: 'lost_a_star_by_attempt',
    LostByTime: 'lost_a_star_by_time'
}

export const ClusterTypes = [
    'atividade-texto-imagem',
    'atividade-texto-texto'
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

export function clearConnection(state) {
    state.connections.forEach(line => line.remove())
    Vue.set(state, 'connections', [])
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
    let dataIsPresent = values(selection).filter(v => v.data === data).length
    
    if (dataIsPresent) {
        return false
    }

    if (selection[type]) {
        vm.invalid = true
        selection[type].vm.invalid = true
        clearConnection(state)
    }

    selection[type] = {
        data,
        vm
    }

    vm.selected = true

    if (selection.key && selection.value) {
        let filterAsnswer = filter(values(state.answers), a => a.key.data === selection.key.data)
        
        let answer = find(
            filterAsnswer, 
            a => a.value.data.includes(selection.value.data)
        )

        if (answer) {
            // notify user feedback
            selection.key.vm.valid = true
            selection.value.vm.valid = true

            let leaderLine = new LeaderLine (
                selection.key.vm.$el,
                selection.value.vm.$el
            )

            state.connections.push(leaderLine)

            commit('CLEAR_SELECTION')
            commit('COMPUTED_ANSWER', answer.ref)
        } else {
            // notify user feedback
            selection.key.vm.invalid = true
            selection.value.vm.invalid = true

            let line = new LeaderLine(
                selection.value.vm.$el,
                selection.key.vm.$el
            )

            setTimeout( _=> line.remove(), 600)

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
        if (question.external_param_total < 1) {
            values(user.friends).forEach((friend) => {
                external_params.push({ 'name': friend.name })
            })
        }
        else {
            external_params.push({ 'name': user.data.name })
        }
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