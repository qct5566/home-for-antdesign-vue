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
              label="申请部门"
            >
              <a-input
                style="width: 140px"
                type="text"
                placeholder="请输入申请部门"
                v-model="doSearch.orgName"
                @change="searchProviderChange"
                @keyup.enter.native="doSearchAction"
              />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="8">
            <a-form-item
              label="提交时间"
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
      <span slot="hasTitle" slot-scope="mName">
        <span :title="mName" >{{ mName }}</span>
      </span>
      <span slot="shareType" slot-scope="shareTypeRow" >
        <a title="文件" class="icon_link" v-if="shareTypeRow==0">文件</a>
        <a title="API" class="icon_link" v-if="shareTypeRow==1">API</a>
        <a title="FTP" class="icon_link" v-if="shareTypeRow==2">FTP</a>
      </span>

      <span slot="feedbackStatus1Render" slot-scope="feedbackStatus1Render" >
        <a title="草稿" class="icon_link runing" v-if="feedbackStatus1Render==0">草稿</a>
        <a title="待反馈" class="icon_link fail" v-if="feedbackStatus1Render==1">待回复</a>
        <a title="已反馈" class="icon_link" v-if="feedbackStatus1Render==2">已回复</a>
      </span>

      <span slot="action1" slot-scope="val,row">
        <a v-if="row.feedbackStatus1 === '0'" class="a-btn" @click="handleEdit(row)" >编辑</a>
        <a v-if="row.feedbackStatus1 === '1'||row.feedbackStatus1 === '2'" class="a-btn" @click="handleDetail(row)">详情</a>
      </span>

    </s-table>
    <feedback-form editFormType="my" ref="refEditFeedbackResource" @refresh="doSearchAction" ></feedback-form>
    <feedback-detail-form editFormType="my" ref="refDetailFeedbackResource" ></feedback-detail-form>
  </div>
</template>

<script>
import { STable } from '@/components'
import FeedbackForm from './form/FeedbackForm'
import FeedbackDetailForm from './form/FeedbackDetailForm'
import { getMyTcFeedbackPageList } from '@/api/modules/feedbackService'
import moment from 'moment/moment'

const formatter = {
  dateFormatter: function (val) {
    if (val) {
      const date = moment(new Date(parseInt(val))).format('YYYY-MM-DD HH:mm:ss')
      return date
    } else {
      return '-'
    }
  }
}
export default {
  name: 'AppFeedback',
  components: {
    STable, FeedbackForm, FeedbackDetailForm
  },
  data () {
    return {
      unSubmitfilters: [
        {
          text: '草稿',
          value: '0'
        },
        {
          text: '待回复',
          value: '1'
        },
        {
          text: '已回复',
          value: '2'
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
        parameter.userId = this.userId
        return getMyTcFeedbackPageList(Object.assign(parameter, this.doSearch))
          .then(res => {
            return res
          })
      },
      userId: '1'
    }
  },
  computed: {
    columns () {
      const columns = [
        // 序号   目录名称   版本号   申请部门   提交时间     反馈时间   共享类型   问题 状态 操作
        // 序号   目录名称   版本号   申请部门   提交时间     反馈时间   共享类型   问题 状态 操作
        // metadataName  version  orgCodeName  submitTime   feedbackTime shareType  feedbackStatus1
        {
          title: '序号',
          align: 'left',
          width: '60px',
          customRender: (text, record, index) => {
            return `${(this.tableParameter.pageNo - 1) * this.tableParameter.pageSize + index + 1}`
          }
        },
        {
          title: '目录名称',
          dataIndex: 'metadataName',
          scopedSlots: { customRender: 'hasTitle' }
        },
        {
          title: '版本号',
          dataIndex: 'version'
        },
        {
          title: '申请部门',
          dataIndex: 'orgName'
        },
        {
          title: '提交时间',
          dataIndex: 'submitTime',
          customRender: formatter.dateFormatter
        },
        {
          title: '回复时间',
          dataIndex: 'feedbackTime',
          customRender: formatter.dateFormatter
        },
        {
          title: '共享类型',
          dataIndex: 'shareType',
          width: '80px',
          scopedSlots: { customRender: 'shareType' }
        },
        {
          title: '问题状态',
          dataIndex: 'feedbackStatus1',
          scopedSlots: { customRender: 'feedbackStatus1Render' },
          filters: this.unSubmitfilters,
          filterMultiple: false
        },
        {
          title: '操作',
          dataIndex: 'action1',
          width: '120px',
          scopedSlots: { customRender: 'action1' }
        }
      ]
      return columns
    }
  },
  methods: {
    searchMetadataNameChange () {
      this.doSearch.metadataName = this.doSearch.metadataName.replace(/[<>%]|[\s+]/g, '')
    },
    searchProviderChange () {
      this.doSearch.provider = this.doSearch.provider.replace(/[<>%]|[\s+]/g, '')
    },
    doReset () {
      this.doSearch = {
        metadataName: '',
        orgName: '',
        submitTimeBegin: null,
        submitTimeEnd: null
      }
      this.pickerValue = []
      this.doSearchAction()
    },
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
    doSearchAction () {
      this.$refs.table.refresh()
    },
    // 修改草稿
    handleEdit (row) {
      this.$refs.refEditFeedbackResource.edit(Object.assign({}, row))
    },
    // 显示详情
    handleDetail (row) {
      this.$refs.refDetailFeedbackResource.showDetail(Object.assign({}, row))
    }

  }
}
</script>

<style>

</style>
