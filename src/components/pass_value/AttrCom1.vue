<template>
  <div class="c1_container">
    <h3>这是AttrCom1第1级子组件</h3>
    <span class="attr1">{{ $attrs }}</span>
    <attr-com2 v-bind="$attrs"></attr-com2>
  </div>
</template>
<script>
import AttrCom2 from './AttrCom2.vue';
export default {
  name: 'AttrCom1',
  inheritAttrs: false, // 可以关闭自动挂载到根元素上的没有在当前组件上的非props属性
  props: {
    foo: String,
  },
  data() {
    return {};
  },
  created() {
    console.log(this.$attrs);
  },
  methods: {},
  components: { AttrCom2 },
};
</script>
<style lang="less" scoped>
.c1_container {
  .attr1 {
    background-color: #fff;
  }
}
</style>
