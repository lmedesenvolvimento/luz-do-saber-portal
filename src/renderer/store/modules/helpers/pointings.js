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
    const result = pick(activity, ['errors', 'id', 'module', 'module_id', 'order', 'pointings', 'theme', 'theme_id', 'timer', 'title', 'unit', 'unit_id'])
    // for(const key in result) {
    //     result[key] = observerClean(result[key])
    // }
    result.pointings = observerClean(result.pointings)
    result.timer = observerClean(result.timer)
    result.errors = observerClean(result.errors)
    result.title = observerClean(result.title)
    return result
}

export function observerClean(obj) {
    return Object.keys(obj).reduce(
        (res, e) => Object.assign(res, { [e]: obj[e] }),
        {}
    )
}