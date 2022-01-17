import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
// 导入子组件
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
import Login from '@/components/route_guard/Login.vue';
import NotLogin from '@/components/route_guard/NotLogin.vue';
import Ind from '@/components/route_guard/Ind.vue';

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
            path: '/home/guard/login',
            component: Login,
          },
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
// 定义一个产生随机子串的函数
// 参数e:是产生的随机串位数，默认e=32
function generateStr(e) {
  e = e || 32;
  const t = 'ABCDEDFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let n = '';
  for (let i = 0; i < e; i++) {
    n += t.charAt(Math.floor(Math.random() * t.length));
  }
  return n;
}
// console.log(generateStr(32));
// 路全局导航守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/home/guard/login') {
    localStorage.setItem('x-token', generateStr(32));
    next();
  }
  // 如果是非login页面，验证是否有x-token令牌
  let xToken = localStorage.getItem('x-token');
  if (!xToken) next('/home/guard/login');
  // 非login路由，xToken存在，自动跳转
  next();
});
export default router;
