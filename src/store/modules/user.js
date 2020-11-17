import Vue from 'vue'
import { ACCESS_TOKEN } from '../mutation-types' // ACCESS_LOGIN
import { setStatePersisted } from '@/store/plugin'
import { Modal, message } from 'ant-design-vue'
import router from '@/router'
import { login, logout } from '@/api/modules/tsUserServce'

const setPersisted = (state, key) =>
  setStatePersisted({ key, path: 'user', value: state[key] })

const user = {
  inGetters: true, // 加入getters，true-全部加入，[]-指定加入
  exGetters: [], // 排除getters，当inGetters为true时使用
  state: {
    nickname: '暂无昵称', // 昵称
    userName: '', // 用户名
    messageSum: 0, // 提醒消息
    avatar:
      'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png', // 头像
    token: '', // token
    userInfo: {} // 登录后获取用户详情，包含用户名/账号/token等信息
  },
  mutations: {
    SET_NICK_NAME: (state, nickname) => {
      state.nickname = nickname
      setPersisted(state, 'nickname')
    },
    SET_USER_NAME: (state, userName) => {
      state.userName = userName
      setPersisted(state, 'userName')
    },
    SET_TOKEN: (state, token) => {
      state.token = token
      // window.localStorage.setItem(ACCESS_TOKEN, token)
      Vue.ls.set(ACCESS_TOKEN, token)
    },
    SET_USER_INFO: (state, userInfo) => {
      state.userInfo = { ...state.userInfo, ...userInfo }
      setPersisted(state, 'userInfo')
    },
    SET_MESSAGE_SUM: (state, messageSum) => {
      state.messageSum = messageSum
    }
  },

  actions: {
    // 登录
    async Login ({ state, dispatch, commit }, loginParams) {
      try {
        const loginRes = await login(loginParams)
        if (loginRes.code === 500) {
          message.error(loginRes.message)
        }

        console.log('loginRes', loginRes)
        const token = loginRes.data.token || state.token
        commit('SET_TOKEN', token)
        commit('SET_USER_INFO', loginRes.data)
        // 登录成功获取用户信息
        // await dispatch('GetInfo', { token: token })
        window.location.reload()
      } catch (error) {
        console.log(error)
      }
    },

    // 获取用户信息
    async GetInfo ({ state, commit }, params) {
      const userInfo = {} // await state.userApi.getInfo(params)
      commit('SET_NICK_NAME', userInfo.nickname || state.nickname)
      commit('SET_USER_NAME', userInfo.userName || state.userName)
      commit('SET_USER_INFO', userInfo || state.userInfo)
      commit('SET_MESSAGE_SUM', userInfo.messageSum || state.messageSum)
    },
    // 清除相关缓存
    removeAuth ({ commit }) {
      commit('SET_TOKEN', null)
      commit('SET_USER_INFO', null)
      commit('SET_USER_NAME', null)
      commit('SET_NICK_NAME', null)
    },
    // 登出
    Logout ({ dispatch, state }, isconfirm) {
      if (isconfirm) {
        Modal.confirm({
          title: '退出系统',
          content: '确认退出系统？',
          centered: true,
          onOk () {
            logout()
            dispatch('removeAuth')
            // router.push({ name: 'login' })
            setTimeout(() => {
              window.location.reload()
            }, 1500)
          },
          onCancel () {
            console.log('Cancel')
          }
        })
      } else {
        // await state.userApi.logout()
        dispatch('removeAuth')
        router.push({ name: 'login' })
      }
    },
    // 获取用户权限
    Permissions ({ commit }) {}
  }
}

export default user
