<template>
  <div>
    <a-form :form="form" :label-col="{ span: 4 }" :wrapper-col="{ span: 13 }">
      <a-form-item
        label="昵称"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input
          placeholder="请输入昵称"
          v-decorator="['nickname']"
          maxlength="15"
          onkeyup="value = value.replace(/[^a-zA-Z0-9_]/g,'')"
          onpaste="value=value.replace(/[^a-zA-Z0-9_]/g,'')"
          oncontextmenu="value=value.replace(/[^a-zA-Z0-9_]/g,'')"
          oninput="value=value.replace(/[^a-zA-Z0-9_]/g,'')"
          @blur="onUpdate()"
        />
      </a-form-item>
      <a-form-item
        label="电话/手机号"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input
          placeholder="请输入电话/手机号"
          v-decorator="['phone']"
          maxlength="25"
          onkeyup="value = value.replace(/[^a-zA-Z0-9_]/g,'')"
          onpaste="value=value.replace(/[^a-zA-Z0-9_]/g,'')"
          oncontextmenu="value=value.replace(/[^a-zA-Z0-9_]/g,'')"
          oninput="value=value.replace(/[^a-zA-Z0-9_]/g,'')"
          @blur="onUpdate()"
        />
      </a-form-item>
      <a-form-item
        label="登录名"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol">
        <div class="form-text">{{ detailLogin!==null ? detailLogin.username:'' }}</div>
      </a-form-item>
      <a-form-item
        label="密码"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol">
        <div class="form-text" >*************</div>
        <a class="form-link" @click="modifyPasswordOpen" style="float:right">修改密码</a>
      </a-form-item>
      <a-form-item
        label="所属机构"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol" >
        <div class="form-text">{{ detailLogin!==null ?detailLogin.orgName:'' }}</div>
      </a-form-item>
      <a-form-item
        label="AppID"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol">
        <div class="form-text">{{ detailLogin!==null ?detailLogin.userId:'' }}</div>
        <a class="form-link" style="float:right" @click="copy(detailLogin.userId)">复制</a>
      </a-form-item>
      <a-form-item
        label="AppSecret"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol">
        <div class="form-text">{{ detailLogin!==null ?detailLogin.appSecret :'' }}</div>
        <a class="form-link" style="float:right" @click="copy(detailLogin.appSecret)">复制</a>
      </a-form-item>
    </a-form>
    <modify-password ref="modifyPasswordRef"></modify-password>
  </div>
</template>

<script>
import { updateTsUser, getCurrentLoginTsUser } from '@/api/modules/tsUserServce'
import $ from 'jquery'
import modifyPassword from './modifyPassword'

export default {
  components: {
    modifyPassword
  },
  data () {
    return {
      form: this.$form.createForm(this),
      detailLogin: null,
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
  mounted () {
    const _this = this
    _this.$nextTick(() => {
      if (_this.detailLogin === null) {
        _this.getUserInformation()
      }
    }, 1000)
  },
  methods: {
    receiveUserInformation (res) {
      this.detailLogin = res
      this.setFormValues()
    },
    modifyPasswordOpen () {
      this.$refs.modifyPasswordRef.open(this.detailLogin)
    },
    //  设置表单数据
    setFormValues () {
      const _this = this
      const { form: { setFieldsValue } } = this
      this.$nextTick(() => {
        setFieldsValue(_this.detailLogin)
      })
    },
    copy (e) {
      const _this = this
      // 创建一个input框
      const input = document.createElement('input')
      // 将指定的DOM节点添加到body的末尾
      document.body.appendChild(input)
      // 设置input框的value值为直播地址
      input.setAttribute('value', e)
      // 选取文本域中的内容
      input.select()
      // copy的意思是拷贝当前选中内容到剪贴板
      // document.execCommand（）方法操纵可编辑内容区域的元素
      // 返回值为一个Boolean，如果是 false 则表示操作不被支持或未被启用
      if (document.execCommand('copy')) {
        document.execCommand('copy')
      }
      // 删除这个节点
      document.body.removeChild(input)
      _this.$message.success('复制成功！')
    },

    onUpdate (value) {
      const _this = this
      const { form: { validateFields } } = this
      validateFields((errors, values) => {
        if (!errors) {
          values = $.extend(true, _this.detailLogin, values)
          updateTsUser(values).then(addRes => {

          })
        }
      })
    },
    getUserInformation () {
      const _this = this
      getCurrentLoginTsUser().then(res => {
        _this.detailLogin = res
        _this.setFormValues()
      })
    }
  }

}
</script>
