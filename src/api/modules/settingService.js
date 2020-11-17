import { axios } from '@/api/request'

export function getSetting () {
  return axios.get('/api/sys/portal/setting/getSetting')
}
