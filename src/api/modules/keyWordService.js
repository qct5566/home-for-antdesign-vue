import { axios } from '@/api/request'
import qs from 'qs'

export function getTopN (params) {
  return axios.get('/api/sys/portal/keyWord/getTopN', { params: params })
}

export function addKeyWord (params) {
  return axios.post('/api/sys/portal/keyWord/addKeyWord', qs.stringify(params, { indices: false }))
}
