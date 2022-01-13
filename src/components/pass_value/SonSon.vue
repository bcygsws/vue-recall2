<template>
  <div class="sb_container">
    <h3>第三级子组件</h3>
  </div>
</template>
<script>
export default {};
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
