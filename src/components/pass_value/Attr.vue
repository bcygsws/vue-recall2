<template>
  <div class="attr_container">
    <h3>这是Attr一级父组件</h3>
  </div>
</template>
<script>
import AttrCom1 from './AttrCom1.vue';
export default {
  name: 'Attr',
  data() {},
  methods: {},
  components: {
    AttrCom1,
  },
};
</script>
<style lang="less" scoped>
.attr_container {
}
</style>
