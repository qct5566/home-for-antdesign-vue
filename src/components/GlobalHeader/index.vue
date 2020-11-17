<template>
  <div class="ant-pro-top-nav-header dark" :style="indexBanner">
    <div class="ant-pro-top-nav-header-main">
      <div class="ant-pro-top-nav-header-left">
        <div class="ant-pro-top-nav-header-logo" style="width: 300px !important;">
          <span>
            <div class="logo">
              <img :src="setting.logoIconUrl!=null?setting.logoIconUrl:logo" />
              <div class="logoName">
                {{ setting.platformName!=null?setting.platformName:"政务数据中台门户" }}
              </div>
            </div>
          </span>
        </div>
      </div>
      <div class="ant-pro-top-nav-header-menu">
        <base-menu :menus="headerProps.menus" :mode="headerProps.menusMode || 'horizontal'"/>
      </div>
      <header-right-content :wrpCls="headerProps.rightWrpCls"></header-right-content>
    </div>
    <home-search v-if="isHome || isResourceDir"/>
    <home-head-data v-if="isHome"/>
  </div>
</template>

<script>
import BaseMenu from '@ant-design-vue/pro-layout/es/components/RouteMenu/BaseMenu'
import headerRightContent from './headerRightContent'
import HomeSearch from '@/views/home/component/search'
import HomeHeadData from '@/views/home/component/headData'
import logo from '@/assets/logo.png'
import { getSetting } from '@/api/modules/settingService'
import { setDocumentTitle, setTitleVar, setTitleIcon } from '@/utils/domUtil'
export default {
  components: {
    BaseMenu,
    headerRightContent,
    HomeSearch,
    HomeHeadData
  },
  props: {
    headerProps: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      logo,
      indexBanner: '',
      setting: {}
    }
  },
  computed: {
    isHome () {
      return this.$route.path === '/home'
    },
    isResourceDir () {
      return this.$route.path === '/resourceDir'
    }
  },
  created () {
    getSetting().then(res => {
      this.setting = res
      if (this.setting.indexBannerUrl !== null) {
        this.indexBanner = 'background: url(' + this.setting.indexBannerUrl + ') no-repeat center !important;'
      }
      if (this.setting.platformName !== null) {
        setTitleVar(this.setting.platformName)
        setDocumentTitle(`${this.$route.meta.title} - ${this.setting.platformName}`)
      }
      if (this.setting.logoIconUrl !== null) {
        setTitleIcon(this.setting.logoIconUrl)
      }
    })
  }
}
</script>

<style>

  div.logo img{
    width: 24px !important;
    float: left;
    margin-top: 18px;
  }
  div.logoName{
    color: white;
    float: left;
    width: 160px;
    height: 24px;
    font-size: 15px;
    font-weight:bold;
    margin-left: 10px;
  }
</style>
