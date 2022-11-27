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
    <!-- <div>{{ reactA }}</div> -->
    <div>{{ theme.fontB }}</div>
    <!-- 非响应式，观察点击InjA中按钮，按钮名称“改变msg,看InjB和InjC的值是否改变” -->
    <div>{{ notReactiveData }}</div>
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
 * 在上述文档中提到的混入这个概念 混入-mixins
 *
 * 参考vue.js官方文档：
 * https://cn.vuejs.org/v2/guide/mixins.html
 *
 * 项目参考本地路径：
 * D:\Web-project\vue-primary
 * vue-primary项目中03和04
 * 混入：混入提供了一个非常灵活的方式，用于分发vue组件复用的功能
 * 混入对象（和组件一样） 和 组件
 *
 * 说明：
 * a.混入对象可以设定组件的任意选项
 * b.组件使用混入对象时，混入对象中所有选项就会“混合”进当前组件的所有选项
 *
 * 使用混入对象后合并方式
 * a.混入对象的data和组件对象的进行合并，当出现冲突时，组件数据优先
 * b.混入对象和组件对象有相同的钩子时，会合并成数组。因此，混入对象
 * 和组件中的钩子都会调用，而且混入对象中的钩子在当前组件钩子之前调用
 * c.components、methods和directives等对象属性，会合并成一个对象。
 * 当对象中键值对冲突时，保留组件中的键值对
 * d.全局混入：一旦全局混入创建后，会对创建的每一个实例造成影响，一般不
 * 推荐使用。
 * 全局混入使用恰当时，可以为【自定义选项】注入【处理逻辑】
 * 全局引入时，mixin单数；局部引入时mixin使用复数，mixins；类似的有component directive filter
 * Vue.mixin({
 * created:function(){
 * var myOption=this.$options.myOption;
 * // 对myOption进行处理
 * 
 * }
 *
 * })
 * new Vue({
 *  myOptions:"hello"
 * })
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
  // inject: ['theme', 'getReactiveInfo', 'second'],
  inject: ['theme', 'getReactiveInfo', 'notReactiveData'],
  // 为了实现响应式，需要队getReactiveInfo数据进行侦听
  computed: {
    changedGetReactiveInfo() {
      return this.getReactiveInfo();
    }
    // reactA() {
    //   return this.second.a;
    // },
  },
  watch: {
    // watch中监控的变量（作为函数名）参数有两个：newVal和oldVal
    // computed中缓存的属性changedGetReactiveInfo的值变化
    changedGetReactiveInfo(newVal) {
      console.log('控制台展示响应式的getReactiveInfo值:' + newVal);
    }
  },
  mounted() {
    console.log(this.theme.color); // blue
    console.log(this.changedGetReactiveInfo); // 我是传递给孙子组件InjF的数据
  },
  // 这个阶段数据已经是新的了，只是新数据还没有应用到页面上
  beforeUpdate() {
    console.log(this.changedGetReactiveInfo); // 传到孙子组件的值被修改
  },
  methods: {},
  components: {}
};
</script>
<style lang="less" scoped>
.injf_container {
  background-color: pink;
}
</style>
