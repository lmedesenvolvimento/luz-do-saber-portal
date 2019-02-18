const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('./db.json')
const db = low(adapter)

// Generate Tables
db.defaults({ posts: [], user: {}, count: 0 })
    .write()

export default db;