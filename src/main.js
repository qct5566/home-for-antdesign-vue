// ie polyfill
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store/'
import bootstrap from '@/core/bootstrap'

import '@/core/use' // 其他全局配置
import '@/utils/filter' // global filter
import '@/router/permission'

/** 合并styles会造成卡顿，这里拆开 */
// import '@/styles/index.less'
import 'ant-design-vue/dist/antd.less'
import '@/styles/login.less'
import '@/styles/reset-ant-design-vue.less'
import '@/styles/layout.less'
import '@/styles/common.less'
import '@/styles/home.less'
import '@/styles/variable.less'
import '@/styles/detail.less'
import '@/styles/search.less'
import '@/styles/grzx.less'

import themePluginConfig from '@/config/themePluginConfig'
import bus from '@/utils/bus'
window.umi_plugin_ant_themeVar = themePluginConfig.theme
Object.defineProperties(Vue.prototype, {
  $bus: {
    value: bus
  }
})
Vue.config.productionTip = false
new Vue({
  router,
  store,
  beforeCreate: bootstrap,
  render: h => h(App)
}).$mount('#app')
