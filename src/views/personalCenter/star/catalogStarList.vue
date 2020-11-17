<template>
  <div>
    <div class="grzx-table-tool">
      <a-form layout="inline">
        <a-row :gutter="24">
          <a-col :md="6" :sm="6">
            <a-form-item
              label="目录名称"
            >
              <a-input
                style="width: 140px"
                type="text"
                placeholder="请输入目录名称"
                v-model="doSearch.metadataName"
                @change="searchMetadataNameChange"
                @keyup.enter.native="doSearchAction"
              />
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="6">
            <a-form-item
              label="提供部门"
            >
              <a-input
                style="width: 140px"
                type="text"
                placeholder="请输入提供部门"
                v-model="doSearch.provider"
                @change="searchProviderChange"
                @keyup.enter.native="doSearchAction"
              />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="8">
            <a-form-item
              label="收藏时间"
            >
              <a-range-picker
                style="width: 240px;"
                v-model="pickerValue"
                @change="pickerValueChange"
              >
                <a-icon slot="suffixIcon"/>
              </a-range-picker>
            </a-form-item>
          </a-col>
          <a-col style="text-align: right" :md="4" :sm="4">
            <div style="padding-top: 4px">
              <a-button type="primary" @click="doSearchAction">查 询</a-button>
              <a-button style="margin-left: 8px" @click="doReset">重 置</a-button>
            </div>
          </a-col>
        </a-row>

      </a-form>
    </div>

    <s-table
      ref="table"
      size="default"
      rowKey="id"
      :columns="columns"
      :data="loadTableData"
      showPagination="auto"

    >
      <template slot="name" slot-scope="val,row" >
        <router-link tag="a" target="_blank" :to="{name:'resourceDir/detail', query: { metadataId: row.metadataId }}">{{ row.name }}</router-link>
      </template>
      <template slot="status" slot-scope="status" >
        <span title="正常" style="color:lightgreen" v-if="status===7">正常</span>
        <span title="失效" style="color:grey" v-if="status!==7">失效</span>
      </template>
      <template slot="operate" slot-scope="val,row" >
        <a @click="submitCancelStar(row.starId)" title="取消收藏">取消收藏</a>
      </template>
    </s-table>

  </div>
</template>

<script>
import { STable } from '@/components'
import { deleteMetadataStar, metadatlimitaStarList } from '@/api/modules/metadataStarService'
// eslint-disable-next-line no-unused-vars
import moment from 'moment/moment'

const formatter = {
  indexFormatter: function (val, row, i) {
    return row.page * 10 + (i + 1)
  },
  dateFormatter: function (val) {
    if (val) {
      return moment(new Date(parseInt(val))).format('YYYY-MM-DD')
    } else {
      return '-'
    }
  }
}

export default {
  name: 'CatalogStarList',
  components: {
    STable
  },
  data () {
    return {
      columns: [
        {
          title: '序号',
          align: 'left',
          width: '60px',
          customRender: (text, record, index) => {
            return `${(this.tableParameter.pageNo - 1) * this.tableParameter.pageSize + index + 1}`
          }
        }, {
          title: '目录名称',
          dataIndex: 'name',
          scopedSlots: { customRender: 'name' }
        },
        {
          title: '提供部门',
          dataIndex: 'provider'
        },
        {
          title: '收藏时间',
          dataIndex: 'createTime',
          customRender: formatter.dateFormatter
        },
        {
          title: '状态',
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' }
        },
        {
          title: '操作',
          dataIndex: 'operate',
          width: '100px',
          scopedSlots: { customRender: 'operate' }
        }
      ],

      pickerValue: [],
      // 需要展开的节点id
      expandedKeys: ['root'],
      // 返回树数据
      treeData: [],
      // 定义树的转换格式
      defaultProps: {
        id: 'id',
        name: 'name',
        parentId: 'parentId',
        // 根节点的parentId
        rootId: null,
        tableParameter: {}
      },
      doSearch: {
        metadataName: '',
        codeName: '',
        submitTimeBegin: '',
        submitTimeEnd: ''
      },
      // 加载数据方法 必须为 Promise 对象
      loadTableData: parameter => {
        this.tableParameter = parameter
        return metadatlimitaStarList(Object.assign(parameter, this.doSearch))
          .then(res => {
            return res
          })
      },
      userId: '1'
    }
  },
  computed: {

  },
  methods: {
    // 时间控件改变事件
    pickerValueChange (date, dateString) {
      const _this = this
      if (date.length !== 0) {
        _this.doSearch.submitTimeBegin = date[0]._d
        _this.doSearch.submitTimeEnd = date[1]._d
      } else {
        _this.doSearch.submitTimeBegin = null
        _this.doSearch.submitTimeEnd = null
      }
      _this.pickerValue = date
    },
    doReset () {
      this.doSearch = {
        metadataName: '',
        provider: '',
        submitTimeBegin: null,
        submitTimeEnd: null
      }
      this.pickerValue = []
      this.doSearchAction()
    },
    submitCancelStar (starId) {
      const _this = this
      _this.$confirm({
        title: '提示',
        content: '是否取消收藏?',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk () {
          deleteMetadataStar({ 'ids[]': starId }).then(res => {
            _this.doSearchAction()
            _this.$message.success('取消收藏成功！')
          })
        },
        onCancel () {

        }
      })
    },
    searchMetadataNameChange () {
      this.doSearch.metadataName = this.doSearch.metadataName.replace(/[<>%]|[\s+]/g, '')
    },
    searchProviderChange () {
      this.doSearch.provider = this.doSearch.provider.replace(/[<>%]|[\s+]/g, '')
    },
    doSearchAction () {
      this.$refs.table.refresh()
    }
  }
}
</script>

<style>

</style>
