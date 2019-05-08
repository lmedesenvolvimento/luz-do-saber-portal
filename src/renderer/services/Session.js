import lowdb from 'lowdb'
import SessionStorageAdapter from './SessionStorageAdapter'

let adapter = new SessionStorageAdapter('currentUser')
let db = lowdb(adapter)

export function createDatabase(firstName){
    db.defaults({
        data: {
            name: firstName
        },
        friends:[]
    }).write()
}

export default db