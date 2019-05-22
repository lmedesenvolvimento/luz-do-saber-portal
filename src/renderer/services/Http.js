import axios from 'axios'
import { setupCache } from 'axios-cache-adapter'

const cache = setupCache({
    maxAge: 15 * 60 * 1000
})

const api = axios.create({
    adapter: cache.adapter,
    baseURL: process.env.BASE_API_URL ? process.env.BASE_API_URL : 'https://luz-do-saber-staging.herokuapp.com'
})

export default api