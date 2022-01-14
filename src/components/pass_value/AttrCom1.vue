<template>
  <div class="c1_container">
    <h3>这是AttrCom1第1级子组件</h3>
  </div>
</template>
<script>
import AttrCom2 from './AttrCom2.vue';
export default {
  name: 'AttrCom1',
  data() {},
  methods: {},
  components: { AttrCom2 },
};
</script>
<style lang="less" scoped>
.c1_container {
}
</style>
