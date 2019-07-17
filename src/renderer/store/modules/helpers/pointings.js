import { chain, pick } from 'lodash'

export function findById(state, id, type){
    return chain(state[type])
        .values()
        .find({ id: id })
        .value()
}
export function findIndexById(state, id, type){
    return chain(state[type])
        .values()
        .findIndex({ id: id })
        .value()
}

export function mapActivity(activity){
    let result = pick(activity, ['id', 'pointings', 'timer', 'theme_id', 'unit_id', 'module_id'])
    result.pointings = observerClean(result.pointings)
    result.timer = observerClean(result.timer)
    return result
}

export function observerClean(obj) {
    return Object.keys(obj).reduce(
        (res, e) => Object.assign(res, { [e]: obj[e] }),
        {}
    )
}