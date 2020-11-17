<template>
  <div class="detail-content">
    <div class="detail-content-title" type="border">
      分析报表
    </div>
    <div class="grzx-wrap">
      <div class="grzx-wrap-left">
        <div class="grzx-wrap-left-title">分类</div>
        <a-input-search placeholder="分类名称" @change="onChange" />
        <a-tree
          ref="tree"
          @select="select"
          :treeData="treeData"
          :defaultProps="defaultProps"
          :expandedKeys="expandedKeys"
          @expand="onExpand"
        >
        </a-tree>
      </div>
      <div class="grzx-wrap-main">
        <div class="grzx-wrap-panel-inf">
          <span>共{{ pageInfo.total }}个报表</span>
          <div class="right">
            <a-input-search
              v-model="search.name"
              @search="doSearch"
              placeholder="输入分析报表名称"
              style="width: 240px" />
          </div>
        </div>
        <ul class="sjdp-sceens">
          <li v-for="(scr, index) in dataList" :key="index">
            <div class="click" @click="openTab(scr)">
              <div class="title ellipsis" :title="scr.name">{{ scr.name }}</div>
              <div class="info">创建时间：{{ timeFormatter(scr.createTime) }}</div>
              <div class="info">创建人：{{ scr.createUserName }}</div>
              <div class="para ellipsis2" style="height: 45px" :title="scr.desc">{{ scr.desc }}</div>
            </div>
            <div class="tool">
              <span class="red">浏览量: {{ scr.pageView }}</span>
              <a class="collect" :class="{'collected': scr.starId!=null }" @click="starItem(scr)">收藏</a>
            </div>
          </li>
        </ul>
        <!-- 分页工具 -->
        <a-pagination
          v-if="dataList.length>0"
          :pageSizeOptions="pageInfo.pageSizeOptions"
          :total="pageInfo.total"
          showSizeChanger
          :pageSize="pageInfo.pageSize"
          :current="pageInfo.current"
          @showSizeChange="onShowSizeChange"
          @change="pageChange"
          style="float: right;"
        >
          <template slot="buildOptionText" slot-scope="props">
            <span>{{ props.value }}条/页</span>
          </template>
        </a-pagination>

        <a-empty v-if="dataList.length==0" />
      </div>
    </div>
  </div>
</template>

<script>
import { getReportClassifyAll } from '@/api/modules/reportClassifyService'
import { getReportAll, updateReport } from '@/api/modules/reportService'
import { addReportStar, deleteReportStar } from '@/api/modules/reportStarService'
import moment from 'moment'
export default {
  data () {
    return {
      classifyData: [],
      treeData: [],
      expandedKeys: [],
      // 菜单树，定义树的转换格式
      defaultProps: {
        id: 'id',
        name: 'name',
        parentId: 'pid',
        // 根节点的parentId
        rootId: null
      },
      currentClassify: '',
      pageInfo: {
        pageSizeOptions: ['9', '12', '15'],
        current: 1,
        pageSize: 9,
        total: 0
      },
      // 查询条件参数
      search: {
        name: ''
      },
      //  列表数据
      dataList: [],
      userId: ''
    }
  },
  created: function () {
    this.getTreeData()
    this.getDataList()
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
    onChange (e) {
      this.searchValue = e.target.value
      this.expandedKeys.splice(0, this.expandedKeys.length)
      this.expandedKeys.push(1)
      if (this.searchValue !== '') {
        this.classifyData.forEach(item => {
          if (item.name.indexOf(this.searchValue) > -1) {
            this.expandedKeys.push(item.pid)
          }
        })
      }
    },
    onExpand (expandedKeys) {
      this.expandedKeys = expandedKeys
    },
    select (selectedKeys, e) {
      this.pageInfo.current = 1
      this.currentClassify = e.node.dataRef
      if (!e.selected) {
        this.currentClassify = ''
      }
      this.getDataList()
    },
    getTreeData () {
      const _this = this
      getReportClassifyAll().then(res => {
        this.classifyData = res
        const data = _this.listToTree(this.classifyData)
        _this.isLeafChange(data)
        _this.treeData = data[0].children
      })
    },
    listToTree: function (list) {
      const _this = this
      const map = {}
      list.forEach(item => {
        if (!map[item[_this.defaultProps.id]]) {
          _this.setTreeAttr(item)
          map[item[_this.defaultProps.id]] = item
        }
      })

      list.forEach(item => {
        if (item[_this.defaultProps.parentId] !== _this.defaultProps.rootId && map[item[_this.defaultProps.parentId]] != null) {
          map[item[_this.defaultProps.parentId]].children ? map[item[_this.defaultProps.parentId]].children.push(item) : map[item[_this.defaultProps.parentId]].children = [item]
        }
      })

      return list.filter(item => {
        if (item[_this.defaultProps.parentId] === _this.defaultProps.rootId || map[item[_this.defaultProps.parentId]] == null) {
          return item
        }
      })
    },
    setTreeAttr (item) {
      const _this = this
      item.title = item[_this.defaultProps.name]
      item.key = item[_this.defaultProps.id]
      if (!item.slots) {
        item.slots = {}
      }
      if (!item.scopedSlots) {
        item.scopedSlots = {}
      }
      item.scopedSlots.title = 'custom'
      item.slots.title = 'custom'
      item.showAddBtn = false
      item.showEditBtn = false
      item.showDeleteBtn = false
      item.showUpBtn = false
      item.showDownBtn = false
      if (item.isParent != null) {
        if (item.isParent) {
          item.isLeaf = false
        } else {
          item.isLeaf = true
        }
      }

      return item
    },
    // 判断是否是叶子
    isLeafChange (treeData) {
      treeData.forEach(item => {
        if (item.children === null || item.children === undefined || item.children.length === 0) {
          item.isLeaf = true
        } else {
          item.isLeaf = false
          this.isLeafChange(item.children)
        }
      })
      return treeData
    },
    getDataList () {
      const _this = this
      const parameter = {}
      _this.search.name = _this.search.name.trim()
      Object.assign(parameter, _this.search)
      if (this.currentClassify.pid !== null) {
        parameter.classifyId = this.currentClassify.id
      }
      parameter.offset = (_this.pageInfo.current - 1) * _this.pageInfo.pageSize
      parameter.limit = _this.pageInfo.pageSize
      parameter.userId = this.userId
      getReportAll(parameter).then(res => {
        _this.dataList = res.list
        _this.pageInfo.total = res.total
      })
    },
    // 分页每页数量改变事件
    onShowSizeChange (current, pageSize) {
      this.pageInfo.pageSize = pageSize
      this.pageInfo.current = 1
      this.getDataList()
    },
    //  翻页事件
    pageChange (current) {
      this.pageInfo.current = current
      this.getDataList()
    },
    starItem (item) {
      if (this.userId.length > 0) {
        if (item.starId != null) {
          deleteReportStar({ 'ids[]': item.starId }).then(res => {
            item.starId = null
          })
        } else {
          addReportStar({ reportId: item.id, userId: this.userId }).then(res => {
            this.$set(item, 'starId', res.id)
          })
        }
      } else {
        this.$message.warn('请先登录！')
      }
    },
    openTab (item) {
      item.pageView = item.pageView + 1
      updateReport({ id: item.id, pageView: item.pageView })
      window.open(item.url, '_blank')
    },
    doSearch () {
      this.pageInfo.current = 1
      this.getDataList()
    }
  }
}
</script>

<style>
  div.ellipsis {
    max-width: 100%;
    display:block;
    overflow:hidden;
    text-overflow:ellipsis; /** 超出宽度显示为......**/
    white-space:nowrap;/* 不换行 */
  }
  div.ellipsis2 {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  div.click {
    cursor: pointer;
  }
</style>
