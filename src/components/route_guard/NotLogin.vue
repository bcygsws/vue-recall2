<template>
  <div class="not_container">
    <h3>这是NotLogin组件</h3>

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
  methods: {}
};
</script>
<style lang="less" scoped></style>
