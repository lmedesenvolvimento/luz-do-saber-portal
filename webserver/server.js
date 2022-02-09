'use strict'
const express = require('express')
const expressStaticGzip = require('express-static-gzip')
const dotenv = require('dotenv')
const path = require('path')

dotenv.config()

// Constants
const PORT = process.env.PORT || 80
const HOST = '0.0.0.0'

// App
const app = express()

app.use(expressStaticGzip(path.join(__dirname, 'public'), {
    enableBrotli: true
}))

app.get('/site', (req, res) => {
    res.send({
        api_url: process.env.BASE_API_URL,
        GA: process.env.GA
    })
})

app.get('*', (req, res) => {
    res.redirect('/')
})

app.listen(PORT, HOST)
console.log(`Running on http://${HOST}:${PORT}`)