<template>
  <div class="ar_container">
    <h3>Vue的异步渲染演示</h3>
    <ul>
      <li v-for="(item, index) in arr" :key="index">
        {{ index }}---{{ item }}
      </li>
    </ul>
    <div>数组的长度：{{ total }}</div>
  </div>
</template>
<script>
/**
 * vue的异步渲染
 * 演示：在created和mounted阶段，改变数组，是否会触发beforeUpdate和updated钩子
 *
 */
export default {
  name: 'AsyncRender',
  data() {
    return {
      msg: '',
      arr: [1, 2, 3]
    };
  },
  computed: {
    total() {
      return this.arr.length;
    }
  },
  beforeCreate() {
    console.log('beforeCreate钩子执行');
  },
  created() {
    console.log('created钩子执行');
    // 1.created阶段，向arr中添加一个元素
    // this.arr.push(4);
  },
  beforeMount() {
    console.log('beforeMount钩子执行了');
    // 2.和created阶段效果一样，beforeUpdate和updated钩子不会调用
    // this.arr.push(4);
  },
  mounted() {
    // 3.mounted阶段生命周期钩子,共6个：包括组件初始化和创建阶段的钩子，以及更新阶段的钩子
    /**
     *
     * DOM更新是异步的，如何在mounted操作最新的dom呢？
     * 参考文档：https://blog.csdn.net/qq_44552416/article/details/107952313
     * 总来来说，this.$nextTick(cb)相当于在dom挂载到页面后(mounted阶段)这个时机的测量
     * $nextTick传入一个回调函数cb，当mounted更新完成后，会执行其中的回调cb
     *
     */
    console.log('mounted钩子执行了');
    this.arr.push(4);
    this.$nextTick(() => {
      const list = document.getElementsByTagName('li');
      console.log(list.length); // 4
    });
  },
  beforeUpdate() {
    console.log('beforeUpdate钩子执行了');
  },
  updated() {
    console.log('updated钩子执行了');
  }
};
</script>
<style lang="less" scoped>
.ar_container {
}
</style>
