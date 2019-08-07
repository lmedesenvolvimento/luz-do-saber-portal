import { values } from 'lodash'

import db from '@/services/Session'

const state = {
    modules: {
        editor: {
            key: 'editor',
            title: 'Editor de Texto',
            icon: require('@/assets/images/write-module-icon-editor-texto.png'),
            completed: false,
            data: {}
        },
        jornal: {
            key: 'jornal',
            title: 'Jornal',
            icon: require('@/assets/images/write-module-icon-jornal.png'),
            completed: false,
            data: {}
        },
        lista: {
            key: 'lista',
            title: 'Lista',
            icon: require('@/assets/images/write-module-icon-lista.png'),
            completed: false,
            data: {}
        },
        cartao: {
            key: 'cartao',
            title: 'Cartão de Visita',
            icon: require('@/assets/images/write-module-icon-cartao-visita.png'),
            completed: false,
            data: {}
        }
    }
}

const mutations = {
    SET_MODULES(state, payload) {
        state.modules = payload
    },
    SET_MODULE(state, { ref, data }){
        state.modules[ref] = Object.assign({}, state.modules[ref], data)
        // sync with store
        db.set('write', state.modules).write()
    }
}

const actions = {
    createWriteModule({ commit, state }){
        let write = db.get('write').value()
        if(!values(write).length){
            db.set('write', state.modules).write()
        } else {
            commit('SET_MODULES', db.get('write').value())
        }
    },
    setWriteModule({ commit }, payload){
        commit('SET_MODULE', payload)
    }
}

const getters = {
    getWriteModules(state) {
        return values(state.modules)
    },
    getWriteModuleByRef(state) {
        return ref => {
            console.log(ref)
            return state.modules[ref]
        }
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}