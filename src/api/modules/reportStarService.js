import { axios } from '@/api/request'
import qs from 'qs'

export function addReportStar (obj) {
  return axios.post('/api/sys/portal/reportStar/addReportStar', obj)
}

export function deleteReportStar (params) {
  return axios.post('/api/sys/portal/reportStar/deleteReportStar', qs.stringify(params, { indices: false }))
}
