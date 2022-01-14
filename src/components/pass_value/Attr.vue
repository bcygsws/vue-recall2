<template>
  <div class="attr_container">
    <h3>这是Attr一级父组件</h3>
    <attr-com1
      :foo="foo"
      :boo="boo"
      :coo="coo"
      :doo="doo"
      title="前端工匠"
    ></attr-com1>
  </div>
</template>
<script>
/**
 *
 * $attrs和$listener是两个对象
 * 分别存储的是父组件中的非props中声明的属性（当然也不包括style和class属性），以及父组件中绑定的非.native事件
 *
 */
import AttrCom1 from './AttrCom1.vue';
export default {
  name: 'Attr',
  data() {
    return {
      foo: 'html',
      boo: 'css',
      coo: 'javascript',
      doo: 'vue',
    };
  },
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
