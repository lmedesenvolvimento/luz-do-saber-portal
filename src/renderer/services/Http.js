import axios from 'axios'
import { setupCache } from 'axios-cache-adapter'

const cache = setupCache({
    maxAge: 15 * 60 * 1000
})

const api = axios.create({
    adapter: cache.adapter,
    baseURL: process.env.BASE_API_URL ? process.env.BASE_API_URL : 'https://luz-do-saber-staging.herokuapp.com'
    //baseURL: process.env.BASE_API_URL ? process.env.BASE_API_URL : 'http://10.101.59.15:3001'
})

export default api