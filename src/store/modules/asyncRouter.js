import { queryMenuAll } from '@/api/modules/menuService'
// import { ACCESS_TOKEN } from '@/store/mutation-types'
// import Vue from 'vue'
// import { asyncMenu } from '@/router/base'

// const setPersisted = (state, key) => setStatePersisted({ key, path: 'asyncRouter', value: state[key] })

const asyncRouter = {
  inGetters: true, // 加入getters，true-全部加入，[]-指定加入
  state: {
    currentMenu: [], // 当前菜单
    addRouters: [], // 最终路由
    asyncRouters: [], // 权限菜单，每次刷新都通过接口获取，确保总是最新菜单
    breadcrumb: [] // 面包屑
  },
  mutations: {
    SET_CURRENT_MENU: (state, currentMenu) => {
      state.currentMenu = currentMenu
    },
    SET_ADD_ROUTERS: (state, addRouters) => {
      state.addRouters = addRouters
    },
    SET_ASYNC_ROUTERS: (state, asyncRouters) => {
      state.asyncRouters = asyncRouters
    },
    SET_BREADCRUMB: (state, breadcrumb) => {
      state.breadcrumb = breadcrumb
    }
  },

  actions: {
    setAsyncRouters ({ commit }) {
      return new Promise((resolve) => {
        // if (Vue.lo.get(ACCESS_TOKEN)) {
        queryMenuAll().then(res => {
          const asyncRouters = res // token存在时从接口获取权限菜单
          commit('SET_ASYNC_ROUTERS', asyncRouters)
          resolve(asyncRouters)
        })
        // }
      })
    }
  }
}

export default asyncRouter
