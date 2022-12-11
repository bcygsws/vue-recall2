<template>
  <div class="child1_container">
    <h3>这是child-one组件</h3>
    <div style="padding-top: 40px" title="son插槽">
      <slot name="son"></slot>
    </div>
    <div style="background-color: pink" title="bro插槽">
      <slot name="bro"></slot>
    </div>
    <!-- name="default"，这种没有名字的插槽(有名字，名字为default，也按照匿名插槽处理)插槽叫做【匿名插槽】
      会匹配到没有声明v-slot属性的模板。另外一种情况下，slot占位符汇中没有声明任何name属性，
    也将匹配到没有声明v-slot属性的模板；父组件中有两个匿名模板，都将填充到slot中-->
    <div
      style="text-decoration: underline; padding: 30px 0"
      title="声明了默认名称default,可以匹配任何没有被声明v-slot的模板"
    >
      <slot name="default"></slot>
    </div>
    <!-- <div
      style="text-decoration: line-through"
      title="slot没有声明name属性，自动匹配没有v-slot的模板"
    >
      <slot></slot>
    </div> -->
  </div>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
