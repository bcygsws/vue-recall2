<template>
  <div class="c2_container">
    <h4>这是AttrCom2第2级子组件</h4>
    <span class="attr2">{{ $attrs }}</span>
    <attr-com3
      v-bind="$attrs"
      v-on="$listeners"
      @pass_val="handle2"
    ></attr-com3>
  </div>
</template>
<script>
import AttrCom3 from './AttrCom3.vue';
export default {
  name: 'AttrCom2',
  data() {
    return {};
  },
  inheritAttrs: false, // 可以关闭自动挂载在根元素上没有在props上声明的属性
  props: {
    boo: String,
  },
  created() {
    console.log(this.$attrs); // {coo: 'javascript', doo: 'vue', title: '前端工匠'}
  },
  methods: {
    handle2(val) {
      console.log(val);
    },
  },
  components: { AttrCom3 },
};
</script>
<style lang="less" scoped>
.c2_container {
  .attr2 {
    background-color: #fff;
  }
}
</style>
