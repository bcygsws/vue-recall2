<template>
  <div class="slot_container">
    <h3>这是插槽的使用组件</h3>
    <!-- 引入child-one子组件 -->
    <child-one>
      <!-- 可以交换下面两个模板的位置，不影响结果；原因是父组件中只提供内容，子组件child-one中slot标签的
      相对位置才决定视图的顺序 -->
      <template v-slot:bro>
        <div>新栽杨柳三千里，引得春风度玉关。</div>
      </template>
      <template v-slot:son>
        <div>
          有限光阴过隙，无情岁月飞梭。春花秋月暗消磨，相看一年又过。-节选自张抡《西江月》
        </div>
      </template>
      <template>
        <div>
          少年听雨歌楼上，红烛昏罗帐。壮年听雨客舟中，江阔云低、断雁叫西风。
        </div>
      </template>
      <!-- <template v-slot:default>
        <div>一身转战三千里，一剑曾当百万师</div>
      </template> -->
    </child-one>
    <!-- 作用域插槽，子组件slot中绑定一个变量提供数据。父组件中使用slot-scope进行接收;vue 2.6+以后，v-slot取代slot-scope -->
    <child>
      <!--<template slot-scope="user">-->
      <!-- 给出数据，使用动态绑定的方式，:data="list" -->
      <template v-slot="user">
        <!-- user是一个对象,显示在界面上为：{ "data": [ { "id": 1, "name": "林黛玉" },
        { "id": 2, "name": "贾宝玉" }, { "id": 3, "name": "晴雯" }, { "id": 4, "name": "袭人" } ] } -->
        <div>
          {{ user }}
        </div>
      </template>
    </child>
    <!-- v-for循环渲染在页面中 -->
    <child>
      <!--<template slot-scope="user1">-->
      <template v-slot="user1">
        <ul class="ul">
          <li v-for="item in user1.data" :key="item.id">
            {{ item.id }}-{{ item.name }}
          </li>
        </ul>
      </template>
    </child>
  </div>
</template>
<script>
/**
 *
 * @ 插槽-参考文档：
 * 什么是插槽？
 * 子组件提供占位符，父组件提供填充内容
 *
 * a.如果父组件提供了填充内容，但是子组件没有提供对应插槽，那么该内容不会填充到默认插槽中。
 * 指得是一对slot标签。是没法将填充内容渲染到子组件中的
 * b.相反的情况下，如果子组件中提供了【匿名插槽】(或者slot中name="default"也按照匿名插槽处理),
 * 在父组件中先寻找v-slot:default,如果找不到就会去
 * 匹配没有声明v-slot属性的模板
 * c.如果子组件中有多个匿名插槽，那么被分配到匿名插槽中的填充内容（父组件中，template标签中没有声明v-slot的那些内容），
 * 全都会填充到这些匿名插槽中
 *
 * 什么是作用域插槽？
 * 作用域插槽，就是带数据的插槽或者叫带参数的插槽。具体说来，就是子组件提供父组件的参数，该参数仅限于插槽中使用。
 * 在父组件中填充或者把内容展示出来。
 *
 *
 *
 */
import ChildOne from "./ChildOne.vue";
import Child from "./Child.vue";

export default {
  data() {
    return {};
  },
  components: {
    "child-one": ChildOne,
    child: Child
  }
};
</script>
<style lang="less" scoped>
.slot_container {
  ul {
    li {
      list-style: none;
      /* nth-child表示的是第几个子元素，nth-child(2n)可以表示第2个、第4个子元素等等…… */

      &:nth-child(2n) {
        background-color: red;
      }

      &:nth-child(2n + 1) {
        background-color: orange;
      }
    }
  }
}
</style>
