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
    <button @click="$emit('text-enlarged', 2)">
      点击子组件，父组件字体变大
    </button>
    <button @click="$emit('text-small', 2)">点击子组件，父组件字体变小</button>
    <son-son>SonB的子组件</son-son>
    <!-- $emit和$on中央事件总线，实现各级别传值 -->
    <!-- SonB传给子组件SonSon -->
    <button @click="handle">SonB向SonSon传值</button>
    <!-- SonB向同级子组件SonC传递数据 -->
    <button @click="handle1">SonB传值给SonC</button>
  </div>
</template>
<script>
import SonSon from './SonSon.vue';
import { Event } from '@/main';
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
    son: { type: String, default: '中央事件总线方法实现SonB向SonSon传值' },
    bval: { type: String, default: 'SonB向同级的SonC传值' },
  },
  components: {
    SonSon,
  },
  methods: {
    handle() {
      Event.$emit('toSon', this.son);
    },
    handle1() {
      Event.$emit('toC', this.bval);
    },
  },
};
</script>
<style lang="less" scoped>
.b_container {
  background-color: pink;

  h3 {
    u {
      color: orange;
    }
  }
  button {
    margin-left: 10px;
  }
  ul {
    li {
      list-style-type: none;
    }
  }
}
</style>
