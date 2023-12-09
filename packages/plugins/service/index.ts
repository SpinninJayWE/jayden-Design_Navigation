import axios from 'axios'
import {AuthStorage} from "../../main-navigation/src/providers/user";

const isProduction = import.meta.env.PROD

export const BASE_URL = isProduction ?
'http://101.35.11.56:1337':  'http://localhost:1337'

export const request = axios.create({
  baseURL: BASE_URL + '/api',
  // 超时时间不限制
  timeout: 0
})

if (AuthStorage.getJwt()) {
  request.defaults.headers.Authorization = `Bearer ${AuthStorage.getJwt()}`
}

export default request
