<template>
  <span />
</template>

<script>
import { CountUp } from 'countup.js'
const typeOf = type => object =>
  Object.prototype.toString.call(object) === `[object ${type}]`
// const isString = typeOf('String');
// const isObject = typeOf('Object');
const isFunction = typeOf('Function')
export default {
  __countup__: CountUp,
  name: 'VueCountUp',
  props: {
    // 延时多久开始动画
    delay: {
      type: Number,
      required: false,
      default: 100
    },
    // 初始值
    startVal: {
      type: Number,
      default: 0
    },
    // 结束值
    endVal: {
      type: Number,
      required: true
    },
    // 保留小数的位数
    decimalPlaces: {
      type: Number,
      default: 0
    },
    // 动画效果执行时间
    duration: {
      type: Number,
      default: 2
    },
    // 是否柔和过渡
    useEasing: {
      type: Boolean,
      default: true
    },
    // 是否分割1,000,000 vs 1000000
    useGrouping: {
      type: Boolean,
      default: true
    },
    // 分割符,
    separator: {
      type: String,
      default: ','
    },
    // 前缀
    prefix: {
      type: String,
      default: ''
    },
    // 后缀
    suffix: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      instance: null,
      options: {}
    }
  },
  watch: {
    endVal: {
      handler (value) {
        const that = this
        if (that.instance && isFunction(that.instance.update)) {
          that.instance.update(value)
        }
      },
      deep: false
    }
  },
  created () {
    this.options = Object.assign({}, {
      startVal: this.startVal,
      decimalPlaces: this.decimalPlaces,
      duration: this.duration,
      useEasing: this.useEasing,
      useGrouping: this.useGrouping,
      separator: this.separator,
      prefix: this.prefix,
      suffix: this.suffix
    })
  },
  mounted () {
    const that = this
    that.init()
  },
  beforeDestroy () {
    const that = this
    that.destroy()
  },
  methods: {
    // 初始化
    init () {
      const that = this
      if (that.instance) {
        return
      }
      const dom = that.$el
      const instance = new CountUp(dom, that.endVal, that.options)
      if (instance.error) {
        // error
        return
      }
      that.instance = instance
      if (that.delay < 0) {
        that.$emit('ready', instance, CountUp)
        return
      }
      setTimeout(
        () => instance.start(() => that.$emit('ready', instance, CountUp)),
        that.delay
      )
    },
    destroy () {
      const that = this
      that.instance = null
    },
    printValue (value) {
      const that = this
      if (that.instance && isFunction(that.instance.printValue)) {
        return that.instance.printValue(value)
      }
    },
    start (callback) {
      const that = this
      if (that.instance && isFunction(that.instance.start)) {
        return that.instance.start(callback)
      }
    },
    pauseResume () {
      const that = this
      if (that.instance && isFunction(that.instance.pauseResume)) {
        return that.instance.pauseResume()
      }
    },
    reset () {
      const that = this
      if (that.instance && isFunction(that.instance.reset)) {
        return that.instance.reset()
      }
    },
    update (newEndVal) {
      const that = this
      if (that.instance && isFunction(that.instance.update)) {
        return that.instance.update(newEndVal)
      }
    }
  }
}
</script>
