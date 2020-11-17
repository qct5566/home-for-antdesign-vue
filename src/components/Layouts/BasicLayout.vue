<template>
  <div :class="layoutClass">
    <pro-layout
      :title="settings.title"
      :menus="currentMenu"
      :collapsed="collapsed"
      :mediaQuery="query"
      :isMobile="isMobile"
      :handleMediaQuery="handleMediaQuery"
      :handleCollapse="handleCollapse"
      :logo="logoRender"
      v-bind="{...settings,...renders}"
    >
      <!-- headerRender
      menuHeaderRender
      menuRender
      headerContentRender
      PageHeaderWrapper -->
      <template #rightContentRender>
        <header-right-content :wrpCls="wrpCls"></header-right-content>
      </template>
      <template #footerRender style="padding:0">
        <global-footer />
      </template>
      <router-view v-if="isCustom"/>
      <blank-layout v-else >
        <breadcrumb slot="breadcrumb"/>
      </blank-layout>
    </pro-layout>
  </div>
</template>

<script>
import ProLayout from '@ant-design-vue/pro-layout'
import { mapGetters, mapMutations } from 'vuex'
import { CONTENT_WIDTH_TYPE, TOGGLE_MOBILE_TYPE } from '@/store/mutation-types'
// import RightContent from '@/components/GlobalHeader/RightContent'
import defaultSettings from '@/config/defaultSettings'
import GlobalFooter from '@/components/GlobalFooter'
import BlankLayout from './BlankLayout'
import Breadcrumb from '@/components/Breadcrumb'
// import MultiTab from '@/components/MultiTab'
// import Vue from 'vue'
// import SettingDrawer from '@common/components/SettingDrawer'
import logo from '@/assets/logo.png'
import GlobalHeader from '@/components/GlobalHeader'
import headerRightContent from '@/components/GlobalHeader/headerRightContent'

export default {
  name: 'BasicLayout',
  components: {
    ProLayout,
    Breadcrumb,
    // SettingDrawer
    // RightContent
    // MultiTab
    GlobalFooter,
    headerRightContent,
    BlankLayout
  },
  data () {
    return {
      // base
      menus: [],
      // 侧栏收起状态
      collapsed: false,
      // 媒体查询
      query: {},
      // 是否手机模式
      isMobile: false,
      settings: {
        ...defaultSettings,
        layout: defaultSettings.layout, // 'sidemenu', 'topmenu'
        // CONTENT_WIDTH_TYPE
        contentWidth:
          defaultSettings.layout === 'sidemenu'
            ? CONTENT_WIDTH_TYPE.Fluid
            : defaultSettings.contentWidth,
        // 主题 'dark' | 'light'
        theme: defaultSettings.navTheme,
        // 主色调
        primaryColor: defaultSettings.primaryColor,
        fixedHeader: defaultSettings.fixedHeader,
        fixSiderbar: defaultSettings.fixSiderbar,
        colorWeak: defaultSettings.colorWeak,

        hideHintAlert: false,
        hideCopyButton: false
      }
    }
  },
  computed: {
    ...mapGetters(['currentMenu']),
    layoutClass () {
      const arr = [
        {
          className: 'home-layout',
          includes: ['/home']
        },
        {
          className: 'home-layout search-layout',
          includes: ['/resourceDir']
        }
      ]
      const arrItem = arr.find(e => {
        const path = this.$route.path
        return e.includes.includes(path)
      })
      return arrItem ? arrItem.className : ''
    },
    isCustom () {
      const include = ['/home', '/resourceDir']
      return include.includes(this.$route.path)
    },
    wrpCls () {
      return {
        'ant-pro-global-header-index-right': true,
        [`ant-pro-global-header-index-${
          this.isMobile || this.settings.layout !== 'topMenu'
            ? 'light'
            : this.settings.theme
        }`]: true
      }
    },
    renders () {
      const renders = {}
      if (!this.isMobile) renders.headerRender = this.headerRender
      return renders
    }
  },
  created () {
    // 处理侧栏收起状态
    // this.$watch('collapsed', () => {
    //   this.SET_DEFAULT_CONFIG({ collapsed: this.collapsed })
    // })
    this.$watch('isMobile', () => {
      this[TOGGLE_MOBILE_TYPE](this.isMobile)
    })
    this.settings = {
      ...this.settings,
      ...defaultSettings
    }
  },
  mounted () {
    const userAgent = navigator.userAgent
    if (userAgent.indexOf('Edge') > -1) {
      this.$nextTick(() => {
        this.collapsed = !this.collapsed
        setTimeout(() => {
          this.collapsed = !this.collapsed
        }, 16)
      })
    }
  },
  methods: {
    ...mapMutations([TOGGLE_MOBILE_TYPE]),
    showSetting () {
      this.$refs.settingDrawer.show = true
    },
    handleMediaQuery (val) {
      this.query = val
      if (this.isMobile && !val['screen-xs']) {
        this.isMobile = false
        return
      }
      if (!this.isMobile && val['screen-xs']) {
        this.isMobile = true
        this.collapsed = false
        this.settings.contentWidth = CONTENT_WIDTH_TYPE.Fluid
        // this.settings.fixSiderbar = false
      }
    },
    handleCollapse (val) {
      this.collapsed = val
    },
    handleSettingChange ({ type, value }) {
      type && (this.settings[type] = value)
      switch (type) {
        case 'contentWidth':
          this.settings[type] = value
          break
        case 'layout':
          if (value === 'sidemenu') {
            this.settings.contentWidth = CONTENT_WIDTH_TYPE.Fluid
          } else {
            this.settings.fixSiderbar = false
            this.settings.contentWidth = CONTENT_WIDTH_TYPE.Fixed
          }
          break
      }
    },
    logoRender () {
      return <img src={logo} />
    },
    headerRender () {
      const headerProps = {
        menus: this.currentMenu,
        menusMode: 'horizontal',
        rightWrpCls: this.wrpCls
      }
      return <GlobalHeader headerProps={headerProps}/>
    }
  }
}
</script>

<style lang="less">
@import "~@/styles/variable.less";
@searchHeadheight:300px;
.search-layout{
  .ant-layout-header{
     height: @searchHeadheight !important;
     .ant-pro-top-nav-header{
       height: @searchHeadheight !important;
     }
  }
}
</style>
