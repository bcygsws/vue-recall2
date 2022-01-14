import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
let defaultCount = 0;
// 加一个try---catch语句，防止浏览器关闭了本地存储功能
try {
  if (!defaultCount) {
    defaultCount = JSON.parse(localStorage.getItem('defaultCount'));
  }
} catch (e) {
  // 语句含义是：在命令行打印异常信息在程序中出现的位置及原因
  e.printStackTrace();
}
export default new Vuex.Store({
  state: {
    count: defaultCount,
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
      // 每当数据改变完成后，将数据以字符串的形式存储在localStorage中
      try {
        localStorage.setItem('defaultCount', state.count);
      } catch (e) {
        e.printStackTrace();
      }
    },
    dec(state, props) {
      state.count -= props;
      if (state.count <= 0) {
        state.count = 0;
      }
      // 每当数据改变完成后，将数据以字符串的形式存储在localStorage中
      try {
        localStorage.setItem('defaultCount', state.count);
      } catch (e) {
        e.printStackTrace();
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
