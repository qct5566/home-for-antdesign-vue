<template>
  <a-breadcrumb
    class="layout-breadcrumb"
    v-bind="{ ...$props, ...$attrs }"
    v-on="$listeners"
  >
    <a-breadcrumb-item v-for="(item, index) in breadcrumb" :key="item.path">
      <span v-if="index === breadcrumb.length - 1">{{ item.meta.title }}</span>
      <a href="javascript:;" v-else @click="jump(item)">{{ item.meta.title }}</a>
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  props: {
    separator: {
      type: String,
      default: '>'
    }
  },
  data () {
    return {
      breadcrumb: []
    }
  },
  computed: {
    ...mapGetters(['currentMenu', 'addRouters'])
  },
  watch: {
    $route () {
      this.getData()
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    ...mapMutations(['SET_BREADCRUMB']),
    getData () {
      const home = this.currentMenu.find((e) => e.path === '/home')
      const blankIndex = this.addRouters.find(e => e.path === '/blankIndex') || { children: [] }
      const currentRouter = blankIndex.children.find(e => e.path === this.$route.path)
      this.breadcrumb = [home, ...this.getPathData(currentRouter)]
      this.SET_BREADCRUMB(this.breadcrumb)
    },
    getPathData (currentRouter) {
      if (!currentRouter) return []
      let breadcrumb = []
      if (currentRouter) {
        breadcrumb.push(currentRouter)
        if (currentRouter.parent && Object.keys(currentRouter.parent).length) {
          breadcrumb = [...this.getPathData(currentRouter.parent), ...breadcrumb]
        }
      }
      return breadcrumb
    },

    jump (item) {
      this.$router.push({ path: item.path })
    }
  }
}
</script>

<style lang="less" scope>
@import '~@/styles/variable.less';
.layout-breadcrumb {
  margin-bottom: 10px !important;
  .ant-breadcrumb-link {
    a {
      color: @primary-color;
    }
  }
}
</style>
