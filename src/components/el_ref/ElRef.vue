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
    <!-- 错误1 -->
    <!-- 无法解析指令v-el;控制台报错：[Vue warn]: Failed to resolve directive: el -->
    <!-- <son1 v-el:mySon1></son1> -->
    <!-- 错误2 -->
    <!-- v-el:mySon1提示无法解析指令；el="mySon1" 提示undefined没有mySon1属性-->
    <!-- <son1 el="mySon1"></son1> -->
    <son1></son1>
    <div ref="myDv">我之后，君复伤</div>
  </div>
</template>
<script>
/**
 *
 * @ vue1.0 的v-el和v-ref 演示
 * 并深刻理解：ref放在子组件上，和元素上；this.$refs.模板标记tag有两种表现形式：
 * 前者得到组件实例，后者直接获取到这个dom元素
 * 
 * 一、vue2.0 中v-el和v-ref都已废除，无法再使用了；当前为vue2.x已经无法演示v-el和v-ref
 * 本案例：主要目的是观察被抛弃的的指令v-el和v-ref的用法
 * 参考文档：https://blog.csdn.net/qq_26642611/article/details/104493828
 * 参考文档1：https://blog.csdn.net/weixin_46074961/article/details/119634379?spm=1001.2101.3001.6661.1&utm_medium=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1-119634379-blog-105531726.pc_relevant_3mothn_strategy_and_data_recovery&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1-119634379-blog-105531726.pc_relevant_3mothn_strategy_and_data_recovery&utm_relevant_index=1
 *
 * 二、vue 1.0中，已经弃用
 * v-el:myCom
 * v-ref:mySon
 * 引用的时候，一律转为小写：
 * this.$els.mycom  特别注意：在模板中v-el:
 * this.$refs.myson
 *
 * 三、vue2.0中
 * ref="mySon" this.$refs.mySon可以获取子组件实例
 * 而且模板中的v-el、el都已经无法使用了；并不能仿照在模板中使用ref,然后this.$refs获取的方式；
 * 
 * 获取组件实例或者元素的dom的方法：
 * 3.1 如果是个子组件，需要使用类似：this.$refs.mySon.$el获取dom
 * 3.2 如果是某个子元素，直接this.$refs.myDv拿到的就是该元素的dom
 *
 */
// 导入子组件son
import Son from './Son.vue';
import Son1 from './Son1.vue';
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
    /**
     *
     * @参考文档：https://v2.cn.vuejs.org/v2/api/#el
     * 1.组件挂载以后，vm.$el可以获取dom；其中vm是组件实例
     *
     * 2.传入的子组件，在模板中使用ref="mySon"属性标记；然后使用this.$refs.myson可以获取子组件实例；
     * 组件挂载后，vm.$el可以获取dom
     *
     *
     */
    getSonObj() {
      // 要使用$nextTick(cb)确保子组件已经完成渲染
      this.$nextTick(() => {
        // 获取子组件实例vm
        console.log(this.$refs.mySon); // 打印Son子组件实例
        // 挂载后，vm.$el
        console.log(this.$refs.mySon.$el); // 打印子组件实例的dom对象，详见参考文档1
        // 验证el="mySon1",挂载后，是否能够拿到dom
        // console.log(this.$els.mySon1);
        console.log(this.$refs.myDv);
      });
      /* 
      打印：可以拿到子组件Son的实例
      VueComponent {_uid: 17, _isVue: true, $options: {…}, _renderProxy: Proxy, _self: VueComponent, …}
      <div class="son_container">...</div>
      */
    }
  },
  components: {
    Son,
    Son1
  }
};
</script>
