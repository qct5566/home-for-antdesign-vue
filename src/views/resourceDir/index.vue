<template>
  <div class="detail-back" style="padding-top: 42px;">
    <div class="search-content">
      <div class="search-flter">
        <div
          v-for="(classify,index) in classifyList"
          :key="classify.id"
          class="line"
          :class="{'showAll': classifyMore[classify.id-1]}">
          <div class="label">{{ classify.name }}：</div>
          <div class="filters">
            <a :class="classifyCur[index] === ''?'cur':''" @click="doSearch(index,'')" >全部</a>
            <a
              v-for="children in classify.childrenClassify"
              :key="children.id"
              :title="children.name"
              @click="doSearch(index,children.id)"
              :class="classifyCur[index] === children.id?'cur':''">
              {{ children.name }}
            </a>
          </div>
          <a class="more" @click="$set(classifyMore, index, !classifyMore[index])"></a>
        </div>
        <div class="line">
          <div class="label">更新时间：</div>
          <div class="filters filters_inline">
            <a :class="classifyCur[3] === ''?'cur':''" @click="doSearch(3,'')">全部</a>
            <a :class="classifyCur[3] === '1'?'cur':''" @click="doSearch(3,'1')">最近一个月</a>
            <a :class="classifyCur[3] === '6'?'cur':''" @click="doSearch(3,'6')">最近半年</a>
            <a :class="classifyCur[3] === '12'?'cur':''" @click="doSearch(3,'12')">最近一年</a>
          </div>
          <div class="filters_time">
            <span>开始时间</span>
            <a-date-picker
              :disabled-date="disabledStartDate"
              @change="startTimeChange"
              placeholder="选择开始时间" />
            <span> ~ </span>
            <span>结束时间</span>
            <a-date-picker
              @change="endTimeChange"
              :disabled-date="disabledEndDate"
              placeholder="选择结束时间" />
          </div>
        </div>
      </div>
      <div class="search-main">
        <div class="search-main-left">
          <div class="search-top-div">
            <div class="search-top-title search-top-title_fw">服务申请排行（TOP5）</div>
            <ul class="search-top-result">
              <li
                v-for="(apply, index) in applyTop.filter((e, i) =>i < 5)"
                :key="index">
                <span class="num">{{ index+1 }}</span>
                <span class="click" @click="toDetail(apply.id)">{{ apply.name }}</span>
              </li>
            </ul>
          </div>
          <div class="search-top-div">
            <div class="search-top-title search-top-title_ll">浏览次数排行（TOP5）</div>
            <ul class="search-top-result">
              <li v-for="(pv, index) in pvTop.filter((e, i) =>i < 5)" :key="index">
                <span class="num">{{ index+1 }}</span>
                <span class="click" @click="toDetail(pv.id)">{{ pv.name }}</span>
              </li>
            </ul>
          </div>
          <!--<div class="search-trophies-div">
            <ul class="search-trophies">
              <li>
                <div class="title">数据之星</div>
                <div class="">福州市水利局</div>
                <div class="">2019年提供数据</div>
                <div class="">321,456,128条</div>
              </li>
              <li>
                <div class="title">贡献之星</div>
                <div class="">福州市水利局</div>
                <div class="">2019年提供数据</div>
                <div class="">321,456,128条</div>
              </li>
              <li>
                <div class="title">搜索之星</div>
                <div class="">福州市水利局</div>
                <div class="">2019年提供数据</div>
                <div class="">321,456,128条</div>
              </li>
              <li>
                <div class="title">应用之星</div>
                <div class="">福州市水利局</div>
                <div class="">2019年提供数据</div>
                <div class="">321,456,128条</div>
              </li>
            </ul>
          </div>-->
        </div>
        <div class="search-main-right">
          <div class="search-result-info">
            <span>共<span class="num">{{ pageInfo.total }}</span>条</span>
            <div class="checks">
              <a-checkbox defaultChecked value="2" @change="typeChange">数据库</a-checkbox>
              <a-checkbox defaultChecked value="1" @change="typeChange">API</a-checkbox>
              <a-checkbox defaultChecked value="06" @change="typeChange">文件</a-checkbox>
              <a-checkbox defaultChecked value="05" @change="typeChange">FTP</a-checkbox>
              <a-checkbox defaultChecked value="4" @change="typeChange">暂无资源</a-checkbox>
            </div>
            <div class="select">
              <a-select
                v-model="sortValue"
                @change="sortChange"
                style="width: 120px" >
                <a-select-option value="name">
                  按名称排序
                </a-select-option>
                <a-select-option value="pv">
                  按浏览排序
                </a-select-option>
                <a-select-option value="useCount">
                  按使用量排序
                </a-select-option>
                <a-select-option value="createTime">
                  按更新时间排序
                </a-select-option>
                <a-select-option value="applyCount">
                  按申请量排序
                </a-select-option>
                <a-select-option value="apiCall">
                  按API调用量排序
                </a-select-option>
              </a-select>
            </div>
          </div>
          <div>
            <ul class="search-result-list">
              <li v-for="(re, index) in this.metadataList" :key="index">
                <div class="title">
                  <span><router-link tag="a" target="_blank" :to="{name:'resourceDir/detail', query: { metadataId: re.metadataId }}">{{ re.name }}</router-link></span>
                  <div class="right colBtns">
                    <a class="collect" :class="{'collected': re.starId != null}" @click="starItem(re)">收藏</a>
                    <a class="invite" v-if="re.applyStatus !=null && re.applyStatus !=2 " :class="{'inviting': re.applyStatus == 0, 'invited': re.applyStatus == 1}">申请</a>
                    <a class="invite" v-else @click="applyMetadata(re.metadataId)" >申请</a>
                  </div>
                </div>
                <div class="infos">
                  <span class="col">
                    <label>更新日期:</label>
                    {{ timeFormatter(re.createTime) }}
                  </span>
                  <span class="col">
                    <label>数据领域:</label>
                    {{ re.themeName }}
                  </span>
                  <span class="col">
                    <label>数据来源:</label>
                    {{ re.provider }}
                  </span>
                  <span class="col">
                    <label>数据量:</label>
                    {{ re.dataCount }}
                  </span>
                  <span class="col">
                    <label>浏览量:</label>
                    {{ re.pv }}
                  </span>
                  <span class="col">
                    <label>使用量:</label>
                    {{ re.useCount }}
                  </span>
                </div>
                <div class="abstract metaDesc">
                  数据摘要：{{ re.des }}
                </div>
                <div>
                  <div class="type color5" v-if="re.type.indexOf('2')>-1">
                    <a>数据库</a>
                  </div>
                  <div class="type color2" v-if="re.type.indexOf('1')>-1">
                    <a>API</a>
                  </div>
                  <div class="type color3" v-if="re.type.indexOf('06')>-1">
                    <a>文件</a>
                  </div>
                  <div class="type color4" v-if="re.type.indexOf('05')>-1">
                    <a>FTP</a>
                  </div>
                  <div class="type" v-if="re.type.indexOf('4')>-1">
                    <a>暂无数据</a>
                  </div>
                </div>
              </li>
            </ul>
            <div style="padding-bottom: 32px;text-align: center">
              <a-pagination
                v-if="metadataList.length>0"
                :total="pageInfo.total"
                :pageSize="pageInfo.pageSize"
                :current="pageInfo.current"
                @change="pageChange"
              />
              <a-empty v-if="metadataList.length==0" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <apply-form ref="applyForm"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
import { getClassifyAll } from '@/api/modules/classifyService'
import { getIndexSortAll } from '@/api/modules/metadataClassifyService'
import { queryMetadataListSearch } from '@/api/modules/tmMetadataService'
import { addMetadataStar, deleteMetadataStar } from '@/api/modules/metadataStarService'
import { addKeyWord } from '@/api/modules/keyWordService'
import ApplyForm from '@/views/resourceDir/detail/applyForm'
export default {
  components: {
    ApplyForm
  },
  data () {
    return {
      classifyCur: ['', '', '', ''],
      classifyMore: [false, false, false],
      classifyList: [],
      applyTop: [],
      pvTop: [],
      metadataList: [],
      searchParams: {},
      type: ['2', '1', '06', '05', '4'],
      pageInfo: {
        current: 1,
        pageSize: 10,
        total: 0
      },
      sortValue: 'name',
      userId: ''
    }
  },
  computed: {
    ...mapGetters(['searchValue'])
  },
  created () {
    getClassifyAll().then(res => {
      this.classifyList = res
    })
    getIndexSortAll().then(res => {
      for (let i = 0; i < res.length; i++) {
        if (res[i].type === 'applyCount') {
          this.applyTop = res[i].children
        }
        if (res[i].type === 'pv') {
          this.pvTop = res[i].children
        }
      }
    })
    this.searchParams.name = this.searchValue
    if (this.searchValue.length > 0) {
      addKeyWord({ searchWord: this.searchValue })
    }
    this.doReset()
  },
  mounted () {
    const sortType = this.$route.query.sortType
    if (sortType !== undefined) { this.sortChange(sortType) }
    const classifyId = this.$route.query.classifyId - 1
    const childrenId = this.$route.query.childrenId
    if (childrenId !== undefined) { this.doSearch(classifyId, childrenId) }
    this.$bus.$on('on-search', (data) => this.onSearch(data))
  },
  methods: {
    timeFormatter: function (val) {
      if (val) {
        const date = moment(new Date(parseInt(val))).format('YYYY-MM-DD HH:mm:ss')
        return date
      } else {
        return ''
      }
    },
    onSearch (data) {
      this.searchParams.name = data
      this.pageChange(1)
      if (data.length > 0) {
        addKeyWord({ searchWord: data })
      }
    },
    sortChange (sortValue) {
      this.sortValue = sortValue
      this.pageChange(1)
    },
    startTimeChange (date, dateString) {
      this.searchParams.startTime = dateString
      this.pageChange(1)
    },
    endTimeChange (date, dateString) {
      this.searchParams.endTime = dateString
      this.pageChange(1)
    },
    typeChange (e) {
      if (e.target.checked) {
        this.type.push(e.target.value)
      } else {
        this.type.splice(this.type.indexOf(e.target.value), 1)
      }
      let type = ''
      for (let i = 0; i < this.type.length; i++) {
        if (i === 0) {
          type = this.type[i]
        } else {
          type = type + ',' + this.type[i]
        }
      }
      this.searchParams.type = type
      this.pageChange(1)
    },
    doReset () {
      this.searchParams.userId = this.userId
      this.searchParams.sort = this.sortValue
      this.searchParams.offset = (this.pageInfo.current - 1) * this.pageInfo.pageSize
      this.searchParams.limit = this.pageInfo.pageSize

      queryMetadataListSearch(this.searchParams).then(res => {
        this.metadataList = res.list
        this.pageInfo.total = res.total
      })
    },
    //  翻页事件
    pageChange (current) {
      this.pageInfo.current = current
      this.doReset()
    },
    disabledStartDate (startValue) {
      const endValue = this.endValue
      if (!startValue || !endValue) {
        return false
      }
      return startValue.valueOf() > endValue.valueOf()
    },
    disabledEndDate (endValue) {
      const startValue = this.startValue
      if (!endValue || !startValue) {
        return false
      }
      return startValue.valueOf() >= endValue.valueOf()
    },
    doSearch (pid, id) {
      this.$set(this.classifyCur, pid, id)
      this.searchParams.name = this.searchValue
      if (pid === 0) {
        this.searchParams.tmtClassifyId = id
      }
      if (pid === 1) {
        this.searchParams.themeClassifyId = id
      }
      if (pid === 2) {
        this.searchParams.deptClassifyId = id
      }
      if (pid === 3) {
        this.searchParams.createTime = id
      }
      this.pageChange(1)
    },
    starItem (item) {
      if (this.userId.length > 0) {
        if (item.starId != null) {
          deleteMetadataStar({ 'ids[]': item.starId }).then(res => {
            item.starId = null
          })
        } else {
          addMetadataStar({ metadataId: item.metadataId, userId: this.userId }).then(res => {
            this.$set(item, 'starId', res.id)
          })
        }
      } else {
        this.$message.warn('请先登录！')
      }
    },
    toDetail (metadataId) {
      const routeUrl = this.$router.resolve({ name: 'resourceDir/detail', query: { metadataId: metadataId } })
      window.open(routeUrl.href, '_blank')
    },
    applyMetadata (metadataId) {
      if (this.userId.length > 0) {
        this.$refs.applyForm.add({
          metadataId: metadataId,
          userId: this.userId
        })
      } else {
        this.$message.warn('请先登录！')
      }
    }
  }
}
</script>

<style>
  div.metaDesc{
    max-width: 100%;
    display:block;
    overflow:hidden;
    text-overflow:ellipsis; /** 超出宽度显示为......**/
    white-space:nowrap;/* 不换行 */
  }
  label {
    font-weight: 400;
  }
  .click {
    cursor: pointer;
  }
</style>
