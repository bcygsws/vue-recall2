<template>
  <div class="com_container">
    <h3>computed监测属性变化演示</h3>
    <input type="text" name="first" v-model="first" />+
    <input type="text" name="second" v-model="second" />
    <span>=</span>
    <input type="text" name="total" id="total" v-model="total" />
  </div>
</template>
<script>
/**
 *
 * @ computed计算属性的使用说明
 * 1.computed用于一个属性是由其他属性计算而来，这个属性依赖其他属性，通常是一对一和多对一的关系
 * 2.computed支持缓存，依赖的属性发生变化时，才会重新计算属性
 * 3.computed不支持异步，异步数据监控无变化
 * 4.computed属性默认走缓存，是基于它的响应式依赖进行缓存的。它依赖的属性通常是data中定义的属性或者其他组件的传过来props属性
 *
 *
 *
 */
export default {
  name: 'Com',
  data() {
    return {
      // 计算属性监测时,不需要在data中专门定义一个total值，total可以通过first和second值的变化，通过计算而得到
      first: '',
      second: '',
    };
  },
  methods: {},
  computed: {
    total() {
      return this.first + '' + this.second;
    },
  },
};
</script>
<style lang="less" scoped>
.com_container {
  span {
    margin: 0 30px;
  }
}
</style>
