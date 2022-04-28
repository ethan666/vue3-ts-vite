import { ElMessage } from 'element-plus'
import axios from 'axios'
import { stringify } from 'qs'

class Request {
  constructor(options) {
    const defaultConfig = {
      timeout: 500000,
      contentType: 'form',
      resSuccessCode: 1,
      resDataKey: 'data',
      resCodeKey: 'code',
      resMesKey: 'msg',
      onError(msg) {
        alert(msg)
      }
    }

    this.options = Object.assign(defaultConfig, options)
    this.instance = axios.create({
      baseURL: options.baseUrl,
      timeout: options.timeout
    })

    this.init()
  }

  init() {
    this.request()
    this.response()
  }

  request() {
    this.instance.interceptors.request.use((config) => {
      const { options } = this
      options.onBefore && options.onBefore(config)
      return config
    })
  }

  response() {
    this.instance.interceptors.response.use(
      (response) => {
        const data = response.data
        const { options } = this
        return new Promise((resolve, reject) => {
          if (['blob', 'stream', 'text'].includes(response.config.responseType)) {
            resolve(data)
          } else if (options.resDataKey) {
            const res = data[options.resDataKey]
            if (data[options.resCodeKey] === options.resSuccessCode) {
              resolve(res)
            } else {
              options.onError && options.onError(data)
              reject(data)
            }
          } else {
            resolve(data)
          }
        })
      },
      (err) => {
        return new Promise((_resolve, reject) => {
          if (err.response?.data?.msg) {
            ElMessage({
              message: '请求失败：' + err.response?.data?.msg || 'Error',
              type: 'error',
              duration: 5 * 1000
            })
            reject(err.response.data)
          } else if (err.message.includes('timeout')) {
            ElMessage({
              message: '请求超时',
              type: 'error',
              duration: 5 * 1000
            })
            reject(err.message)
          } else {
            reject(err)
          }
        })
      }
    )
  }

  __transformRequest(parameters) {
    const config = {}

    config.url = parameters.url

    switch (parameters.contentType || this.options.contentType) {
      case 'form':
        config.headers = {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
        config.data = stringify(parameters.params)
        break
      case 'json':
        config.headers = {
          'Content-Type': 'application/json'
        }
        config.data = JSON.stringify(parameters.params)
        break
      case 'multipart':
        config.headers = {
          'Content-Type': 'multipart/form-data'
        }
        // eslint-disable-next-line no-case-declarations
        const formData = new FormData()
        for (const key in parameters.params) {
          formData.append(key, parameters.params[key])
        }
        config.data = formData
        break
    }

    return config
  }

  post(parameters) {
    const config = this.__transformRequest(parameters)
    return this.instance.request({
      method: 'post',
      ...config
    })
  }

  get(parameters) {
    return this.instance.request({
      method: 'get',
      url: parameters.url,
      params: parameters.params
    })
  }

  http(parameters) {
    return this.instance.request(parameters)
  }
}

export default Request
