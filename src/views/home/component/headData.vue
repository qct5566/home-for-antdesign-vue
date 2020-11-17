<template>
  <div class="home-layout-header-data">
    <div class="data-box" v-for="item in headData" :key="item.label">
      <div class="data-box-border-left"></div>
      <div class="data-box-right">
        <count-up
          class="data-box-right-value"
          :end-val="item.value"
        />
        <div class="data-box-right-label">{{ item.label }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getSynStat } from '@/api/modules/synStatService'
import CountUp from '@/components/CountUp'
export default {
  components: { CountUp },
  data () {
    return {
      headData: []
    }
  },
  created () {
    getSynStat().then(res => {
      this.headData.push({ label: '部门', value: res.orgCount })
      this.headData.push({ label: '目录总量', value: res.metadataCount })
      this.headData.push({ label: '数据总量', value: res.dataCount })
      this.headData.push({ label: 'API接口', value: res.apiCount })
      this.headData.push({ label: '服务申请', value: res.applyCount })
      this.headData.push({ label: '平台访问', value: res.platformPv })
    })
  }
}
</script>
