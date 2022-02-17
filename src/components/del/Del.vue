<template>
  <div class="del_container">
    <h3>这是delete和vue.delete区别的演示</h3>
    <ul>
      <li v-for="(item, index) in a" :key="index">a---{{ item }}</li>
    </ul>
    <button @click="handleA">打印a数组处理后的值</button>
    <ul>
      <li v-for="(item, index) in b" :key="index">b---{{ item }}</li>
    </ul>
    <button @click="handleB">打印b数组处理后的值</button>
  </div>
</template>
<script>
/**
 *
 * @ delete和vue.delete的区别与联系
 * 参考文档：https://zhuanlan.zhihu.com/p/80601923
 * 参考文档2：https://blog.csdn.net/qq_39594951/article/details/93618375
 * 区别：
 * delete删除的只是数组中的值，仍然在内存中中占据位置，显示empty
 * vue.delete会删除数组元素在内存中国的占位
 *
 * vue.delete可以避免vue监测不到新的property
 *
 *
 */
export default {
  name: 'Del',
  data() {
    return {
      a: [1, 2, 3, 4],
      b: [1, 2, 3, 4],
    };
  },
  methods: {
    handleA() {
      delete this.a[1];
      this.$set(this.a);
      console.log(this.a);
    },
    handleB() {
      this.$delete(this.b[1]);
      console.log(this.b);
    },
  },
};
</script>
<style lang="less" scoped>
.del_container {
  ul {
    li {
      list-style: none;
    }
  }
}
</style>
