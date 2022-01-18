<template>
  <div class="guard_container">
    <h3>这是Guard组件</h3>
    <!-- login登录模拟：如果点的是login,直接过去；如果是非login需要验证localStorage中是否有token令牌，不存在，跳转
    到login,如果token令牌存在，跳转至制定路由 -->
    <!-- <router-link to="/home/guard/login">登录页面</router-link> -->
    <router-link to="/home/guard/not_login"
      >非login页面，要验证是否有token</router-link
    >
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'Guard',
  data() {
    return {};
  },
  methods: {},
};
</script>
<style lang="less" scoped>
.guard_container {
  a {
    margin-right: 40px;
  }
}
</style>
