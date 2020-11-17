import { axios } from '@/api/request'

export function queryMenuAll () {
  return axios.get('/api/sys/portal/menu/queryMenuAll')
}
