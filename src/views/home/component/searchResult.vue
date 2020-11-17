<template>
  <div class="search-result">

  </div>
</template>

<script>
export default {
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
    onClose () {
      this.$emit('input', false)
    }
  }

}
</script>

<style>
.search-result{
  width: 100%;
  height: calc(100vh - 100px);
  position: absolute;
  z-index: 999;
  background: #666;
  top:300px
}
</style>
