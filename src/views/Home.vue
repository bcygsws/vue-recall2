<template>
  <div class="home">
    <router-link to="/home/sub">功能一：引入子组件的用法</router-link>
    <router-link to="/home/need">功能二：按需引入的方式</router-link>
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
