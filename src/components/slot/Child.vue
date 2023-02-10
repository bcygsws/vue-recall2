<template>
  <div class="child_container">
    <h3>作用域插槽，子组件提供数据data</h3>
    <slot :data="list"></slot>
  </div>
</template>
<script>
/**
 *
 * Prettier插件格式化
 * 默认ctrl+shift+alt+p，修改成了shift+alt+f；并移除了默认的shift+alt+F
 *
 * */
export default {
  data() {
    return {
      list: [
        {
          id: 1,
          name: "林黛玉"
        },
        {
          id: 2,
          name: "贾宝玉"
        },
        {
          id: 3,
          name: "晴雯"
        },
        {
          id: 4,
          name: "袭人"
        }
      ]
    };
  }
};
</script>
