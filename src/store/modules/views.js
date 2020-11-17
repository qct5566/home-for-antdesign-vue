
const views = {
  inGetters: true, // 加入getters，true-全部加入，[]-指定加入
  exGetters: [], // 排除getters，当inGetters为true时使用
  state: {
    searchValue: ''
  },
  mutations: {
    SET_SEARCH_VALUE: (state, searchValue) => {
      state.searchValue = searchValue
    }
  },
  actions: {}
}

export default views
