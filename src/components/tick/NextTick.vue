<template>
  <div class="tick_container">
    <h3>这是nextTick演示组件</h3>
    <p ref="mRef">{{ msg }}</p>
    <p v-if="msg1">没有使用$nextTick:{{ msg1 }}</p>
    <p v-if="msg2">使用$nextTick:{{ msg2 }}</p>
    <p v-if="msg3">没有使用$nextTick:{{ msg3 }}</p>
    <br />
    <button @click="changeMsg">更改msg的值，观察页面的变化</button>
  </div>
</template>
<script>
/**
 * @ this.$nextTick()的实例
 * 参考文档：https://www.cnblogs.com/qhantime/p/11379826.html
 * 应用场景
 * 1.在vue生命周期的created之中操作DOM,一定要使用this.$nextTick()，类似于mounted
 * 2.在数据变化后要执行某个操作，而这个操作需要使用 随数据变化而变化的 DOM结构时，这个操作都应该放在nextTick的回调函数中
 * 官方解释
 * vue异步执行dom的更新
 * 例如：当我们设置var data=vm.newData的时候，组件不会立即进行渲染.当刷新队列时，组件会在事件循环列表清空时的下一个tick
 * 更新
 * 
 * 
 *
 */
export default {
  name: 'NextTick',
  data() {
    return {
      msg: 'Hello Vue',
      msg1: '',
      msg2: '',
      msg3: '',
    };
  },
  methods: {
    changeMsg() {
      this.msg = 'Hello World';
      this.msg1 = this.$refs.mRef.innerText;
      this.$nextTick(() => {
        this.msg2 = this.$refs.mRef.innerText;
      });
      this.msg3 = this.$refs.mRef.innerText;
    },
  },
};
</script>
<style lang="less" scoped>
.tick_container {
}
</style>
