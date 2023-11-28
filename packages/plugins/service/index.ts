import axios from 'axios'
import {AuthStorage} from "main-navigation/src/providers/user";


export const BASE_URL = 'http://localhost:1337'

export const request = axios.create({
  baseURL: BASE_URL + '/api',
  timeout: 12 * 1000
})

if (AuthStorage.getJwt()) {
  request.defaults.headers.Authorization = `Bearer ${AuthStorage.getJwt()}`
}

export default request
