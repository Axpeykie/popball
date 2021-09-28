import { AxiosPromise } from 'axios'
import axios, { ResponseData } from '@/utils/axios'

interface LoginData {
  name: String
  passwd: String
}

export const login = (data: LoginData): AxiosPromise<ResponseData> => {
  return axios.request({
    url: '',
    data,
    method: 'POST'
  })
}
