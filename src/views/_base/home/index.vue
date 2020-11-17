<template>
  <div>
    <div class="home-head">
      <HeadMenu menuCur="0"></HeadMenu>
      <div class="home-search">
        <div class="search">
          <div class="inputs">
            <input type="text" placeholder="请输入关键词">
            <button>搜 索</button>
          </div>
          <a href="#">高级搜索</a>
        </div>
        <div class="links">
          热搜热词：
          <a href="#">新冠</a>
          <a href="#">房价</a>
          <a href="#">新能源</a>
        </div>
      </div>
      <ul class="infos">
        <li>
          <div class="num">112</div>
          <div class="title">部门</div>
        </li>
        <li>
          <div class="num">2526</div>
          <div class="title">目录总量</div>
        </li>
        <li>
          <div class="num">1,124,521</div>
          <div class="title">数据总量</div>
        </li>
        <li>
          <div class="num">23,222</div>
          <div class="title">API接口</div>
        </li>
        <li>
          <div class="num">23,222</div>
          <div class="title">服务申请</div>
        </li>
        <li>
          <div class="num">23,222</div>
          <div class="title">平台访问</div>
        </li>
      </ul>
    </div>
    <div class="home-type">
      <div class="home-type_head"></div>
      <div class="home-type_tab">
        <a :class="{'cur': homeTypeCur == 0}" @click="homeTypeCur = 0">主题</a>
        <a :class="{'cur': homeTypeCur == 1}" @click="homeTypeCur = 1">行业</a>
        <a :class="{'cur': homeTypeCur == 2}" @click="homeTypeCur = 2">部门</a>
      </div>
      <div class="home-type-scroll">
        <a class="home-type-scroll_arr" @click="homeTypeCut"></a>
        <div class="home-type-inner">
          <ul class="home-type-list" ref="types" :style="{marginLeft: typeMargin }">
            <li>
              <ul class="home-type-icons">
                <li v-for="(topic, index) in topics" :key="index">
                  <img :src="require('@/assets/home_icons/' + topic.icon + '.png')">
                  <div class="title" v-html="topic.title"></div>
                </li>
              </ul>
            </li>
            <li>
              <ul class="home-type-icons">
                <li v-for="(indu, index) in indus" :key="index">
                  <img :src="require('@/assets/home_icons/' + indu.icon + '.png')">
                  <div class="title" v-html="indu.title"></div>
                </li>
              </ul>
            </li>
            <li>
              <div class="home-type-depts">
                <ul>
                  <li v-for="(dept, index) in depts" :key="index">{{ dept }}</li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <a class="home-type-scroll_arr2" @click="homeTypeAdd"></a>
      </div>
    </div>
    <div class="home-rec">
      <div class="home-rec_head"></div>
      <div class="home-rec-scroll">
        <a class="home-rec-scroll_arr" @click="homeRecCut"></a>
        <div class="home-rec-inner">
          <ul class="home-rec-list" ref="list" :style="{marginLeft: recMargin }">
            <li :class="{'cur': homeRecCur == 0}">
              <div class="title title1">浏览排行</div>
              <div class="body">
                <ul>
                  <li>
                    <div class="text">1.餐饮服务从业人员健康证明</div>
                    <span class="right">1321次</span>
                  </li>
                  <li>
                    <div class="text">1.餐饮服务从业人员健康证明餐饮服务从业人员健康证明</div>
                    <span class="right">1321次</span>
                  </li>
                  <li>
                    <div class="text">1.餐饮服务从业人员健康证明</div>
                    <span class="right">1321次</span>
                  </li>
                  <li>
                    <div class="text">1.餐饮服务从业人员健康证明餐饮服务从业人员健康证明</div>
                    <span class="right">1321次</span>
                  </li>
                  <li>
                    <div class="text">1.餐饮服务从业人员健康证明</div>
                    <span class="right">1321次</span>
                  </li>
                  <li>
                    <div class="text">1.餐饮服务从业人员健康证明餐饮服务从业人员健康证明</div>
                    <span class="right">1321次</span>
                  </li>
                </ul>
                <a class="more">展开更多</a>
              </div>
            </li>
            <li :class="{'cur': homeRecCur == 1}">
              <div class="title title2">申请排行</div>
              <div class="body">
                <ul>
                  <li>
                    <div class="text">1.餐饮服务从业人员健康证明</div>
                    <span class="right">1321次</span>
                  </li>
                  <li>
                    <div class="text">1.餐饮服务从业人员健康证明餐饮服务从业人员健康证明</div>
                    <span class="right">1321次</span>
                  </li>
                  <li>
                    <div class="text">1.餐饮服务从业人员健康证明</div>
                    <span class="right">1321次</span>
                  </li>
                  <li>
                    <div class="text">1.餐饮服务从业人员健康证明餐饮服务从业人员健康证明</div>
                    <span class="right">1321次</span>
                  </li>
                  <li>
                    <div class="text">1.餐饮服务从业人员健康证明</div>
                    <span class="right">1321次</span>
                  </li>
                  <li>
                    <div class="text">1.餐饮服务从业人员健康证明餐饮服务从业人员健康证明</div>
                    <span class="right">1321次</span>
                  </li>
                </ul>
                <a class="more">展开更多</a>
              </div>
            </li>
            <li :class="{'cur': homeRecCur == 2}">
              <div class="title title3">API调用排行</div>
              <div class="body">
                <ul>
                  <li>
                    <div class="text">1.餐饮服务从业人员健康证明</div>
                    <span class="right">1321次</span>
                  </li>
                  <li>
                    <div class="text">1.餐饮服务从业人员健康证明餐饮服务从业人员健康证明</div>
                    <span class="right">1321次</span>
                  </li>
                  <li>
                    <div class="text">1.餐饮服务从业人员健康证明</div>
                    <span class="right">1321次</span>
                  </li>
                  <li>
                    <div class="text">1.餐饮服务从业人员健康证明餐饮服务从业人员健康证明</div>
                    <span class="right">1321次</span>
                  </li>
                  <li>
                    <div class="text">1.餐饮服务从业人员健康证明</div>
                    <span class="right">1321次</span>
                  </li>
                  <li>
                    <div class="text">1.餐饮服务从业人员健康证明餐饮服务从业人员健康证明</div>
                    <span class="right">1321次</span>
                  </li>
                </ul>
                <a class="more">展开更多</a>
              </div>
            </li>
            <li :class="{'cur': homeRecCur == 3}">
              <div class="title title3">API调用排行</div>
              <div class="body">
                <ul>
                  <li>
                    <div class="text">1.餐饮服务从业人员健康证明</div>
                    <span class="right">1321次</span>
                  </li>
                  <li>
                    <div class="text">1.餐饮服务从业人员健康证明餐饮服务从业人员健康证明</div>
                    <span class="right">1321次</span>
                  </li>
                  <li>
                    <div class="text">1.餐饮服务从业人员健康证明</div>
                    <span class="right">1321次</span>
                  </li>
                  <li>
                    <div class="text">1.餐饮服务从业人员健康证明餐饮服务从业人员健康证明</div>
                    <span class="right">1321次</span>
                  </li>
                  <li>
                    <div class="text">1.餐饮服务从业人员健康证明</div>
                    <span class="right">1321次</span>
                  </li>
                  <li>
                    <div class="text">1.餐饮服务从业人员健康证明餐饮服务从业人员健康证明</div>
                    <span class="right">1321次</span>
                  </li>
                </ul>
                <a class="more">展开更多</a>
              </div>
            </li>
            <li :class="{'cur': homeRecCur == 4}">
              <div class="title title3">API调用排行</div>
              <div class="body">
                <ul>
                  <li>
                    <div class="text">1.餐饮服务从业人员健康证明</div>
                    <span class="right">1321次</span>
                  </li>
                  <li>
                    <div class="text">1.餐饮服务从业人员健康证明餐饮服务从业人员健康证明</div>
                    <span class="right">1321次</span>
                  </li>
                  <li>
                    <div class="text">1.餐饮服务从业人员健康证明</div>
                    <span class="right">1321次</span>
                  </li>
                  <li>
                    <div class="text">1.餐饮服务从业人员健康证明餐饮服务从业人员健康证明</div>
                    <span class="right">1321次</span>
                  </li>
                  <li>
                    <div class="text">1.餐饮服务从业人员健康证明</div>
                    <span class="right">1321次</span>
                  </li>
                  <li>
                    <div class="text">1.餐饮服务从业人员健康证明餐饮服务从业人员健康证明</div>
                    <span class="right">1321次</span>
                  </li>
                </ul>
                <a class="more">展开更多</a>
              </div>
            </li>
          </ul>
        </div>
        <a class="home-rec-scroll_arr2" @click="homeRecAdd"></a>
      </div>
    </div>
    <div class="ant-layout-footer">
      <global-footer/>
    </div>
  </div>
</template>

<script>
import HeadMenu from '@/components/HeadMenu'
import GlobalFooter from '@/components/GlobalFooter'
export default {
  components: {
    HeadMenu,
    GlobalFooter
  },
  data () {
    return {
      topics: [
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
      ],
      indus: [
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
      ],
      depts: [
        '福州市人民政府办公厅', '福州市商务局', '福州市发展和改革委员会', '福州市投资促进局', '福州市人民政府办公厅', '福州市商务局', '福州市发展和改革委员会', '福州市投资促进局', '福州市人民政府办公厅', '福州市商务局', '福州市发展和改革委员会', '福州市投资促进局'
      ],
      homeTypeCur: 0,
      homeTypeNum: 0,
      homeRecCur: 1,
      homeRecNum: 0
    }
  },
  computed: {
    typeMargin () {
      return -(this.homeTypeCur) * 1121 + 'px'
    },
    recMargin () {
      return -(this.homeRecCur - 1) * 364 + 'px'
    }
  },
  mounted: function () {
    this.homeTypeNum = this.$refs.types.children.length
    this.homeRecNum = this.$refs.list.children.length
  },
  methods: {
    homeTypeAdd () {
      return this.homeTypeCur <= this.homeTypeNum - 2 ? this.homeTypeCur++ : this.homeTypeCur
    },
    homeTypeCut () {
      return this.homeTypeCur >= 1 ? this.homeTypeCur-- : this.homeTypeCur
    },
    homeRecAdd () {
      return this.homeRecCur <= this.homeRecNum - 2 ? this.homeRecCur++ : this.homeRecCur
    },
    homeRecCut () {
      return this.homeRecCur >= 1 ? this.homeRecCur-- : this.homeRecCur
    }
  }
}
</script>
