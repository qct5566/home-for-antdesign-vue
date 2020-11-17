import { axios } from '@/api/request'

export function getIndexSortAll () {
  return axios.get('/api/sys/portal/metadataClassify/getIndexSortAll')
}
