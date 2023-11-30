import axios from 'axios'
import {AuthStorage} from "main-navigation/src/providers/user";


export const BASE_URL = 'http://localhost:1337'

export const request = axios.create({
  baseURL: BASE_URL + '/api',
  // 超时时间不限制
  timeout: 0
})

if (AuthStorage.getJwt()) {
  request.defaults.headers.Authorization = `Bearer ${AuthStorage.getJwt()}`
}

export default request
