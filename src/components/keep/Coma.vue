<template>
  <div class="coma_container">
    <span>这是coma子组件</span>
    <input type="text" id="coma" name="coma" />
  </div>
</template>
<script>
export default {
  name: 'Coma',
  // 生命周期钩子
  // 缓存组件Coma激活
  activated() {
    console.log('Coma中activated触发，开始显示缓存');
  },
  deactivated() {
    console.log('Coma中deactivated触发，开始隐藏缓存');
  },
};
</script>
