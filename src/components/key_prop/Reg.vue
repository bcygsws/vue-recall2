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
      let reg = /abc(?!123)/g;
      let str1 = 'abc123';
      console.log(str1.match(reg)); // null
      let str2 = 'abc456';
      console.log(str2.match(reg)); // ['abc']
      let str3 = '123abc';
      console.log(str3.match(reg)); // ['abc']
      let str4 = '456abc';
      console.log(str4.match(reg)); // ['abc']
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
    matchHandle() {
      /**
       *
       * @二、match和exec的区别和联系
       * 参考文档；https://blog.csdn.net/yan_yuanfeng/article/details/100549408
       *
       * 区别：
       * 1.match是string字符串的api；exec是ExpReg对象的方法
       * 2.全局状态下，match能够一次匹配所有的子项，以数组的形式输出，并且忽略所有子项的捕获项；但注意，非全局时，还是会打印出所有子项的
       * 捕获项的
       * 然后，exec的匹配是分步进行的，直至reg.exec(str)的结果为null
       *
       *
       * 联系：
       * 非全局转态下，match和exec得到的结果是一致的
       *
       * 使用场景：
       * 1.exec的全局匹配和非全局匹配结果是一样的，但是当使用循环匹配时，reg的正则表达式中必须带上g
       * 2.match则用于一次性得到所有子项，并以数组的形式呈现
       *
       */
      const str = 'shanghai nihao shanghainihao';
      //  2.1 非全局下，和exec一样；打印第一个子项，子项中包含其匹配项的信息，打印结果是；['nihao', index: 9, input: 'shanghai nihao shanghainihao', groups: undefined]
      // const reg = /nihao/;
      // 2.2 全局状态下，match打印出所有子项，但不包括子项的捕获项;打印结果：['nihao', 'nihao']
      const reg = /nihao/g;
      console.log(str.match(reg)); // ['nihao', 'nihao']
    },
    execHandle() {
      // 3.作为与match方法的对照
      const _str = 'shanghai nihao shanghainihao';
      // 3.1 非全局下的exec方法；打印结果是：非全局下，和exec一样；打印第一个子项，子项中包含其匹配项的信息，打印结果是；['nihao', index: 9, input: 'shanghai nihao shanghainihao', groups: undefined]
      // 这也印证了非全局情况下match和exec方法处理的结果是一样的
      // const _reg=/nihao/;
      // 3.2 全局状态下的exec方法，打印结果是：非全局下，和exec一样；打印第一个子项，子项中包含其匹配项的信息，打印结果是；['nihao', index: 9, input: 'shanghai nihao shanghainihao', groups: undefined]
      // 【需要利用循环】才能拿到所有的匹配子项
      const _reg = /nihao/g;
      // // exec执行第一次
      // console.log(_reg.exec(_str));// 打印结果是：['nihao', index: 9, input: 'shanghai nihao shanghainihao', groups: undefined]
      // // exec执行第二次，才拿到另外一个index为23的"nihao"这个子字符串
      // console.log(_reg.exec(_str));// 打印结果是：['nihao', index: 23, input: 'shanghai nihao shanghainihao', groups: undefined]
      for (let i = 0; i < _str.match(_reg).length; i++) {
        console.log('第' + i + '次：' + _reg.exec(_str));
      }
      // 3.3分步写过于繁琐，寻求用while循环来简化写法-先注释掉上面exec的两次执行
      // do while语句只会拿到第一次匹配和null这俩打印值；原因简单分析可知；改用for循环
      // do {
      //   console.log(_reg.exec(_str));
      // } while (_reg.exec(_str));

      // 参考链接：https://lihefei.blog.csdn.net/article/details/53022253?spm=1001.2101.3001.6661.1&utm_medium=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1.pc_relevant_default&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1.pc_relevant_default&utm_relevant_index=1
      // 上述文档中，区分捕获分组或非捕获分组；
      // 1.说到底，非捕获分组功能和()一样的，看匹配结果时，不同点在于，非捕获分组(?: )匹配的子配项不会返回在数组中了。
      // 2. (?:\.(.+))表达式中，多了个(?:)，出现了非捕获分组；剔除了.41646ass.sss'，但是内层括号(.+)没有非捕获符号，这个内层括号匹配到的
      // 41646ass.sss仍然会以子项的方式出现在数组中
      // 3.一般有几个括号，就有几个子配项；?:的使用就可以剔除该非捕获分组的子配项
      // 3.1 非捕获分组：
      //  \. 匹配到. [^. ]表示 非.  .+ 表示至少一个字符，加号前的.是通配字符
      let a = /^([^.]*)(?:\.(.+))$/g;
      let str = 'click.41646ass.sss';
      let b = a.exec(str);
      console.log(b);
      // 特别注意：.有两重含义，一个是符号上的. 使用时需要加反斜杠，语法：\. ；第二重含义是，.可以匹配任意单个字符，换行符除外
      // 第一个分组中捕获到'click'，第二个分组中捕获到41646ass.sss（?: 的限制，.41646ass.sss不会显示
      // 3.2 捕获分组；"问嘉兴" ？0或1次，+号表示大于等于1次；*号表示大于等于0次，*范围最广
      let a1 = /^([^.]*)(\.(.+))$/; // ['click.41646ass.sss', 'click', '.41646ass.sss', '41646ass.sss', index: 0, input: 'click.41646ass.sss', groups: undefined]
      let str1 = 'click.41646ass.sss';
      let str2 = 'click.41646asssss'; // 测试 .+ 中的.表示通配字符
      let str3 = '.41646asssss'; // 测试 .+ 中的.表示通配字符
      let b1 = a1.exec(str1);
      console.log(b1);
      console.log(a1.exec(str2));
      console.log(a1.exec(str3));
      // let b;
      // while ((b = a.exec(str)) != null) {
      //   console.log(b[0]);
      // }
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
      // let reg = new RegExp('\\d+$', 'g');
      // console.log(reg.exec('a456')); // ['456',]
      // 如果前面加一个 ^，则表示要以数字开始，数字结束
      // new RegExp非全局匹配时，括号里第二个参数可以省略了
      let reg = new RegExp('^\\d+$');
      // reg.exec的结果是null的原因是：正则是由纯数字组成；默认是贪婪模式，要进可能多的匹配；下面将讲述非贪婪模式的办法
      console.log(reg.exec('34abc56')); // null
      /**
       *
       * @ str.indexOf(字符串)
       * 参考MDN文档：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf
       * 语法；str.indexOf(searchStr[,position])
       *
       * 特别注意：如果搜索 空字符串，会得到另外的结果；参考上面MDN文档
       * 类比：str.indexOf(指定值) 返回指定值在字符串中第一次出现的索引；只不过str.search(正则表达式);如果没有找到则返回-1
       *
       * position缺省状态下默认为0；表示开始筛选的位置；是可选参数；
       * a.如果position大于字符串的长度，则在str中根本搜索不到子串searchStr
       * b.如果position小于0，则跟默认的position等于0一样
       * c.该方法返回指定字符串searchStr在大于或等于position值时第一次出现的位置的索引值
       * 执行的是正则表达式和被搜索的string对象之间的一个匹配
       * str.search(正则)
       *
       * 返回值：
       * 都是返回括号内传入的子串或括号内正则匹配的字符串在str中第一次出现时的索引
       * 如果找不到都返回-1
       *
       */
      // 二、search方法用于检索字符串中指定字符串的第一个索引位置，或检索与正则表达式匹配的字符串
      // 语法：str.search(regExp) 对全局g不起作用，但是对i其作用，忽略大小写
      // 返回值是：子串在字符串中的首个出现位置的索引，找不到或匹配不到，返回-1
      let str = 'hello world abdhello world';
      console.log(str.indexOf('world')); // 6
      console.log(str.search(/world/)); // 6
      console.log(str.search(/world/g)); // 6
      console.log(str.search(/World/)); // -1
      //  对i起作用，忽略大小写来匹配
      console.log(str.search(/WORLD/i)); // 6
      // 三、match用于检索字符串中指定的值，匹配到一个或者多个；非全局的时候和reg.exec方法的结果完全一致；全局的时候，略有不同
      // match方法可以一次性返回所有的子项，并且不包括各子项的匹配项
      // 语法：str.match(reg)或者str.match(子串str1)
      let str1 = 'abchello';
      console.log(str1.match('hel')); // ['hel', index: 3, input: 'abchello', groups: undefined]
      // 全局时，match中是不包含各子项的捕获项的
      console.log(str1.match(/hel/g)); // ['hel']
      let str2 = '2st4trert6';
      console.log(str2.match(/\d+/g)); // ['2', '4', '6']
      // 四、replace方法 用后面的字符替换前面的字符（或者正则表达式匹配的字符）
      // $1 $2 分别表示获取第一个和第二个捕获项（注：以括号为边界，很容易识别）
      let name1 = 'longen , yunyi';
      let res = name1.replace(/(\w+)\s*,\s*(\w+)/, '$2 $1');
      console.log(res); //  yunyi longen
      // var name = 'longen,yunxi';
      //  /(\w+)\s*,\s*(\w+)/能匹配到整个字符串，所以replace方法作用后，
      // 正则中出现普通括号，有捕获分组，$1、$2分别是捕获的结果；整个字符串变成了$2 $1的形式，原来字符中的逗号，就不见了
      // var s4 = name.replace(/(\w+)\s*,\s*(\w+)/, '$2 $1');
      // console.log(s4); // "yunxi longen"
      let str$ = 'hello,I am a Chinese people';
      let reg1 = /am/g;
      // if (reg1.test(str$)) {
      // "no-constant-condition": 2,//禁止在条件中使用常量表达式 if(true) if(1)
      // 在.eslintrc.js文件中关闭该规则验证,设置其值为0或'off'
      if (true) {
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
        console.log(reg1.exec(str$)); // ['am', index: 8, input: 'hello,I am a Chinese people', groups: undefined]
      }
      // 案例：千分位分隔数字（或含数字的字符）
      /**
       *
       * @正则表达式中两类匹配
       * 匹配字符+匹配位置
       *
       * 匹配字符当然很常见了
       * 如 \w ===[a-zA-Z0-9_] 表示匹配下划线在内的任何字符
       *
       * \b和\B是边界匹配
       * \b是匹配到单词的边界，就是首尾的位置
       * \B匹配的是非首尾的位置
       * \s 表示不可见的字符，如空格符 制表位 分页符[\r\n\t\v\f]
       * \S 表示[^\r\n\t\v\f]，这些不可见的字符之外的字符
       * \d 数字
       * \D 非数字 [^0-9]
       *
       * 千分位分隔符正则书写思路
       * 逆序环视是一样的
       * (?=(?:\d{3})+$)
       * 或者不写分捕获分组，直接用默认的捕获分组
       * (?=(\d{3})+$)
       * 或者为了匹配数字后面跟随有其他字符的比如：'1234567890hjk'
       * 可以写作(?=(?:\d{3})+(?!\d))
       * 匹配位置+逆序环视 /\B(?=(?:\d{3})+(?!\d))/g
       * 匹配数字+逆序环视
       *
       */
      // \b在前表示的是ver就是单词的左边界，averc ver的左边界是a，因此输出null
      console.log('averc'.match(/\bver/)); // null
      console.log('never'.match(/ver\b/)); // ['ver', index: 2, input: 'never', groups: undefined]
      console.log('never'.match(/\bver/));
      // const thousand_str = '1234567890';
      const thousand_str = '1234567890hjk';
      // 只给数字部分，按照千分位分隔，字母不做处理
      // let thousand_reg = /\B(?=((?:\d{3})+(?!\d)))/g; // 1,234,567,890hjk
      let thousand_reg = /\B(?=(?:\d{3})+(?!\d))/g; // 1,234,567,890hjk
      // let thousand_reg = /\B(?=((?:\d{3})+$))/g; // 纯数字字符串，上一行正则可以简写成此表达式
      console.log(thousand_str.replace(thousand_reg, ','));
      const thousand_str1 = '1234567890';
      // let thousand_reg1 = /(\d)(?=(\d{3})+$)/g;
      let thousand_reg1 = /(\d)(?=(?:\d{3})+$)/g;
      // 测试：将thousand_reg1中的全局g去掉，会发现，结果是第一次匹配的1,234567890
      // thousand_reg1第一次匹配到的是1 234567890，往中间加<成为1,234567890
      // thousand_reg1第二次匹配到的是4 567890，往中间加<成为1,234,567890
      // thousand_reg1第三次匹配到的是7 890，往中间加<成为1,234,567,890
      // let thousand_reg1 = /(\d)(?=(?:\d{3})+$)/g;// (?:\d{3})可以写成非捕获形式，也可以写成默认的捕获形式
      // 原理:(?=(\d{3})+$)这个括号内包括一个前瞻表达式，用于逆序定位的，还附加$；$必须带上；否则定位的索引从右向左分别为3,4,5,6,7,8,9
      // 此时打印的结果将是1,2,3,4,5,6,7,890
      console.log(thousand_str1.replace(thousand_reg1, '$1,')); // 1,234,567,890

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

      // 贪婪模式正则，常规情况下，表达式就是这么写的，单字符通配符（换行符除外），量词是*
      let html =
        '<p>这是一点文本</p>text2<p>text2ing</p>text2ing<p>一身转战三千里，一剑曾当百万师</p>';
      let _reg = /<p>.*<\/p>text2/;
      console.log(html.match(_reg));
      // 贪婪模式打印：['<p>这是一点文本</p>text2<p>text2ing</p>text2', index: 0, input: '<p>这是一点文本</p>text2<p>text2ing</p>text2ing<p>一身转战三千里，一剑曾当百万师</p>', groups: undefined]

      // 非贪婪模式正则
      let _reg2 = /<p>.*?<\/p>text2/;
      let html2 =
        '<p>这是一点文本</p>text2<p>text2ing</p>text2ing<p>一身转战三千里，一剑曾当百万师</p>';
      console.log(html2.match(_reg2));
      // 非贪婪模式打印：['<p>这是一点文本</p>text2', index: 0, input: '<p>这是一点文本</p>text2<p>text2ing</p>text2ing<p>一身转战三千里，一剑曾当百万师</p>', groups: undefined]
      // 七、回车符\r和换行符的区别\n
      // 参考文档：https://blog.csdn.net/amqvje/article/details/38370681?spm=1001.2101.3001.6650.1&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1-38370681-blog-105767157.pc_relevant_recovery_v2&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1-38370681-blog-105767157.pc_relevant_recovery_v2&utm_relevant_index=1
      // \r 表示return，回车符，由其他位置返回当前所在行 行首
      // \n 表示new line，换行符，换到新行(和原字符横坐标相同)
      // Enter相当于\r\n,ENTER=\r\n，顺序不能颠倒
    }
  }
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
