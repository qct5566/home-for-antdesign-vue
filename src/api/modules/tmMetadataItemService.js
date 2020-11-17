import { axios } from '@/api/request'

export function getTmMetadataItemPageList (params) {
  return axios.get('/api/sys/portal/tmMetadataItem/getTmMetadataItemPageList', { params: params })
}
