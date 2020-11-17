import { axios } from '@/api/request'

/**
 * 创建目录申请
 * @param param
 */
export function addMetadataApplication (param) {
  return axios.post('/api/sys/portal/metadataApplication/addMetadataApplication', param)
}

/**
 * 获取用户申请分页列表
 * @param params
 */
export function getUserApplicationPageList (params) {
  return axios.get('/api/sys/portal/metadataApplication/getUserApplicationPageList', { params: params })
}

/**
 * 取消申请
 * @param params
 */
export function cancelApply (params) {
  return axios.get('/api/sys/portal/metadataApplication/cancelApply', { params: params })
}
