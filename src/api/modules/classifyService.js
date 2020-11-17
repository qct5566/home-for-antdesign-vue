import { axios } from '@/api/request'

export function getClassifyAll () {
  return axios.get('/api/sys/portal/classify/getClassifyAll')
}
