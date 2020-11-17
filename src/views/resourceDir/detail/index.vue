<template>
  <div class="detail-back">
    <div class="detail-body">
      <div class="detail-content">
        <div class="detail-content-title">
          {{ metadata.name }}
          <div class="right">
            <a class="collect" :class="{'collected': star}" v-if="!star" @click="addStar()">收藏</a>
            <a class="collect" :class="{'collected': star}" v-if="star" @click="cancelStar()">已收藏</a>
            <a class="invite" v-if="apply === '2'" @click="applyMetadata()">申请</a>
            <a class="invite inviting" v-if="apply === '0'">申请中</a>
            <a class="invite invited" v-if="apply === '1'">已申请</a>
          </div>
        </div>
        <div class="detail-content-infos">
          <div class="col">
            <span class="label">数据来源：</span>
            <span class="text">{{ metadata.provider }}</span>
          </div>
          <div class="col">
            <span class="label">数据领域：</span>
            <span class="text">{{ metadata.theme_name }}</span>
          </div>
          <div class="col">
            <span class="label">所属行业：</span>
            <span class="text">{{ metadata.tmt_name }}</span>
          </div>
          <div class="col">
            <span class="label">更新日期：</span>
            <span class="text">{{ dateFormatter(metadata.modify_time) }}</span>
          </div>
          <div class="col">
            <span class="label">数据量：</span>
            <span class="text">{{ metadata.data_count }}</span>
          </div>
          <div class="col">
            <span class="label">浏览次数：</span>
            <span class="text">{{ metadata.pv }}</span>
          </div>
          <div class="col">
            <span class="label">使用量：</span>
            <span class="text">{{ metadata.usage_amount }}</span>
          </div>
        </div>
        <div class="detail-content-intro">
          <div class="label">数据简介：</div>
          <div class="text">{{ metadata.des }}</div>
        </div>
        <a-tabs type="card">
          <a-tab-pane key="1" tab="元数据">
            <div class="detail-table-title">基本信息</div>
            <div class="detail-table-div">
              <table class="detail-table">
                <tr>
                  <td class="left" style="width: 14%">名称</td>
                  <td style="width: 36%">{{ metadata.name }}</td>
                  <td class="left" style="width: 14%">简称</td>
                  <td>{{ metadata.name_alias }}</td>
                </tr>
                <tr>
                  <td class="left">基础分类</td>
                  <td>{{ metadata.basic_classify ? metadata.basic_classify : '-' }}</td>
                  <td class="left">主题分类</td>
                  <td>{{ metadata.theme_classify ? metadata.theme_classify : '-' }}</td>
                </tr>
                <tr>
                  <td class="left">资源提供方</td>
                  <td>{{ metadata.provider }}</td>
                  <td class="left">内部处室(科室)</td>
                  <td>{{ metadata.in_department ? metadata.in_department : '-' }}</td>
                </tr>
              </table>
            </div>
            <div class="detail-table-title">资源信息</div>
            <div class="detail-table-div">
              <table class="detail-table">
                <tr>
                  <td class="left" style="width: 14%">资源状态</td>
                  <td style="width: 36%">{{ metadata.resource_status === '1' ? '√' : '☓' }}</td>
                  <td class="left" style="width: 14%">数据量</td>
                  <td>{{ metadata.data_count }}</td>
                </tr>
                <tr>
                  <td class="left">发布日期</td>
                  <td>{{ dateFormatter(metadata.releate_date) }}</td>
                  <td class="left">更新周期/时间</td>
                  <td>{{ metadata.update_cycle_str }}</td>
                </tr>
              </table>
            </div>
            <div class="detail-table-title">共享信息</div>
            <div class="detail-table-div">
              <table class="detail-table">
                <tr>
                  <td class="left">共享方式</td>
                  <td>{{ metadata.share_way }}</td>
                  <td class="left">共享类型</td>
                  <td>{{ metadata.share_type_name }}</td>
                  <td class="left">共享条件</td>
                  <td>{{ metadata.share_condition ? metadata.share_condition : '-' }}</td>
                </tr>
              </table>
            </div>
          </a-tab-pane>
          <a-tab-pane key="2" tab="信息项">
            <a-table
              ref="metadataItemTable"
              :columns="metadataItemColumns"
              :row-key="record => record.id"
              :data-source="metadataItemTableData"
              :pagination="metadataItemPagination"
              @change="handleMetadataItemTableChange"
            >
            </a-table>
          </a-tab-pane>
          <a-tab-pane key="3" tab="数据预览" v-if="metadata.type.indexOf('2') > -1">
            <a-table
              ref="dataPreviewTable"
              :columns="dataPreviewColumns"
              :data-source="dataPreviewData"
              :pagination="false"
              :scroll="dataPreviewScroll"
            >
            </a-table>
          </a-tab-pane>
          <a-tab-pane key="4" tab="API调用" v-if="metadata.type.indexOf('1') > -1">
            <div class="detail-title_api">API调用操作指南</div>
            <div class="detail-table-title">调用说明</div>
            <div class="detail-table-div">
              <table class="detail-table">
                <tr>
                  <td class="left" style="width: 14%">接口地址</td>
                  <td>{{ metadata.api_service_bean.tmApiServiceInfo.apiShareUrl }}</td>
                </tr>
                <tr>
                  <td class="left">支持格式</td>
                  <td>{{ metadata.api_service_bean.tmApiServiceInfo.returnTypeName }}</td>
                </tr>
                <tr>
                  <td class="left">请求方式</td>
                  <td>{{ metadata.api_service_bean.tmApiServiceInfo.postTypeName }}</td>
                </tr>
                <tr>
                  <td class="left">请求示例</td>
                  <td>{{ metadata.api_service_bean.tmApiServiceInfo.apiExample }}</td>
                </tr>
                <tr>
                  <td class="left">调用步骤</td>
                  <td>1.订阅接口（订阅接口后，可在个人中心查看token）<br><a href="javascript:void(0)" @click="testApi()">2.测试接口</a></td>
                </tr>
                <tr>
                  <td class="left">共享类型</td>
                  <td>{{ metadata.share_type_name }}</td>
                </tr>
              </table>
            </div>
            <div class="detail-table-title">请求参数</div>
            <div class="detail-table-div">
              <table class="detail-table">
                <tr>
                  <th>参数名称</th>
                  <th>类型</th>
                  <th>是否必填</th>
                  <th>说明</th>
                </tr>
                <tr v-for="(item, index) in metadata.api_service_bean.tmApiQuestParameterList" :key="index">
                  <td>{{ item.parName }}</td>
                  <td>{{ item.parTypeNameEn }}</td>
                  <td>{{ item.parIsnull === '1' ? '是' : '否' }}</td>
                  <td>{{ item.parDesc }}</td>
                </tr>
              </table>
            </div>
            <div class="detail-table-title">返回参数</div>
            <div class="detail-table-div">
              <table class="detail-table">
                <tr>
                  <th>参数名称</th>
                  <th>类型</th>
                  <th>说明</th>
                </tr>
                <tr v-for="(item, index) in metadata.api_service_bean.tmApiReturnParameterList" :key="index">
                  <td>{{ item.parName }}</td>
                  <td>{{ item.parTypeNameEn }}</td>
                  <td>{{ item.parDesc }}</td>
                </tr>
              </table>
            </div>
          </a-tab-pane>
          <a-tab-pane key="5" tab="文件" v-if="metadata.type.indexOf('06') > -1">
            <!--未申请表-->
            <a-table
              v-if="apply === '0' || apply === '1'"
              ref="metadataFileTable"
              :columns="metadataFileNotApplyColumns"
              :row-key="record => record.id"
              :data-source="metadataFileTableData"
              :pagination="metadataFilePagination"
              @change="handleMetadataFileTableChange"
            >
            </a-table>
            <!--已申请表-->
            <a-button
              v-if="apply === '2'"
              type="primary"
              @click="handleMultiDownload"
              style="margin-bottom: 10px"
            >批量下载</a-button>
            <a-table
              v-if="apply === '2'"
              ref="metadataFileTable"
              :columns="metadataFileApplyColumns"
              :row-key="record => record.id"
              :data-source="metadataFileTableData"
              :pagination="metadataFilePagination"
              @change="handleMetadataFileTableChange"
              :row-selection="{ selectedRowKeys: metadataFileSelectedRowKeys, onChange: onMetadataFileSelectChange }"
            >
              <template slot="operate" slot-scope="val,row">
                <a class="a-btn" @click="handleDownload(row)">下载</a>
              </template>
            </a-table>
          </a-tab-pane>
        </a-tabs>
      </div>
    </div>
    <api-test-form ref="apiTestForm"/>
    <apply-form ref="applyForm" @apply-success="applySuccess"/>
  </div>
</template>

<script>
import { detail, getTmMetadataItemPageList, getDataPreview, getTmMetadataFilePageList } from '@/api/modules/tmMetadataService'
import { metadataFileDownload } from '@/api/modules/tmMetadataFileService'
import { addMetadataStar, deleteMetadataStar } from '@/api/modules/metadataStarService'
import moment from 'moment'
import ApiTestForm from '@/views/resourceDir/detail/ApiTestForm'
import ApplyForm from '@/views/resourceDir/detail/applyForm'

export default {
  components: {
    ApplyForm,
    ApiTestForm
  },
  data () {
    return {
      star: false,
      // 申请标识，0待审批（申请中），1通过（申请完成），2不通过（申请）
      apply: '2',
      metadataId: '',
      // TODO 之后从缓存获取
      userId: 'e7e931805e9d408093de77b6982e072d',
      metadata: {},
      // 信息项表字段
      metadataItemColumns: [
        {
          title: '序号',
          dataIndex: 'NO',
          customRender: (text, record, index) => {
            return `${(this.metadataItemPagination.current - 1) * this.metadataItemPagination.pageSize + index + 1}`
          }
        },
        {
          title: '字段名称',
          dataIndex: 'fieldName'
        },
        {
          title: '字段描述',
          dataIndex: 'name'
        },
        {
          title: '数据类型',
          dataIndex: 'typeName'
        },
        {
          title: '数据长度',
          dataIndex: 'length'
        },
        {
          title: '范例',
          dataIndex: 'example'
        }
      ],
      // 信息项表数据
      metadataItemTableData: [],
      // 信息项表分页
      metadataItemPagination: {
        current: 1,
        pageSize: 10,
        total: 0
      },
      // 数据预览表字段
      dataPreviewColumns: [
        {
          title: '序号',
          dataIndex: 'NO',
          fixed: 'left',
          customRender: (text, record, index) => {
            return index + 1
          }
        }
      ],
      // 数据预览表数据
      dataPreviewData: [],
      // 数据预览表滚动
      dataPreviewScroll: { x: false },
      // 文件表未申请字段
      metadataFileNotApplyColumns: [
        {
          title: '序号',
          dataIndex: 'NO',
          customRender: (text, record, index) => {
            return `${(this.metadataFilePagination.current - 1) * this.metadataFilePagination.pageSize + index + 1}`
          }
        },
        {
          title: '文件名称',
          dataIndex: 'fileName'
        },
        {
          title: '更新时间',
          dataIndex: 'createTime'
        }
      ],
      // 文件表已申请字段
      metadataFileApplyColumns: [
        {
          title: '序号',
          dataIndex: 'NO',
          customRender: (text, record, index) => {
            return `${(this.metadataFilePagination.current - 1) * this.metadataFilePagination.pageSize + index + 1}`
          }
        },
        {
          title: '文件名称',
          dataIndex: 'fileName'
        },
        {
          title: '更新时间',
          dataIndex: 'createTime'
        },
        {
          title: '操作',
          dataIndex: 'action',
          scopedSlots: { customRender: 'operate' }
        }
      ],
      // 文件表数据
      metadataFileTableData: [],
      // 文件表分页
      metadataFilePagination: {
        current: 1,
        pageSize: 10,
        total: 0
      },
      // 文件表选择的key
      metadataFileSelectedRowKeys: [],
      metadataFileSelectedRows: []
    }
  },
  mounted () {
    this.metadataId = this.$route.query.metadataId
    this.getMetadataDetail(this.metadataId)
    this.getMetadataItemTable({ metadataId: this.metadataId })
    this.getMetadataFileTable({ metadataId: this.metadataId })
  },
  methods: {
    getMetadataDetail (metadataId) {
      const _this = this
      detail(metadataId, _this.userId).then(data => {
        _this.metadata = data
        _this.star = !!data.star_id
        _this.apply = data.application_status
        _this.metadata.metadata_item_list.forEach(item => {
          _this.dataPreviewColumns.push({
            title: item.name,
            dataIndex: item.fieldName
          })
        })
        if (_this.dataPreviewColumns.length >= 10) {
          _this.dataPreviewScroll.x = true
        }
        _this.getDataPreviewTable()
      })
    },
    dateFormatter (val) {
      if (val) {
        const date = moment(val).format('YYYY-MM-DD')
        return date
      } else {
        return ''
      }
    },
    // 信息项table分页
    handleMetadataItemTableChange (pagination) {
      const pager = { ...this.metadataItemPagination }
      pager.current = pagination.current
      this.metadataItemPagination = pager
      this.getMetadataItemTable({
        metadataId: this.metadataId,
        offset: (this.metadataItemPagination.current - 1) * this.metadataItemPagination.pageSize,
        limit: this.metadataItemPagination.pageSize
      })
    },
    // 信息项table
    getMetadataItemTable (params = {}) {
      const _this = this
      getTmMetadataItemPageList(params).then(data => {
        const pagination = { ..._this.metadataItemPagination }
        pagination.total = data.total
        _this.metadataItemTableData = data.list
        _this.metadataItemPagination = pagination
      })
    },
    // 数据预览table
    getDataPreviewTable () {
      const _this = this
      const param = {
        metadataId: _this.metadataId
      }
      getDataPreview(param).then(data => {
        _this.dataPreviewData = data.list
      })
    },
    // 文件table分页
    handleMetadataFileTableChange (pagination) {
      const pager = { ...this.metadataFilePagination }
      pager.current = pagination.current
      this.metadataFilePagination = pager
      this.getMetadataItemTable({
        metadataId: this.metadataId,
        offset: (this.metadataFilePagination.current - 1) * this.metadataFilePagination.pageSize,
        limit: this.metadataFilePagination.pageSize
      })
    },
    // 文件table
    getMetadataFileTable (params = {}) {
      const _this = this
      getTmMetadataFilePageList(params).then(data => {
        const pagination = { ..._this.metadataFilePagination }
        pagination.total = data.total
        _this.metadataFileTableData = data.list
        _this.metadataFilePagination = pagination
      })
    },
    onMetadataFileSelectChange (selectedRowKeys, selectedRows) {
      this.metadataFileSelectedRowKeys = selectedRowKeys
      this.metadataFileSelectedRows = selectedRows
    },
    // 下载
    handleDownload (row) {
      const _this = this
      metadataFileDownload(row.id).then(res => {
        _this.getDownloadFileResult(res, row.fileName)
      })
    },
    getDownloadFileResult (res, fileName) {
      const blob = new Blob([res])
      const downloadLink = document.createElement('a')
      // 创建下载的链接
      const href = window.URL.createObjectURL(blob)
      downloadLink.href = href
      downloadLink.download = fileName
      document.body.appendChild(downloadLink)
      downloadLink.click()
      document.body.removeChild(downloadLink)
      // 释放掉blob对象
      window.URL.revokeObjectURL(href)
    },
    handleMultiDownload () {
      const _this = this
      if (_this.metadataFileSelectedRows.length > 0) {
        _this.metadataFileSelectedRows.forEach(item => {
          _this.handleDownload(item)
        })
      } else {
        _this.$message.error('请先选择文件！')
      }
    },
    addStar () {
      const _this = this
      const param = {
        metadataId: _this.metadataId,
        userId: _this.userId
      }
      addMetadataStar(param).then(data => {
        console.log('addMetadataStar', data)
        _this.star = true
        _this.metadata.star_id = data.id
      })
    },
    cancelStar () {
      const _this = this
      const param = {
        'ids[]': [_this.metadata.star_id]
      }
      deleteMetadataStar(param).then(() => {
        _this.star = false
      })
    },
    testApi () {
      this.$refs.apiTestForm.show(Object.assign({}, this.metadata.api_service_bean))
    },
    applyMetadata () {
      // TODO orgId：this.$store.state.user.info.orgId
      // TODO userName: this.$store.state.user.info.username
      this.$refs.applyForm.add({
        metadataId: this.metadataId,
        userId: this.userId
      })
    },
    applySuccess () {
      this.apply = '0'
    }
  }
}
</script>
