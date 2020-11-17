import { axios } from '@/api/request'

export function getReportAll (params) {
  return axios.get('/api/sys/portal/report/getReportAll', { params: params })
}

export function updateReport (obj) {
  return axios.post('/api/sys/portal/report/updateReport', obj)
}
