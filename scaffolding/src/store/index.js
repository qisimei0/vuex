import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 标识用户是否登录
    isLogin:false
  },
  mutations: {
    // 登录成功的方法
    login_mutation(state) {
      state.isLogin = true;
    }
  },
  actions: {
  },
  modules: {
  }
})
