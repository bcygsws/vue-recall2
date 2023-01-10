<template>
  <div class="dir_container">
    <h3>这是Dir组件</h3>
    <p v-color="color">劝我试求三亩宅，从公已觉十年迟。</p>
    <button @click="changeColor">改变p的颜色</button>
    <br />
    <router-link to="/home/dir/dy_dir">更深一步，体会动态指令参数</router-link>
    <router-view></router-view>
  </div>
</template>
<script>
/**
 * @ 自定义指令
 * 语法：逻辑代码中directives:{
 *   "str"
 * } 在模板中需要绑定的标签中，输入v-str
 *
 * 参考文档：https://www.jianshu.com/p/0996ef25a012
 *
 */
export default {
  name: 'Dir',
  data() {
    return {
      color: 'red',
    };
  },
  methods: {
    // 1.更改data中color的业务逻辑
    // 2.inserted和update钩子中都是一个赋值操作；el.style.color=binding.value;观察到两个阶段中打印的bindind对象值不同
    changeColor() {
      // 改变颜色值
      this.color = 'green';
    },
  },
  components: {},
  directives: {
    color: {
      // bind钩子；a.指令第一次绑定到元素时执行，可以进行一次性的初始化设置 b.这个钩子只执行一次
      // bind: function (el, binding) {},// bind钩子和inserted也执行一次；指令绑定到元素时执行
      // inserted钩子：被绑定元素插入父节点时使用（仅保证父节点存在，不保证一定插入到文档中）
      inserted: function (el, binding) {
        // {name: 'color', rawName: 'v-color', value: 'red', expression: 'color', modifiers: {…}, …}
        console.log(binding);
        el.style.color = binding.value;
      },
      // 1.虚拟节点vNode更新时调用，这种更新不是响应式的，因为inserted和bind都只执行一次；
      // 2.所在组件的VNode更新时调用，可能发生在其子VNode更新前调用。指令value值可能变化，也可能不变
      // 3.可以调用多次
      update: function (el, binding) {
        // {name: 'color', rawName: 'v-color', value: 'green', expression: 'color', modifiers: {…}, …}
        console.log(binding);
        el.style.color = binding.value;
      },
      // 所在组件的VNode和子VNode更新后调用
      // componentUpdated: function (el, binding) {},
      // 指令解绑时调用,这个钩子也只执行一次
      // unbind(el, binding) {},
    },
  },
};
</script>
<style lang="less" scoped>
.dir_container {
  h3 {
    color: yellow;
  }
}
</style>
