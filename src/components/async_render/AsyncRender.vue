<template>
  <div class="ar_container">
    <h3>Vue的异步渲染演示</h3>
    <ul>
      <li v-for="(item, index) in arr" :key="index">
        {{ index }}---{{ item }}
      </li>
    </ul>
    <div>数组的长度：{{ total }}</div>
    <span v-if="flag" ref="sp" class="sp">何事秋风悲画扇</span>
    <button @click="handleSwitch">点按钮，获取span标签的长度</button><br />
    <!-- keep-alive内置组件演示，三个生命周期钩子 -->
    <button @click="switchFn">点击按钮，切换要缓存的组件</button>
    <keep-alive>
      <!-- component内置组件，根据is的属性值来选择缓存的组件，注意：属性值要和组件名称一致 -->
      <component :is="num"></component>
    </keep-alive>
  </div>
</template>
<script>
import First from './First.vue';
import Second from './Second.vue';
import Third from './Third.vue';
/**
 * vue的异步渲染
 * 演示：在created和mounted阶段，改变数组，是否会触发beforeUpdate和updated钩子
 *
 * this.$nextTick(cb)
 * vue中DOM传的异步渲染
 * 参考文档：https://blog.csdn.net/qq_44552416/article/details/107952313
 *
 * 回顾：三大系列
 * 一、offset系列:用于获取盒子的实际尺寸(offsetWidth=content+padding+border)
 * 或者相对于最近的定位父盒子之间的距离(参照定位的盒子)
 * offsetLeft和offsetTop：子盒子padding外部相对于最近的定位父盒子的水平和垂直方向的距离
 * .offsetParent 获取最近的那个定位了的那个父盒子(DOM对象)；不一定是直接的父盒子
 *
 * 二、scroll系列
 * scrollWidth和scrollHeight
 * a.内容没有溢出，这两个属性拿到的是content+padding，不包括边框
 * b.内容溢出，这两个属性拿到的是溢出的那部分宽度，不包括边框
 *
 * scrollTop、scrollLeft
 * 这要考虑兼容
 * 火狐或者<=IE8版本，使用document.documentElement.scrollTop
 * chrome或者IE8以上版本，document.body.scrollTop
 * 苹果的Safari浏览器，使用window.pageYOffset(Y方向是scrollTop)
 *
 * 三、client系列
 * clientWidth和clientHeight获取可视区域的宽度(content+padding,不包括边框)或者高度(content+padding,不包含边框)
 * clientTop和clientLeft(子盒子padding外侧距离父盒子的padding内侧的距离，通常等于子盒子的border值；clientWidth+clientLeft=OffsetWidth(盒子的标准尺寸)
 * 如果父盒子没有padding，就是子盒子padding距离父盒子的边框内侧的距离)
 * clientLeft:视口左边界边框的长度
 * clientTop：视口有边界边框的长度
 * 将client和scroll的兼容问题封装在一起
 *		var evTools = {
 *			// 获取兼容事件的参数
 *			getEvt: function(e) {
 *				return window.event || e;
 *			},
 *			// 获取的是可视区域的横坐标
 *			getClientX: function(e) {
 *				return this.getEvt(e).clientX;
 *			},
 *			// 获取可视区域的纵坐标
 *			getClientY: function(e) {
 *				return this.getEvt(e).clientY;
 *			},
 *			// 向左卷曲出去的距离scrollLeft
 *			getScrollLeft: function() {
 *				// 1.safari浏览器 window.pageXOffset获取卷曲出去的水平距离
 *				// 2.chrome和IE的8以上版本，使用document.body.scrollLeft获取卷曲出去的水平距离
 *				// 3.火狐浏览器和IE的8以下版本，使用document.documentElement.scrollLeft获取卷曲出去的水平距离
 *				return window.pageXOffset || document.body.scrollLeft || document.documentElement.scrollLeft || 0;
 *			},
 *			// 向上卷曲出去的距离
 *			getScrollTop: function() {
 *				return window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop || 0;
 *			}
 *		};
 *
 * 三篇文档弄清楚clientX、pageX(火狐浏览器已经把卷曲出去的距离算在内)、offsetX、ScreenX
 * 参考文档1：http://t.zoukankan.com/hjdjs-p-6519396.html
 * 参考文档2：http://t.zoukankan.com/moqiutao-p-5050225.html
 * 参考文档3：https://blog.csdn.net/a460550542/article/details/100286609
 * screenX、screenY：表示相对于显示器屏幕的x轴和y轴的坐标
 * pageX、pageY:
 * 1.参考文档：https://blog.csdn.net/m0_45142186/article/details/126315694
 * 2.当滚动条没有滚动时，鼠标点击client和page值是相等的；当滚动条滚动时，鼠标点击后，page会发生变化，其值等于鼠标点击
 * 位置距离文档左上角距离的大小；但是，clientX和clientY依然是相对于视口的距离大小
 * clientX、clientY:相对于浏览器可视区域的x轴或y轴的坐标
 * offsetX、offsetY:相对于事件源对象x轴和y轴的坐标
 *
 * 四、v-if和v-show的区别和联系
 * 参考文档：https://m.php.cn/article/483644.html
 * Concept:
 * 1.v-if是真正的条件渲染，确保在切换过程中，始终伴随着事件监听器和子组件的销毁和重建
 * v-if是“惰性的”，只有当v-if的值为真时，才开始渲染条件块
 *
 * 特点
 * 2.v-show则更简单，不论条件是什么，v-show则元素一直会被渲染；当v-show值为false时隐藏；v-show值为true时显示；
 * 就是简单的基于css进行切换，类比：display:block;或者display:none;
 *
 * 评价和使用场景
 * 3.v-if有较高的切换性能消耗;使用场景：如果在运行时，条件很少改变，使用v-if
 * v-show右较高的初始渲染消耗；使用场景：如果切换频繁，使用v-show
 *
 */
export default {
  name: 'AsyncRender',
  data() {
    return {
      msg: '',
      arr: [1, 2, 3],
      // span标签显示或隐藏的标志变量flag默认为false
      flag: false,
      // num变量，存储组件名称
      num: 'first'
    };
  },
  components: {
    first: First,
    second: Second,
    third: Third
  },
  methods: {
    handleSwitch() {
      // 点击按钮，显示隐藏的span标签，并获取它的尺寸；v-if是惰性的，只有v-if条件为true时才渲染
      this.flag = true;
      // 打印显示后，span标签的尺寸
      // 直接获取，会报错：Error in v-on handler: "TypeError: Cannot read properties of undefined (reading 'offsetWidth')"
      // 原因是：点击按钮后，v-if是惰性的，当flag为真值是，伴随着v-if代码块dom的渲染；dom更新是异步的过程，只有组件更新阶段钩子
      // updated执行完成后，才能重新获取更新后的DOM
      // const x = this.$refs.sp.offsetWidth;
      // const y = this.$refs.sp.offsetHeight;
      // console.log('长度是：' + x);
      // console.log('宽度是：' + y);
      this.$nextTick(() => {
        const x = this.$refs.sp.offsetWidth;
        const y = this.$refs.sp.offsetHeight;
        // 执行结果分析
        // this.$nextTick(cb)相当于延迟了操作dom的过程，在dom更新完成后(beforeUpdate和updated钩子执行完成后，才能够操作新的dom)，
        // 才输出span标签的长和宽
        /* 
          beforeUpdate钩子执行了
          updated钩子执行了
          长度是：112
          宽度是：18
        */
        console.log('长度是：' + x);
        console.log('宽度是：' + y);
      });
    },
    switchFn() {
      // 1.点击按钮，切换要缓存的组件
      // 2.更改了data函数中的num值，所以切换时，当前组件中的更新前后两个钩子执行了
      // 3.点击按钮，把缓存组件从First切换到Second；那么钩子执行顺序：当前组件的beforeUpdate，
      // 然后First组件的缓存离开钩子deactivated钩子，然后Second组件中进入缓存的钩子activated，然后是当前组件的updated钩子
      const arr = ['first', 'second', 'third'];
      const index = arr.indexOf(this.num);
      if (index < 2) {
        this.num = arr[index + 1];
      } else {
        this.num = arr[0];
      }
    }
  },
  computed: {
    // 在created阶段完成数据、计算属性和事件的配置
    // 11个生命周期钩子(创建前后，挂载前后，更新前后，销毁前后+keep-alive内置组件3个，activated、deactivated、errorCaptured)
    // 参考文档：https://blog.csdn.net/weixin_48337566/article/details/116057090
    total() {
      return this.arr.length;
    }
  },
  beforeCreate() {
    console.log('beforeCreate钩子执行');
  },
  created() {
    console.log('created钩子执行');
    // 1.created阶段，向arr中添加一个元素
    // this.arr.push(4);
  },
  beforeMount() {
    console.log('beforeMount钩子执行了');
    // 2.和created阶段效果一样，beforeUpdate和updated钩子不会调用
    // this.arr.push(4);
  },
  mounted() {
    // 3.mounted阶段生命周期钩子,共6个：包括组件初始化和创建阶段的钩子，以及更新阶段的钩子
    /**
     *
     * DOM更新是异步的，如何在mounted操作最新的dom呢？
     * 参考文档：https://blog.csdn.net/qq_44552416/article/details/107952313
     * 总来来说，this.$nextTick(cb)相当于在dom挂载到页面后(mounted阶段)这个时机的测量
     * $nextTick传入一个回调函数cb，当mounted更新完成后，会执行其中的回调cb
     *
     *
     *
     */
    console.log('mounted钩子执行了');
    // 特别注意:改变了data中的数组arr，而且是在mounted阶段；所以，初始化时，更新前后这两个钩子(beforeUpdate和updated)会执行了
    this.arr.push(4);
    // this.$nextTick(() => {
    //   const list = document.getElementsByTagName('li');
    //   console.log(list.length); // 4
    // });
  },
  beforeUpdate() {
    console.log('beforeUpdate钩子执行了');
  },
  updated() {
    console.log('updated钩子执行了');
  },
  // keep-alive生命周期狗子函数activated和deactivated;在子组件中观看activated和deactivated钩子的执行
  /**
   *
   * @ 观察到缓存组件显示时，会触发组件的更新钩子，beforeUpdate、activated、updated的执行
   *
   * 特别要注意：是哪个组件中的钩子触发了，再观看控制台中打印钩子的顺序
   *
   *
   */
  /* 

 first组件初始渲染时执行顺序
    beforeCreate钩子执行
    created钩子执行
    beforeMount钩子执行了
    first组件中activated钩子触发   <特殊>： First.vue组件中的钩子，其他都是当前页面AsyncRender.vue文件中的钩子执行了
    mounted钩子执行了
    beforeUpdate钩子执行了
    updated钩子执行了

    切换过程中，钩子的执行顺序first到second
    beforeUpdate钩子执行了    当前组件
    first组件中deactivated钩子触发   First.vue组件
    second组件中activated钩子触发    Second.vue组件
    updated钩子执行了        当前组件
 */
  // activated() {
  //   console.log(100); // 被缓存的组件显示出来的时候触发
  // },
  // deactivated() {
  //   // 被缓存的组件隐藏时触发
  //   console.log(200);
  // },
  // 当捕获一个子孙组件的错误时，会调用这个钩子
  errorCaptured(a, b, c) {
    /**
     * 参数说明
     * a:错误对象
     * b:发生错误组件实例
     * c：包含发生错误来源信息的字符串
     *
     * 此钩子返回一个false,阻止错误向上传播
     *
     */
    console.log(a); // 错误对象
    console.log(b); // 发生错误的组件实例
    console.log(c); // 包含错误来源信息的字符串
  }
};
</script>
<style lang="less" scoped>
.ar_container {
  background-color: #ddd;
  span.sp {
    background-color: pink;
  }
}
</style>
