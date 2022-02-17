<template>
  <div class="wat_container">
    <h3>watch监控属性变化演示</h3>
    <!-- 显示watch的监听 -->
    <input type="text" name="first" v-model="first" />+
    <input type="text" name="second" v-model="second" />
    <span>=</span>
    <input type="text" name="total" id="total" v-model="total" />
  </div>
</template>
<script>
/**
 *
 * @计算器案例，拼接字符串
 * 参考文档：https://www.cnblogs.com/jiajialove/p/11327945.html
 * watch
 * 使用场合：
 * 用于异步且开销较大的场合
 * 注意事项：
 * 1.watch不支持缓存，数据变化，立即触发
 * 2.watch侦听的属性(如first、second)有两个参数，第一个参数是最新值，第二个参数可选，为旧值
 * 3.watch支持异步操作，watch有两个属性，immediately和deep。
 * immediately表示组件加载后，立即触发
 * deep 表示深度监测，deep:true，以后所有数据的变化都能监测到，这个属性不推荐使用，通常是用哪个属性就监听哪个属性就好
 * 4.watch还能够监听路由的变化(在WatCom组件中演示，$route.path作为watch的监控变量)
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
  name: 'Wat',
  data() {
    return {
      first: '',
      second: '',
      total: '',
    };
  },
  watch: {
    first(newVal) {
      this.total = newVal + this.second;
    },
    second(newVal) {
      this.total = this.first + newVal;
    },
  },
  methods: {
    plus() {},
  },
};
</script>
<style lang="less" scoped>
.wat_container {
  span {
    margin: 0 30px;
  }
}
</style>
