<template>
  <div>
    <div :class="wrpCls">
      <a-button
        v-if="userInfo.userId === ''"
        class="login-btn"
        type="primary"
        size="small"
        @click="showLogin"
      >登录</a-button
      >
      <a-button
        v-else
        class="login-btn"
        type="primary"
        size="small"
        @click="Logout"
      >注销</a-button
      >
    </div>
    <div><LoginModal v-if="ifShowLogin"></LoginModal></div>
  </div>
</template>

<script>
import { mapMutations, mapState, mapGetters, mapActions } from 'vuex'
import LoginModal from '@/components/GlobalHeader/LoginModal'
export default {
  components: {
    LoginModal
  },
  props: {
    wrpCls: {
      type: Object,
      default () {
        return {
          'ant-pro-global-header-index-right': true,
          'ant-pro-global-header-index-topMenu': true
        }
      }
    }
  },
  computed: {
    ...mapState({ ifShowLogin: (state) => state.login.ifShowLogin }),
    ...mapGetters(['userInfo'])
  },
  watch: {
    userInfo () {
      console.log('user-info', this.userInfo)
    }
  },
  methods: {
    ...mapMutations('login', ['showLogin']),
    ...mapActions(['Logout'])
  }
}
</script>

<style>
</style>
