<template>
  <div class="comb_container">
    <span>这是comb子组件</span>
    <input type="text" id="comb" name="comb" />
  </div>
</template>
<script>
export default {
  name: 'Comb',
  activated() {
    console.log('Comb中activated触发，开始缓存');
  },
  deactivated() {
    console.log('Comb中deactivated触发,隐藏缓存');
  },
};
</script>
