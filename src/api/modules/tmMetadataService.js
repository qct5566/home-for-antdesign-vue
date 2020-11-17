import { axios } from '@/api/request'

export function queryMetadataListSearch (params) {
  return axios.get('/api/sys/portal/tmMetadata/queryMetadataListSearch', { params: params })
}

/**
 * 获取资源目录详情
 * @param metadataId
 * @param userId
 */
export function detail (metadataId, userId) {
  return axios.get('/api/sys/portal/tmMetadata/detail/' + metadataId + '?userId=' + userId)
}

/**
 * 数据预览
 * @param params
 */
export function getDataPreview (params) {
  return axios.get('/api/sys/portal/tmMetadata/getDataPreview', { params: params })
}

/**
 * 信息项list
 * @param params
 */
export function getTmMetadataItemPageList (params) {
  return axios.get('/api/sys/portal/tmMetadata/getTmMetadataItemPageList', { params: params })
}

/**
 * 文件list
 * @param params
 */
export function getTmMetadataFilePageList (params) {
  return axios.get('/api/sys/portal/tmMetadata/getTmMetadataFilePageList', { params: params })
}

/**
 * 调用api测试
 * @param param
 */
export function callApiTest (param) {
  return axios.post('/api/sys/portal/tmMetadata/callApiTest', param)
}
