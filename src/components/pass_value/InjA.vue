<template>
  <div class="inja_container">
    <h1>这是InjectA组件</h1>
    <!-- 改变color -->
    <button @click="changeColor">改变color</button>
    <button @click="changeNotReactive">
      改变msg,看InjB和InjC中的值是否改变
    </button>
    <button @click="changeInfo">改变info值，测试是否响应式</button>
    <inj-b ref="injb"></inj-b>
    <inj-c></inj-c>
  </div>
</template>
<script>
import InjB from './InjB.vue';
import InjC from './InjC.vue';
import Vue from 'vue';
export default {
  name: 'InjA',
  data() {
    return {
      color: 'blue',
      msg: '我是父组件InjA的数据',
      info: '我是传递给孙子组件InjF的数据',
    };
  },
  // 1.最简单的提供-注入，类似父子组件传值（非响应方式）
  // provide: {
  //   name: '浪里行舟',
  // },
  // 2.非响应方式
  // provide() {
  //   return {
  //     theme: {
  //       color: this.color, // 这种方式绑定不是响应时的，即D E Fa变，A是不变的
  //     },
  //   };
  // },
  // 3.vue 2.6以后的响应式方式 Vue.observable优化响应式方式
  // 测试时，仍然未实现响应式
  // provide() {
  //   this.theme = Vue.observable({
  //     color: 'blue',
  //   });
  //   return {
  //     theme: this.theme,
  //   };
  // },
  // 4.响应式的解决方案
  provide() {
    this.theme = Vue.observable({
      color: this.color,
    });
    return {
      theme: this.theme,
      notReactiveData: this.msg,
      // 响应式的
      getReactiveInfo: () => this.info,
    };
  },
  mounted() {
    console.log(this.$refs.injb);
  },
  methods: {
    // 2.非响应方式，时改变color值的事件处理函数
    // changeColor(val) {
    //   if (val) {
    //     this.val = val;
    //   } else {
    //     this.color = this.color == 'blue' ? 'red' : 'blue';
    //   }
    // },
    // 3.Vue.observable({})优化响应式方式事件处理函数
    changeColor(val) {
      if (val) {
        this.theme.color = val;
      } else {
        this.theme.color = this.theme.color === 'blue' ? 'red' : 'blue';
      }
    },
    changeNotReactive() {
      this.msg = 'InjA传递给B和C的数据';
    },
    // 传到孙子组件的值被修改
    changeInfo() {
      this.info = '传到孙子组件的值被修改';
    },
  },
  components: { InjB, InjC },
};
</script>
<style lang="less" scoped>
.inja_container {
  background-color: pink;
  button {
    margin-right: 50px;
  }
}
</style>
