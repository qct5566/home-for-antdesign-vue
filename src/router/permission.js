import router from '@/router'
import store from '@/store'
// import storage from 'store'
import NProgress from 'nprogress' // progress bar
// import notification from 'ant-design-vue/es/notification'
import { setDocumentTitle, domTitle } from '@/utils/domUtil'
// import { ACCESS_TOKEN } from '@/store/mutation-types'
import { loadAllViews, getCurrentMenu, buildModuleRouteData, blankLayoutRouter } from './tool'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

// const whiteList = ['login', 'register', 'registerResult'] // no redirect whitelist
// const loginRoutePath = '/user/login'
const defaultRoutePath = '/home'

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  to.meta && (typeof to.meta.title !== 'undefined' && setDocumentTitle(`${to.meta.title} - ${domTitle}`))
  /* has token */
  const addedRouter = store.getters.addRouters || []
  if (!addedRouter.length) {
    // 拉取接口菜单
    store.dispatch('setAsyncRouters').then((asyncRouters) => {
      const filterRouter = buildModuleRouteData(loadAllViews(), asyncRouters)
      const addRouters = blankLayoutRouter(filterRouter)
      router.$addRoutes(addRouters)
      store.commit('SET_ADD_ROUTERS', addRouters)
      store.commit('SET_CURRENT_MENU', getCurrentMenu(asyncRouters))
      if (to.path === '/') {
        next({ path: defaultRoutePath })
      } else {
        const redirect = to.redirectedFrom
        if (redirect) {
          next({ path: redirect, replace: true })
        } else {
          next({ ...to, replace: true })
        }
      }
    })
  } else {
    if (to.path === '/') {
      next({ path: defaultRoutePath })
    } else {
      next()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
