<template>
  <div>
    <a-tabs type="card">
      <a-tab-pane key="我的申请" tab="我的申请">
        <my-application></my-application>
      </a-tab-pane>
      <a-tab-pane key="决策分析" tab="决策分析">
        决策分析
      </a-tab-pane>
      <a-tab-pane key="我的反馈" tab="我的反馈">
        <my-feedback></my-feedback>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import MyFeedback from './myFeedback/myFeedback'
import MyApplication from './myApplication/myApplication'

export default {
  components: {
    MyFeedback,
    MyApplication
  },
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style scoped>

</style>
