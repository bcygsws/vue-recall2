<template>
  <div class="wat_com">
    <h3>这是侦听属性watch</h3>
    <router-link to="/home/wat_com/wat">进入侦听属性Watch路由</router-link>
    <router-link to="/home/wat_com/com"
      >进入计算属性computed路由对应的组件</router-link
    >
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'WatCom',
  data() {
    return {};
  },
  watch: {
    // 前置路由导航钩子，beforeEach((to,from,next)=>{})
    '$route.path': function (newVal) {
      if (newVal === '/home/wat_com/wat') {
        console.log('进入路由/home/wat_com/wat对应的组件Wat');
      } else {
        if (newVal === '/home/wat_com/com') {
          console.log('进入路由/home/wat_com/com对应的组件Com');
        }
      }
    }
  }
};
</script>
<style lang="less" scoped>
.wat_com {
  a {
    margin-right: 40px;
  }
}
</style>
