<template>
  <div class="keep_container">
    <h3>这是keep-alive组件</h3>
  </div>
</template>
<script>
// 导入子组件
import Coma from './Coma.vue';
import Comb from './Comb.vue';
import Comc from './Comc.vue';
/**
 * 定义：keep-alive是Vue的一个内置组件
 * 功能：用来对组件进行缓存，节省性能
 * 注意：包裹一个动态组件时，注意是动态组件（keep-alive不能用于v-for循环的组件中，只能缓存其中的一个直属子组件）
         而且keep-alive是一个成抽象组件，所以它不会渲染成一个DOM元素
 * 三个属性+两个钩子
 * 三个属性
 * 1.include 缓存哪些组件
 * 2.exclude 不缓存哪些组件，exclude优先级高于include。当要缓存或不缓存多个组件时，可以有三种书写方式：
 *  a. include="c1,c2,c3"
 *  b. :include="['c1','c2','c3']"
 *  c. :include="/c1|c2|c3/"
 * exclude属性值写法相同；但注意如果使用数组时（数组中组件名称单引号引起来）。同时，使用数组和正则表达式的方式时，include
 * 应该使用v-bind动态绑定
 * 3. vue 2.5.0版本后，keep-alive又增加了一个属性，是第三个属性。为max,max的作用是最多缓存的组件个数
 *
 * 两个钩子：activated 和deactivated
 * 1.keep-alive缓存的组件，不会执行beforeDestroy和destroyed生命周期钩子了。原因很简单：keep-alive本意为缓存组件，而不是将其
 * 销毁，这两个钩子在keep-alive包含的组件中，不会执行了
 * 2.两个钩子的注意点：https://www.jianshu.com/p/42429f4d8f9e
 * 3.第一次触发时，执行顺序是created mounted activated,退出时触发deactivated。再次触发时，只会执行activated钩子了
 * keep-alive拓展理解，参考文档：https://segmentfault.com/a/1190000015727279
 *
 *
 *
 *
 */
export default {
  name: 'Keep',
  data() {
    return {};
  },
  created() {
    console.log(1);
  },
  mounted() {
    console.log(2);
  },
  activated() {
    console.log(3);
  },
  deactivated() {
    console.log('退出缓存时触发');
  },
  components: {
    Coma,
    Comb,
    Comc,
  },
};
</script>
