<template>
  <div class="cache_container">
    <h3>cache缓存组件</h3>
    <!-- 路由切换后，再切换回来，文本框中输入的内容能够保持 -->
    <input type="text" name="cache" id="cache" />
  </div>
</template>
<script>
/**
 * @生命周期钩子
 * 组件初始化渲染时
 * beforeRouteEnter-beforeCreate-created-beforeMount-mounted-activated-beforeRouteLeave-deactivated
 * 缓存组件切换时
 * beforeRouteEnter-activated-beforeRouteLeave-deactivated
 *
 *
 */
export default {
  name: 'MyCache',
  data() {
    return {};
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      console.log(vm);
      console.log('beforeRouteEnter执行了');
    });
  },
  mounted() {
    console.log('缓存组件中的mounted阶段');
  },
  activated() {
    console.log('缓存组件中的activated阶段');
  },
  // 观察执行与否
  // beforeRouteLeave(to, from, next) {
  //   next((vm) => {
  //     console.log(vm);
  //     console.log('缓存组件中的beforeRouteLeave执行了');
  //   });
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
