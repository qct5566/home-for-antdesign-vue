export const headData = [
  {
    label: '部门',
    value: '112'
  },
  {
    label: '目录总量',
    value: '2526'
  },
  {
    label: '数据总量',
    value: '1,124,521'
  },
  {
    label: 'API接口',
    value: '23,222'
  },
  {
    label: '服务申请',
    value: '23,222'
  },
  {
    label: '平台访问',
    value: '23,222'
  }
]

export const typeTabsList = [
  {
    value: 'theme',
    label: '主题',
    type: 'icon'
  },
  {
    value: 'industry',
    label: '行业',
    type: 'icon'
  },
  {
    value: 'department',
    label: '部门',
    type: 'list'
  }
]

export const themeList = [
  {
    title: '政策服务',
    icon: 'zcfw'
  }, {
    title: '就业创业',
    icon: 'jycy'
  }, {
    title: '税收财务',
    icon: 'sscw'
  }, {
    title: '社会保障',
    icon: 'shbz'
  }, {
    title: '医疗卫生',
    icon: 'ylws'
  }, {
    title: '婚姻生育',
    icon: 'hysy'
  }, {
    title: '消费维权',
    icon: 'xfwq'
  }, {
    title: '旅游观光',
    icon: 'lygg'
  }, {
    title: '环境气象',
    icon: 'hjqx'
  }, {
    title: '户籍人口',
    icon: 'hjrk'
  }, {
    title: '教育科研',
    icon: 'jyky'
  }, {
    title: '养老服务',
    icon: 'ylfw'
  }, {
    title: '交通服务',
    icon: 'jtfw'
  }, {
    title: '出境入境',
    icon: 'cjrj'
  }, {
    title: '疫情防控',
    icon: 'yqfk'
  }
]

export const industryList = [
  {
    title: '农林牧渔业',
    icon: 'nlymy'
  }, {
    title: '采矿业',
    icon: 'cky'
  }, {
    title: '制造业',
    icon: 'zzy'
  }, {
    title: '金融业',
    icon: 'jry'
  }, {
    title: '建筑业',
    icon: 'jzy'
  }, {
    title: '房地产业',
    icon: 'fdcy'
  }, {
    title: '租赁和商务服务业',
    icon: 'znhsw'
  }, {
    title: '国际组织',
    icon: 'gjzz'
  }, {
    title: '公共管理、社会保障和<br/>社会组织',
    icon: 'gggl'
  }, {
    title: '交通运输、仓储和<br/>邮政业',
    icon: 'jtys'
  }, {
    title: '水利、环境和<br/>公共设施管理业',
    icon: 'sl'
  }, {
    title: '电力、热力、燃气<br/>及水生产和供应业',
    icon: 'dl'
  }, {
    title: '批发和零售业',
    icon: 'pfhlsy'
  }, {
    title: '住宿和餐饮业',
    icon: 'zshcyy'
  }, {
    title: '居民服务、修理和<br/>其他服务业',
    icon: 'jmfw'
  }, {
    title: '文化、体育和<br/>娱乐业',
    icon: 'whty'
  }, {
    title: '信息传输、软件和<br/>信息技术服务业',
    icon: 'xxcs'
  }, {
    title: '科学研究和<br/>技术服务业',
    icon: 'kxyj'
  }
]

export const departmentList = [
  {
    title: '福州市人民政府办公厅'
  },
  {
    title: '福州市商务局'
  },
  {
    title: '福州市发展和改革委员会'
  },
  {
    title: '福州市投资促进局'
  },
  {
    title: '福州市商务局'
  },
  {
    title: '福州市投资促进局'
  },
  {
    title: '福州市人民政府办公厅'
  },
  {
    title: '福州市商务局'
  },
  {
    title: '福州市发展和改革委员会'
  },
  {
    title: '福州市投资促进局'
  }
]
const hotRecListChildren = () => {
  let i = 0
  const arr = new Array(10).fill(i++).map((e, i) => {
    return {
      title: i % 2 === 0 ? '餐饮服务从业人员健康证明' : '餐饮服务从业人员健康证明餐饮服务从业人员健康证明',
      number: 1234 + i
    }
  })
  return arr
}
export const hotRecList = [
  {
    title: '浏览排行',
    backgroundClass: 'title1',
    children: hotRecListChildren()
    // [
    //   {
    //     title: '',
    //     number: ''
    //   }
    // ]
  },
  {
    title: '申请排行',
    backgroundClass: 'title2',
    children: hotRecListChildren()
  },
  {
    title: 'API调用排行',
    backgroundClass: 'title3',
    children: hotRecListChildren()
  },
  {
    title: 'API调用排行',
    backgroundClass: 'title3',
    children: hotRecListChildren()
  },
  {
    title: 'API调用排行',
    backgroundClass: 'title3',
    children: hotRecListChildren()
  }
]
