<!-- <template functional>
  <div class="injf_container">
    <h3 :style="{ color: injections.theme.color }">这是InjectF组件</h3>
  </div>
</template> -->
<template>
  <div class="injf_container">
    <h3 :style="{ color: theme.color }">这是InjectF组件</h3>
    <div>{{ changedGetReactiveInfo }}</div>
    <!-- injA组件中fontB对象汇总a属性的响应式验证 -->
    <div>{{ reactA }}</div>
  </div>
</template>
<script>
/**
 *
 * 函数式组件声明：template functional
 * 没有管理任何状态，也没有监听传递给它的状态，没有生命周期；只是接收一些props属性
 * https://blog.csdn.net/qq_35366269/article/details/102456270
 *
 * provide/inject实现响应式的两种方式
 * 参考文档：https://www.cnblogs.com/vickylinj/p/13368745.html
 *
 */
export default {
  name: 'InjF',
  data() {
    return {};
  },
  // 1.最简单的方式，非响应的方式
  // inject: ['name'],
  // mounted() {
  //   console.log(this.name);
  // },
  // 接收组件A提供的color
  // 2.provide是函数的方式
  // inject: {
  //   theme: {
  //     // 函数式组件取值不一样
  //     default: () => {},
  //   },
  // },
  // inject: {
  //   theme: {
  //     // 函数式组件取值不一样
  //     default: () => {},
  //   },
  //   getReactiveInfo: {
  //     default: () => {},
  //   },
  // },
  // 上面为等效的inject方式
  inject: ['theme', 'getReactiveInfo', 'second'],
  // 为了实现响应式，需要队getReactiveInfo数据进行侦听
  computed: {
    changedGetReactiveInfo() {
      return this.getReactiveInfo();
    },
    reactA() {
      return this.second.a;
    },
  },
  watch: {
    // computed中缓存的属性changedGetReactiveInfo的值变化
    changedGetReactiveInfo(val) {
      console.log('控制台展示响应式的getReactiveInfo值:' + val);
    },
  },
  mounted() {
    console.log(this.theme.color);
    console.log(this.changedGetReactiveInfo); // 我是传递给孙子组件InjF的数据
  },
  // 这个阶段数据已经是新的了，只是新数据还没有应用到页面上
  beforeUpdate() {
    console.log(this.changedGetReactiveInfo); // 传到孙子组件的值被修改
  },
  methods: {},
  components: {},
};
</script>
<style lang="less" scoped>
.injf_container {
  background-color: pink;
}
</style>
