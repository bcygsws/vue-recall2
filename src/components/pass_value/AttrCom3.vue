<template>
  <div class="c3_container">
    <h3>这是AttrCom3第3级子组件</h3>
    <span class="attr3">{{ $attrs }}</span>
    <!-- 给父组件传值，只演示跨级的，直接子父传值，有现成的方案。实现了AttrCom3给Attr和AttrCom1传值 -->
    <button @click="$emit('pass_val', '传给父亲')">给父组件传值</button>
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
    console.log(this.$attrs);// {doo: 'vue'}
  },
  methods: {},
  components: {},
};
</script>
<style lang="less" scoped>
.c3_container {
}
</style>
