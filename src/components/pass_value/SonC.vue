<template>
  <div class="c_container">
    <h3>
      CSon子组件接收到父组件的传值：<i>{{ rev }}</i>
    </h3>
    <!-- SonB到SonC的传值 -->
    <h3>
      {{ cmsg }}
    </h3>
  </div>
</template>
<script>
import { Event } from '@/main';
export default {
  name: 'CSon',
  props: ['rev'],
  data() {
    // cmsg用以存储SonB到SonC
    return { cmsg: '' };
  },
  mounted() {
    Event.$off('toC');
    Event.$on('toC', (value) => {
      return (this.cmsg = value);
    });
  },
};
</script>
<style lang="less" scoped>
.c_container {
  background-color: green;
  h3 {
    i {
      color: purple;
    }
  }
}
</style>
