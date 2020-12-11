import md5 from 'md5'
import Vue from 'vue'
import axios from 'axios'
import store from '../store'
import { VueAxios } from './axios'
import notification from 'ant-design-vue/es/notification'
import {
  ACCESS_TOKEN,
  ACCESS_FORBIDDEN,
  ACCESS_KICK
} from '../store/mutation-types'

// 创建 axios 实例
const service = axios.create({
  // APP_API_BASE_URL项目中context.js声明
  // eslint-disable-next-line no-undef
  baseURL:
    process.env.NODE_ENV === 'development'
      ? process.env.VUE_APP_API_BASE_URL
      : '/sys', // api base_url
  timeout: process.env.NODE_ENV === 'development' ? 150000 : 180000 // 请求超时时间
})

const err = (error) => {
  if (error.code === 'ECONNABORTED') {
    notification.error({
      message: '系统异常',
      description: '请求超时,请重试!'
    })
    return Promise.reject(error)
  }
  if (error.response) {
    const data = error.response.data
    const token = Vue.ls.get(ACCESS_TOKEN)
    if (error.response.status === 500) {
      if (data) {
        if (data.message) {
          notification.error({
            message: '系统提示',
            description: data.message
          })
        } else {
          if (JSON.stringify(data) === '{}') {
            notification.error({
              message: '系统提示',
              description: '系统异常!'
            })
          } else {
            notification.error({
              message: '系统提示',
              description: data
            })
          }
        }
      } else {
        notification.error({
          message: '系统提示',
          description: '服务请求异常,请重新登陆!'
        })
      }
    }
    if (error.response.status === 403) {
      notification.error({
        message: '系统提示',
        description: data.message
      })
      store.dispatch('Logout').then(() => {
        setTimeout(() => {
          window.location.reload()
        }, 1500)
      })
    }
    if (error.response.status === 401) {
      notification.error({
        message: '系统提示',
        description: '授权认证失败'
      })
      if (token) {
        store.dispatch('Logout').then(() => {
          setTimeout(() => {
            window.location.reload()
          }, 1500)
        })
      }
    }
    if (error.response.status === 402) {
      store.dispatch('Logout').then(() => {
        setTimeout(() => {
          window.location.reload()
        })
      })
    }
  } else {
    if (!Vue.ls.get(ACCESS_TOKEN)) {
      if (
        !error.config.url.startsWith('/openapi') &&
        !error.config.url.startsWith('/login')
      ) {
        window.location.reload()
        return
      }
    }
    if (error.isAxiosError) {
      notification.error({
        message: '系统异常',
        description: '服务请求异常!'
      })
    } else {
      notification.error({
        message: '系统异常',
        description: error
      })
    }
  }
  return Promise.reject(error)
}

// request interceptor
service.interceptors.request.use((config) => {
  const token = Vue.ls.get(ACCESS_TOKEN)
  // const token = window.localStorage.getItem(ACCESS_TOKEN) || null
  if (token) {
    const timestamp = new Date().getTime()
    config.headers.Expires = timestamp
    const signature = md5(token + timestamp)
    config.headers['Access-Token'] = signature // 让每个请求携带自定义 token 请根据实际情况自行修改
  }

  const url = config.url
  let paraString = ''
  let paraArray = []
  const paraJsonArray = []
  // 判断请求地址url后面是否跟参数
  if (url.includes('?')) {
    paraString = url.substring(url.indexOf('?') + 1, url.length)
    paraArray = paraString.split('&')
    for (var i = 0; i < paraArray.length; i++) {
      const num = paraArray[i].indexOf('=')
      if (num > 0) {
        paraJsonArray.push({
          key: paraArray[i].substring(0, num),
          value: paraArray[i].substr(num + 1)
        })
      }
    }
  }

  // get请求
  if (config.method === 'get') {
    const params = config.params
    if (params) {
      for (const key in params) {
        if (params[key] !== undefined && params[key] !== null) {
          if (params[key] instanceof Array) {
            paraJsonArray.push({
              key: key,
              value: JSON.stringify(params[key])
            })
          } else {
            paraJsonArray.push({ key: key, value: params[key] })
          }
        }
      }
    }
  }
  // post请求
  if (config.method === 'post') {
    const data = config.data
    if (data) {
      if (
        typeof data === 'object' &&
        Object.prototype.toString.call(data).toLowerCase() ===
          '[object object]' &&
        !data.length
      ) {
        // 如果是json对象
        for (const key in data) {
          if (typeof data[key] !== 'undefined') {
            if (
              data[key] instanceof Array ||
              (typeof data[key] === 'object' &&
                Object.prototype.toString.call(data[key]).toLowerCase() ===
                  '[object object]' &&
                !data[key].length)
            ) {
              paraJsonArray.push({
                key: key,
                value: JSON.stringify(data[key])
              })
            } else {
              paraJsonArray.push({ key: key, value: data[key] })
            }
          }
        }
      } else if (typeof data === 'string' && data.constructor === String) {
        // 为字符串"data": "username=admin&password=e10adc3949ba59abbe56e057f20f883e"
        const newArr = data.split('&')
        // paraArray=paraArray.concat(newArr)
        for (let i = 0; i < newArr.length; i++) {
          const num = newArr[i].indexOf('=')
          if (num > 0) {
            paraJsonArray.push({
              key: newArr[i].substring(0, num),
              value: newArr[i].substr(num + 1)
            })
          }
        }
      } else if (Array.isArray(data)) {
        for (const i in data) {
          paraJsonArray.push({ key: i, value: JSON.stringify(data[i]) })
        }
      }
    }
  }
  // 获取所有参数名
  let keyArr = paraJsonArray.map(function (para) {
    return para.key
  })
  // 去重
  keyArr = Array.from(new Set(keyArr))
  // 按参数名排序
  const paramArr = []
  // 按照最新参数排序顺序 重新组合成key=value 形式
  for (const index in keyArr.sort()) {
    for (const item in paraJsonArray) {
      if (item.key === keyArr.sort()[index]) {
        paramArr.push(item.key + '=' + item.value)
      }
    }
  }

  paraString = paramArr.join('')
  const signature = md5('@2019$' + paraString + token)
  config.headers.signature = signature

  return config
}, err)

// response interceptor
service.interceptors.response.use((res) => {
  const reqUrl = res.config.url
  const isLogin = reqUrl.indexOf('/login') !== -1
  if (isLogin) {
    return res.data
  }
  const response = res.data || res || {}
  // 处理无法访问到服务器
  if (JSON.stringify(response.data) === '{}') {
    if (
      response.data.type === 'application/octet-stream' ||
      response.data.type === 'application/x-download'
    ) {
      return response.data
    }
    if (response.data.byteLength) {
      return response.data
    }
    // 过滤登出
    if (response.config.url.indexOf('logout') !== -1) {
      return response.data
    }
    Vue.ls.set(ACCESS_FORBIDDEN, true)
    store.dispatch('Logout').then(() => {
      setTimeout(() => {
        window.location.reload()
      }, 1500)
    })

    response.data.message = '会话超时，请重新登录！'
  }
  // 处理单点用户
  if (response.data && response.data.code === -19999) {
    Vue.ls.set(ACCESS_KICK, true)
    store.dispatch('Logout').then(() => {
      setTimeout(() => {
        window.location.reload()
      }, 1500)
    })
  } else {
    return response.data
  }
}, err)

const installer = {
  vm: {},
  install (Vue) {
    Vue.use(VueAxios, service)
  }
}

export { installer as VueAxios, service as axios }
