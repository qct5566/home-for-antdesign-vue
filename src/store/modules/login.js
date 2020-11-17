const login = {
  namespaced: true,
  state: {
    ifShowLogin: false
  },
  mutations: {
    showLogin: (state) => {
      state.ifShowLogin = true
    },
    closeLogin: (state) => {
      state.ifShowLogin = false
    }
  }
}

export default login
