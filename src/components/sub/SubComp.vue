<template>
  <div class="sub">
    <h3>这是sub子组件</h3>
    <sub-son></sub-son>
  </div>
</template>
<script>
// 导入subcomp的子组件SubSon
import SubSon from './SubSon.vue';
export default {
  // 在引入的位置，以标签的形式，组件大写；标签小写；子件是多个单词组成时，对应的标签用短横线连接，例如：引入组件SubSon,
  // 在标签中引入时，为<sub-son></sub-son>
  components: { SubSon }
};
</script>
