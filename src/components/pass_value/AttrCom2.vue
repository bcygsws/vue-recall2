<template>
  <div class="c2_container">
    <h3>这是AttrCom2第2级子组件</h3>
  </div>
</template>
<script>
import AttrCom3 from './AttrCom3.vue';
export default {
  name: 'AttrCom2',
  data() {},
  methods: {},
  components: { AttrCom3 },
};
</script>
<style lang="less" scoped>
.c2_container {
}
</style>
