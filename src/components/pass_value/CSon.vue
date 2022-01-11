<template>
  <div class="c_container">
    <h3>
      CSon子组件接收到父组件的传值：<i>{{ rev }}</i>
    </h3>
  </div>
</template>
<script>
export default {
  name: 'CSon',
  props: ['rev'],
};
</script>
<style lang="less" scoped>
.c_container {
  h3 {
    i {
      color: pink;
    }
  }
}
</style>
