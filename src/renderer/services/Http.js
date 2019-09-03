import axios from 'axios'
import { setupCache } from 'axios-cache-adapter'

const cache = setupCache({
    maxAge: 15 * 60 * 1000
})

const api = axios.create({
    adapter: cache.adapter,
    baseURL: process.env.BUILD_TARGET === 'web' ? process.env.BASE_API_URL : `${process.env.BASE_API_URL}/api`
})

export default api