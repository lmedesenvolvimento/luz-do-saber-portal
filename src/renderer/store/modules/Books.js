import Vue from 'vue'
import uniqid from 'uniqid'
import { find, values } from 'lodash'

import Http from '@/services/Http'
import db from '@/services/Session'

const state = {
    books: {}
}

const mutations = {
    SET_BOOKS(state, payload) {
        state.books = payload
    },
    SET_BOOK(state, { ref, data }){
        let { books } = state
        books[ref] = Object.assign({}, books[ref], data)
        // write in session
        db.set('books', books)
        // write in store
        Vue.set(state, 'books', books)
    }
}

const actions = {
    async fetchBooks({ commit, state }) {
        let books = db.get('books').value()
        if (!values(books).length) {
            let { data } = await Http.axios.get('/game/biblioteca')
            let payload = convertBooksToHashMap(data.livros)
            // write in session
            db.set('books', payload).write()
            // write in store
            commit('SET_BOOKS', payload)
            return data.livros
        } else {
            commit('SET_BOOKS', books)
            return state.books
        }

    },
    setBook({ commit }, payload){
        commit('SET_BOOK', payload)
    }
}

const getters = {
    getBooks(state ){
        return values(state.books)
    },
    getBookById(state){
        return id => {
            return find(values(state.books), { id })
        }
    }
}

const convertBooksToHashMap = books => {
    let payload = {}
    books && books.forEach(b => {
        const ref = uniqid()
        b.ref = ref
        payload[ref] = b
    })
    return payload
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}