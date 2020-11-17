<template>
  <div class="home-layout-data-type">
    <div class="home-layout-data-type-header"></div>
    <div class="home-layout-data-type-tab home-tabs">
      <!-- 左按钮 -->
      <div class="home-tabs-switch-left data-type-left" @click="switchTabs('left')"></div>
      <!-- 切换部分 -->
      <lw-tabs
        class="data-type-tabs"
        size="large"
        v-model="type"
        :list="classifyList"
      >
        <div
          class="home-tabs-pane-box"
          :slot="`pane-${type}`"
          slot-scope="{ item }"
        >
          <div class="tabs-pane-item-box">
            <div
              :class="`pane-item-box ${item.type}-item-box`"
              v-for="(contentItem, index) in item.childrenClassify"
              :key="index"
            >
              <!-- 图标类 -->
              <div class="icon-item" v-if="item.type === 'icon'" @click="goSearch(contentItem.id)">
                <img
                  :src="contentItem.icon"
                  style="width: 40px; height: 40px"
                />
                <div
                  class="icon-title"
                  :title="contentItem.name"
                  v-html="contentItem.name"
                ></div>
              </div>
              <!-- 文本类 -->
              <div class="list-item" v-if="item.type === 'list'" @click="goSearch(contentItem.id)">
                <div class="list-title" v-html="contentItem.name"></div>
              </div>
            </div>
            <!-- 补全布局个数 -->
            <div
              class="between-more"
              :class="{ morecla: type == '3' }"
              v-for="more in betweenMore"
              :key="more"
            ></div>
          </div>
        </div>
      </lw-tabs>
      <!-- 右按钮 -->
      <div class="home-tabs-switch-right data-type-right" @click="switchTabs('right')"></div>
    </div>
    <div class="home-layout-data-type-scroll"></div>
  </div>
</template>

<script>
import LwTabs from '@/commons/LwTabs'
import { addEvent, removeEvent } from '@/utils'
import { getClassifyAll } from '@/api/modules/classifyService'
export default {
  components: { LwTabs },
  data () {
    return {
      classifyList: [],
      type: '', // 当前标签类型
      betweenMore: [] // 补全页签个数
    }
  },
  watch: {
    type () {
      this.$nextTick(() => {
        this.setResizeStyle()
      })
    }
  },
  created () {
    const _this = this
    getClassifyAll().then((res) => {
      _this.classifyList = res
      for (let i = 0; i < _this.classifyList.length; i++) {
        if (_this.classifyList[i].id !== '3') {
          _this.classifyList[i].type = 'icon'
        } else {
          _this.classifyList[i].type = 'list'
        }
        _this.classifyList[i].label = _this.classifyList[i].name
        _this.classifyList[i].value = _this.classifyList[i].id
      }
      _this.type = _this.classifyList[0].id
    })
  },
  mounted () {
    addEvent('resize', this.setResizeStyle)
  },
  destroyed () {
    removeEvent('resize', this.setResizeStyle)
  },
  methods: {
    setResizeStyle () {
      // 补全space-between布局个数
      this.betweenMore = []
      // 获取tabs内容面板的宽度
      const tabsPanelItemBox = document.querySelector('.tabs-pane-item-box')
      // 获取当个模块宽度
      const tabsPanelItemBoxWidth = tabsPanelItemBox.offsetWidth
      const tabsItem = document.querySelector('.pane-item-box')
      // 获取所有模块个数
      const tabsItemlen = document.querySelectorAll('.pane-item-box').length
      // 获取每行个数
      const rowNum = Math.floor(tabsPanelItemBoxWidth / tabsItem.offsetWidth)
      // 获取多余个数
      const lastRowNum = tabsItemlen % rowNum
      const more = lastRowNum === 0 ? 0 : rowNum - lastRowNum
      this.betweenMore = new Array(more).map((e, i) => `${new Date()}-${i}`)
      this.$nextTick(() => {
        const betweenMoreItem = document.querySelectorAll('.between-more')
        betweenMoreItem.forEach((e) => {
          e.style.width = tabsItem.offsetWidth + 'px'
        })
      })
    },
    switchTabs (type) {
      // 手动切换标签
      const index = this.classifyList.findIndex((e) => e.id === this.type)
      if (index === -1) return this.$message.error('切换标签错误')
      const len = this.classifyList.length - 1
      this.type =
        type === 'left'
          ? index === 0
            ? this.type
            : this.classifyList[index - 1].id
          : index === len
            ? this.type
            : this.classifyList[index + 1].id
    },
    goSearch (childrenId) {
      this.$router.push({ path: '/resourceDir', query: { classifyId: this.type, childrenId: childrenId } })
    }
  }
}
</script>

<style>
div.icon-title {
  max-width: 120px;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis; /** 超出宽度显示为......**/
  white-space: nowrap; /* 不换行 */
}
.morecla {
  margin-left: 60px;
}
</style>
