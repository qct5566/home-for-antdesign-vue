<template>
  <exception-page :type="type"></exception-page>
</template>

<script>
import ExceptionPage from '@/components/Layout_Exception'

export default {
  name: 'Exception',
  components: {
    ExceptionPage
  },

  computed: {
    type () {
      return this.$route.params.type
    }
  }
}
</script>
