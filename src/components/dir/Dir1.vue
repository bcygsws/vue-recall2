<template>
  <div class="dir1_container">
    <h3>这动态指令参数的理解</h3>
    <button @click="toTop">div盒子定位到距离顶部200px</button>
    <!-- 在top和left之间来回切换 -->
    <!-- <button @click="switchDir">来回在top和left之间切换</button> -->
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
 * 测试验证：direction初始值为left(没有设置top)；当toTop方法执行后，el.style.[binding.arg]=el.style.top=200+"px";
 * 而且这种变化，只能出现一次；如果，再改变direction值，界面就没有变化了
 *
 */
export default {
  name: 'Dir1',
  data() {
    return {
      direction: 'left'
    };
  },
  methods: {
    toTop() {
      // (left,top) 按钮点击后，(200,0)变成了(200,200)
      this.direction = 'top';
    },
    // switchDir() {
    //   // 来回在left和top之间切换
    //   const arr = ['left', 'top'];
    //   const index = arr.indexOf(this.direction);
    //   this.direction = index === 0 ? arr[1] : arr[0];
    //   console.log(this.direction);
    // },
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
        let s = binding.arg;
        el.style[s] = binding.value + 'px';
        console.log(binding);
        console.log(s);
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
