import { axios } from '@/api/request'
import qs from 'qs'

export function addDataScreenStar (obj) {
  return axios.post('/api/sys/portal/dataScreenStar/addDataScreenStar', obj)
}

export function deleteDataScreenStar (params) {
  return axios.post('/api/sys/portal/dataScreenStar/deleteDataScreenStar', qs.stringify(params, { indices: false }))
}
