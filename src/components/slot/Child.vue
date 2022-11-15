<template>
  <div class='child_container'>
    <h3>作用域插槽，子组件提供数据data</h3>
    <slot :data='list'></slot>
  </div>
</template>
<script>
export default {
  name: 'Child',
  data() {
    return {
      list: [
        {
          id: 1,
          name: '林黛玉'
        },
        {
          id: 2,
          name: '贾宝玉'
        },
        {
          id: 3,
          name: '晴雯'
        },
        {
          id: 4,
          name: '袭人'
        }
      ]
    };
  }
};
</script>
