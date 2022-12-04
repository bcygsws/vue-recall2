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
 * 过程：当数据变化时，vue会开启一个队列，在事件循环中存储数据变化。当一个watcher(观察者对象)被多次触发时，只会被推入到队列
 * 中一次（this.$refs.mRef.innerText只会执行一次）。这种缓冲时的去重是为了避免不必要的计算和dom操作。然后，在下一个事件循环"tick"中，vue刷新队列并执行
 * 实际工作（实际工作就是渲染组件）
 *
 * 
 * 扩展：了解事件循环-Event Loop
 * 文档：https://zhuanlan.zhihu.com/p/469899375
 *
 * Event Loop(事件循环)：所有同步任务在主线程中执行，即主执行栈；除此之外，所有异步任务进入队列；当主线程中任务执行完毕后，
 * 就会去读取队列中的任务，并推入主执行栈执行；上述过程，循环往复，就叫做事件循环
 *
 * 宏任务-macro tasks:  4s script setTimeout setInterval setImmediate(node独有), requestAnimationFrame（浏览器独有）、
 * I/0操作、UI渲染（浏览器独有）
 * 微任务-micro jobs： process的nextTick(Node.js)、Promise和mutationObserver
 * 
 * 其执行顺序：script块中同步任务-微任务（所有微任务清空后，才开始异步宏任务）-异步宏任务
 * 
 */
export default {
  name: 'NextTick',
  data() {
    return {
      msg: 'Hello Vue',
      msg1: '',
      msg2: '',
      msg3: ''
    };
  },
  methods: {
    changeMsg() {
      this.msg = 'Hello World';
      // 这个操作中要随数据变化而变化的DOM结构时， obj.innerText(使用了随数据变化而变化的DOM结构)
      // innerText从Hello Vue变成了Hello World
      this.msg1 = this.$refs.mRef.innerText; 
      // dom的更新是异步的，this.msg1和this.msg3都立即变成了Hello World,但是this.$refs.myRef.innerText就是那个随
      // 数据变化而变化的dom结构
      this.$nextTick(() => {
        this.msg2 = this.$refs.mRef.innerText;
      });
      this.msg3 = this.$refs.mRef.innerText;
    }
  }
};
</script>
<style lang="less" scoped>
.tick_container {
}
</style>
