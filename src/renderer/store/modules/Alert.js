const state = {
    isVisibleActivityAlertFail: false,
    isVisibleActivityAlertSuccess: false,
    moduleIdClicked: { unit_id: 0, theme_id: 0, module_id: 0 },
}

const mutations = {    
    SET_ALERT_ACTIVITY_SUCCESS(state, isVisible){
        state.isVisibleActivityAlertSuccess = isVisible        
    },

    SET_ALERT_ACTIVITY_FAIL(state, isVisible){
        state.isVisibleActivityAlertFail = isVisible
    },

    setModuleIdClicked(state, moduleId){
        state.moduleIdClicked = moduleId
    }
}

const actions = {
    showAlertActivitySuccess({commit}){
        commit('SET_ALERT_ACTIVITY_SUCCESS', true)
    },
    
    showAlertActivityFail({commit}){
        commit('SET_ALERT_ACTIVITY_FAIL', true)
    },

    hideAlertActivitySuccess({commit}){
        commit('SET_ALERT_ACTIVITY_SUCCESS', false)
    },
    
    hideAlertActivityFail({commit}){
        commit('SET_ALERT_ACTIVITY_FAIL', false)
    }
}

export default {
    state,
    mutations,
    actions
}