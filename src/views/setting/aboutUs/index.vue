<template>
  <div v-html="setting.aboutUs"></div>
</template>

<script>
import { getSetting } from '@/api/modules/settingService'
export default {
  data () {
    return {
      setting: {}
    }
  },
  created () {
    getSetting().then(res => {
      this.setting = res
    })
  }
}
</script>

<style>

</style>
