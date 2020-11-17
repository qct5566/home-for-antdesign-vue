import { axios } from '@/api/request'

export function getDataScreenAll (params) {
  return axios.get('/api/sys/portal/dataScreen/getDataScreenAll', { params: params })
}

export function updateDataScreen (obj) {
  return axios.post('/api/sys/portal/dataScreen/updateDataScreen', obj)
}
