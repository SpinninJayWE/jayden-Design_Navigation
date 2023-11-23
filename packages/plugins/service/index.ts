import axios from 'axios'


const BASE_URL = 'http://localhost:1337/api'

export const request = axios.create({
  baseURL: BASE_URL,
  timeout: 12 * 1000
})

export default request
