<template>

  <a-modal
    :title="modalTitle"
    centered
    :width="640"
    :visible="visible"
    :confirmLoading="confirmLoading"
    okText="保存"
    :maskClosable="false"
    @ok="handleSubmit('1')"
    @cancel="handleCancel"
  >

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item
          v-if="this.editFormType==='admin'"
          label="问题描述："
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <span :title="dataDetail.problemDesc" >{{ dataDetail.problemDesc }}</span>
        </a-form-item>
        <a-form-item
          v-if="this.editFormType==='my'"
          label="问题描述"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-textarea
            v-decorator="['problemDesc', {rules: [{required: true,message: '问题描述不能为空',whitespace: true}]}]"
            maxlength="1020"
            placeholder="请输入问题描述"
            rows="10"
          />
        </a-form-item>
        <a-form-item
          v-if="this.editFormType==='admin'"
          label="回复"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-textarea
            v-decorator="['feedbackDesc', {rules: [{required: true, message: '回复不能为空', whitespace: true}]}]"
            maxlength="1020"
            placeholder="请输入回复"
            rows="10"
          />
        </a-form-item>
      </a-form>
    </a-spin>
    <template slot="footer">
      <a-button @click="handleCancel">取消</a-button>
      <a-button @click="handleSubmit('0')">存为草稿</a-button>
      <a-button type="primary" @click="handleSubmit('1')">提交</a-button>
    </template>
  </a-modal>
</template>

<script>
import { addFeedBackForm, editFeedBackTest } from '@/api/modules/feedbackService'
import ATextarea from 'ant-design-vue/es/input/TextArea'
export default {
  name: 'FeedbackFrom',
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
      dataDetail: {},
      // 新增或编辑的标识
      isAdd: true,
      // 字典类型为目录的标识
      isDirectory: true
    }
  },
  methods: {
    add (pid) {
      this.modalTitle = this.editFormType === 'admin' ? '问题回复' : '问题反馈'
      this.dataDetail = {}
      this.dataDetail.id = pid
      // 重置表单
      this.form.resetFields()
      this.isAdd = true
      this.isDirectory = true
      this.visible = true
    },
    edit (dataDetail) {
      const _this = this
      _this.modalTitle = this.editFormType === 'admin' ? '问题回复' : '问题反馈'
      _this.dataDetail = dataDetail

      _this.isAdd = false
      _this.visible = true
      _this.$nextTick(() => {
        _this.form.setFieldsValue(dataDetail)
      })
    },
    handleSubmit (submitType) {
      const _this = this
      _this.confirmLoading = true
      // 验证
      _this.form.validateFields((errors, values) => {
        if (!errors) {
          // 合并对象
          const testDic = Object.assign({}, _this.dataDetail, values)
          testDic.feedbackTime = null
          testDic.submitTime = null
          // 是否是添加
          if (_this.isAdd) {
            this.addFeedBackFormAction(testDic, submitType)
          } else {
            _this.editFeedBackFormAction(testDic, submitType)
          }
        } else {
          _this.confirmLoading = false
        }
      })
    },
    onDictTypeChange (option) {
      const _this = this
      // 判断字典类型是否为目录
      _this.isDirectory = option === '0'
      // 不是目录则赋值字典键值和字典值
      // if (!this.isDirectory) {
      //   _this.$nextTick(() => {
      //     _this.form.setFieldsValue({
      //       dictValue: _this.dataDetail.dictValue,
      //       dictKey: _this.dataDetail.dictKey
      //     })
      //   })
      // }
    },
    addFeedBackFormAction (sysDict, submitType) {
      const _this = this
      const feedbackObject = {
        metadataId: sysDict.id,
        problemDesc: sysDict.problemDesc,
        feedbackStatus1: submitType
      }

      addFeedBackForm(feedbackObject).then(res => {
        _this.confirmLoading = false
        if (submitType === '1') {
          _this.$message.success('提交反馈成功')
        } else {
          _this.$message.success('添加草稿成功')
        }
        _this.handleCancel()
        // 调用父组件刷新的方法，更新表和树节点
        _this.$emit('refresh')
      }).catch(error => {
        _this.catchError(error)
      })
    },

    editFeedBackFormAction (sysDict, submitType) {
      const _this = this
      let meessageParam = ''
      if (this.editFormType === 'my') {
        sysDict.feedbackStatus1 = submitType
        sysDict.feedbackStatus2 = null
        meessageParam = submitType === '1' ? '添加反馈成功' : '修改草稿成功'
      } else {
        sysDict.feedbackStatus1 = submitType === '1' ? '2' : null
        sysDict.feedbackStatus2 = submitType === '1' ? '2' : submitType
        meessageParam = submitType === '1' ? '回复成功' : '保存草稿成功'
      }
      editFeedBackTest(sysDict).then(res => {
        _this.confirmLoading = false
        if (sysDict.feedbackStatus1 === '1') {
          _this.$message.success(meessageParam)
        } else {
          _this.$message.success(meessageParam)
        }
        _this.handleCancel()
        // 调用父组件刷新的方法，更新表和树节点
        _this.$emit('refresh')
      }).catch(error => {
        _this.catchError(error)
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
