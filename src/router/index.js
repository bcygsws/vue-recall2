import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
// 导入子组件
import SubComp from '@/components/sub/SubComp.vue';
import NeedImp from '@/components/webpack/NeedImp.vue';

Vue.use(VueRouter);

const routes = [
  // 路由的自动跳转
  // { path: '/', redirect: '/home' },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    // 声明子路由
    children: [
      {
        path: '/home/sub',
        component: SubComp,
      },
      {
        path: '/home/need',
        component: NeedImp,
      },
    ],
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = new VueRouter({
  routes,
  // 当前选中的路由；不声明linkExactActiveClass属性，这个值默认为："router-link-exact-active".
  linkExactActiveClass: 'myClass',
});

export default router;
