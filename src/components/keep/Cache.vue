<template>
  <div class="cache_container">
    <h3>cache缓存组件</h3>
    <!-- 路由切换后，再切换回来，文本框中输入的内容能够保持 -->
    <input type="text" name="cache" id="cache" />
  </div>
</template>
<script>
export default {
  name: '_Cache',
  data() {
    return {};
  },
  // beforeRouteEnter(to, from, next) {
  //   // ...
  // },
  mounted() {
    console.log('缓存组件中的mounted阶段');
  },
  activated() {
    console.log('缓存组件中的activated阶段');
  },
  // beforeRouteLeave(to, from, next) {
  //   // ...
  // },
  deactivated() {
    console.log('缓存组件中的deactivated阶段');
  },
  beforeDestroy() {
    console.log(
      'beforeDestroy和destroyed阶段都不会执行，因为keep-alive缓存的组件仍然在内存中'
    );
  }
};
</script>
