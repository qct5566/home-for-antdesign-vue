<template>

  <div class="detail-content">
    <div class="detail-content-title" type="border">
      个人中心
    </div>
    <div class="grzx-wrap">
      <div class="grzx-wrap-left">
        <div class="user">
          <span>欢迎</span>
          <a href="" class="name">{{ detailLogin!==null?detailLogin.username:'' }}</a>
        </div>
        <ul class="menus">
          <li v-for="menu in menus" :key="menu.page" :class="{'cur': curMenu == menu.page}" @click="curMenu = menu.page">{{ menu.title }}</li>
        </ul>
      </div>
      <div class="grzx-wrap-main">
        <info ref="infoRef" v-if="curMenu == 'grxx'"></info>
        <apply-management v-if="curMenu === 'applyManagement'"></apply-management>
        <star-tab v-if="curMenu == 'wdsc'"></star-tab>
      </div>
    </div>
  </div>

</template>
<script>
import Info from './detail/information'
import ApplyManagement from './detail/applyManagement'
import StarTab from './star/starTab'
import { getCurrentLoginTsUser } from '@/api/modules/tsUserServce'

export default {
  components: {
    Info,
    ApplyManagement,
    StarTab
  },
  data () {
    return {
      curMenu: 'grxx',
      menus: [
        {
          title: '个人信息',
          page: 'grxx'
        }, {
          title: '我的收藏',
          page: 'wdsc'
        }, {
          title: '申请管理',
          page: 'applyManagement'
        }
      ],
      detailLogin: null
    }
  },
  created: function () {
  },
  mounted () {
    const _this = this
    _this.getUserInformation()
  },
  methods: {
    getUserInformation () {
      const _this = this
      getCurrentLoginTsUser().then(res => {
        _this.detailLogin = res
        _this.$refs.infoRef.receiveUserInformation(res)
      })
    }
  }

}
</script>
