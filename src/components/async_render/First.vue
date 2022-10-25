<template>
  <div>
    <h3>这是First组件</h3>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  activated() {
    console.log('first组件中activated钩子触发');
  },
  deactivated() {
    console.log('first组件中deactivated钩子触发');
  }
};
</script>
