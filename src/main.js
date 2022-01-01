import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

// 要渲染的组建App,render声明；要控制的区域，使用连写的方式：$mount('#app'),因为index.html中，id='app',
// 所以此处用id选择器 #app表示
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
