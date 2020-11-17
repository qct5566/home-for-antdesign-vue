<template>
  <a-row>
    <a-col :span="5">
      <a-tree class="list-tree" :tree-data="treeData" />
    </a-col>
    <a-col :span="19">
      <div class="list-search">
        <span>当前定位：南京市</span>
        <div class="right">
          <div class="inputs">
            <a-select default-value="lucy">
              <a-select-option value="jack">
                项目编号
              </a-select-option>
              <a-select-option value="lucy">
                项目编号
              </a-select-option>
            </a-select>
            <input type="text" v-model="search"/>
            <a-icon type="search" />
          </div>
        </div>
      </div>
      <a-table :columns="columns" :data-source="data" class="list-table"></a-table>
    </a-col>
  </a-row>
</template>

<script>
const treeData = [
  {
    title: '江苏省',
    key: '0-0',
    children: [
      {
        title: '南京市',
        key: '0-0-0',
        children: [
          { title: '南京市', key: '0-0-0-0' }
        ]
      },
      { title: '无锡市', key: '0-0-1' },
      { title: '徐州市', key: '0-0-2' },
      { title: '常州市', key: '0-0-3' },
      { title: '常州市', key: '0-0-4' },
      { title: '常州市', key: '0-0-5' },
      { title: '常州市', key: '0-0-6' },
      { title: '常州市', key: '0-0-7' },
      { title: '常州市', key: '0-0-8' }
    ]
  }
]
const columns = [
  {
    title: '序号',
    dataIndex: 'index',
    key: 'index',
    width: 80
  },
  {
    title: '项目编号',
    dataIndex: 'no',
    key: 'no',
    width: 160
  },
  {
    title: '项目名称',
    dataIndex: 'name',
    key: 'name',
    ellipsis: true
  },
  {
    title: '项目类别',
    dataIndex: 'type',
    key: 'type',
    ellipsis: true,
    width: 160
  },
  {
    title: '建设单位',
    dataIndex: 'unit',
    key: 'unit',
    ellipsis: true,
    width: 180
  },
  {
    title: '定位',
    dataIndex: 'address',
    key: 'address',
    ellipsis: true,
    width: 240
  }
]
const data = [
  {
    key: '1',
    index: '1',
    no: 3212312312,
    name: 'N武平县十方镇十方-黎明(上杭街)道路改造',
    type: '市政基础设工程',
    unit: '武平县十方镇人民政府',
    address: '福建省-龙岩市-龙岩市'
  }, {
    key: '2',
    index: '2',
    no: 3212312312,
    name: 'N武平县十方镇十方-黎明(上杭街)道路改造',
    type: '市政基础设工程',
    unit: '武平县十方镇人民政府',
    address: '福建省-龙岩市-龙岩市'
  }, {
    key: '3',
    index: '3',
    no: 3212312312,
    name: 'N武平县十方镇十方-黎明(上杭街)道路改造',
    type: '市政基础设工程',
    unit: '武平县十方镇人民政府',
    address: '福建省-龙岩市-龙岩市'
  }, {
    key: '4',
    index: '4',
    no: 3212312312,
    name: 'N武平县十方镇十方-黎明(上杭街)道路改造',
    type: '市政基础设工程',
    unit: '武平县十方镇人民政府',
    address: '福建省-龙岩市-龙岩市'
  }, {
    key: '5',
    index: '5',
    no: 3212312312,
    name: 'N武平县十方镇十方-黎明(上杭街)道路改造',
    type: '市政基础设工程',
    unit: '武平县十方镇人民政府',
    address: '福建省-龙岩市-龙岩市'
  }
]
export default {
  data () {
    return {
      treeData,
      search: '',
      data,
      columns
    }
  }
}
</script>

<style lang="less">
  @import 'ued.less';
</style>
