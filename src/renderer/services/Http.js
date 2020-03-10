import axios from 'axios'

// ! DEPRECATED
// import { setupCache } from 'axios-cache-adapter'

// const cache = setupCache({
//     maxAge: 15 * 60 * 1000
// })

// const api = axios.create({
//     adapter: cache.adapter,
//     baseURL: process.env.BUILD_TARGET === 'web' ? process.env.BASE_API_URL : `${process.env.BASE_API_URL}/api`
// })

console.log(process.env.BASE_API_URL)

const api = axios.create({
    baseURL: process.env.BUILD_TARGET === 'web' ? process.env.BASE_API_URL : `${process.env.BASE_API_URL}/api`
})

export default api