export default {
  data () {
    return {
      /* 如果不使用此参数，对应方法必须传递key，并且在data中初始化以下参数，
      ** 使用组件时，必须传递对应的组件参数 */
      tableParams: {
        page: 1, // 当前页
        pageSize: 20, // 每页条数
        count: 0, // 接口获取的数据总数
        dataSource: [], // 当前总数据（例如筛选后）
        pagination: {} // 表格分页参数
      },
      searchLoading: false // 前端查询时防抖用
    }
  },
  props: {},
  computed: {},
  mounted () {
  },
  methods: {
    assignQuery (query, paramsKey) {
      // 需要后端分页时，使用此方法传参，配置分页参数
      const tableKey = paramsKey || {}
      const key = {
        pageKey: tableKey.pageKey || 'page',
        pageSizeKey: tableKey.pageSizeKey || 'pageSize',
        countKey: tableKey.countKey || 'count',
        tableParamsKey: tableKey.tableParamsKey || 'tableParams'
      }
      return {
        [key.pageKey]: this[key.tableParamsKey].page,
        [key.pageSizeKey]: this[key.tableParamsKey].pageSize,
        [key.countKey]: this[key.tableParamsKey].count,
        ...query
      }
    },
    /**
     * 前端查询
     * @param {boolean} bool  是否完全重置表格
     * @param {string} loadingKey  查询loading的key
     * @param {number} time  查询间隔时间 默认400
     */
    onFrontendSearch (bool = true, loadingKey, time) {
      bool = !bool && bool !== false ? true : !!bool
      const searchLoading = loadingKey || 'searchLoading'
      if (this[searchLoading]) return false
      this[searchLoading] = true
      setTimeout(() => {
        this.onRefresh(bool)
        this[searchLoading] = false
      }, time || 400)
    },
    initialTableData (dataList, totalCount, paramsKey) {
      // loadList 方法最终必须使用此方法拼接数据
      const tableKey = paramsKey || {}
      const key = {
        dataSourceKey: tableKey.dataSourceKey || 'dataSource',
        tableParamsKey: tableKey.tableParamsKey || 'tableParams'
      }
      const tableParams = this[key.tableParamsKey]
      tableParams.count = totalCount
      tableParams.dataSource = Object.freeze(dataList)
      // this[key.dataSourceKey] = Object.freeze(dataList)
      // 使用分页组件时，删除非第一页最后一项时，重新加载上一页数据，否则会造成表格空数据
      if (!dataList.length && this[key.tableParamsKey].page > 1) {
        this[key.tableParamsKey].page--
        this.onRefresh()
      }
    },
    // 刷新表格
    async onRefresh (bool = false, lwTable = 'lwTable', paramsKey) {
      const tableKey = paramsKey || {}
      const key = {
        tableParamsKey: tableKey.tableParamsKey || 'tableParams'
      }
      // bool为true时回到第一页,返回默认排序，表格的fetch必传
      let boolean = bool
      if (bool === 'search') {
        // 传search时，回到第一页，但是不清除当前排序状态
        this[key.tableParamsKey].page = 1
        boolean = false
      }
      this.$refs[lwTable] && await this.$refs[lwTable].onFetch()
      this.$refs[lwTable] && this.$refs[lwTable].init(boolean)
    }
  }
}
