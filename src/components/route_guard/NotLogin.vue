<template>
  <div class="not_container">
    <h3>这是NotLogin组件</h3>
    <!-- 当前在notlogin页面，点击按钮后，x_token没有了，路由全局导航守卫开始作用了 -->
    <button>清除localStorage中的x_token</button>
  </div>
</template>
<script>
export default {
  name: 'NotLogin',
  data() {
    return {};
  },
  methods: {},
};
</script>
<style lang="less" scoped></style>
