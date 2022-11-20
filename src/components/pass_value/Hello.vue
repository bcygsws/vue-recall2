<template>
  <div class="hello_container">
    <h3>这是Hello页面</h3>
    <ul class="show">
      <li>从状态管理对象state直接获取count值:{{ $store.state.count }}</li>
      <li>从getters获取即时count值：{{ $store.getters.getCount }}</li>
      <li>从mapState获取即时count值：{{ count }}</li>
      <li>从mapGetters获取即时count值：{{ getCount }}</li>
    </ul>
    <!-- el-row中有relative相对定位，而el-button默认没有，el-row因为相对定位了，就放置在button上面了，点击事件才会无效 -->
    <el-row>
      <!-- <el-button @click.native="handleInc(1)">+</el-button> -->
      <!-- 简化对象时，click事件处理函数的函数名要和mutations或者actions中高度一致，这种一个函数名，两处用的“双关语义” -->
      <el-button @click.native="inc(1)">+</el-button>
      <el-button @click.native="handleDec(1)">-</el-button>
      <!-- 同上，使用简化对象时，click事件处理函数名要和mutations和actions中的高度一致，双关语义-->
      <!-- <el-button @click.native="actionCount(1)">-</el-button> -->
    </el-row>
  </div>
</template>
<script>
// import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import { mapState, mapGetters, mapMutations } from "vuex";
/**
 *
 * 特别注意：无论是mutations直接改变数据，抑或是使用actions间接改变数据，还是使用getters获取即时数据，都需要书写长长的一串
 * this.$store.state
 * this.$store.getters.方法名
 * this.$store.commit(mutations中方法名,传值)
 * this.$store.dispatch(actions中方法名,传值)
 * 1.vuex中提供了一套简化对象，分别叫做mapState,mapGetters,mapMutations，mapActions。
 * 使用形如：扩展符+mapState()来进行简化，其他类似
 * 2.mapState和mapGetters放在computed属性中，方便响应式；然后，mapMutations和mapActions需要放在methods方法中
 *
 * 参考文档：
 * https://blog.fundebug.com/2019/05/18/6-ways-for-vue-communication/
 *
 * vuex原理：vuex实现了一个单向数据流，并定义了一个全局的state;要更改state数据，需要通过mutations，mutations提供了订阅
 * 者模式，供其他组件调用，获得state数据更新；当处理异步操作（向后端请求数据）或批量同步操作时，需要使用actions;然而，actions并不能直接更改
 * state,还是需要通过（dispatch）mutations来更改state,更改的state完成渲染
 *
 */
export default {
  name: "Hello",
  data() {
    return {};
  },
  //  mapState和mapGetters需要放在computed侦听属性中，方便响应式
  computed: {
    // 1.最简洁的方式
    ...mapState(["count"]),
    // 2.对象的方式
    // 直接对象的形式，将count变量的键名放到渲染模板中,组织成一个对象{count1:'count'}
    // ...mapState({ count1: 'count' }),
    // 3.箭头函数的方式
    // ...mapState({ count1: (state) => state.count }),
    // ...mapState(['count']),

    ...mapGetters(["getCount"])
  },
  methods: {
    /**
     *
     * @ 注意；为了方便使用对象简化
     * 1.使用简化对象时，mutations和actions中函数命名的双关
     * 2.参数要直接使用，click事件处理函数中的参数，不能作任何修饰
     *
     */
    // a.点加号增加,一般写法
    // handleInc(val) {
    //   this.$store.commit('inc', val);
    // },
    // b.mapMutations简写方式
    ...mapMutations(["inc"]),
    // 上面代码等价于下面代码
    // inc(props){
    //   return this.$store.commit('inc',props);
    // }
    // 1.点减号减少 一般写法
    handleDec(val) {
      this.$store.dispatch("actionCount", val);
    }
    // 2.mapActions简写方式
    // ...mapActions(['actionCount']),
    // 上面代码等价于
    // actionCount(props) {
    //   return this.$store.dispatch('actionCount', props);
    // },
  }
};
</script>

<style lang="less" scoped>
.hello_container {
  background-color: yellow;
  ul.show {
    li {
      list-style-type: none;
    }
  }
  div.el-row {
    height: 30px;
    button {
      position: absolute;
      &:first-child {
        top: 0;
        /* 让加号按钮居中 */
        /* 相对于父盒子的50%，需要减去自身盒子宽度的50% */
        left: 50%;
        /* 自身尺寸去掉50% */
        transform: translateX(-50%);
      }
      &:last-child {
        top: 0;
        left: 50%;
        transform: translateX(50%);
      }
    }
  }
}
</style>
