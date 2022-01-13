<template>
  <div class="sb_container">
    <h3>第三级子组件</h3>
    <!-- SonB向SonSon传递的值 -->
    <div>{{ msg }}</div>
    <!-- Father向sonson孙子组件跨级传值 -->
    <div>{{ smsg }}</div>
  </div>
</template>
<script>
import { Event } from '@/main';
export default {
  data() {
    return {
      msg: '',
      smsg: '',
    };
  },
  // 只要页面没有强制刷新，存在组件切换，bus.$on方法会被多次绑定，造成事件多次触发
  // 先使用Event.$off('toSon')解绑$on事件
  mounted() {
    Event.$off('toSon');
    Event.$on('toSon', (value) => (this.msg = value));

    Event.$off('tochild');
    Event.$on('tochild', (value) => {
      this.smsg = value;
    });
  },
};
</script>
<style lang="less" scoped>
.sb_container {
  background-color: greenyellow;
  &::before {
    content: '';
    display: table;
  }
}
</style>
