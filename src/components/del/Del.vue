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
 * vue.delete可以避免vue监测不到新的property
 * Vue.delete(target,properName/index)
 * 含义：用于删除对象的属性，确保这个被删除的property能够触发更新视图。
 * 这个方法用于避开vue不能监测到property被删除的限制
 * 换句话：这个方法用于vue能够监测到property被删除的限制
 *
 *
 * 了解：
 * 参考：https://cn.vuejs.org/v2/api/#Vue-set
 * vue.set(target,properName/index,value)
 * target: Object|Array
 * properName/indx:string|number
 * value:任意类型
 *
 * vue.set表示向响应式对象中添加一个属性，并确保这个这个新property同样是响应式的，并触发视图更新
 *
 *
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
