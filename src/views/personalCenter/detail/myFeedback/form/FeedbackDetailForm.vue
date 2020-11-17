<template>

  <a-modal
    :title="modalTitle"
    centered
    :width="640"
    :visible="visible"
    :confirmLoading="confirmLoading"
    okText="保存"
    :maskClosable="false"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item
          label="问题描述："
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-textarea
            disabled
            :autosize="{ minRows: 3, maxRows: 10 }"
            style="border: none;background: none;cursor:default"
            :title="dataDetail.problemDesc"
            :value="dataDetail.problemDesc">{{ dataDetail.problemDesc }}</a-textarea>
          <!--           <span :title="dataDetail.problemDesc" >{{ dataDetail.problemDesc }}</span>-->
        </a-form-item>
        <a-form-item
          label="回复："
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-alert v-if="dataDetail.feedbackDesc==null || dataDetail.feedbackDesc==''" message="暂无回复" type="error" />
          <a-alert v-if="dataDetail.feedbackDesc!=null && dataDetail.feedbackDesc!=''" :message="dataDetail.feedbackDesc" type="error" />
        </a-form-item>

      </a-form>
    </a-spin>
    <template slot="footer">
      <a-button icon="close" @click="handleCancel">关闭</a-button>
    </template>
  </a-modal>
</template>

<script>
import ATextarea from 'ant-design-vue/es/input/TextArea'
export default {
  name: 'FeedbackDetailFrom',
  components: { ATextarea },
  props: {
    editFormType: {
      type: String,
      required: true,
      default: 'my'
    }
  },
  data () {
    return {
      modalTitle: '新增TEST的数据',
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 }
      },
      visible: false,
      confirmLoading: false,
      form: this.$form.createForm(this),
      dataDetail: {
        feedbackDesc: ''
      },
      // 新增或编辑的标识
      isAdd: true,
      // 字典类型为目录的标识
      isDirectory: true
    }
  },
  methods: {
    showDetail (dataDetail) {
      const _this = this
      _this.modalTitle = '问题反馈详情'
      _this.dataDetail = dataDetail

      _this.isAdd = false
      _this.visible = true
      if (_this.editFormType === 'my' && dataDetail.feedbackStatus2 === '0') {
        dataDetail.feedbackDesc = ''
      }
      _this.$nextTick(() => {
        _this.form.setFieldsValue(dataDetail)
      })
    },
    handleCancel () {
      this.visible = false
    },
    catchError (error) {
      this.confirmLoading = false
      if (error.code === undefined) {
        this.$message.error('服务器异常')
      } else {
        this.$message.error(error.message)
      }
    }
  }
}
</script>
