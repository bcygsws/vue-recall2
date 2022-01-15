<template>
  <div class="inja_container">
    <h1>这是InjectA组件</h1>
    <!-- 改变color -->
    <button @click="changeColor">改变color</button>
    <inj-b></inj-b>
    <inj-c></inj-c>
  </div>
</template>
<script>
import InjB from './InjB.vue';
import InjC from './InjC.vue';
export default {
  name: 'InjA',
  data() {
    return {
      color: 'blue',
    };
  },
  // 1.最简单的提供-注入，类似父子组件传值
  // provide: {
  //   name: '浪里行舟',
  // },
  methods: {
    changeColor(val) {
      if (val) {
        this.val = val;
      } else {
        this.color = this.color == 'blue' ? 'red' : 'blue';
      }
    },
  },
  components: { InjB, InjC },
};
</script>
<style lang="less" scoped>
.inja_container {
  background-color: pink;
}
</style>
