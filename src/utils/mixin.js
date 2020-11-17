// import Vue from 'vue'
import { deviceEnquire, DEVICE_TYPE } from '../utils/device'
import { mapState, mapActions } from 'vuex'
import Vue from 'vue'
import { ACCESS_CAS_LOGOUT } from '../store/mutation-types'

// const mixinsComputed = Vue.config.optionMergeStrategies.computed
// const mixinsMethods = Vue.config.optionMergeStrategies.methods

const mixin = {
  computed: {
    ...mapState({
      layoutMode: state => state.app.layout,
      navTheme: state => state.app.theme,
      primaryColor: state => state.app.color,
      colorWeak: state => state.app.weak,
      fixedHeader: state => state.app.fixedHeader,
      fixSiderbar: state => state.app.fixSiderbar,
      fixSidebar: state => state.app.fixSiderbar,
      contentWidth: state => state.app.contentWidth,
      autoHideHeader: state => state.app.autoHideHeader,
      sidebarOpened: state => state.app.sidebar,
      multiTab: state => state.app.multiTab
    })
  },
  methods: {
    isTopMenu () {
      return this.layoutMode === 'topmenu'
    },
    isSideMenu () {
      return !this.isTopMenu()
    }
  }
}

const mixinDevice = {
  computed: {
    ...mapState({
      device: state => state.app.device
    })
  },
  methods: {
    isMobile () {
      return this.device === DEVICE_TYPE.MOBILE
    },
    isDesktop () {
      return this.device === DEVICE_TYPE.DESKTOP
    },
    isTablet () {
      return this.device === DEVICE_TYPE.TABLET
    }
  }
}

const AppDeviceEnquire = {
  mounted () {
    const { $store } = this
    deviceEnquire(deviceType => {
      switch (deviceType) {
        case DEVICE_TYPE.DESKTOP:
          $store.commit('TOGGLE_DEVICE', 'desktop')
          $store.dispatch('setSidebar', false)
          break
        case DEVICE_TYPE.TABLET:
          $store.commit('TOGGLE_DEVICE', 'tablet')
          $store.dispatch('setSidebar', false)
          break
        case DEVICE_TYPE.MOBILE:
        default:
          $store.commit('TOGGLE_DEVICE', 'mobile')
          $store.dispatch('setSidebar', true)
          break
      }
    })
  }
}

const IERouterFix = {
  methods: {
    hashChangeHandler: function () { this.$router.push(window.location.hash.substring(1, window.location.hash.length)) },
    isIE11: function () { return !!window.MSInputMethodContext && !!document.documentMode }
  },
  mounted: function () {
    if (this.isIE11()) { window.addEventListener('hashchange', this.hashChangeHandler) }
    if (!!window.ActiveXObject || 'ActiveXObject' in window) {
      window.addEventListener('hashchange', () => {
        const currentPath = window.location.hash.slice(1)
        if (this.$route.path !== currentPath) {
          this.$router.push(currentPath)// 主动更改路由界面
        }
      }, false)
    }
    if ('-ms-scroll-limit' in document.documentElement.style &&
      '-ms-ime-align' in document.documentElement.style) {
      window.addEventListener('hashchange', (event) => {
        var currentPath = window.location.hash.slice(1)
        if (this.$route.path !== currentPath) {
          this.$router.push(currentPath)
        }
      }, false)
    }
  },
  destroyed: function () { if (this.isIE11()) { window.removeEventListener('hashchange', this.hashChangeHandler) } }
}

const logoutMixin = {
  methods: {
    ...mapActions(['Logout']),
    handleLogout () {
      this.$confirm({
        title: '提示',
        content: '真的要注销登录吗',
        onOk: () => {
          return this.Logout({}).then(() => {
            if (Vue.ls.get(ACCESS_CAS_LOGOUT)) {
              window.location.href = Vue.ls.get(ACCESS_CAS_LOGOUT)
            } else {
              window.location.href = './'
            }
          }).catch(err => {
            this.$message.error({
              title: '错误',
              description: err.message
            })
          })
        },
        onCancel () {
        }
      })
    }
  }
}
export { mixin, AppDeviceEnquire, mixinDevice, IERouterFix, logoutMixin }
