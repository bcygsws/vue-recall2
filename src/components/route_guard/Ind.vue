<template>
  <div class="ind_container">
    <h6>这是Ind组件，是NotLogin的子路由</h6>
    <!-- 添加清除token的按钮 -->
    <button @click="clearToken">清除x-token令牌，观察路由跳转</button>
  </div>
</template>
<script>
export default {
  name: 'Ind',
  methods: {
    clearToken() {
      // 清除token,本地localStorage的清除，clear()
      localStorage.clear();
      // 编程式导航进入login页面
      this.$router.push({ name: 'User' });
    }
  }
};
</script>
