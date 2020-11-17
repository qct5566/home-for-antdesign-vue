<template>
  <a-tabs
    v-model="activeKey"
    v-bind="$attrs"
    v-on="$listeners"
    @change="changeTabs">
    <a-tab-pane
      v-for="(item,index) in list"
      :tab="getLabel(item)"
      :key="item[valueKey]"
      v-bind="item.props"
      v-on="item.on"
    >
      <slot :name="`pane-${item[valueKey]}`" v-bind="{item,index}" />
    </a-tab-pane>
    <div v-for="slot in Object.keys($slots)" :key="slot" :slot="slot">
      <!-- 排除pane的slot -->
      <slot :name="slot" v-if="slot.indexOf('pane-')===-1" />
    </div>
  </a-tabs>
</template>

<script>
/*
1.各面板对应的插槽名为 pane-${value}
2.面板属性直接在数组对应项中配置props，截至1.6.2只缺少forceRender属性，详见官方
3.面板事件可以通过on来传递，但是官方做法都有对应方法放置在tabs中了
4.tabs事件属性插槽方法同官方使用方式相同
{
  label:'',
  value:'',
  props:{},
  on:{}
}
*/
export default {
  name: 'LwTabs',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: [Number, String],
      default: ''
    },
    list: {
      type: Array,
      default () {
        return []
      }
    },
    tabKey: {
      type: String,
      default: 'label'
    },
    valueKey: {
      type: String,
      default: 'value'
    }
  },
  data () {
    return {}
  },
  computed: {
    activeKey: {
      get () {
        return this.value
      },
      set () {
        this.$emit('input', this.activeKey)
      }
    }
  },
  methods: {
    changeTabs (val) {
      const item = this.list.filter(e => e[this.valueKey] === val)[0]
      this.$emit('change-tabs', val, item)
    },
    getLabel (item) {
      return item[this.tabKey]
    }
  }
}
</script>
