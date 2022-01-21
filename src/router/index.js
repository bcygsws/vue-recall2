import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
// 导入子组件
import User from '@/views/User.vue';
import SubComp from '@/components/sub/SubComp.vue';
import NeedImp from '@/components/webpack/NeedImp.vue';
import Keep from '@/components/keep/KeepAlive.vue';
import Cache from '@/components/keep/Cache.vue';
import NoCache from '@/components/keep/NoCache.vue';
import Father from '@/components/pass_value/Father.vue';
import Hello from '@/components/pass_value/Hello.vue';
import Attr from '@/components/pass_value/Attr.vue';
import InjectA from '@/components/pass_value/InjA.vue';
import Guard from '@/components/route_guard/Guard.vue';
import NotLogin from '@/components/route_guard/NotLogin.vue';
import Ind from '@/components/route_guard/Ind.vue';
import UseNew from '@/components/stylus_jade/UseNew.vue';
import Dir from '@/components/dir/Dir.vue';
import VFor from '@/components/key_prop/VFor.vue';
import DyClass from '@/components/dynamic_class/DyClass.vue';

Vue.use(VueRouter);

const routes = [
  // 路由的自动跳转
  { path: '/', redirect: '/user' },
  { path: '/user', name: 'User', component: User },
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
      {
        path: '/home/keep_alive',
        component: Keep,
        children: [
          {
            path: '/home/keep_alive/cache',
            component: Cache, // 需要缓存的视图组件Cache,isAlive值为true
            meta: { isAlive: true },
          },
          {
            path: '/home/keep_alive/no_cache',
            component: NoCache,
            meta: { isAlive: false },
          },
        ],
      },
      {
        path: '/home/pass_value',
        component: Father,
        children: [
          {
            path: '/home/pass_value/hello',
            component: Hello,
          },
          {
            path: '/home/pass_value/attrs_lis',
            component: Attr,
          },
          {
            path: '/home/pass_value/pro_inject',
            component: InjectA,
          },
        ],
      },
      {
        path: '/home/guard',
        component: Guard,
        children: [
          {
            path: '/home/guard/not_login',
            component: NotLogin,
            children: [
              {
                path: '/home/guard/not_login/index',
                component: Ind,
              },
            ],
          },
        ],
      },
      {
        path: '/home/use_new',
        component: UseNew,
      },
      {
        path: '/home/dir',
        component: Dir,
      },
      {
        path: '/home/key_prop',
        component: VFor,
      },
      {
        path: '/home/dy_class',
        component: DyClass,
      },
    ],
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ '../views/About.vue'),
  // },
];

const router = new VueRouter({
  routes,
  // 当前选中的路由；不声明linkExactActiveClass属性，这个值默认为："router-link-exact-active".
  linkExactActiveClass: 'myClass',
});

// 路全局导航守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/user') {
    next();
  }
  // 如果是非/home/guard/login页面，验证是否有x-token令牌
  let xToken = localStorage.getItem('x-token');
  if (!xToken) next('/user');
  // 非login路由，xToken存在，自动跳转
  next();
});
export default router;
