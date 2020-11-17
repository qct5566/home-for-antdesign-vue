<template>
  <a-modal
    title="测试接口"
    :width="'80%'"
    :visible="visible"
    :maskClosable="false"
    :confirmLoading="confirmLoading"
    @cancel="closeModal"
  >
    <template slot="footer">
      <a-button @click="closeModal">关闭</a-button>
    </template>
    <a-spin :spinning="confirmLoading">
      <a-row>
        <a-col :span="13">
          <h3>设置服务参数：</h3>
          <a-form :form="form" :label-col="{ span: 6 }" :wrapper-col="{ span: 14 }">
            <a-form-item
              v-for="param in paramList"
              :key="param.id"
              :label="`${param.parName}（${param.parTypeName}）`"
            >
              <a-input
                v-if="param.parType === '1'"
                :placeholder="`请输入${param.parTypeName}类型`"
                v-decorator="[param.parName, { rules: [{ required: param.parIsnull === 'false' || param.parIsnull === '1', message: `请输入${param.parTypeName}类型`},{pattern:'^[^<>]{0,}$',message: `请输入${param.parTypeName}类型`}] }]"
              />
              <a-input
                v-if="param.parType === '2'"
                :placeholder="`请输入${param.parTypeName}类型`"
                v-decorator="[param.parName, { rules: [{ required: param.parIsnull === 'false' || param.parIsnull === '1', message: `请输入${param.parTypeName}类型`},{pattern:'^[0-9]*$',message: `请输入${param.parTypeName}类型`}] }]"
              />
              <a-input
                v-if="param.parType === '3'"
                :placeholder="`请输入${param.parTypeName}类型`"
                v-decorator="[param.parName, { rules: [{ required: param.parIsnull === 'false' || param.parIsnull === '1', message: `请输入${param.parTypeName}类型`},{pattern:'^[0-9]*$',message: `请输入${param.parTypeName}类型`}] }]"
              />
            </a-form-item>
            <a-form-item :wrapper-col="{ span: 12, offset: 6 }">
              <a-button type="primary" @click="callApi()">
                调用接口
              </a-button>
            </a-form-item>
          </a-form>
        </a-col>
        <a-col :span="11">
          <h3>接口测试结果：</h3>
          <pre class="api_result">{{ apiTestResult }}</pre>
        </a-col>
      </a-row>
    </a-spin>
  </a-modal>
</template>

<script>
import { callApiTest } from '@/api/modules/tmMetadataService'

export default {
  name: 'ApiTestForm',
  data () {
    return {
      visible: false,
      confirmLoading: false,
      form: this.$form.createForm(this),
      apiServiceBean: {},
      paramList: [],
      apiTestResult: ''
    }
  },
  methods: {
    show (apiServiceBean) {
      this.apiServiceBean = apiServiceBean
      this.paramList = apiServiceBean.tmApiQuestParameterList
      this.visible = true
    },
    callApi () {
      const _this = this
      _this.confirmLoading = true
      _this.form.validateFields((errors, values) => {
        if (!errors) {
          const params = {
            method: _this.apiServiceBean.tmApiServiceInfo.postType,
            url: _this.apiServiceBean.tmApiServiceInfo.apiUrl,
            param: values
          }
          callApiTest({ params: params }).then(data => {
            _this.confirmLoading = false
            _this.apiTestResult = JSON.stringify(JSON.parse(data), null, 2)
            _this.$message.success('调用成功！')
          })
        } else {
          _this.confirmLoading = false
        }
      })
    },
    closeModal () {
      this.apiServiceBean = {}
      this.paramList = []
      this.apiTestResult = ''

      // 重置表单
      this.form.resetFields()
      this.visible = false
    }
  }
}
</script>

<style scoped>
.api_result {
  background: #f5f5f5;
  min-height: 180px;
  padding: 10px;
  color: #666666;
  border: none;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
