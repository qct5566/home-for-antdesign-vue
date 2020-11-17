<template>
  <div style="margin: auto">
    <div class="home-layout-header-search">
      <a-input-search
        placeholder="请输入关键词"
        enter-button="搜索"
        size="large"
        allowClear
        v-model="searchValue"
        class="home-layout-header-search-input"
        :loading="loading"
        @change="changeSearch"
        @search="onSearch(arguments)"
      >
        <a-icon
          slot="prefix"
          class="home-layout-header-search-input-icon"
          type="search"
        />
      </a-input-search>
      <a-button
        type="link"
        class="high-search"
        @click="goSearch('')"
        v-if="showHigh"
      >高级搜索</a-button>
      <search-result v-if="resultParams.visible" :obj="resultParams" />
    </div>
    <div v-if="$route.path === '/home'" style="color: white">
      热搜热词：
      <a
        style="color: white;margin-right: 5px"
        v-for="(item, index) in keyWordList"
        :key="index"
        @click="goSearch(item.keyWord)"
      >{{ item.keyWord }}</a></div>
  </div>
</template>

<script>
import SearchResult from './searchResult'
import { mapMutations } from 'vuex'
import { getTopN } from '@/api/modules/keyWordService'
export default {
  components: { SearchResult },
  data () {
    return {
      keyWordList: [],
      searchValue: '',
      loading: false,
      resultParams: {
        visible: false,
        isHigh: false
      }
    }
  },
  computed: {
    showHigh () {
      const include = ['/home']
      return include.includes(this.$route.path)
    }
  },
  created () {
    getTopN({ n: 3 }).then(res => {
      this.keyWordList = res
    })
  },
  methods: {
    ...mapMutations(['SET_SEARCH_VALUE']),
    changeSearch () {
      this.SET_SEARCH_VALUE(this.searchValue)
    },
    onSearch (args) {
      const event = args[1]
      // 判断如果点击的时候消除按钮，不执行搜索
      const toElement = event.toElement
      const isClickAllowClear = toElement !== undefined && (
        toElement.dataset.icon === 'close-circle' ||
              toElement.parentNode.dataset.icon === 'close-circle')
      if (!isClickAllowClear) {
        if (this.$route.path === '/home') {
          this.$router.push({ path: '/resourceDir' })
        } else {
          this.$bus.$emit('on-search', this.searchValue)
        }
        // this.resultParams = {
        //   visible: true,
        //   searchValue: value,
        //   isHigh: !!isHigh
        // }
      } else {
        this.searchValue = ''
        this.$bus.$emit('on-search', this.searchValue)
      }
    },
    goSearch (value) {
      this.searchValue = value
      this.SET_SEARCH_VALUE(this.searchValue)
      this.$router.push({ path: '/resourceDir' })
    }
  }
}
</script>

 <style lang="less" scoped>
.home-layout-header-search-input {
  width: 470px;
  &icon {
    color: #999;
    font-size: 20px;
  }
}
</style>
