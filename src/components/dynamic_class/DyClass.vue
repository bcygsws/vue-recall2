<template>
  <div class="dy_container">
    <h3>这是动态绑定class的6种方式展示</h3>
    <!-- 两者最直观的区别，使用对象动态绑定时，直接使用对象。使用数组时，类名要加单引号 -->
    <!-- 方式1：绑定一个对象{类名：布尔值} -->
    <p :class="{ active: isActive }">一身转战三千里，一剑曾当百万师</p>
    <!-- 方式2：绑定有个对象，方式1的转换方式 -->
    <p :class="obj">一身转战三千里，一剑曾当百万师</p>
    <!-- 方式3：computed 计算属性侦听，返回一个布尔值 -->
    <p :class="comObj">一身转战三千里，一剑曾当百万师</p>
    <!-- 方式4：数组，多个类使用逗号隔开 -->
    <p :class="['active3', 'active4']">一身转战三千里，一剑曾当百万师</p>
    <!-- 方式5：数组和三元表达式 -->
    <p :class="[isActive1 ? 'active3' : 'active4']">
      一身转战三千里，一剑曾当百万师
    </p>
    <!-- 方式6：行内式，数组和对象结合-->
    <p :class="['active5', { active1: true }]">
      一身转战三千里，一剑曾当百万师
    </p>
  </div>
</template>
<script>
export default {
  name: 'DyClass',
  data() {
    return {
      isActive: true,
      isActive1: false,
      obj: { active1: true }
    };
  },
  methods: {},
  computed: {
    comObj() {
      return { active2: true };
    }
  }
};
</script>
<style lang="less" scoped>
.dy_container {
  .active {
    color: red;
    font: italic 700 24px 'Arial';
  }
  .active1 {
    color: hotpink;
    text-decoration: line-through;
  }
  .active2 {
    color: greenyellow;
    text-decoration: underline;
  }
  .active3 {
    background-color: purple;
    font-weight: 700;
    color: #fff;
  }
  .active4 {
    font-size: 30px;
    letter-spacing: 40px;
  }
  .active5 {
    font-style: italic;
  }
}
</style>
