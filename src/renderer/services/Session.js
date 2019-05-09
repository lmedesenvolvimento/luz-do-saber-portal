import lowdb from 'lowdb'
import SessionStorageAdapter from './SessionStorageAdapter'

let adapter = new SessionStorageAdapter('currentUser')
let db = lowdb(adapter)

export function createDatabase(payload){
    db.defaults({
        currentUser: {
            name: payload.name
        },
        friends: {}
    }).write()
}

export default db