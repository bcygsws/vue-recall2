<template>
  <div class="home">
    <router-link to="/home/sub">功能一：引入子组件的用法</router-link>
    <router-link to="/home/need">功能二：按需引入的方式</router-link>
    <router-link to="/home/keep_alive"
      >功能三：内置组件keep-alive对组件进行缓冲</router-link
    >
    <router-link to="/home/pass_value"
      >功能四：父子元素之间相互传值</router-link
    >
    <router-link to="/home/guard"
      >功能五：路由导航守卫，模拟token登录验证</router-link
    >
    <router-link to="/home/use_new"
      >功能六：使用stylus书写样式，以及jade模板引擎</router-link
    >
    <!-- 与在router对象中添加一个linkActiveClass属性不同的是，这种方式只能更改当前路由选中的类名，其他没有设置
    active-class属性的router-link仍然会显示默认类名 -->
    <!-- <router-link to="/home/dir" active-class="lac-class">
      功能七：自定义指令的使用
    </router-link> -->
    <router-link to="/home/dir" active-class="lac-class">
      功能七：自定义指令的使用
    </router-link>
    <router-link to="/home/key_prop">功能八：v-for渲染列表相关</router-link>
    <router-link to="/home/tick">功能九：nextTick的理解</router-link>
    <router-link to="/home/el_ref"
      >功能十：演示vue1.0弃用的v-el和vue2.0弃用的v-ref</router-link
    >
    <router-link to="/home/wat_com"
      >功能十一：watch和computed监测属性的异同点</router-link
    >
    <router-link to="/home/del"
      >功能十二：delete和vue.delete的区别和联系</router-link
    >
    <router-view></router-view>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: 'Home',
  components: {},
};
</script>
<style lang="less" scoped>
.home {
  a {
    margin-right: 30px;
  }
}
</style>
