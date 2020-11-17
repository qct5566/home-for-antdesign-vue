<template>
  <div class="home-layout-hot-rec">
    <div>
      <div class="home-layout-hot-rec-header"></div>
      <div class="home-layout-hot-rec-content">
        <!-- 左按钮 -->
        <div class="home-tabs-switch-left" @click="switchTabs('left')"></div>
        <!-- 切换部分 -->
        <div class="home-rec-inner">
          <div class="home-rec-inner-box">
            <ul
              class="home-rec-list"
              ref="list"
              :style="{ marginLeft: recMargin }"
            >
              <li
                :class="homeRecCur === index?'cur':'noCur'"
                v-for="(item, index) in hotRecList"
                :key="index"
              >
                <div class="title" :class="item.backgroundClass">
                  {{ item.title }}
                </div>
                <div class="body">
                  <ul>
                    <li
                      v-for="(bodyItem, bodyIndex) in item.children.filter((e, i) =>
                        i < 10
                      )"
                      :key="bodyIndex"
                    >
                      <div class="text" @click="goDetail(bodyItem.id)">
                        {{ bodyIndex + 1 }}.{{ bodyItem.name }}
                      </div>
                      <span class="right">{{ bodyItem.number }}次</span>
                    </li>
                  </ul>
                  <a class="more-list" @click="showAll(item.type)">
                    更多
                    <a-icon type="right"></a-icon>
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <!-- 右按钮 -->
        <div class="home-tabs-switch-right" @click="switchTabs('right')"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { getIndexSortAll } from '@/api/modules/metadataClassifyService'
import { addEvent, removeEvent } from '@/utils'
export default {
  data () {
    return {
      hotRecList: [],
      homeRecCur: 1,
      showNum: 3
    }
  },
  computed: {
    recMargin () {
      let left = (this.showNum % 2 === 0 || this.showNum === 1)
        ? -this.homeRecCur * 364
        : -(this.homeRecCur - 1) * 364
      if ((this.homeRecCur + 1) === this.hotRecList.length && this.showNum !== 1) {
        left = left - 364
      }
      left = left + 'px'
      return left
    }
  },
  created () {
    getIndexSortAll().then(res => {
      this.hotRecList = res
    })
  },
  mounted () {
    // this.$nextTick(() => {
    //   this.setResizeStyle()
    // })
    addEvent('resize', this.setResizeStyle)
  },
  destroyed () {
    removeEvent('resize', this.setResizeStyle)
  },
  methods: {
    setResizeStyle () {
      const recBox = document.querySelector('.home-rec-inner')
      const recItem = document.querySelector('.home-rec-list .noCur')
      const recCurItem = document.querySelector('.home-rec-list .cur')
      const showNum = Math.floor(recBox.clientWidth / (recItem.clientWidth + 28))
      const recInnerBox = document.querySelector('.home-rec-inner-box')
      recInnerBox.style.width = (showNum - 1) * recItem.clientWidth + recCurItem.clientWidth + showNum * 28 + 'px'
      this.homeRecCur = showNum % 2 === 0 ? 0 : (Math.floor(showNum / 2))
      this.showNum = showNum
    },
    switchTabs (type) {
      const len = this.hotRecList.length - 1
      this.homeRecCur =
              type === 'left'
                ? this.homeRecCur === 0
                  ? this.homeRecCur
                  : this.homeRecCur - 1
                : this.homeRecCur === len
                  ? this.homeRecCur
                  : this.homeRecCur + 1
      //   this.recMargin = -(this.homeRecCur - 1) * 364 + 'px'
    },
    showAll (sortType) {
      this.$router.push({ path: '/resourceDir', query: { sortType: sortType } })
    },
    goDetail (id) {
      const routeUrl = this.$router.resolve({ path: '/resourceDir/detail', query: { metadataId: id } })
      window.open(routeUrl.href, '_blank')
    }
  }
}
</script>

<style lang="less"></style>
