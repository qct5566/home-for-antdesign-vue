import { axios } from '@/api/request'

export function getSynStat () {
  return axios.get('/api/sys/portal/synStat/getSynStat')
}
