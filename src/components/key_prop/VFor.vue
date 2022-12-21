<template>
  <div class="key_container">
    <h3>这是v-for渲染列表组件</h3>
    <p>添加数据区域</p>
    id:<input type="text" name="id" id="id" value="" ref="idRef" />
    <br />
    content：<input type="text" name="fru" id="fru" value="" ref="ctRef" />
    <br />
    <input type="button" value="添加一条数据" @click="addItem" />
    <ul ref="ul" @mouseover="showId" @mouseout="showId">
      <li
        v-for="item in list"
        :key="item.id"
        :ref="'myRef' + item.id"
        :data-index="item.id"
      >
        <input type="checkbox" name="box" @click="selected(item.id)" />
        {{ item.id }}---{{ item.name }}
        <a href="javascript:;" @click="delItem(item.id)">删除</a>
      </li>
    </ul>
    <!-- 正则表达式案例 -->
    <p class="reg" ref="t1">str245</p>
    <!-- 点击按钮得到数字 -->
    <button @click="toggle1">点击按钮，正则表达式作用后的</button>
    <p class="reg">{{ num1 }}</p>
    <p class="reg" ref="t2">a4f5b7</p>
    <!-- 点击按钮得到数字 -->
    <button @click="toggle2">点击按钮，正则表达式作用后的</button>
    <p class="reg">{{ num2 }}</p>
    <!-- 进入正则表达式演示组件 -->
    <router-link to="/home/key_prop/reg">正则表达式演示案例</router-link>
    <router-view></router-view>
  </div>
</template>
<script>
/**
 *
 * 案例功能：模拟每个li的点击事件的事件委托，点击每个li，显示对应的id值
 * 如果为v-for循环中每个li都绑定一个事件，能实现功能。但是，当v-for渲染的列表长度极度长时，每个li都绑定事件
 *
 * 何不将事件都绑定到li的唯一父元素上，这就是事件委托
 * 事件委托
 * 1.将事件处理程序代理到父节点上，减少内存占有率
 * 2.当动态增加子节点时，子节点自动将事件绑定到父节点上
 * 注意：执行事件委托后，父节点绑定了事件，成为了event.currentTarget；而各子节点是event.target
 *
 * vue的就地复用策略：
 * v-for循环，循环标签需要声明key关键字，vue关键字有“就地复用”策略就地复用：
 * vue不会通过操作dom来匹配元素的顺序，而是简单的复用这个元素，并确保在特定的索引下显示已经被渲染的每个元素
 *
 * 参考本地项目：D:\Web-project\vue-primary\02-体会v-for循环中key的就地复用策略.html
 * 该项目代码第59行，勾选列表中一个选项，然后删除某一条数据，对比设置key和不设置key的异同
 *
 */
export default {
  name: 'VFor',
  data() {
    return {
      // 添加的id
      id: '',
      // 添加的水果名称
      // fru: '',
      // 定义一个包含键name和id的对象数组
      list: [
        { name: '苹果', id: 1 },
        { name: '香蕉', id: 2 },
        { name: '菠萝', id: 3 },
        { name: '桃子', id: 4 },
        { name: '西瓜', id: 5 }
      ],
      // 正则表达式转换后的num
      num1: '',
      // 正则表达式转换后的num1
      num2: '',
      // 添加信息时，输入的id是否和list中的id重复
      flag: true
    };
  },
  methods: {
    // 添加一条数据
    addItem() {
      /**
       *
       * some 方法是至少一个元素通过测试，并不遍历所有元素。返回值：至少有一个元素通过测试就返回true，所有元素都没通过则返回false
       * every 方法测试一个数组内的所有元素是否都能通过某个指定函数的测试。它返回一个布尔值；每一个元素都通过测试，则返回true；否则返回false
       * map 每个元素调用一次测试函数，返回一个新数组。和every的区别在于map callback函数体是一个操作语句(x=>x*2)，而非布尔值
       * filter,数组的过滤器函数，遍历所有元素。返回值：满足条件的，返回满足条件组成的新数组。没有任何一个满足条件，返回空数组
       * find,不会遍历所有元素，返回满足条件的第一个元素。所有都不满足，返回undefined
       * includes 某数组是否包含某个值，会对数组中所有元素进行遍历，有，返回true。没有返回false
       *
       * 
       * 自然数：日常生活中计数和确定次数的数，如：0,1,2,3……
       * 质数（素数）：自然数中除了能被1和其本身外，不能被其他自然数整除的数；1不是质数
       * 识别质数的条件书写；参考文档：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
       * function isPrime(num){
       * for(let i=2;num>i;i++){
       *  if(num%i==0){
       *  return false;
       *  }
       * }
       * return num>1;
       * }
       * arr.filter(isPrime)
       * 过滤器函数拿到质数
       *
       */
      // 检查一下新添加的id是否在list对象数据中已经声明过
      // 至少有一个通过了提供的函数测试，则返回true;否则返回false
      this.id = this.$refs.idRef.value;
      console.log(this.id);
      console.log(typeof this.id); // string
      // 注意：parseInt将字符串转化成了number类型，无论字符串中是什么？比如输入了'addfa',typeof检查其仍然为number类型
      console.log(typeof parseInt(this.id));
      let reg = /^\d+$/g;
      // console.log(reg.test(this.id));
      //  判断输入的是否为纯数字
      if (reg.test(this.id)) {
        // 检查新输入的id是否已存在的id重复
        this.flag = this.list.some((item) => {
          if (item.id === parseInt(this.id)) {
            // 你添加的数据id已经存在，请重新输入id数值
            /**
             *
             * $message 的type
             * success/error/warning/info,info是默认值
             *
             *
             */
            this.$message({
              type: 'warning',
              message: '你添加的id已经存在，请重新输入id值'
            });
            this.$refs.idRef.value = '';
            return true;
          }
        });
        // id值为重复，往list数组的末尾追加一条数据
        // flag为true, 表示输入的id有和数组list中某个元素的id重复;期望：不重复，没有任何一个元素通过测试；flag=false
        if (!this.flag) {
          // vue双向绑定的好处，模板中list数据变化，会直接触发视图更新；不需要像React中，手动setState()
          this.list.push({
            id: parseInt(this.id),
            name: this.$refs.ctRef.value
          });
          console.log(this.$refs['ul']);
        }
      } else {
        // 没有输入id或输入的id不是数字
        // 你输入的id非数字提醒
        this.$message({
          type: 'error',
          message: '您没有输入id或者您添加的id不是数字，请输入合理的id',
          showClose: true // 可选属性，意为：是否显示关闭按钮
        });
        this.$refs.idRef.value = '';
      }
    },
    // 删除一条数据
    delItem(val) {
      console.log(typeof val);
      // 拼接好删除li的ref名称
      // let rf = 'myRef' + val;
      // console.log(rf);
      // console.log(this.$refs[rf][0]);
      // // this.$refs[ref]，其中ref为变量。取回的结果是数组；
      // // 结果是一个数组,取索引[0]，才是一个对象，才能成为节点
      // console.log(this.$refs['ul']);
      // // vue不提倡操作DOM,操作DOM需要很高的性能消耗，这里只是举例
      // this.$refs['ul'].removeChild(this.$refs[rf][0]);

      // 同时该id的元素，也应该从list数组汇中删除。遍历获取等于val的item的索引值，从数组中删除元素splice方法
      // this.list.forEach((item, index) => {
      //   if (val === item.id) {
      //     this.list.splice(index, 1);
      //   }
      // });
      /**
       * JavaScript操作DOM详解见文档：https://www.cnblogs.com/dalaoban/p/9498218.html
       * 重磅总结-插入子节点的方法
       * a.父节点.appendChild(新创建的子节点)
       * b.父节点.insertBefore(新创建的子节点，参考节点)，注意：如果参考节点为null.
       * 那么将在父节点的最后插入一个子节点
       *
       */
      // find方法用于找到数组中第一个满足条件的元素，找到返回那个元素，找不到返回undefined
      this.list.find((item, index) => {
        // 保证dom挂载到页面完成后(即mounted阶段)，再获取item.id;避免报错：undefined的id属性
        this.$nextTick(() => {
          if (val === item['id']) {
            this.list.splice(index, 1);
          }
        });
      });
      // console.log(res);
    },
    // checkbox选中，可以看着是一次点击事件
    /**
     *
     * checkbox被选中与否的判断,3种方法:
     * 原生
     * a. obj.checked  布尔值
     * jQuery
     * a. $('li:first').prop('checked', true)
     * b.3003 $('li:first').is(':checked')
     * $().is()方法用于查看，某个元素是否匹配另外一个选择器
     *
     */
    selected(id) {
      console.log(typeof id);
      let li = this.$refs['ul'].children;
      console.log(li); // 数据集合，打印结果显示，其原型不是Array，而是[object HTMLCollection]
      // Array.from(li)将其转化成正常数组
      console.log(Array.from(li));
      // 根据id值，算出这个li在数组中的索引位置，找到即可结束，使用some测试方法
      /**
       * @ String的方法 substring(startIndex[,endIndex])
       * 返回值：返回一个从start到end的子集
       * 语法：substring(startIndex[,endIndex])
       * 说明：
       * 返回一个从start到end的子字符串，区间前闭后开[start,end)
       * end不声明，则表示截取到末尾，start和end其中有一个为负数或者NaN,则都将其视为0
       * start和end顺序可以自己解析，substring（3,1）会解析成substring（1,3）
       *
       * 从myRef3中获取数组3
       * 方法：
       * 1.parseInt(item.getAttribute("ref").substring(5))
       * parseInt 只能从形如：4str提取到数字4。如果字符串是str4,使用parseInt是没有作用的
       *
       * 2.正则表达式匹配
       *
       */
      // 报错：Error in v-on handler: "TypeError: li.some is not a function"
      // 解决方案：使用Array的from方法，将HTML Collection转换成正常的数组
      Array.from(li).some((item, index) => {
        console.log(item); // <li data-v-43d0aa7f data-index="1">…</li>
        // data- 系列自定义属性值，可以使用obj.dataset.名称获取，也可以通过通用方式getAttribute('属性名')来获取
        console.log(item.getAttribute('data-index'));
        // console.log(item.dataset.index);
        // 找出当前那个li的索引值（index值）
        if (id === parseInt(item.dataset.index)) {
          li[index].checked = !li[index].checked;
          if (li[index].checked) {
            alert('选中了li' + index);
          } else {
            alert('取消选中了' + index);
          }
        }
      });
    },
    /**
     *
     * @ 点击某一个列表展示id
     * 事件委托
     *
     */
    showId(event) {
      // event.target引起触发事件的那个对象
      // event.currentTarget 当事件执行时，停留的那个对象；当前对象，ul（li委托事件给他）
      console.log(event);
      console.log(event.target); // li
      console.log(event.currentTarget); // ul
      console.log(event.target.dataset.index);
      // 拿到当前li中的data-index值,定义变量为renderId
      // const renderId = event.target.dataset.index;
      // 使用nodeName过滤掉委托的父元素ul,以及其子元素li
      // 只为ul绑定了点击事件，event.currentTarget是ul；而event.target是当前的li

      // 注意：nodeName的值就是tagName值的大写 LI
      if (event.target.nodeName.toLowerCase() === 'li') {
        // 鼠标移入li上方区域，显示为红色;并弹出提示框，展示当前li是由那个id渲染得到的（模板中:data-index="item.id"）
        if (event.type === 'mouseover') {
          this.showBgc(event.target, 'red');
          // this.doSomething(renderId);
          // 鼠标离开li区域，恢复显示为白色
        } else if (event.type === 'mouseout') {
          this.showBgc(event.target, '#fff');
        }
      }
    },
    // 显示颜色
    showBgc(obj, color) {
      obj.style.backgroundColor = color;
    },
    // doSomething函数，点击某个li显示当前li的key值（item.id值）
    doSomething(index) {
      this.$message({
        type: 'success',
        message: '当前li由id=' + index + '那条数据渲染得到'
      });
    },
    // 正则表达式转换后
    toggle1() {
      // str字母在数字前面，不能直接使用parseInt转换
      // 方法1：借助String的截取子串的方法subStr(start[,end])
      let str1 = this.$refs.t1.innerText;
      // this.num1 = parseInt(str1.substring(3));
      // console.log(this.num1);
      // 方法2：正则表达式，把非数字的使用空字符串代替
      // i忽略大小写，g全局匹配，匹配所有项
      // let numx = str1.replace(/[^0-9]/gi, '');
      // 若要查找不在列表或范围内的所有字符，请将插入符号 (^),[^....] 在中括号列表中，表示非列表中的字符
      //  放在列表的开头,非0到9的数字构成的字符，替换成空字符，就只剩下数字了
      let numx = str1.replace(/[^0-9]/gi, '');
      console.log(numx);
      this.num1 = numx;
      console.log(this.num1);
    },
    toggle2() {
      let str2 = this.$refs.t2.innerText; // a4f5b7
      // 数字全部在字符前，可以直接 使用parseInt
      // this.num2 = parseInt(str2);
      // 当然使用正则表达式，[^0-9]以数字之外的字符开头的，
      // 替换成空字符。非数字字符就没有了
      // 测试：正则表达式中/[^0-9]/gi匹配的结果
      let reg_test = /[^0-9]/gi;
      console.log(str2.match(reg_test)); // (3) ['a', 'f', 'b']
      // res存储替换后的结果
      const res = str2.replace(reg_test, '');
      console.log(res); // 457
      // trim()方法去掉字符串两侧的空字符（' 457 '），以使得字符串能够被parseInt方法得出结果
      this.num2 = parseInt(res.trim());
      console.log(this.num2);
      // 参考链接：https://www.cnblogs.com/xiaochongchong/p/5304909.html
      // 正则的前瞻后顾https://www.jianshu.com/p/bf1fe73beed2
      // https://blog.csdn.net/fuhanghang/article/details/96480351
      /**
       * @ js提取数字的方式：
       * 1.parseInt或parseFloat,有局限性，字符串必须以连续的数字开始
       * 2.普遍使用的方式，正则表达式：[^列表项1，列表项2] 表示不是列表中的任何一个
       * a. str.replace(/[^0-9]/gi,"")
       * b. reg=/\d+(.\d+)?/gi,str.match(reg)  案例如下：
       * c. reg.exec(str)方法和str.match(reg)方法的区别和联系：
       * 区别主要在于全局匹配时：
       * str.match全局匹配的结果，是一个数组，所有结果都是数组中
       * 的一个元素，而且一次性输出。
       * 然而，reg.exec(str)每次都只匹配一个结果，从前到后，直至所有结果都匹配完了，
       * 输出null
       *
       *
       * 参考链接：
       * 正则表达式中的exec和match方法的区别 https://www.cnblogs.com/heshan1992/p/6259171.html
       * 正则表达式精讲：https://www.cnblogs.com/libin-1/p/7004546.html
       *
       *
       */
      // let menu = '玉米3.65元/斤，白菜6.4元/斤，胡萝卜5元/斤';
      // let res = menu.match(/\d+(.\d+)?/g);
      // console.log(res); // (3) ['3.65', '6.4', '5']
      // let res1 = menu.match(/\d+(.\d+)?/);
      // console.log(res1); // 不带全局g，只会匹配第一个
      // // 打印结果：['3.65', '.65', index: 2, input: '玉米3.65元/斤，白菜6.4元/斤，胡萝卜5元/斤', groups: undefined]
      let menu1 = '玉米3.65元/斤，白菜6.4元/斤，胡萝卜5元/斤';
      const reg = /\d+(.\d+)?/gi; // ?表示0或者一次，0时匹配整数
      let res2 = reg.exec(menu1);
      console.log(res2); // exec方法全局，也只匹配到了第一个，类似match非全局的情况
      // 打印结果：(2) ['3.65', '.65', index: 2, input: '玉米3.65元/斤，白菜6.4元/斤，胡萝卜5元/斤', groups: undefined]
      console.log(reg.exec(menu1)); // (2) ['6.4', '.4', index: 12, input: '玉米3.65元/斤，白菜6.4元/斤，胡萝卜5元/斤', groups: undefined]
      console.log(reg.exec(menu1)); // ['5', undefined, index: 22, input: '玉米3.65元/斤，白菜6.4元/斤，胡萝卜5元/斤', groups: undefined]
      console.log(reg.exec(menu1)); // null
      const reg1 = /\d+(.\d+)?/;
      console.log(reg1.exec(menu1));
      console.log(reg1.exec(menu1));
      console.log(reg1.exec(menu1));
      console.log(reg1.exec(menu1));
    }
  }
};
</script>
<style lang="less" scoped>
.key_container {
  ul {
    li {
      list-style-type: none;
      margin-bottom: 20px;
      a {
        margin-left: 30px;
      }
    }
  }
}
</style>
