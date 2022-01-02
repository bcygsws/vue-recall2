import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
// 导入子组件
import SubComp from '@/components/sub/SubComp.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    // 声明子路由
    children: [
      {
        path: '/home/sub',
        component: SubComp,
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
});

export default router;
