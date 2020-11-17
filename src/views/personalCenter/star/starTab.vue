<template>
  <div>
    <a-tabs type="card">
      <a-tab-pane key="资源目录" tab="资源目录">

        <catalog-star-list ref="catalogStartListRef"></catalog-star-list>
      </a-tab-pane>
      <a-tab-pane key="决策分析" tab="决策分析">
        决策分析
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import catalogStarList from './catalogStarList'

export default {
  name: 'StartTab',
  components: {
    catalogStarList
  },
  data () {
    return {

    }
  }
}
</script>
