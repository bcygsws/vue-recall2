<template>
  <div class="b_container">
    <h3>
      BSon子组件接收到父组件的传值：<u>{{ rec }}</u>
    </h3>
  </div>
</template>
<script>
export default {
  name: 'BSon',
  props: ['rec'],
};
</script>
<style lang="less" scoped>
.b_container {
  h3 {
    u {
      color: orange;
    }
  }
}
</style>
