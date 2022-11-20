<template>
  <div class="c1_container">
    <h3>这是AttrCom1第1级子组件</h3>
    <span class="attr1">{{ $attrs }}</span>
    <attr-com2
      v-bind="$attrs"
      v-on="$listeners"
      @pass_val="handle1"
    ></attr-com2>
  </div>
</template>
<script>
import AttrCom2 from './AttrCom2.vue';
export default {
  name: 'AttrCom1',
  // inheritAttrs: false, // 可以关闭自动挂载到根元素上的没有在props上声明的属性，设置为false
  inheritAttrs: true,
  // inheritAttrs为true时，boo="css" coo="javascript" doo="vue" title="前端工匠" 这些在父组件中绑定的在子组件中的
  //  非props属性，会显示在c1_container这个div上
  props: {
    foo: String,
  },
  data() {
    return {};
  },
  created() {
    console.log(this.$attrs);// {boo: 'css', coo: 'javascript', doo: 'vue', title: '前端工匠'}
  },
  methods: {
    handle1(val) {
      console.log(val);
    },
  },
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
