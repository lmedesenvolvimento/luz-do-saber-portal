import { chain, pick } from 'lodash'

export function findById(state, id, type){
    return chain(state[type])
        .values()
        .find({ id: id })
        .value()
}

export function mapActivity(activity){
    return pick(activity, ['id', 'pointings', 'timer', 'theme_id', 'unit_id','module_id'])
}