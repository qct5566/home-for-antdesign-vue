<template>
  <div>
    <div v-if="ifShowLogin" class="login-cover" @click="closeLogin"></div>
    <div v-if="ifShowLogin" class="login-modal">
      <div class="login-modal-title">账户登录</div>
      <div class="login-modal-input">
        <input type="text" placeholder="用户名" v-model="user" :class="{'error': showError.length > 0}">
        <div class="icon icon_user"></div>
      </div>
      <div class="login-modal-input">
        <input type="password" placeholder="密码" v-model="pwd" :class="{'error': showError.length > 0}">
        <div class="icon icon_pwd"></div>
      </div>
      <div class="login-modal-error" v-if="showError.length > 0">{{ showError }}</div>
      <div class="login-modal-check">
        <a-checkbox>记住密码</a-checkbox>
      </div>
      <a-button type="primary" class="login-modal-btn" @click="checkInputs">立即登录</a-button>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  data () {
    return {
      user: '',
      pwd: '',
      showError: ''
    }
  },
  computed: mapState({
    ifShowLogin: state => state.login.ifShowLogin
  }),
  methods: {
    ...mapMutations('login', [
      'closeLogin',
      'showLogin'
    ]),
    ...mapActions(['Login']),
    checkInputs () {
      if (this.user.length <= 0 || this.pwd.length <= 0) {
        this.showError = '用户/密码不能为空'
      }
      const params = {
        username: 'admin',
        password: 'e10adc3949ba59abbe56e057f20f883e'
      }
      this.Login(params)
    }
  }
}
</script>
