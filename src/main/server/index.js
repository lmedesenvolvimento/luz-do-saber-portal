const path = require('path')
const express = require('express')
const PORT = 9000

const boostrapAPI = () => {
    const app = express()
    const static_path = process.env.NODE_ENV === 'development' 
        ? path.resolve(__dirname, '..', '..', '..', 'static') 
        : path.join(__dirname, 'static')

    
    const __static = express.static(static_path)

    app.get('/ping', (req, res) => {
        res.send('Hello Electron')
    })
    
    app.use(__static)

    app.listen(PORT, () => {
        console.log(`API up listening on port ${PORT}!`)
    })

    return app
}

module.exports = boostrapAPI