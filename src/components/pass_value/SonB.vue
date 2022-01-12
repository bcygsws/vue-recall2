<template>
  <div class="b_container">
    <h3>
      BSon子组件接收到父组件的传值：<u>{{ rec }}</u
      ><i>{{ rv }}</i>
    </h3>
    <!-- 父组件Father传递的eat值 -->
    <ul>
      <li v-for="(item, index) in fru" :key="index">{{ item }}</li>
    </ul>
    <!-- 子组件向父组件传值 -->
    <button @click="$emit('text-enlarged', 5)">
      点击子组件SonB，父组件字体变大
    </button>
  </div>
</template>
<script>
export default {
  name: 'BSon',
  // props: ['rec', 'rv', 'fru'],
  props: {
    rec: {
      type: String, // 传递值的类型
      // default: '默认值', // 默认值
      // // required: true, // 表示父级必须传入数据，否则会报错
      // validate: (value) => {
      //   // 校验规则
      //   return value;
      // },
    },
    rv: { type: String },
    fru: { type: Array },
  },
};
</script>
<style lang="less" scoped>
.b_container {
  h3 {
    u {
      color: orange;
    }
  }
}
</style>
