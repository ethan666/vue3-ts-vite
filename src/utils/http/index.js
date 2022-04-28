import Request from './request'
import { getToken } from '@/utils/auth'
import { ElMessage } from 'element-plus'
import store from '@/store'

const resMesKey = 'resDesc'
const resDataKey = 'data'
const resCodeKey = 'resCode'
const resSuccessCode = 1

const onError = async (res) => {
  ElMessage.error(res[resMesKey] || 'Error')

  if (res[resCodeKey] == '11001') {
    await store.dispatch('user/resetToken')
    window.location.href = '/#/login'
  }
}
const request = new Request({
  baseUrl: import.meta.env.VITE_GLOB_API_URL,
  contentType: 'json',
  resMesKey,
  resSuccessCode,
  resDataKey,
  resCodeKey,
  timeout: 500000,
  onBefore(config) {
    const _token = getToken() || 'null'
    config.headers['Auth-Token'] = _token
  },
  onError
})

export const interceptors = (data) => {
  return new Promise((resolve, reject) => {
    if (resDataKey) {
      const res = data[resDataKey]
      if (data[resCodeKey] === resSuccessCode) {
        resolve(res)
      } else {
        onError(data)
        reject(data)
      }
    } else {
      resolve(data)
    }
  })
}

export default request
