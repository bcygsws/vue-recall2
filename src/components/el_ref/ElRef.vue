<template>
  <div class="el_container">
    <h3>vue 1.0 和vue2.0分别抛弃的v-el和v-ref，如今使用ref</h3>
    <!-- <button @click="getCom">点击案例，控制台打印元素对象</button> -->
    <!-- <div v-el:myCom></div> -->
    <!-- 由于当前环境为vue2.6.11,因此没有按照预期打印对象 -->
    <button @click="getSonObj">点击案例，控制台打印对象</button>
    <!-- vue1.0中这么用，v-ref改成ref -->
    <!-- <son v-ref:mySon></son> -->
    <son ref="mySon"></son>
  </div>
</template>
<script>
/**
 *
 * @ vue1.0 和vue 2.0启用的v-el和v-ref 演示
 * 本案例：主要目的是观察被抛弃的的指令v-el和v-ref的用法
 *
 * 参考文档：https://blog.csdn.net/qq_26642611/article/details/104493828
 * 参考文档1：https://blog.csdn.net/weixin_46074961/article/details/119634379?spm=1001.2101.3001.6661.1&utm_medium=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1-119634379-blog-105531726.pc_relevant_3mothn_strategy_and_data_recovery&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1-119634379-blog-105531726.pc_relevant_3mothn_strategy_and_data_recovery&utm_relevant_index=1
 * 特别注意点：
 *  特别注意大写转小写的问题：
 * 
 * v-el:myCom
 * v-ref:mySon
 *
 * 引用的时候，一律转为小写：
 * this.$els.mycom
 * this.$refs.myson
 */
// 导入子组件son
import Son from './Son.vue';
export default {
  name: 'ElRef',
  data() {
    return {};
  },
  methods: {
    // 由于当前环境为vue2.6.11,因此没有按照预期打印对象
    // 报错[Vue warn]: Failed to resolve directive: el
    // getCom() {
    //   console.log(this.$els.mycom);
    // },
    // // 由于当前环境为vue2.6.11,因此没有按照预期打印对象
    // // 报错[Vue warn]: Failed to resolve directive: el
    getSonObj() {
      // 要使用$nextTick(cb)确保子组件已经完成渲染
      this.$nextTick(() => {
        console.log(this.$refs.mySon); // 打印Son子组件实例
        console.log(this.$refs.mySon.$el); // 打印子组件Son的dom对象，详见参考文档1
      });
      /* 
      打印：可以拿到子组件Son的实例
      VueComponent {_uid: 17, _isVue: true, $options: {…}, _renderProxy: Proxy, _self: VueComponent, …}
      <div class="son_container">...</div>
      */
    }
  },
  components: {
    Son
  }
};
</script>
