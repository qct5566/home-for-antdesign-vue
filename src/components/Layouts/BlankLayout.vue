<template>
  <div class="layout-content-blank">
    <slot name="breadcrumb"/>
    <a-card class="layout-blank-card">
      <router-view />
    </a-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'BlankLayout',
  data () {
    return {}
  },
  computed: {
    ...mapGetters(['isMobile'])
  },
  mounted () {
    this.getCardStyle()
  },
  methods: {
    getCardStyle () {
      this.$nextTick(() => {
        const subtractHeightDom = [
          document.querySelector('.ant-layout-header'),
          document.querySelector('.ant-layout-footer'),
          document.querySelector('.layout-breadcrumb')
        ]
        let subtractHeight = 0
        subtractHeightDom.forEach(e => {
          if (e) subtractHeight += e.clientHeight
        })
        const content = document.querySelector('.layout-blank-card')
        content.style.minHeight = `calc(100vh - ${subtractHeight + (this.isMobile ? 0 : 60)}px)`
      })
    }
  }
}
</script>

<style scoped></style>
