import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 0,
    showChange: true,
  },
  getters: {
    getCount(state) {
      return state.count;
    },
  },
  mutations: {
    // 注意改变状态管理对象的mutations中函数，第一参数state,第二个参数才是传过来的值
    inc(state, props) {
      console.log(typeof props);
      state.count = state.count + props;
      if (state.count >= 20) {
        state.count = 20;
      }
    },
    dec(state, props) {
      state.count -= props;
      if (state.count <= 0) {
        state.count = 0;
      }
    },
  },
  actions: {
    // 注意交互行为处理模块汇总，第一个参数为context,第二个参数是传过来的值
    actionCount(context, props) {
      context.commit('dec', props);
    },
  },
  // modules: {},
});
