import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './actions'
import createPersistedState from 'vuex-persistedstate'


Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations,
  actions,

  modules: {
  },
  // 默认为localstorage的存储方式
  plugins: [createPersistedState()],
  // 也可以修改其他的存储方式
 /*  plugins: [createPersistedState(
    { storage: window.sessionStorage }
  )] */
})
