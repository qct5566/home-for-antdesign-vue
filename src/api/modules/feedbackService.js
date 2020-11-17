import { axios } from '@/api/request'
import qs from 'qs'

/**
 * GET  getTcFeedbackPageList
 * 获取管理员反馈信息分页数据
 * @param parameter
 * @returns {*}
 */
export function getTcFeedbackPageList (parameter) {
  return axios.post('/api/sys/portal/feedback/getFeedbackPageList', qs.stringify(parameter, { indices: false }))
}
/**
 * GET  getTcFeedbackPageList
 * 获取我的反馈信息分页数据
 * @param parameter
 * @returns {*}
 */
export function getMyTcFeedbackPageList (parameter) {
  return axios.post('/api/sys/portal/feedback/getMyFeedbackPageList', qs.stringify(parameter, { indices: false }))
}

/**
 * POST
 * 添加反馈
 * @param params
 * @returns {*}
 */
export function addFeedBackForm (params) {
  return axios.post('/api/sys/portal/feedback/addFeedback', params)
}

/**
 * POST
 * 修改反馈
 * @param params
 * @returns {*}
 */
export function editFeedBackTest (params) {
  return axios.post('/api/sys/portal/feedback/updateFeedback', params)
}

/**
 * POST
 * SYS_TEST批量删除
 * @param params
 * @returns {*}
 */
export function deleteConfigTest (params) {
  return axios.post('/api/sys/config/test/deleteTest', qs.stringify(params, { indices: false }))
}
