<template>
  <div>
    <div class="grzx-table-tool">
      <a-radio-group v-model="userApplicationSearch.delStatus" @change="doSearch">
        <a-radio-button value="0">
          正常
        </a-radio-button>
        <a-radio-button value="-1">
          注销
        </a-radio-button>
      </a-radio-group>
      <div class="right">
        <a-input
          style="width: 160px"
          placeholder="请输入目录名称"
          v-model="userApplicationSearch.metadataName"
          maxlength="30"
        />
        <a-input
          style="width: 160px"
          placeholder="请输入提供部门名称"
          v-model="userApplicationSearch.providerName"
          maxlength="32"
        />
        <a-button type="primary" @click="doSearch">查询</a-button>
      </div>
    </div>
    <a-table
      ref="userApplicationTable"
      :columns="userApplicationColumns"
      :row-key="record => record.applicationId"
      :data-source="userApplicationTableData"
      :pagination="userApplicationPagination"
      @change="handleUserApplicationTableChange"
    >
      <template slot="name" slot-scope="val,row">
        <span :title="val"><router-link tag="a" target="_blank" :to="{name:'resourceDir/detail', query: { metadataId: row.id }}">{{ val.length > 8 ? val.substring(0,8) + '...' : val }}</router-link></span>
      </template>

      <template slot="provider" slot-scope="val">
        <span :title="val">{{ val.length > 4 ? val.substring(0,4) + '...' : val }}</span>
      </template>

      <template slot="applicationStatus" slot-scope="val">
        <a title="待审核" class="icon_link pending" v-if="val === '0'">待审核</a>
        <a title="通过" class="icon_link pass" v-if="val === '1'">通过</a>
        <a title="不通过" class="icon_link not_pass" v-if="val === '2'">不通过</a>
      </template>

      <template slot="action" slot-scope="val,row">
        <template v-if="userApplicationSearch.delStatus === '0'">
          <template v-if="row.applicationStatus === '0'">
            <a class="a-btn" @click="handleDetail">审批详情</a>
            <a-divider type="vertical" />
            <a class="a-btn" @click="handleCancel(row.applicationId)">取消申请</a>
          </template>
          <template v-else>
            <a class="a-btn" @click="handleDetail">审批详情</a>
            <a-divider type="vertical" />
            <a class="a-btn" @click="handleReApply(row.id)">重新申请</a>
            <a-divider type="vertical" />
            <a class="a-btn" @click="handleFeedback">反馈</a>
          </template>
        </template>
        <template v-if="userApplicationSearch.delStatus === '-1'">
          <a class="a-btn" @click="handleDetail">审批详情</a>
        </template>
      </template>
    </a-table>
    <apply-form ref="applyForm" @apply-success="doSearch"/>
  </div>
</template>

<script>
import { getUserApplicationPageList, cancelApply } from '@/api/modules/metadataApplicationService'
import ApplyForm from '@/views/resourceDir/detail/applyForm'
import moment from 'moment'

const formatter = {
  datetimeFormatter: function (val) {
    if (val) {
      const date = moment(new Date(parseInt(val))).format('YYYY-MM-DD HH:mm:ss')
      return date
    } else {
      return '-'
    }
  },
  dateFormatter: function (val) {
    if (val) {
      const date = moment(new Date(parseInt(val))).format('YYYY-MM-DD')
      return date
    } else {
      return '-'
    }
  }
}

export default {
  name: 'MyApplication',
  components: {
    ApplyForm
  },
  data () {
    return {
      userId: '',
      // 用户申请表字段
      userApplicationColumns: [
        {
          title: '序号',
          dataIndex: 'NO',
          customRender: (text, record, index) => {
            return `${(this.userApplicationPagination.current - 1) * this.userApplicationPagination.pageSize + index + 1}`
          }
        },
        {
          title: '目录名称',
          dataIndex: 'name',
          scopedSlots: { customRender: 'name' }
        },
        {
          title: '版本号',
          dataIndex: 'version'
        },
        {
          title: '提供部门',
          dataIndex: 'provider',
          scopedSlots: { customRender: 'provider' }
        },
        {
          title: '共享方式',
          dataIndex: 'type',
          customRender: (text) => {
            if (text.indexOf('1') > -1) {
              return 'API'
            } else if (text.indexOf('05') > -1) {
              return 'FTP'
            } else if (text.indexOf('06') > -1) {
              return '文件'
            } else if (text.indexOf('4') > -1 || text === '') {
              return '暂无资源'
            }
          }
        },
        {
          title: '申请时间',
          dataIndex: 'applyTime',
          customRender: formatter.datetimeFormatter
        },
        {
          title: '使用截止时间',
          dataIndex: 'useDeadline',
          customRender: formatter.dateFormatter
        },
        {
          title: '审批结果',
          dataIndex: 'applicationStatus',
          scopedSlots: { customRender: 'applicationStatus' },
          filters: [
            { text: '待审批', value: '0' },
            { text: '通过', value: '1' },
            { text: '不通过', value: '2' }
          ]
        },
        {
          title: '操作',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 用户申请表数据
      userApplicationTableData: [],
      // 用户申请表分页
      userApplicationPagination: {
        current: 1,
        pageSize: 10,
        total: 0
      },
      // 用户申请表查询条件
      userApplicationSearch: {
        userId: '',
        delStatus: '0',
        metadataName: undefined,
        providerName: undefined
      }
    }
  },
  mounted () {
    // TODO 之后从缓存获取
    this.userId = 'e7e931805e9d408093de77b6982e072d'
    this.userApplicationSearch.userId = this.userId
    this.getUserApplicationTable(this.userApplicationSearch)
  },
  methods: {
    // 用户申请table分页
    handleUserApplicationTableChange (pagination, filters) {
      const pager = { ...this.userApplicationPagination }
      pager.current = pagination.current
      this.userApplicationPagination = pager

      if (filters.applicationStatus) {
        this.userApplicationSearch.applicationStatus = filters.applicationStatus.toString()
      }
      this.userApplicationSearch.offset = (this.userApplicationPagination.current - 1) * this.userApplicationPagination.pageSize
      this.userApplicationSearch.limit = this.userApplicationPagination.pageSize
      this.getUserApplicationTable(this.userApplicationSearch)
    },
    // 用户申请table
    getUserApplicationTable (params = {}) {
      const _this = this
      getUserApplicationPageList(params).then(data => {
        const pagination = { ..._this.userApplicationPagination }
        pagination.total = data.total
        _this.userApplicationTableData = data.list
        _this.userApplicationPagination = pagination
      })
    },
    doSearch () {
      this.userApplicationSearch.offset = 0
      this.userApplicationSearch.limit = 10
      this.getUserApplicationTable(this.userApplicationSearch)
    },
    handleDetail () {
      // TODO 审批详情
    },
    handleCancel (id) {
      const _this = this
      const param = {
        id: id,
        userId: _this.userId
      }
      cancelApply(param).then(() => {
        _this.getUserApplicationTable(_this.userApplicationSearch)
        _this.$message.success('取消申请成功！')
      })
    },
    handleReApply (metadataId) {
      // TODO orgId：this.$store.state.user.info.orgId
      // TODO userName: this.$store.state.user.info.username
      this.$refs.applyForm.add({
        metadataId: metadataId,
        userId: this.userId
      })
    },
    handleFeedback () {
    }
  }
}
</script>

<style scoped>
.icon_link {
  height: 24px;
  display: inline-block;
  color: currentColor;
}

.icon_link:before {
  width: 5px;
  height: 5px;
  margin-right: 10px;
  border-radius: 2.5px;
  display: inline-block;
  vertical-align: middle;
  content: "";
}

.icon_link.pending:before {
  background: #FFBF00;
}

.icon_link.pass:before {
  background: #72c381;
}

.icon_link.not_pass:before {
  background: #de6363;
}
</style>
