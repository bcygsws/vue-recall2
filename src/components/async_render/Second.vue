<template>
  <div>
    <h3>这是Second组件</h3>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  activated() {
    console.log('second组件中activated钩子触发');
  },
  deactivated() {
    console.log('second组件中deactivated钩子触发');
  }
};
</script>
