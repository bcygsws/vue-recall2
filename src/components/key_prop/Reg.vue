<template>
  <div class="reg_container">
    <h3>正则表达式演示组件</h3>
    <h5>一、正则表达式的前瞻和后顾</h5>
    <div class="ahead">
      <button @click="startMatching">开始匹配前瞻或负前瞻</button>
      <button @click="startBehind">开始匹配后顾或者负后顾</button>
    </div>
    <h5>二、正则表达式的exec和match的区别与联系</h5>
    <div class="exec">
      <button @click="matchHandle">match方法</button>
      <button @click="execHandle">exec方法</button>
    </div>
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
    matchHandle() {},
    execHandle() {
      // 说到底，非捕获分组功能和()一样的，不同的是，(?: )匹配的子配项不会返回在数组中了
      // 参考链接：https://lihefei.blog.csdn.net/article/details/53022253?spm=1001.2101.3001.6661.1&utm_medium=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1.pc_relevant_default&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1.pc_relevant_default&utm_relevant_index=1
      // 多了个(?:) 剔除了.41646ass.sss'
      // let a = /^([^.]*)(?:\.(.+))$/;
      // 第一个分组中捕获到'click'，第二个分组中捕获到41646ass.sss（?: 的限制，.41646ass.sss不会显示
      let a = /^([^.]*)(\.(.+))$/; // // ['click.41646ass.sss', 'click', '.41646ass.sss', '41646ass.sss', index: 0, input: 'click.41646ass.sss', groups: undefined]
      let str = 'click.41646ass.sss';
      let b = a.exec(str);
      console.log(b);
      // (3) ['click.41646ass.sss', 'click', '41646ass.sss', index: 0, input: 'click.41646ass.sss', groups: undefined]
    },
  },
};
</script>
<style lang="less" scoped>
.reg_container {
  .ahead {
    background-color: orange;
    button {
      margin-right: 50px;
    }
  }
  .exec {
    background-color: greenyellow;
    button {
      margin-right: 50px;
    }
  }
}
</style>
