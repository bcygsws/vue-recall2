<template>
  <div class="not_container">
    <h3>这是NotLogin组件</h3>
    <!-- 当前在notlogin页面，点击按钮后，x_token没有了，路由全局导航守卫开始作用了 -->
    <button @click="clearToken">清除localStorage中的x_token</button>
    <hr />
    <router-link to="/home/guard/not_login/index"
      >这是notLogin的子路由</router-link
    >
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'NotLogin',
  data() {
    return {};
  },
  methods: {
    // 清除token的事件
    clearToken() {
      localStorage.clear();
      // 编程式导航跳转至login页面
      this.$router.push({ name: 'Login' });
    },
  },
};
</script>
<style lang="less" scoped></style>
