<template>
  <div class="el_container">
    <h3>vue 1.0 和vue2.0分别抛弃的v-el和v-ref，如今使用ref</h3>
    <!-- <button @click="getCom">点击案例，控制台打印元素对象</button> -->
    <!-- <div v-el:myCom></div> -->
    <!-- <button @click="getSonObj">点击案例，控制台打印对象</button> -->
    <!-- <son v-ref:mySon></son> -->
  </div>
</template>
<script>
/**
 *
 * @ vue1.0 和vue 2.0启用的v-el和v-ref 演示
 * 参考文档：https://blog.csdn.net/qq_26642611/article/details/104493828
 * 特别注意点：
 *  特别注意大写转小写的问题：v-el:myCom
 *                          v-ref:mySon
 *
 * 引用的时候，一律转为小写。
 * this.$els.mycom和this.$refs.myson
 */
// 导入子组件son
// import Son from './Son.vue';
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
    // 由于当前环境为vue2.6.11,因此没有按照预期打g..0印对象
    // 报错[Vue warn]: Failed to resolve directive: el
    // getSonObj() {
    //   console.log(this.$refs.myson);
    // },
  },
  components: {
    // Son,
  }
};
</script>
