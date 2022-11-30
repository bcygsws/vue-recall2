<template>
  <div class="wat_container">
    <h3>watch监控属性变化演示</h3>
    <!-- 显示watch的监听 -->
    <input type="text" name="first" v-model="first" />+
    <input type="text" name="second" v-model="second" />
    <span>=</span>
    <input type="text" name="total" id="total" v-model="total" />
    <ul>
      <li>原始数据：{{ obj }}</li>
      <li>{{ obj1.name }}---{{ obj1.gender }}</li>
    </ul>
    <button @click="changeObj">改变原始数据obj的方法</button>
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
 * 参考文档：
 * https://blog.csdn.net/fu983531588/article/details/89454446?spm=1001.2101.3001.6661.1&utm_medium=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-1-89454446-blog-124806684.pc_relevant_3mothn_strategy_and_data_recovery&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-1-89454446-blog-124806684.pc_relevant_3mothn_strategy_and_data_recovery&utm_relevant_index=1
 * 注意事项：
 * 1.watch不支持缓存，数据变化，立即触发
 * 2.watch侦听的属性(如first、second)有两个参数，第一个参数是最新值，第二个参数可选，为旧值
 * 3.watch支持异步操作，watch有两个属性，immediate和deep，此时侦听的逻辑写在handler(newVal){// 侦听的数据的逻辑}
 * 
 * 依赖的属性prop1:{
 *    handler(newVal){
 *        // 侦听的数据逻辑
 *    },
 *    deep:true,// 为了侦听引用类型数据，存储在堆栈中，栈中存放的是变量名的指针或地址（是不会变化的，堆中的值发生变化）
 *    immediate:true // 进入页面立即触发
 * }
 * 
 * immediate表示组件加载后，立即触发回调函数执行
 * deep 表示深度监测，deep:true，以后所有数据的变化都能监测到，这个属性不推荐使用；
 * 由于对象和数组都是引用类型，堆中存放数值；而栈中存放的是变量的地址（因此对象中，数值变化，栈该变量的首地址不会变化，watch
 * 就不能监听到引用类型的数据了，为此，需要声明为【深度监听】，即deep:true）
 * 通常是用哪个属性就监听哪个属性就好
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
      // 引用类型数据对象和数组
      obj: { name: '阿莱克斯', gender: '超级神' },
      obj1: { name: '李红', gender: '女' }
    };
  },
  watch: {
    first(newVal) {
      this.total = newVal + this.second;
    },
    second(newVal) {
      this.total = this.first + newVal;
    },
    // 改变obj来影响obj1
    // obj(newVal) {
    //   this.obj1 = { name: newVal.name, gender: newVal.gender };
    //   console.log(this.obj1);
    // }
    obj: {
      handler(newVal) {
        this.obj1 = { name: newVal.name, gender: newVal.gender };
        console.log(this.obj1);
      },
      deep: true // 深度监听
    }
  },
  methods: {
    changeObj() {
      this.obj.name += '*';
      this.obj.gender += 'v';
    }
  }
};
</script>
<style lang="less" scoped>
.wat_container {
  span {
    margin: 0 30px;
  }
}
</style>
