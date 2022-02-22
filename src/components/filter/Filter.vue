<template>
  <div class="filter_container">
    <h3>这是自定义过滤器演示组件</h3>
    <input
      type="text"
      name="str"
      id="str"
      placeholder="请输入一个英文字符串"
      ref="inRef"
      @keyup="inputStr"
      value=""
    />
    <!-- | 管道符，后面跟自定义过滤器的名称(firstUp(传的值是，directives定义过滤器时的第二个参数，可以不传参)) -->
    <div class="str">{{ msg | firstUp }}</div>
    <!-- 时间格式化过滤器 -->
    <!-- pattern为空字符串 -->
    <div>{{ time | formatTime }}</div>
    <!-- pattern为YYYY-MM-DD HH:mm:ss -->
    <div>{{ time | formatTime('YYYY-MM-DD HH:mm:ss') }}</div>
    <!-- pattern为 YYYY/MM/DD HH:yyyy-mm-ss-->
    <div>{{ time | formatTime('YYYY/MM/DD HH:mm:ss') }}</div>
  </div>
</template>
<script>
export default {
  // name: 'Filter',
  data() {
    return { msg: '', time: new Date(2000, 6, 30, 12, 12, 13) };
  },
  methods: {
    inputStr() {
      this.msg = this.$refs.inRef.value;
    }
  },
  filters: {
    // 定义字符串首字母大写的过滤器firstUp
    firstUp: function (val) {
      // 如果没有输入任何字符串，直接返回
      if (!val) return;
      // 对输入的英文字符串首字母做大写处理，其他字符保持原样
      val = val.toString();
      return val.charAt(0).toUpperCase() + val.slice(1);
    },
    // 定义格式化时间的过滤器formatTime

    formatTime: function (val, pattern = '') {
      const year = val.getFullYear();
      console.log(typeof year); // number，其他时间变量都是number,使用字符串的方法padStart，需要拼接一个空字符，转化成字符串
      const month = (parseInt(val.getMonth()) + 1 + '').padStart(2, '0');
      const date = (val.getDate() + '').padStart(2, '0');
      const hours = (val.getHours() + '').padStart(2, '0');
      const minutes = (val.getMinutes() + '').padStart(2, '0');
      const seconds = (val.getSeconds() + '').padStart(2, '0');
      let pat = pattern.toLowerCase();

      if (pat === 'yyyy/mm/dd hh:mm:ss') {
        return `${year}/${month}/${date} ${hours}:${minutes}:${seconds}`;
      } else if (pat === 'yyyy-mm-dd hh:mm:ss' || !pat) {
        return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.filter_container {
  div.str {
    width: 100%;
    height: 30px;
    line-height: 30px;
  }
}
</style>
