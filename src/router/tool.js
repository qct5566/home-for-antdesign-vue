import { BasicLayout } from '@/components/Layouts'
// 将views下所有index.vue文件加入路由
export const loadAllViews = (meta = {}) => {
  // excludeKeepAlive 排除keepalive
  const { includeKeepAlive = [] } = meta
  const moduleViews = []
  // require无法配置动态路径，子工程业务模块主文件夹必须命名为views
  const req = require.context('@/views/', true, /\.vue$/)
  req.keys().forEach(fileName => {
    const isIndex = fileName.indexOf('/index.vue') !== -1
    const path = fileName.replace('.', '').replace(isIndex ? /\/index.vue$/ : /\.vue$/, '')
    const name = path.replace('/', '')
    if (isIndex) {
      const view = {
        path,
        name,
        // 坑 : import内不能为单独的变量.....否则错误lazy recursive
        component: () => import('@/views' + path),
        keepAlive: includeKeepAlive.includes(name)
      }
      moduleViews.push(view)
    }
  })
  return moduleViews
}

export const buildModuleRouteData = (constRouter, asyncRouter, parent) => {
  let moduleRouteData = []
  const exclude = [] // ['/home']
  asyncRouter.filter(e => !exclude.includes(e.path)).forEach(async => {
    const constItem = constRouter.find(e => e.path === async.path) || {}
    if (constItem) {
      const item = {
        path: async.path || constItem.path,
        name: async.enName || constItem.name,
        redirect: async.redirect || constItem.redirect,
        hidden: async.hidden,
        meta: JSON.parse(async.meta)
      }
      if (parent) item.parent = parent
      /* const meta = typeof async.meta === 'string' ? { title: async.meta } : async.meta
      item.meta = { ...meta, keepAlive: constItem.keepAlive } */
      if (constItem.component) item.component = constItem.component
      moduleRouteData.push(item)
      if (async.children && async.children.length) {
        moduleRouteData = [...moduleRouteData, ...buildModuleRouteData(constRouter, async.children, item)]
      }
    }
  })
  return moduleRouteData
}

export const getCurrentMenu = asyncRouter => {
  const newRouter = []
  asyncRouter.forEach(async => {
    let item = {}
    if (!async.hidden) {
      item = {
        ...async,
        path: async.path,
        name: async.enName,
        meta: JSON.parse(async.meta)
      }
    }
    if (async.children && async.children.length) {
      item.children = getCurrentMenu(async.children)
      if (!item.children.length) delete item.children
    }
    if (Object.keys(item).length) newRouter.push(item)
  })
  return newRouter
}

export const blankLayoutRouter = buildRouter => {
  return [
    {
      path: '/blankIndex',
      component: BasicLayout,
      name: 'blankIndex',
      meta: { title: '空白布局', keepAlive: false },
      children: buildRouter
    }
  ]
}
