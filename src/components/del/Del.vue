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
 * delete删除的只是数组中的值，仍然在内存中中占据位置，显示empty或者undefined，其他元素的键值还是不变的
 * vue.delete会删除数组元素在内存中国的占位，数组的键也改变了
 *
 * vue.delete用于避开vue不能监测到property被删除的限制，但是这个方法很少被用到
 * 换句话vue.delete的作用是vue能够监测到property被删除的限制
 *
 * 
 *
 * 关联知识
 * Vue.set
 * 参考文档：https://v2.cn.vuejs.org/v2/api/#Vue-set
 * Vue.set(target【Object|Array】,properName/index【string|number】,value【任意类型的值】)
 * Vue.set的含义是向对象添加一个属性。如果对象是响应式的，要确保被加入的这个property也是响应式的，且触发视图更新
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
      // Vue.set参数列表Vue.set(target,properName/index,value)
      // target类型Object|Array，properName/index类型string|number,value可以是任意类型
      /**
       *
       * 特别注意：这个语句不能注释掉，是用以确保能够更新视图的。注释该语句后，delete(a[1])确实删除了元素的值，但是
       * 页面还是删除前的，即视图没有更新
       */
      this.$set(this.a);
      console.log(this.a);
    },
    handleB() {
      // Vue.delete(target,properName/index)
      // target类型Object|Array,properName/index类型 string|number
      this.$delete(this.b, 1);
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
