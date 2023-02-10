import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
// 导入子组件
import User from "@/views/User.vue";
import SubComp from "@/components/sub/SubComp.vue";
import NeedImp from "@/components/webpack/NeedImp.vue";
import Keep from "@/components/keep/KeepAlive.vue";
import Cache from "@/components/keep/Cache.vue";
import NoCache from "@/components/keep/NoCache.vue";
import Father from "@/components/pass_value/Father.vue";
import Hello from "@/components/pass_value/Hello.vue";
import Attr from "@/components/pass_value/Attr.vue";
import InjectA from "@/components/pass_value/InjA.vue";
import Guard from "@/components/route_guard/Guard.vue";
import NotLogin from "@/components/route_guard/NotLogin.vue";
import Ind from "@/components/route_guard/Ind.vue";
import UseNew from "@/components/stylus_jade/UseNew.vue";
import Dir from "@/components/dir/Dir.vue";
import Dir1 from "@/components/dir/Dir1.vue";
import VFor from "@/components/key_prop/VFor.vue";
import Reg from "@/components/key_prop/Reg.vue";
import DyClass from "@/components/dynamic_class/DyClass.vue";
import NextTick from "@/components/tick/NextTick.vue";
import ElRef from "@/components/el_ref/ElRef.vue";
import Wat from "@/components/watch/Wat.vue";
import Com from "@/components/watch/Com.vue";
import WatCom from "@/components/watch/WatCom.vue";
import Del from "@/components/del/Del.vue";
import Filter from "@/components/filter/Filter.vue";
import Slot from "@/components/slot/Slot.vue";
import AsyncRender from "@/components/async_render/AsyncRender.vue";

Vue.use(VueRouter);

const routes = [
  // 路由的自动跳转
  { path: "/", redirect: "/user" },
  { path: "/user", name: "User", component: User },
  {
    path: "/home",
      {
        path: "/home/sub",
      },
      {
        path: "/home/need",
        component: NeedImp
      },
      {
        path: "/home/keep_alive",
        component: Keep,
        children: [
          {
            path: "/home/keep_alive/cache",
            component: Cache, // 需要缓存的视图组件Cache,isAlive值为true
            meta: { isAlive: true }
          },
          {
            path: "/home/keep_alive/no_cache",
            component: NoCache,
            meta: { isAlive: false }
          }
        ]
      },
      {
        path: "/home/pass_value",
        component: Father,
        children: [
          {
            path: "/home/pass_value/hello",
            component: Hello
          },
          {
            path: "/home/pass_value/attrs_lis",
            component: Attr
          },
          {
            path: "/home/pass_value/pro_inject",
            component: InjectA
          }
        ]
      },
      {
        path: "/home/guard",
        component: Guard,
        children: [
          {
            path: "/home/guard/not_login",
            component: NotLogin,
            children: [
              {
                path: "/home/guard/not_login/index",
                component: Ind
              }
            ]
          }
        ]
      },
      {
        path: "/home/use_new",
        component: UseNew
      },
      {
        path: "/home/dir",
        component: Dir,
        children: [
          {
            path: "/home/dir/dy_dir",
            name: "Dir1",
            component: Dir1
          }
        ]
      },
      {
        path: "/home/key_prop",
        component: VFor, // 正则表达式
        children: [
          {
            path: "/home/key_prop/reg",
            component: Reg
          }
        ]
      },
      {
        path: "/home/dy_class",
        component: DyClass
      },
      {
        path: "/home/tick",
        component: NextTick
      },
      {
        path: "/home/el_ref",
        component: ElRef
      },
      {
        path: "/home/wat_com",
        component: WatCom,
        children: [
          {
            path: "/home/wat_com/com",
            component: Com
          },
          {
            path: "/home/wat_com/wat",
            component: Wat
          }
        ]
      },
      {
        path: "/home/del",
        component: Del
      },
      {
        path: "/home/filter",
        component: Filter
      },
      {
        path: "/home/slot",
        component: Slot
      },
      {
        path: "/home/async_render",
        component: AsyncRender
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
];

const router = new VueRouter({
  routes, // 当前选中的路由；不声明linkExactActiveClass属性，这个值默认为："router-link-exact-active".
  // linkExactActiveClass: 'myClass',
  /**
   *
   * @ 一、激活的路由，使用linkActiveClass来全局声明。linkActiveClass和linkExactActiveClass这两个属性最好不要同时声明，
   * 同时声明时，只能看到linkActiveClass重命名的类名
   *
   * 二、个别声明，与linkActiveClass功能类似，可以在router-link标签中直接声明。但是，这种为router-link单独添加active-class
   * 属性的方式，只作用域当前router-link,对其他没有设置该属性的router-link没有任何影响（仍然显示默认的router-link-active）。
   * <router-link to="/home/dir" active-class="lac-class"></router-link>
   *
   */
  linkActiveClass: "lac-class"
});

// 前置路由导航守卫
router.beforeEach((to, from, next) => {
  if (to.path === "/user") {
    next();
  }
  // 如果是非/home/guard/login页面，验证是否有x-token令牌
  let xToken = localStorage.getItem("x-token");
  if (!xToken) next("/user");
  // 非login路由，xToken存在，自动跳转
  next();
});
export default router;
