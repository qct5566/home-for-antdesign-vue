<template>
  <a-modal
    title="申请目录"
    :width="750"
    :visible="visible"
    :maskClosable="false"
    okText="提交申请"
    cancelText="取消"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-form :form="form" :label-col="{ span: 6 }" :wrapper-col="{ span: 14 }">
      <a-form-item
        label="使用范围"
      >
        <a-radio-group
          :options="useExplainOptions"
          v-decorator="['useExplain', { rules: [{ required: true, message: '请选择使用范围' }] }]"
        />
      </a-form-item>
      <a-form-item
        label="申请原因"
      >
        <s-text-area
          placeholder="请输入申请原因"
          :auto-size="{ minRows: 4, maxRows: 4 }"
          v-decorator="['reason', {rules: [{required: true, message: '请输入申请原因', whitespace:true}]}]"
          maxlength="255"
          :limit="255"
        />
      </a-form-item>
      <a-form-item
        label="使用截止日期"
      >
        <a-date-picker
          style="width: 100%"
          placeholder="请输入使用截止时间"
          v-decorator="['useDeadline',{rules: [{ required: true, message: '请输入使用截止时间' }]}]"
          :disabledDate="disabledDate"
        />
      </a-form-item>
      <a-form-item
        label="联系人"
      >
        <a-input
          placeholder="请输入联系人"
          v-decorator="['userName', { rules: [{ required: true, message: '请输入联系人' }] }]"
        />
      </a-form-item>
      <a-form-item
        label="联系人电话"
      >
        <a-input
          placeholder="请输入联系人电话"
          v-decorator="['tel',{rules: [{ required: true, message: '请输入联系人电话' },{pattern:'^1[345789]\\d{9}$',message: '电话格式不正确'}]}]"
          maxlength="11"
        />
      </a-form-item>
      <a-form-item
        label="邮箱"
      >
        <a-input
          placeholder="请输入邮箱"
          v-decorator="['email',{rules: [{ required: false, message: '请输入邮箱' },{pattern:'^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$',message: '邮箱格式不正确'}]}]"
          maxlength="64"/>
      </a-form-item>
      <a-form-item
        label="上传附件"
      >
        <a-upload
          :fileList="fileList"
          :remove="handleRemoveFile"
          :beforeUpload="beforeUploadFile"
          :showUploadList="showUploadFileList"
        >
          <a-button type="primary">
            <a-icon type="upload"/>
            上传文件
          </a-button>
          <span class="search-upload-info">上传文件大小不能超过50M</span>
        </a-upload>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { addMetadataApplication } from '@/api/modules/metadataApplicationService'
import { STextArea } from '@/components'
import moment from 'moment'

export default {
  name: 'ApplyForm',
  components: { STextArea },
  data () {
    return {
      visible: false,
      confirmLoading: false,
      form: this.$form.createForm(this),
      // 使用范围选项
      useExplainOptions: [
        {
          label: '行政依据',
          value: '行政依据'
        },
        {
          label: '工作参考',
          value: '工作参考'
        },
        {
          label: '数据校验',
          value: '数据校验'
        },
        {
          label: '业务协同',
          value: '业务协同'
        }
      ],
      fileList: [],
      showUploadFileList: {
        showRemoveIcon: true
      },
      dataDetail: {}
    }
  },
  methods: {
    add (dataDetail) {
      this.dataDetail = dataDetail
      this.visible = true
    },
    handleSubmit () {
      const _this = this
      const { form: { validateFields } } = _this
      _this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          const formData = new FormData()
          if (_this.fileList.length > 0) {
            _this.fileList.forEach((item) => {
              formData.append('files', item)
            })
          }
          _this.dataDetail = Object.assign({}, _this.dataDetail, values)
          formData.append('params', JSON.stringify(_this.dataDetail))
          addMetadataApplication(formData).then(() => {
            _this.confirmLoading = false
            _this.$emit('apply-success')
            _this.handleCancel()
            _this.$message.success('申请成功！')
          })
        } else {
          _this.confirmLoading = false
        }
      })
    },
    handleCancel () {
      this.dataDetail = {}
      // 重置表单
      this.form.resetFields()
      this.visible = false
    },
    disabledDate (current) {
      return current && current < moment().endOf('day')
    },
    handleRemoveFile (file) {
      const index = this.fileList.indexOf(file)
      const newFileList = this.fileList.slice()
      newFileList.splice(index, 1)
      this.fileList = newFileList
    },
    // 上传文件前检验
    beforeUploadFile (file) {
      const _this = this
      const isZero = file.size / 1024 / 1024 > 0
      if (!isZero) {
        _this.$message.error('文件大小不能为0！')
      }
      const isLt50M = file.size / 1024 / 1024 < 50
      if (!isLt50M) {
        _this.$message.error('文件大小不能大于50M！')
      }
      if (isZero && isLt50M) {
        this.fileList = [...this.fileList, file]
      }
      return false
    }
  }
}
</script>

<style scoped>

</style>
