<template>
  <div class="dy_container">
    <h3>这是动态绑定class的6种方式展示</h3>
    <!-- 两者最直观的区别，使用对象动态绑定时，直接使用对象。使用数组时，类名要加单引号 -->
    <!-- 方式1：绑定一个对象{类名：布尔值} -->
    <div :class="{ active: isActive }">一身转战三千里，一剑曾当百万师</div>
    <!-- 方式2：绑定有个对象，方式1的转换方式 -->
    <div :class="obj">一身转战三千里，一剑曾当百万师</div>
    <!-- 方式3：computed 计算属性侦听，返回一个布尔值 -->
    <div :class="comObj">一身转战三千里，一剑曾当百万师</div>
    <!-- 方式4：数组，多个类使用逗号隔开 -->
    <div :class="['active3', 'active4']">一身转战三千里，一剑曾当百万师</div>
    <!-- 方式5：数组和三元表达式 -->
    <div :class="[isActive1 ? 'active3' : 'active4']">
      一身转战三千里，一剑曾当百万师
    </div>
    <!-- 方式6：行内式，数组和对象结合-->
    <div :class="['active5', { active1: true }]">
      一身转战三千里，一剑曾当百万师
    </div>
  </div>
</template>
<script>
/**
 *
 * @ 概括起来，就两种方式：对象或数组
 * 对象方式，示例：{active: true}，替代成对象或者computed属性返回的那个对象;
 * 本质：对象方式其本质都是，{类名：布尔值}
 *
 * 数组方式，适用于多个类样式，必须用数组了:class="['active3','active4']"或者数组对象混合版本
 * :class="['active5',{active1: true}]"
 * 本质：数组方式形如：['类名']，类名作为数组的一个元素
 *
 */
export default {
  name: 'DyClass',
  data() {
    return {
      isActive: true,
      isActive1: false,
      obj: { active1: true },
    };
  },
  methods: {},
  computed: {
    comObj() {
      return { active2: true };
    },
  },
};
</script>
<style lang="less" scoped>
.dy_container {
  .active {
    color: red;
    /* css的font属性按照顺序(swsf)：font-style font-weight font-size或者line-height font-family  */
    /* 这里的14px/24px就是行高的写法：14px是字体大小，24px是该行的高度*/
    font: italic 700 14px/24px 'Arial';
  }
  .active1 {
    color: hotpink;
    text-decoration: line-through;
    /* font-size:4px 4<默认的12px;字体就是12px */
    font-size: 4px;
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
