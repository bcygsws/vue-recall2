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
    <h5>三、正则表达式综合案例</h5>
    <div class="total">
      <button @click="total">正则表达式综合案例</button>
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
      let reg = /abc(?=123)/g;
      let str1 = 'abc123';
      console.log(str1.match(reg)); // ['abc']
      let str2 = 'abc456';
      console.log(str2.match(reg)); // null
      let str3 = '123abc';
      console.log(str3.match(reg)); // null
      let str4 = '456abc';
      console.log(str4.match(reg)); // null
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
    //   let reg = /(?<!123)abc/g;
    //   let str1 = 'abc123';
    //   console.log(str1.match(reg)); // ['abc']
    //   let str2 = 'abc456';
    //   console.log(str2.match(reg)); // ['abc']
    //   let str3 = '123abc';
    //   console.log(str3.match(reg)); // null
    //   let str4 = '456abc';
    //   console.log(str4.match(reg)); // ['abc']
    },
    matchHandle() {},
    execHandle() {
      // 说到底，非捕获分组功能和()一样的，看匹配结果时，不同点在于，(?: )匹配的子配项不会返回在数组中了
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
    // 正则表达式综合
    // 参考文档：https://www.cnblogs.com/libin-1/p/7004546.html
    total() {
      // 一、正则表达式声明的两种方式
      // a.字面量方式，推荐
      // b.实例化RegExp对象
      // RegExp(arg1,arg2)
      // arg1:匹配的字符串，需要用到转义符号 "\\d{2,3}" 匹配一个长度为2到3位的数字
      // arg2："gim" g全局匹配，i忽略大小写，m多行匹配
      let reg = new RegExp('\\d+$', 'g');
      console.log(reg.exec('a456')); // ['456',]
      // 如果前面加一个 ^，则表示要以数字开始，数字结束
      // let reg = new RegExp('^\\d+$', 'g');
      // console.log(reg.exec('34abc56')); // null

      // 类比：str.indexOf(指定值) 返回指定值在字符串中第一次出现的索引
      // 二、search方法用于检索字符串中指定字符串的第一个索引位置，或检索与正则表达式匹配的字符串
      // 语法：str.search(regExp) 对全局g不起作用，但是对i其作用，忽略大小写
      // 返回值是：子串在字符串中的首个出现位置的索引，找不到或匹配不到，返回-1
      let str = 'hello world abdhello world';
      console.log(str.search(/hello/)); // 0
      console.log(str.search(/hello/g)); // 0
      console.log(str.search(/Hello/)); // -1
      //  对i起作用，忽略大小写来匹配
      console.log(str.search(/HELLO/i)); // 0
      // 三、match用于检索字符串中指定的值，匹配到一个或者多个。类似indexOf()或者lastIndexOf()
      // 语法：str.match(reg)或者str.match(子串str1)
      let str1 = 'abchello';
      console.log(str1.match('hel')); // ['hel', index: 3, input: 'abchello', groups: undefined]
      console.log(str1.match(/hel/)); // ['hel', index: 3, input: 'abchello', groups: undefined]
      let str2 = '2st4trert6';
      console.log(str2.match(/\d+/g)); // ['2', '4', '6']
      // 四、replace方法 用后面的字符替换前面的字符（或者正则表达式匹配的字符）
      let name1 = 'longen , yunyi';
      let res = name1.replace(/(\w+)\s*,\s*(\w+)/, '$2 $1');
      console.log(res); //  yunyi longen
      // var name = 'longen,yunxi';
      //  /(\w+)\s*,\s*(\w+)/能匹配到整个字符串，所以replace方法作用后，整个字符串变成了$2 $1的形式，原来字符中的逗号，就不见了
      // var s4 = name.replace(/(\w+)\s*,\s*(\w+)/, '$2 $1');
      // console.log(s4); // "yunxi longen"
      let str$ = 'hello,I am a Chinese people';
      let reg1 = /am/g;
      if (reg1.test(str$)) {
        // 只做了解，RegExp的这些属性都已经弃用了
        // 1. (RegExp['$&']返回正则表达式已经匹配的字符，已经弃用了
        // console.log(RegExp['$&']);// am
        // 2. RegExp["$'"]返回被搜索的字符串从最后一个匹配位置到字符串结束的字符串
        // console.log(RegExp["$'"]);// a chinese people
        // 3. RegExp["$`"] 返回的是从字符串开始，到最后匹配位置之前的字符
        // console.log(RegExp['$`']);
        // 4. RegExp["$+"]返回任何字符串搜索过程中，最后括号的子匹配
        // console.log(RegExp['$+']);
        //返回任何正则表达式搜索过程中的最后匹配的字符。
        // console.log(RegExp['$_']); // hello I am a chinese people
        console.log(reg1.exec(str$));
      }
      // 五、  . 可以匹配任意的单个字符，换行符除外
      // 注意要输出的.,一定要做 \. 。没有转义符\的.才是单个字符通配符
      let namex = 'adsffgawf23434';
      let Reg = /.+/;
      console.log(Reg.exec(namex)); // ['adsffgawf23434', index: 0, input: 'adsffgawf23434', groups: undefined]
      // 六、贪婪模式和非贪婪模式
      // a.贪婪模式是尽可能多的匹配,贪婪模式的量词：都是常规的? + * {m,n} {m,}
      // b.非贪婪模式是尽可能少的匹配，在量词后面加?,就是非贪婪模式
      // 非贪婪模式的量词：都是常规的? + * {m,n} {m,}后面再加一个?
      // 注意点：单个?表示{0,1}，量词后面+?(本身也是一个量词)才是非贪婪模式
      let html =
        '<p>这是一点文本</p>text2<p>text2ing</p>text2ing<p>一身转战三千里，一剑曾当百万师</p>';
      // 贪婪模式正则，常规情况下，表达式就是这么写的，单字符通配符（换行符除外），量词是*
      let _reg = /<p>.*<\/p>text2/;
      // 非贪婪模式正则
      // let _reg = /<p>.*?<\/p>text2/;
      console.log(html.match(_reg));
      // 贪婪模式打印：['<p>这是一点文本</p>text2<p>text2ing</p>text2', index: 0, input: '<p>这是一点文本</p>text2<p>text2ing</p>text2ing<p>一身转战三千里，一剑曾当百万师</p>', groups: undefined]
      // 非贪婪模式打印：['<p>这是一点文本</p>text2', index: 0, input: '<p>这是一点文本</p>text2<p>text2ing</p>text2ing<p>一身转战三千里，一剑曾当百万师</p>', groups: undefined]
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
  .total {
    background-color: hotpink;
  }
}
</style>
