<template>
  <div class="keep_container">
    <h3>这是keep-alive组件</h3>
    <!-- <keep-alive :include="/Coma|Comb|Comc/" max="10"> -->
    <!-- 只对组件Coma和Comb进行缓存，Comc不缓存；测试：向三个文本框中输入内容，观看变化 -->
    <keep-alive :include="/Coma|Comb/" max="10">
      <component :is="componentId"></component>
    </keep-alive>
    <input type="button" value="缓存coma" @click="select('a')" />&nbsp;&nbsp;
    <input type="button" value="缓存comb" @click="select('b')" />&nbsp;&nbsp;
    <input type="button" value="缓存comc" @click="select('c')" />
    <hr />
    <router-link to="/home/keep_alive/cache">切换到缓存的组件</router-link
    >&nbsp;&nbsp;
    <!-- 作为对照，定义一个同级别路由，不换存 -->
    <router-link to="/home/keep_alive/no_cache">切换到不缓存组件</router-link>
    <!-- 需要缓存的视图组件 -->
    <keep-alive>
      <router-view v-if="$route.meta.isAlive"></router-view>
    </keep-alive>
    <!-- 不需要缓存的视图组件 -->
    <router-view v-if="!$route.meta.isAlive"></router-view>
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
        缓存的组件仍然保存在内存中，防止重复渲染DOM
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
 * 3. vue 2.5.0版本后，keep-alive又增加了一个属性，是第三个属性。为max,max的作用是最多缓存的组件实例
 * 一旦组件实例达到了max属性值，将优先清除那个缓存最久，没有被访问的实例
 *
 * 两个钩子：activated 和deactivated
 * 1.keep-alive缓存的组件，不会执行beforeDestroy和destroyed生命周期钩子了。原因很简单：keep-alive本意为缓存组件，而
 * 不是将其
销毁，这两个钩子在keep-alive包含的组件中，不会执行了
 * 2.两个钩子的注意点：https://www.jianshu.com/p/42429f4d8f9e
 * 3.第一次触发时，执行顺序是created mounted activated,退出时触发deactivated。再次触发时，只会执行activated钩子了
 * keep-alive拓展理解，参考文档：https://segmentfault.com/a/1190000015727279
 * 
 *
 * 面试官说：keep-alive
 * 1.重点体会使用场景：首页-列表项-详情页，再从详情页返回时，列表项组件就最好使用缓存
 * 2.缓存组件如何获取数据，两种方式：beforeRouteEnter((to,from,next)=>{next(vm=>{vm.getData()})})，activated(){this.getData()}
 *  https://mp.weixin.qq.com/s?__biz=MzU1OTgxNDQ1Nw==&mid=2247484446&idx=1&sn=80d5a4a15c88f4d6fd878095101601e8&chksm=fc10c648cb674f5efbdad8222de6cd607870e44d5870480a229bfeefd6a78c3ba3b9d372ab37&scene=21#wechat_redirect
 *
 *
 */
export default {
  name: 'Keep',
  data() {
    return {
      componentId: 'Coma'
    };
  },
  methods: {
    select(id) {
      this.componentId = 'Com' + id;
    }
  },
  created() {
    console.log(1);
    console.log(this.$route);
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
    Comc
  }
};
</script>
<style lang="less" scoped>
.keep_container {
  input[type='button'] {
    margin-top: 20px;
  }
}
</style>
