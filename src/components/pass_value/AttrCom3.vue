<template>
  <div class="c3_container">
    <h3>这是AttrCom3第3级子组件</h3>
    <span class="attr3">{{ $attrs }}</span>
  </div>
</template>
<script>
export default {
  name: 'AttrCom3',
  inheritAttrs: false,
  props: {
    coo: String,
    title: String,
  },
  data() {
    return {};
  },
  created() {
    console.log(this.$attrs);
  },
  methods: {},
  components: {},
};
</script>
<style lang="less" scoped>
.c3_container {
}
</style>
