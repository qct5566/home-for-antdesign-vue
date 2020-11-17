import { axios } from '@/api/request'

export function getDataScreenClassifyAll () {
  return axios.get('/api/sys/portal/dataScreenClassify/getDataScreenClassifyAll')
}
