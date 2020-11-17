// import { loadAllViews, getCurrentMenu, buildModuleRouteData, blankLayoutRouter } from './tool'
import { BasicLayout } from '@/components/Layouts'
// import store from '@/store'
// 菜单，如果需要权限走接口
// export const asyncMenu = [
//   {
//     path: '/home',
//     name: 'home',
//     meta: {
//       title: '首页'
//     }
//   },
//   {
//     path: '/resourceDir',
//     name: 'resourceDir',
//     meta: {
//       title: '资源目录'
//     },
//     children: [
//       {
//         path: '/resourceDir/detail',
//         name: 'resourceDir/detail',
//         meta: {
//           title: '详情'
//         },
//         hidden: true
//       }
//     ]
//   },
//   {
//     path: '/modelService',
//     name: 'modelService',
//     meta: {
//       title: '模型服务'
//     }
//   },
//   {
//     path: '/selfAnalysis',
//     name: 'selfAnalysis',
//     meta: {
//       title: '自助分析'
//     },
//     children: [
//       {
//         path: '/selfAnalysis/selfAnalysisOne',
//         name: 'selfAnalysis/selfAnalysisOne',
//         meta: {
//           title: '自助分析1'
//         }
//       }
//     ]
//   },
//   {
//     path: '/SharingIndex',
//     name: 'SharingIndex',
//     meta: {
//       title: '共享指数'
//     }
//   },
//   {
//     path: '/decisionAnalysis',
//     name: 'decisionAnalysis',
//     meta: {
//       title: '决策分析'
//     }
//   }
// ]

// let addRouters = []
// store.dispatch('setAsyncRouters')
// const filterRouter = buildModuleRouteData(loadAllViews(), asyncMenu)
// const addRouters = blankLayoutRouter(filterRouter)
// store.commit('SET_ADD_ROUTERS', addRouters)
// store.commit('SET_CURRENT_MENU', getCurrentMenu(asyncMenu))

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/'
    // redirect: '/home'
  },
  // {
  //   path: '/_base/home',
  //   name: '_base/home',
  //   component: () => import('@/views/_base/home')
  // },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/_base/login')
  },
  {
    path: '/error',
    redirect: '/exception/404',
    component: BasicLayout,
    children: [
      {
        path: '/exception/:type',
        name: 'exception',
        component: () => import('@/views/_base/exception')
      }
    ]
  },
  {
    path: '/setting',
    component: BasicLayout,
    children: [
      {
        path: '/setting/aboutUs',
        name: 'setting/aboutUs',
        meta: {
          title: '关于我们'
        },
        component: () => import('@/views/setting/aboutUs/index')
      },
      {
        path: '/setting/contactUs',
        name: 'contactUs',
        meta: {
          title: '联系我们'
        },
        component: () => import('@/views/setting/contactUs/index')
      },
      {
        path: '/setting/serviceTerms',
        name: 'serviceTerms',
        meta: {
          title: '服务条款'
        },
        component: () => import('@/views/setting/serviceTerms/index')
      },
      {
        path: '/personalCenter/index',
        name: 'personalCenter',
        meta: {
          title: '个人中心'
        },
        component: () => import('@/views/personalCenter/index')
      }
    ]
  },
  {
    path: '*', redirect: '/exception/404', hidden: true
  }
]
