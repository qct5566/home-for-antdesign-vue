import { axios } from '@/api/request'
import qs from 'qs'

export function addMetadataStar (obj) {
  return axios.post('/api/sys/portal/metadataStar/addMetadataStar', obj)
}

export function deleteMetadataStar (params) {
  return axios.post('/api/sys/portal/metadataStar/deleteMetadataStar', qs.stringify(params, { indices: false }))
}

/**
 * 联查目录获取收藏LIST （带有分页)
 * userid =当前登录的ID
 * @param params
 * @returns {*}
 */
export function metadatlimitaStarList (params) {
  return axios.get('/api/sys/portal/metadataStar/metadatlimitaStarList', { params: params })
}

