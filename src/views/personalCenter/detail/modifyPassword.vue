<template>
  <a-modal
    @ok="handleSubmit"
    @cancel="handleCancel"
    v-model="visible"
    title="修改密码"
    okText="保存"
    cancelText="取消"
    :width="750">
    <a-form :form="form" :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }">
      <a-form-item label="原密码">
        <a-input-password placeholder="请输入原密码" v-decorator="['oldPassword', { rules: [{ required: true }] }]" />
      </a-form-item>
      <a-form-item label="新密码">
        <a-input-password
          placeholder="请选择新密码"
          v-decorator="['newPassword', {rules: [{required: true,message: '密码不能为空',whitespace:true},{pattern:'(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^a-zA-Z0-9]).{8,30}',message: '您的密码复杂度太低（密码中必须包含大小写字母、数字、特殊字符且不少于8位字符），请正确填写密码！'}]}]"

        />
      </a-form-item>
      <a-form-item label="确认密码">
        <a-input-password
          placeholder="请选择确认密码"

          v-decorator="['agaPassword', {rules: [{required: true,message: '密码不能为空',whitespace:true},{pattern:'(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^a-zA-Z0-9]).{8,30}',message: '您的密码复杂度太低（密码中必须包含大小写字母、数字、特殊字符且不少于8位字符），请正确填写密码！'}]}]"

        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { updatePassword } from '@/api/modules/tsUserServce'
import $ from 'jquery'

export default {
  data () {
    return {
      visible: false,
      form: this.$form.createForm(this),
      detail: {
        oldPassword: null,
        newPassword: null,
        agaPassword: null
      },
      loginDetail: null,
      labelCol: {
        xs: { span: 3 },
        sm: { span: 3 }
      },
      wrapperCol: {
        xs: { span: 13 },
        sm: { span: 13 }
      }
    }
  },
  methods: {
    open (params) {
      const _this = this
      if (params !== null) {
        this.loginDetail = params
        this.detail.userId = params.userId
      }
      _this.detail.oldPassword = null
      _this.detail.newPassword = null
      _this.detail.agaPassword = null
      this.$nextTick(() => {
        _this.form.setFieldsValue(_this.detail)
      })
      this.visible = true
    },
    handleCancel () {
      this.visible = false
    },
    handleSubmit () {
      const _this = this
      const { form: { validateFields } } = this
      validateFields((errors, values) => {
        if (!errors) {
          values = $.extend(true, _this.detail, values)
          if (_this.detail.agaPassword !== _this.detail.newPassword) {
            _this.$message.error('两次输入的新密码不一致！，请重新输入')
            return
          }
          if (_this.detail.userId === null || _this.detail.userId === undefined) {
            _this.$message.error('网络异常')
            return
          }
          updatePassword(values).then(addRes => {
            if (addRes.modifySuccess === true) {
              _this.$message.success('修改密码成功')
              this.visible = false
            } else {
              _this.$message.error('修改密码失败！' + (addRes.errorMessage))
            }
          })
        }
      })
    }
  }
}
</script>
