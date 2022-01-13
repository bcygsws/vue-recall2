import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './plugins/element.js';
// 开发环境下，Vue 会提供很多警告来帮你对付常见的错误与陷阱。而在生产环境下，这些警告语句却没有用，反而会增加应用的体积。
// 此外，有些警告检查还有一些小的运行时开销，这在生产环境模式下是可以避免的。(摘于官网说明);大概意思应该就是，消息提示的环境配置，设置为开发环境或者生产环境
Vue.config.productionTip = false;
// 空实例Event，用作中央事件总线,并导出来
const Event = new Vue();
export { Event };
// 要渲染的组建App,render声明；要控制的区域，使用连写的方式：$mount('#app'),因为index.html中，id='app',
// 所以此处用id选择器 #app表示
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
