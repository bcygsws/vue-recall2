<template>
  <div class="reg_container">
    <h3>正则表达式演示组件</h3>
    <h4>正则表达式前瞻后顾</h4>
    <button @click="startMatching">开始匹配前瞻或负前瞻</button>
    <button @click="startBehind">开始匹配后顾或者负后顾</button>
  </div>
</template>
<script>
export default {
  name: 'Reg',
  data() {
    return {};
  },
  methods: {
    // 正则表达式的前瞻后顾
    // 参考文档：https://www.cnblogs.com/yikemogutou/p/11245670.html
    startMatching() {
      // 一、前瞻 /abc(?=123)/g
      // 要匹配的是abc,限制条件是其前面的123。注意：前瞻默认方向向右，和坐标系一样。我们称要匹配前面试123的abc
      // let reg = /abc(?=123)/g;
      // let str1 = 'abc123';
      // console.log(str1.match(reg)); // ['abc']
      // let str2 = 'abc456';
      // console.log(str2.match(reg)); // null
      // let str3 = '123abc';
      // console.log(str3.match(reg)); // null
      // let str4 = '456abc';
      // console.log(str4.match(reg)); // null
      // 二、负前瞻 /abc(?！123)/g
      // 要匹配的是abc,匹配的条件是abc前面不是123
      // let reg = /abc(?!123)/g;
      // let str1 = 'abc123';
      // console.log(str1.match(reg)); // null
      // let str2 = 'abc456';
      // console.log(str2.match(reg)); // ['abc']
      // let str3 = '123abc';
      // console.log(str3.match(reg)); // ['abc']
      // let str4 = '456abc';
      // console.log(str4.match(reg)); // ['abc']
    },
    // 后顾或者负后顾
    startBehind() {
      // 三、后顾 ?<=
      // 读作：要匹配abc,条件是abc的前面是123的那些abc
      // let reg = /(?<=123)abc/g;
      // let str1 = 'abc123';
      // console.log(str1.match(reg)); // null
      // let str2 = 'abc456';
      // console.log(str2.match(reg)); // null
      // let str3 = '123abc';
      // console.log(str3.match(reg)); // ['abc']
      // let str4 = '456abc';
      // console.log(str4.match(reg)); // null
      // 四、负后顾
      // 读作有匹配abc,且匹配的是abc后面不是123的那些abc
      let reg = /(?<!123)abc/g;
      let str1 = 'abc123';
      console.log(str1.match(reg)); // ['abc']
      let str2 = 'abc456';
      console.log(str2.match(reg)); // ['abc']
      let str3 = '123abc';
      console.log(str3.match(reg)); // null
      let str4 = '456abc';
      console.log(str4.match(reg)); // ['abc']
    },
  },
};
</script>
<style lang="less" scoped>
.reg_container {
  button {
    margin-right: 50px;
  }
}
</style>
