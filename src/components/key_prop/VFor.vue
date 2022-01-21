<template>
  <div class="key_container">
    <h3>这是v-for渲染列表组件</h3>
    <p>添加数据区域</p>
    id:<input type="text" name="id" id="id" v-model="id" /> 名称：<input
      type="text"
      name="fru"
      id="fru"
      v-model="fru"
    />
    <input type="button" value="添加一条数据" @click="addItem" />
    <ul ref="ul" @click="showId">
      <li
        v-for="item in list"
        :key="item.id"
        :ref="'myRef' + item.id"
        :data-index="item.id"
      >
        <input type="checkbox" name="box" id="" @click="selected(item.id)" />
        {{ item.id }}---{{ item.name }}
        <a href="javascript:;" @click="delItem(item.id)">删除</a>
      </li>
    </ul>
    <!-- 正则表达式案例 -->
    <p class="reg" ref="t1">str245</p>
    <!-- 点击按钮得到数字 -->
    <button @click="toggle1">点击按钮，正则表达式作用后的</button>
    <p class="reg">{{ num1 }}</p>
    <p class="reg" ref="t2">245str</p>
    <!-- 点击按钮得到数字 -->
    <button @click="toggle2">点击按钮，正则表达式作用后的</button>
    <p class="reg">{{ num2 }}</p>
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
 *
 *
 */
export default {
  name: 'VFor',
  data() {
    return {
      // 添加的id
      id: '',
      // 添加的水果名称
      fru: '',
      // 定义一个包含键name和id的对象数组
      list: [
        { name: '苹果', id: 1 },
        { name: '香蕉', id: 2 },
        { name: '菠萝', id: 3 },
        { name: '桃子', id: 4 },
        { name: '西瓜', id: 5 },
      ],
      // 正则表达式转换后的num
      num1: '',
      // 正则表达式转换后的num1
      num2: '',
    };
  },
  methods: {
    // 添加一条数据
    addItem() {
      /**
       *
       * some方法是至少一个通过测试，并不遍历所有元素。返回值：true ，没有则返回false
       * every 方法测试一个数组内的所有元素是否都能通过某个指定函数的测试。它返回一个布尔值,true或者false
       * map 每个元素调用一次测试函数，返回一个新数组。和every的区别在于map callback函数体是一个操作语句(x=>x*2)，而非布尔值
       * filter,数组的过滤器函数，遍历所有元素。返回值：满足条件的，返回满足条件组成的新数组。没有任何一个满足条件，返回空数组
       * find,不会遍历所有元素，返回满足条件的第一个元素。所有都不满足，返回undefined
       * includes 某数组是否包含某个值，会对数组中所有元素进行遍历，有，返回true。没有返回false
       *
       */
      // 检查一下新添加的id是否在list对象数据中已经声明过
      // 至少有一个通过了提供的函数测试，则返回true;否则返回false
      console.log(typeof this.id); // string
      let flag = this.list.some((item) => {
        if (item.id === parseInt(this.id)) {
          // 你添加的数据id已经存在，请重新输入id数值
          this.$message({
            type: 'warn',
            message: '你添加的id已经存在，请重新输入id值',
          });
          return true;
        }
      });
      // id值为重复，往list数组的末尾追加一条数据
      // flag为true, 表示输入的id有和数组list中某个元素的id重复;期望：不重复，没有任何一个元素通过测试；flag=false
      if (!flag) {
        this.list.push({ id: parseInt(this.id), name: this.fru });
      }
    },
    // 删除一条数据
    delItem(val) {
      console.log(typeof val);
      // 拼接好删除li的ref名称
      let rf = 'myRef' + val;
      console.log(rf);
      console.log(this.$refs[rf][0]);
      // this.$refs[ref]，其中ref为变量。取回的结果是数组；
      // 结果是一个数组,取索引[0]，才是一个对象，才能成为节点
      console.log(this.$refs['ul']);
      this.$refs['ul'].removeChild(this.$refs[rf][0]);
      // 同时该id的元素，也应该从list数组汇中删除。遍历获取等于val的item的索引值，从数组中删除元素splice方法
      this.list.forEach((item, index) => {
        if (val === item.id) {
          this.list.splice(index, 1);
        }
      });
    },
    // checkbox选中，可以看着是一次点击事件
    /**
     *
     * checkbox被选中与否的判断,3种方法:
     * 原生
     * a. obj.checked  布尔值
     * jQuery
     * a. $('li:first').prop('checked', true)
     * b. $('li:first').is(':checked')
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
       * @ substring(startIndex[,endIndex])
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
       *
       */
      // 报错：Error in v-on handler: "TypeError: li.some is not a function"
      // 解决方案：使用Array的from方法，将HTML Collection转换成正常的数组
      Array.from(li).some((item, index) => {
        console.log(item);
        // data- 系列自定义属性值，可以使用obj.dataset.名称获取，也可以通过通用方式getAttribute('属性名')来获取
        console.log(item.getAttribute('data-index'));
        // console.log(item.dataset.index);
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
    showId(event) {
      // event.target引起触发事件的那个对象
      // event.currentTarget 当事件执行时，停留的那个对象；当前对象，ul（li委托事件给他）
      console.log(event);
      console.log(event.target); // li
      console.log(event.currentTarget); // ul
      console.log(event.target.dataset.index);
      // 使用nodeName区分掉委托的元素ul,和li
      if (event.target.nodeName.toLowerCase() === 'li') {
        this.doSomething(event.target.dataset.index);
      }
    },
    // doSomething函数，点击某个li显示当前li的key值（item.id值）
    doSomething(index) {
      this.$message({
        type: 'success',
        message: '当前li由id=' + index + '那条数据渲染得到',
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
      // 若要查找不在列表或范围内的所有字符，请将插入符号 (^)
      //  放在列表的开头,非0到9的数字构成的字符，替换成空字符，就只剩下数字了
      let numx = str1.replace(/[^0-9]/gi, '');
      console.log(numx);
      this.num1 = numx;
      console.log(this.num1);
    },
    toggle2() {
      let str2 = this.$refs.t2.innerText;
      // 数字全部在字符前，可以直接 使用parseInt
      // this.num2 = parseInt(str2);
      // 当然使用正则表达式，[^0-9]以数字之外的字符开头的，
      // 替换成空字符。非数字字符就没有了
      this.num2 = parseInt(str2.replace(/[^0-9]/gi), '');
      console.log(this.num2);
      // 参考链接：https://www.cnblogs.com/xiaochongchong/p/5304909.html
      // 正则的前瞻后顾https://www.jianshu.com/p/bf1fe73beed2
      // https://blog.csdn.net/fuhanghang/article/details/96480351
    },
  },
};
</script>
<style lang="less" scoped>
.key_container {
  ul {
    li {
      list-style-type: none;
      background-color: hotpink;
      margin-bottom: 20px;
      a {
        margin-left: 30px;
      }
    }
  }
}
</style>
