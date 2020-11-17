export default {
  data () {
    return {
      submitLoading: false,
      modalSize: {
        mini: 400,
        small: 620,
        large: 1000
      }
    }
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    obj: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods: {
    handleCancel () {
      this.$emit('input', false)
      // 销毁弹窗组件
      setTimeout(() => {
        if (this.obj.showModal) this.$emit('update:obj', { ...this.obj, showModal: false })
      }, 400)
    }
  }
}
