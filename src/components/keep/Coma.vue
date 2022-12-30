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
  // 观察初次渲染时，mounted是否在activated这个钩子之前执行
  mounted() {
    console.log('观察缓存组件初次渲染时，mounted是否在activated之前执行');
  },
  // 缓存组件Coma激活
  activated() {
    console.log('Coma中activated触发，开始显示缓存');
  },
  deactivated() {
    console.log('Coma中deactivated触发，开始隐藏缓存');
  }
};
</script>
