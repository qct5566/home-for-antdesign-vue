<template>
  <div class="footer custom-render">
    <div class="footer-infos">
      <a-button
        type="link"
        v-for="item in infos"
        :key="item.key"
        @click="jump(item)"
      >{{ item.label }}</a-button>
    </div>
    <div class="footer-rights">
      <div class="footer-rights-span">
        <div class="footer-rights-span-item">
          <span>{{ setting.undertakeOrg }}</span>
          <span>{{ setting.registeredNo }}</span>
          <span>{{ setting.tecSupport }}</span>
        </div>
        <div class="footer-rights-span-item">Copyright © www.xxx.com,All Rights Reserved.</div>
      </div>
      <div class="footer-rights-link">
        <div class="link1"></div>
        <div class="link2"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { GlobalFooter } from '@ant-design-vue/pro-layout'
import { getSetting } from '@/api/modules/settingService'
export default {
  name: 'ProGlobalFooter',
  components: {
    GlobalFooter
  },
  data () {
    return {
      infos: [],
      setting: {}
    }
  },
  created () {
    getSetting().then(res => {
      this.setting = res
      this.infos.push({ key: 1, label: '关于我们', path: '/setting/aboutUs' })
      this.infos.push({ key: 2, label: '服务条款', path: '/setting/serviceTerms' })
      this.infos.push({ key: 3, label: '联系我们', path: '/setting/contactUs' })
    })
  },
  methods: {
    jump (item) {
      if (item.path) this.$router.push({ path: item.path })
    }
  }
}
</script>
