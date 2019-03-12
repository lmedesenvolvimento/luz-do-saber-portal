const fs = require('fs');
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

readAsyncLocalJSON();

function readAsyncLocalJSON(){
    fs.readFile('./db.json', 'utf8', function (err, data) {
        if (err) throw err;
        db.setState(JSON.parse(data));
    });    
}

module.exports = db;