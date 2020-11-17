<template>
  <div>
    <a-tabs type="card">
      <a-tab-pane key="资源目录" tab="资源目录">
        <div class="grzx-table-tool">
          <a-radio-group v-model="radiostab1">
            <a-radio-button value="0">
              正常
            </a-radio-button>
            <a-radio-button value="1">
              注销
            </a-radio-button>
          </a-radio-group>
          <div class="right">
            <a-input style="width: 160px" placeholder="输入目录名称" />
            <a-select style="width: 160px" placeholder="选择提供部门">
              <a-select-option value="部门1">
                部门1
              </a-select-option>
            </a-select>
            <a-button type="primary">查询</a-button>
          </div>
        </div>
        <a-table :columns="tablecol" :data-source="tabledata" :pagination="false">
        </a-table>
      </a-tab-pane>
      <a-tab-pane key="决策分析" tab="决策分析">
        决策分析
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
export default {
  data () {
    return {
      radiostab1: '0',
      tablecol: [
        {
          title: '参数名称',
          dataIndex: 'csmc',
          key: 'csmc'
        }, {
          title: '描述',
          dataIndex: 'des',
          key: 'des'
        }, {
          title: '是否必填',
          dataIndex: 'required',
          key: 'required'
        }, {
          title: '类型',
          dataIndex: 'type',
          key: 'type'
        }, {
          title: '说明',
          dataIndex: 'info',
          key: 'info'
        }
      ],
      tabledata: [
        {
          key: '1',
          csmc: 'access_token',
          des: '页数',
          required: '是',
          type: 'int',
          info: '当前页数，默认为1'
        }, {
          key: '2',
          csmc: 'access_token',
          des: '页数',
          required: '是',
          type: 'int',
          info: '当前页数，默认为1'
        }, {
          key: '3',
          csmc: 'access_token',
          des: '页数',
          required: '是',
          type: 'int',
          info: '当前页数，默认为1'
        }
      ]
    }
  }
}
</script>
