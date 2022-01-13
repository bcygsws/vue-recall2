<template>
  <div class="pass_container">
    <h3>父子元素传值演示:</h3>
    <h4>{{ msg }}</h4>
    <b-son
      :rec="info"
      rv="hello world"
      :fru="fru"
      @text-enlarged="handle"
      @text-small="handle1"
    >
      }}</b-son
    >
    <!-- 父组件接收子组件传值x -->
    <span :style="{ fontSize: fontSize + 'px' }">span字体变化</span>
    <h4>向子组件CSon传值</h4>
    <c-son :rev="info"></c-son>
  </div>
</template>
<script>
import CSon from './SonC.vue';
import BSon from './SonB.vue';
/**
 *
 * @ 一：父子组件传值
 * 父->子 在父组件中，引用子组件处，添加属性，:attr="父组件data";在子组件中，引入父组件数据，两种方法：数组和对象
 * ['attr'] {attr:{
 *  type:String,
 *  default:"默认值",
 *  required:true,// 父组件必须向子组件传值，否则报错
 *  validate:(value)=>{
 *     return value;}
 * }}
 * 子->父 在子组件中，在子组件汇中，@事件="$emit('toFat',attr)";
 *        在父组件中，引用子组件的标签，绑定事件@toFat="handle"
 *        handle(value){
 *        attr就是这里的value
 * }
 * 
 * 
 *
 */
export default {
  name: 'Father',
  data() {
    return {
      msg: '向子组件BSon传值',
      info: '父元素向子元素传值',
      fru: ['苹果', '香蕉', '橘子', '菠萝'],
      // span标签文本的默认值为10，子组件传值控制其字体大小
      fontSize: 18,
      fontSmall: 18,
    };
  },
  mounted() {
    console.log(this.$refs.lab);
  },
  methods: {
    handle(value) {
      this.fontSize += value;
      if (this.fontSize >= 50) {
        this.fontSize = 50;
      }
    },
    handle1(value) {
      this.fontSize -= value;
      if (this.fontSize <= 10) {
        this.fontSize = 10;
      }
    },
  },
  components: {
    BSon,
    CSon,
  },
};
</script>
<style lang="less" scoped>
.pass_container {
  background-color: salmon;
}
</style>
