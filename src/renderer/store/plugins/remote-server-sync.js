import { debounce } from 'lodash'
import Http from '@/services/Http'

const WAIT = 3000
const MAX_WAIT = 15000

const persistRemote = debounce(function(mutation, state) {
    const { data, pointings } = state.User.currentUser

    Http.post('/game/user_game', {
        name: data.name,
        unique_session_id: data.unique_sessison_id,
        game: pointings
    })

}, WAIT, { 'maxWait': MAX_WAIT })

const RemoteServerSync = store => {
    store.subscribe((mutation, state) => {
        const { type } = mutation
        if (/^Pointings/.test(type) || /^User/.test(type)) {
            persistRemote(mutation, state)
        }
    })
}


export default RemoteServerSync