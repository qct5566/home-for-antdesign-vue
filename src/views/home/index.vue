<template>
  <div class="home-layout-content">
    <data-type />
    <hot-rec />
  </div>
</template>

<script>
import DataType from './component/dataType'
import HotRec from './component/hotRec'
export default {
  name: 'Home',
  components: {
    DataType,
    HotRec
  }
}
</script>
