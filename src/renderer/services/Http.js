import axios from 'axios'

let Http = {
    axios: {}
}

// ! DEPRECATED
// import { setupCache } from 'axios-cache-adapter'

// const cache = setupCache({
//     maxAge: 15 * 60 * 1000
// })

// const api = axios.create({
//     adapter: cache.adapter,
//     baseURL: process.env.BUILD_TARGET === 'web' ? process.env.BASE_API_URL : `${process.env.BASE_API_URL}/api`
// })

export function asyncAxios(callback) {
    console.log(process.env.BUILD_TARGET, process.env.NODE_ENV)
    if (process.env.BUILD_TARGET === 'web' && process.env.NODE_ENV === 'production') {
        axios.get('/site').then(({ data }) => {
            Http.axios = axios.create({
                baseURL: data.api_url
            })
    
            if (callback) return callback()
        })
    }

    else if (process.env.BUILD_TARGET === 'web') {
        Http.axios = axios.create({
            baseURL: `${process.env.BASE_API_URL}`
        })
        
        if (callback) return callback()
    }

    Http.axios = axios.create({
        baseURL: `${process.env.BASE_API_URL}/api`
    })

    if (callback) return callback()
}



export default Http