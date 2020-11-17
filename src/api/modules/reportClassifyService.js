import { axios } from '@/api/request'

export function getReportClassifyAll () {
  return axios.get('/api/sys/portal/reportClassify/getReportClassifyAll')
}
