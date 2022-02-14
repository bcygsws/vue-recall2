<template>
  <div class="dir1_container">
    <h3>这动态指令参数的理解</h3>
    <button @click="toTop">div盒子定位到距离顶部200px</button>
    <!-- 点击按钮，再次回到左侧，待实现 -->
    <!-- <button @click="toLeft">div盒子定位到距离左侧200px</button> -->
    <!-- div盒子是距离顶部还是左侧200px -->
    <div v-pin:[direction]="200" class="box">我距离谁200px?给我一个参数</div>
  </div>
</template>
<script>
/**
 * @ 动态指令：
 * 案例1：实现一个元素固定在距离顶部200px的位置，固定定位，再给一个top很容易实现
 * 更进一步
 * 案例2：如果我们要根据传入的参数，来设置这个元素时距离顶部（top）还是距离左侧（left）200px呢？
 * 该如何实现？
 * 语法
 * v-指令名称:[arg]="指令值"
 *
 *
 */
export default {
  name: 'Dir1',
  data() {
    return {
      direction: 'left',
    };
  },
  methods: {
    toTop() {
      this.direction = 'top';
    },
    // toLeft() {
    //   this.direction = 'left';
    // },
  },
  directives: {
    pin: {
      bind: function (el, binding) {
        console.log(binding);
        // 子盒子使用绝对定位,父盒子高度不能自适应
        // // binding.arg获取动态参数direction
        if (binding.arg) {
          let s = binding.arg;
          el.style.position = 'absolute';
          el.style[s] = binding.value + 'px';
        }
      },
      // inserted: function (el, binding) {},
      update: function (el, binding) {
        let s = binding.arg === 'left' ? 'left' : 'top';
        el.style[s] = binding.value + 'px';
      },
    },
  },
};
</script>
<style lang="less" scoped>
.dir1_container {
  position: relative;
  .box {
    width: 100px;
    background-color: orange;
  }
  button {
    margin-right: 80px;
  }
}
</style>
