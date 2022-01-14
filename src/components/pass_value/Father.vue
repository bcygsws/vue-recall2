<template>
  <div class="pass_container">
    <h3>父子元素传值演示:</h3>
    <h4>{{ msg }}</h4>
    <b-son
      :rec="info"
      rv="hello world"
      :fru="fru"
      @text-enlarged="handle"
      @text-small="handle1"
    >
      }}</b-son
    >
    <!-- 父组件接收子组件传值x -->
    <span :style="{ fontSize: fontSize + 'px' }">span字体变化</span>
    <h4>向子组件CSon传值</h4>
    <c-son :rev="info"></c-son>
    <!-- 跨级传值Father传值给SonSon -->
    <button @click="handle_fat">点击Father向SonSon传值</button>
    <hr />
    <router-link to="/home/pass_value/hello"
      >hello页面体验vuex的使用</router-link
    >
    <hr />
    <router-link to="/home/pass_value/attrs_lis">attrs页面体会$attrs和$listeners跨级传值</router-link>
    <router-view></router-view>
  </div>
</template>
<script>
import CSon from './SonC.vue';
import BSon from './SonB.vue';
import { Event } from '@/main';
/**
 *
 * @ 一：父子组件传值
 * 父->子 在父组件中，引用子组件处，添加属性，:attr="父组件data";在子组件中，引入父组件数据，两种方法：数组和对象
 * ['attr'] {attr:{
 *  type:String,
 *  default:"默认值",
 *  required:true,// 父组件必须向子组件传值，否则报错
 *  validate:(value)=>{
 *     return value;}
 * }}
 * 子->父 在子组件中，在子组件汇中，@事件="$emit('toFat',attr)";
 *        在父组件中，引用子组件的标签，绑定事件@toFat="handle"
 *        handle(value){
 *        attr就是这里的value
 * }
 *
 * @ 二、$emit和$on，中央事件总线（事件中心），实现父子、兄弟和跨级组件之间的数据传递
 * main.js中空实例必须声明在new Vue({})前面，否则引出$on和$off就会报出TypeError
 *  父子传值SonB到其子组件SonSon
 *  同级传值，SonB向SonC
 *  跨级，Father传给孙子组件SonSon
 *
 * @三、vuex状态管理器
 * 1.VueComponent组件：视图
 * 2.actions:操作行为处理模块，actions中可以处理同步/异步数据，如：从后端接口中获取数据和批量操作同步数据
 *         内部多个同步处理函数可以同名，会按照书写的顺序先后触发
 * 3.dispatch：触发操作行为，是唯一可以提交actions的方法
 * 4.actions提交后（commit），交由mutations改变状态
 * 5.mutations改变状态管理对象值的对象，使用commit进行提交。与actions中不同之处在于：
 * a.mutations中方法只能处理同步数据
 * b.mutations不能有同名的方法
 * 6.state和getters中即时侦测数据变化，可以获取值。类似computed这个侦听属性
 * 7.vuex提供了一套简化模板import {mapState,mapGetters,mapMutations,mapActions} from 'vuex';可以简化状态管理
 * 的代码。注意：
 * a.注意操作时，函数名的双关性。如：@click="inc(props)" 用以通过...mapMutations的方法改变数据，那么在mutations:{
 * inc(state,props){ // 方法名必须是inc }}
 * b.@click-"inc(props)"传递的参数也不要做任何修饰
 *
 * @四、跨级组件之间的通信
 *
 *
 *
 *
 *
 *
 */
export default {
  name: 'Father',
  data() {
    return {
      msg: '向子组件BSon传值',
      info: '父元素向子元素传值',
      fru: ['苹果', '香蕉', '橘子', '菠萝'],
      // span标签文本的默认值为10，子组件传值控制其字体大小
      fontSize: 18,
      fontSmall: 18,
      // Father向SonSon传值
      fat: 'Father向SonSon传值',
    };
  },
  methods: {
    handle(value) {
      this.fontSize += value;
      if (this.fontSize >= 50) {
        this.fontSize = 50;
      }
    },
    handle1(value) {
      this.fontSize -= value;
      if (this.fontSize <= 10) {
        this.fontSize = 10;
      }
    },
    handle_fat() {
      Event.$emit('tochild', this.fat);
    },
  },
  components: {
    BSon,
    CSon,
  },
};
</script>
<style lang="less" scoped>
.pass_container {
  background-color: salmon;
}
</style>
