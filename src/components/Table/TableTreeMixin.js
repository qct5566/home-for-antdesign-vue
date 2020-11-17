/**
 * 表格树 混入
 * 因为搜索的时候需要展开，所有需要 expandedRowKeys 和 expand
 * 例如：
 * <a-table
 @expand="expand"
 :expandedRowKeys="expandedRowKeys" ... >
 * @type {{data: (function(): {expandedRowKeys: Array}), methods: {handleSearch(*=, *, *=, *=): *, expand(*=, *): void, recursionSearch(*=, *=, *, *=, *=): void, findParent: tableTreeMixin.methods.findParent, recursionFindParent(*=, *=, *, *=): (*|*|undefined)}}}
 */
const tableTreeMixin = {
  data: function () {
    return {
      // 展开的行，控制属性
      expandedRowKeys: [],
      // 表格树获取 rowKey 的方法  根据情况重写
      rowKeyFun: function (record) {
        return record.key
      }
    }
  },
  methods: {
    expand (expanded, record) {
      // 	点击展开图标时触发
      const _this = this
      const key = _this.rowKeyFun(record)
      if (expanded) {
        this.expandedRowKeys.push(key)
      } else {
        _this.expandedRowKeys.splice(_this.expandedRowKeys.findIndex(v => v === key), 1)
      }
    },
    recursionSearch (item, keyword, dataObj, attrName) {
      // 递归查找
      const _this = this
      if (item.children) {
        const children = []
        item.children.forEach(function (subItem) {
          if (subItem[attrName].indexOf(keyword) > -1) {
            children.push(subItem)
          }
        })
        if (children.length > 0) {
          let parentMenu = {}
          parentMenu = $.extend(true, {}, item)
          parentMenu.children = children
          dataObj.push(parentMenu)
          const key = _this.rowKeyFun(parentMenu)
          // 展开父节点
          _this.expandedRowKeys.push(key)
        } else {
          const parentChildren = []
          item.children.forEach(function (subItem) {
            _this.recursionSearch(subItem, keyword, parentChildren, attrName)
          })

          if (parentChildren.length > 0) {
            let parentMenu = {}
            parentMenu = $.extend(true, {}, item)
            parentMenu.children = parentChildren
            dataObj.push(parentMenu)
            const key = _this.rowKeyFun(parentMenu)
            // 展开父节点
            _this.expandedRowKeys.push(key)
          }
        }
      }
    },
    /**
     * 搜索
     * @param keyword 搜索的关键字
     * @param allData 全部数据
     * @param attrName 数据的唯一键名称
     * @returns {Array}
     */
    handleSearch (keyword, allData, attrName) {
      const _this = this
      const dataObj = []
      // 重置默认展开的节点
      _this.expandedRowKeys = []
      allData.forEach(function (item) {
        if (item[attrName].indexOf(keyword) > -1) {
          dataObj.push(item)
        } else {
          _this.recursionSearch(item, keyword, dataObj, attrName)
        }
      })
      return dataObj
    },
    /**
     * 查找父节点
     * @param row 选中的数据
     * @param index 选中的数据下标
     * @param attrName 数据的唯一键名称
     * @param data 需要搜索的数据集合 （可不传，默认this.data）
     * @returns {*}
     */
    findParent: function (row, index, attrName, data) {
      // 查找父节点
      const _this = this
      if (!data) {
        data = _this.data
      }
      let parent = null
      for (let rIndex = 0; rIndex < data.length; rIndex++) {
        const value = data[rIndex]
        parent = _this.recursionFindParent(row, index, value, attrName)
        if (parent) {
          return parent
        }
      }
    },
    recursionFindParent (row, index, value, attrName) {
      // 递归查找父节点
      if (value.children) {
        const _this = this
        if (value.children[index]) {
          if (value.children[index][attrName] === row[attrName]) {
            return value
          }
        }
        for (let rIndex = 0; rIndex < value.children.length; rIndex++) {
          const childrenObj = value.children[rIndex]
          const parent = _this.recursionFindParent(row, index, childrenObj, attrName)
          if (parent) {
            return parent
          }
        }
      }
    }
  }
}

export { tableTreeMixin }
