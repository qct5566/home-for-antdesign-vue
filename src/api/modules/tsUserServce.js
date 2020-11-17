import { axios } from '@/api/request'
import qs from 'qs'

export function getTsOrgPageList () {
  return axios.get('/api/sys/portal/tsOrg/getTsOrgPageList')
}
export function getTsUser (params) {
  return axios.get('/api/sys/portal/tsUser/getTsUser', { params: params })
}

export function getCurrentLoginTsUser () {
  return axios.get('/api/sys/portal/tsUser/getCurrentLoginTsUser')
}

export function updateTsUser (obj) {
  return axios.post('/api/sys/portal/tsUser/updateTsUser', obj)
}
export function updatePassword (obj) {
  return axios.post('/api/sys/portal/tsUser/updatePassword', obj)
}

export function login (obj) {
  return axios.post('/api/sys/portal/auth/login', qs.stringify(obj, { indices: false }))
}

export function logout (obj) {
  return axios.post('/api/sys/portal/auth/logout', obj)
}
