<template>
  <div class="del_container">
    <h3>这是delete和vue.delete区别的演示</h3>
    <ul>
      <li v-for="(item, index) in a" :key="index">a---{{ item }}</li>
    </ul>
    <!-- a1. delete方式删除 -->
    <button @click="handleA">delete方式删除数组中某个元素</button><br />
    <!-- a2. this.$set更改数组this.$set(this.a,0,"某字符串") 将索引为0的元素更改为某字符串 -->
    <button @click="handleAdd">this.$set更改数组中的某个元素</button>
    <ul>
      <li v-for="(item, index) in b" :key="index">b---{{ item }}</li>
    </ul>
    <!-- a3. $delete方式删除 -->
    <button @click="handleB">this.$deletes删除数组b中的某个元素</button>
    <ul>
      <li>名称：{{ obj1.title }}</li>
      <li>作者：{{ obj1.author }}</li>
      <li>描述：{{ obj1.des }}</li>
    </ul>
    <!-- b1. delete方式删除对象的某个属性 -->
    <button @click="handleDel">delete方式删除对象的某个属性</button>
    <ul>
      <li>名称：{{ obj2.title }}</li>
      <li>作者：{{ obj2.author }}</li>
      <li>描述：{{ obj2.des }}</li>
    </ul>
    <!-- b2. $delete方式删除对象的某个属性 -->
    <button @click="handle$del">使用this.$delete删除对象的某个属性</button>
    <ul>
      <li>名称：{{ obj2.title }}</li>
      <li>作者：{{ obj2.author }}</li>
      <li>描述：{{ obj2.des }}</li>
    </ul>
    <!-- b3. $set方式设置值对象的某个属性 -->
    <button @click="handle$set">使用this.$set修改对象的某个属性值</button>
    <!-- b4.验证添加普通属性， -->
    <ul>
      <li>名称：{{ obj2.title }}</li>
      <li>作者：{{ obj2.author }}</li>
      <li>描述：{{ obj2.des }}</li>
      <li v-if="obj2.pages">页数：{{ obj2.pages ? obj2.pages : '未知' }}</li>
    </ul>
    <button @click="handle$setAdd">
      使用this.$set验证vue无法探测到普通的新增属性
    </button>
  </div>
</template>
<script>
/**
 *
 * @ delete和vue.delete的区别与联系
 * 参考文档：https://zhuanlan.zhihu.com/p/80601923
 * 参考文档2：https://blog.csdn.net/qq_39594951/article/details/93618375
 * 区别：
 * 1.delete删除的只是数组中的值，仍然在内存中中占据位置，显示empty或者undefined，其他元素的键值还是不变的
 * 2.$delete或Vue.delete会删除数组元素在内存中的占位，数组的键也改变了
 * 3.$delete或者Vue.delete用于避开vue不能监测到property被删除的限制，但是这个方法很少被用到
 * 换句话vue.delete的作用是vue能够监测到property被删除的限制
 *
 * 关联知识
 * Vue.set
 * 参考文档：https://v2.cn.vuejs.org/v2/api/#Vue-set
 * 语法：
 * Vue.set(target【Object|Array】,properName/index【string|number】,value【任意类型的值】)
 * 定义：
 * Vue.set的含义是向对象添加一个property,并确保被加入的这个property也是响应式的，且触发视图更新
 * 特别注意：
 * 它只适用于响应式对象添加属性，因为无法探测普通的新增的属性(如：this.myObject.newProperty = 'hi')
 *
 */
export default {
  name: 'Del',
  data() {
    return {
      a: [1, 2, 3, 4],
      b: [1, 2, 3, 4],
      obj1: { title: '绛雪玄霜', author: '卧龙生', des: '姐妹纠葛，捍卫正道' },
      obj2: { title: '白马啸西风', author: '金庸', des: '李文秀西域历险' },
    };
  },
  methods: {
    // 1.直接delete的方式；
    // 注意：delete这种方式删除数组中某个元素后，再次点删除，数组a是不会变化的；原因是：
    // 删除数组中索引为1的元素后，该位置元素被empty替代；再次使用delete删除，该元素仍然会是empty
    handleA() {
      delete this.a[1];
      /**
       *
       * Vue.set的参数列表(这是全局写法，非全局this.$set)
       * Vue.set(target[,properName/index[,value]])
       *
       * this.$set()可表现为三种形态：
       * 1.替形如：delete this.a[1]这种操作更新视图
       * 2.更改数组中的元素和对象的属性值
       * 3.添加数组中的元素和增加对象的键值对
       *
       * target类型Object|Array
       * properName/index类型string|number
       * value可以是任意类型
       *
       * 特别注意：这个语句不能注释掉，是用以确保能够更新视图的。注释该语句后，delete(a[1])确实删除了元素的值，但是
       * 页面还是删除前的，即视图没有更新
       * 这里只使用了第一个参数Object|Array
       *
       */
      this.$set(this.a);
      console.log(this.a);
    },
    handleAdd() {
      // this.$set的三种形态：
      // a.数组中，原本索引0的元素存在，这就是一个更改
      this.$set(this.a, 0, 'Hello,add data!');
      // b.数组中，原本索引4的元素不存在，这就是一个添加操作
      this.$set(this.a, 4, '我是新增的元素');
      console.log(this.a);
      // c.上面已经演示，用以踢delete this.a[1]这种语句更新视图
    },
    handleB() {
      // Vue.delete(target,properName/index)
      // target类型Object|Array,properName/index类型 string|number
      this.$delete(this.b, 1);
      console.log(this.b);
    },
    handleDel() {
      // a.delete方式删除对象的属性
      delete this.obj1.des;
      this.$set(this.obj1); // 必须有，用以更新视图
      // 对象中属性值删除了，变成了undefined；键和值都变成了undefined，仍然占据内存空间
      console.log(this.obj1); // { title: '绛雪玄霜', author: '卧龙生', undefined: undefined },
    },
    handle$del() {
      // b.使用$delete删除对象的属性
      this.$delete(this.obj2, 'des');
      // 将des属性彻底删除了，不在对象中占据存储空间了
      console.log(this.obj2); // { title: '白马啸西风', author: '金庸' }
    },
    handle$set() {
      this.$set(this.obj2, 'des', '南风知我意，吹梦到西洲');
      console.log(this.obj2);
    },
    // $set使用时注意事项：
    // 1.对象不能是vue实例，或者vue实例的根数据对象
    // 2.只能用于为响应式对象添加属性，因为vue无法探测到普通的新增的property,例如：this.myObject.newProperty="hi"
    // ( myObject不在data函数中定义的那些对象)
    handle$setAdd() {
      // 方式一：同样得如果没有this.$set()语句，this.obj2确实增加了pages这个新属性，但是不会触发页面更新
      // this.obj2.pages = 345;
      // this.$set(this.obj2);
      // 方式二
      this.$set(this.obj2, 'pages', 345);
      console.log(this.obj2);
      
      // 测试：$set只能为响应式对象添加属性，原因是vue检测不到普通对象添加的新属性;obj3没有在data函数中定义

      // this.obj3.pages = 'add ordinary property';
      // // 更新视图
      // this.$set(this.obj3);
      // console.log(this.obj3);
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
