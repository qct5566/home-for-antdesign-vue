<template>
  <div class="">
    <div class="detail-title">DT0615、DT0802、DT1008剩余地块房地产开发项目</div>
    <div class="detail-row">
      <div class="detail-row-td">
        <table class="detail-table">
          <tr>
            <th>项目编码</th>
            <td>3211121807270101</td>
            <th>所在地</th>
            <td>镇江市-丹徒区</td>
          </tr>
          <tr>
            <th>详细地址</th>
            <td colspan="3">镇江市丹徒区谷阳大道北侧,九华山南路西侧</td>
          </tr>
          <tr>
            <th>建筑工程用途</th>
            <td>民用建筑-居住建筑-普通住宅-商品房</td>
            <th>建设性质</th>
            <td>新建</td>
          </tr>
          <tr>
            <th>立项级别</th>
            <td>地市级</td>
            <th>项目核准部门</th>
            <td>镇江丹徒区发展改革和经济信息化委员会</td>
          </tr>
          <tr>
            <th>立项级别</th>
            <td>地市级</td>
            <th>项目核准部门</th>
            <td>镇江丹徒区发展改革和经济信息化委员会</td>
          </tr>
          <tr>
            <th>立项级别</th>
            <td>地市级</td>
            <th>项目核准部门</th>
            <td>镇江丹徒区发展改革和经济信息化委员会</td>
          </tr>
          <tr>
            <th>立项级别</th>
            <td>地市级</td>
            <th>项目核准部门</th>
            <td>镇江丹徒区发展改革和经济信息化委员会</td>
          </tr>
        </table>
        <div class="detail-sectitle">建设单位信息</div>
        <table class="detail-table">
          <tr>
            <th>单位名称</th>
            <td colspan="3">镇江铭基置业有限公司</td>
          </tr>
          <tr>
            <th>单位地址</th>
            <td colspan="3">镇江市丹徒区九华山南路169号福临广场</td>
          </tr>
          <tr>
            <th>单位性质</th>
            <td>企业一国有企业</td>
            <th>单位法人/负责人</th>
            <td></td>
          </tr>
        </table>
      </div>
      <div class="detail-map"></div>
    </div>
    <a-tabs default-active-key="1" class="detail-tab">
      <a-tab-pane key="1">
        <span slot="tab">
          招投标信息
          <span class="tab-num">3</span>
        </span>
        <a-table
          :columns="tcolumns"
          :data-source="tdata"
          :pagination="false"
          class="list-table">
        </a-table>
      </a-tab-pane>
      <a-tab-pane key="2" tab="施工图审查信息">
        Content of Tab Pane 2
      </a-tab-pane>
      <a-tab-pane key="3" tab="合同信息">
        Content of Tab Pane 3
      </a-tab-pane>
      <a-tab-pane key="4" tab="施工许可信息">
        Content of Tab Pane 4
      </a-tab-pane>
      <a-tab-pane key="5" tab="质量监督信息">
        Content of Tab Pane 5
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
const tcolumns = [
  {
    title: '序号',
    dataIndex: 'index',
    key: 'index',
    width: 80
  },
  {
    title: '通知书号',
    dataIndex: 'no',
    key: 'no',
    width: 160
  },
  {
    title: '标段名称',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '类型',
    dataIndex: 'type',
    key: 'type',
    width: 100
  },
  {
    title: '招牌方式',
    dataIndex: 'way',
    key: 'way',
    width: 110
  },
  {
    title: '中标日期',
    dataIndex: 'date',
    key: 'date',
    width: 130
  },
  {
    title: '中标价（万元）',
    dataIndex: 'price',
    key: 'price',
    width: 130
  }
]
const tdata = [
  {
    key: '1',
    index: '1',
    no: 3212312312,
    name: '福临广场二期住宅小区监理工程',
    type: '监理',
    way: '公开招标',
    date: '2018年8月29日',
    price: '2018年8月29日'
  }, {
    key: '2',
    index: '2',
    no: 3212312312,
    name: '福临广场二期住宅小区监理工程',
    type: '监理',
    way: '公开招标',
    date: '2018年8月29日',
    price: '2018年8月29日'
  }, {
    key: '3',
    index: '3',
    no: 3212312312,
    name: '福临广场二期住宅小区监理工程',
    type: '监理',
    way: '公开招标',
    date: '2018年8月29日',
    price: '2018年8月29日'
  }
]
export default {
  data () {
    return {
      tcolumns,
      tdata
    }
  }
}
</script>

<style lang="less">
  @import 'ued.less';
</style>
