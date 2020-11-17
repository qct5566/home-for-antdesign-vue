<template>
  <a-config-provider :locale="locale">
    <div id="app">
      <router-view/>
    </div>
  </a-config-provider>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
// import { AppDeviceEnquire, IERouterFix } from '@/utils/mixin'
export default {
  // mixins: [AppDeviceEnquire, IERouterFix],
  data () {
    return {
      locale: zhCN
    }
  }
}
</script>
