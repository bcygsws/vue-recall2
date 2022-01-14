<template>
  <div class="attr_container">
    <h3>这是Attr一级父组件</h3>
    <attr-com1
      :foo="foo"
      :boo="boo"
      :coo="coo"
      :doo="doo"
      title="前端工匠"
      @pass_val="handle"
    ></attr-com1>
  </div>
</template>
<script>
/**
 *
 * vue 2.4以后新增的功能：
 * $attrs和$listener是两个对象
 * 1.分别存储的是父组件中的非props中声明的属性（当然也不包括style和class属性），以及父组件中绑定的非.native事件
 * 2.$attrs是v-bind="$attrs"，适用于父级向子级和孙子级等等，高级向低级
 * 3.$listeners中包含的是父组件中的非native事件(v-on="$listeners")，类比子组件向父组件传值
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
  methods: {
    handle(val) {
      console.log(val);
    },
  },
  components: {
    AttrCom1,
  },
};
</script>
<style lang="less" scoped>
.attr_container {
}
</style>
