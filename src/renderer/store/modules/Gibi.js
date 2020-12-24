import { v4 as uuidv4 } from 'uuid'

export class Page {
    constructor() {
        this.id = uuidv4(),
        this.background = null
        this.paths = []
    }
}

const state = {
    selectedShape: null,
    selectedPage: null,
    pages: []
}

const actions = {
    newPage({ commit }) {
        commit('ADD_PAGE', new Page())
    },
    nextPage({ commit, getters, state }) {
        if (getters.currentIndexPage < state.pages.length - 1) {
            commit('SELECT_PAGE_BY_INDEX', getters.currentIndexPage + 1)
        }
    },
    prevPage({ commit, getters }) {
        if (getters.currentIndexPage > 0) {
            commit('SELECT_PAGE_BY_INDEX', getters.currentIndexPage - 1)
        }
    },
    removePage({ commit, getters }) {
        commit('REMOVE_PAGE', getters.currentIndexPage)
    },
    updatePage({ commit, getters }, payload) {
        commit('UPDATE_PAGE', getters.currentIndexPage, payload)
    },
    selectPage({ commit }, id) {
        commit('SELECT_PAGE', id)
    },
    selectShape({ commit }, name) {
        commit('SELECT_SHAPE', name)
    }
}

const getters = {
    currentPage(state) {
        return state.pages.find(p => p.id === state.selectedPage)
    },
    currentIndexPage(state) {
        return state.pages.findIndex(p => p.id === state.selectedPage)
    }
}

const mutations = {
    ADD_PAGE(state, page) {
        state.pages = [...state.pages, page]
        state.selectedPage = page.id
    },
    REMOVE_PAGE(state, pageIndex) {
        state.pages.slice(pageIndex, 1)
        if (this.pages.length) {
            this.selectPage = state.pages[pageIndex] && state.pages[pageIndex].id
        }
    },
    UPDATE_PAGE(state, pageIndex, payload) {
        state.pages[pageIndex] = payload
    },
    SELECT_PAGE_BY_INDEX(state, newIndex) {
        state.selectedPage = state.pages[newIndex] && state.pages[newIndex].id
    },
    SELECT_PAGE(state, id) {
        state.selectedPage = id
    },
    SELECT_SHAPE(state, name) {
        state.selectedShape = name
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}