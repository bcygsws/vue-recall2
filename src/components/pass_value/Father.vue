<template>
  <div class="pass_container">
    <h3>父子元素传值演示:</h3>
    <h4>{{ msg }}</h4>
    <b-son :rec="info" rv="hello world" :fru="fru"></b-son>
    <h4>向子组件CSon传值</h4>
    <c-son :rev="info"></c-son>
  </div>
</template>
<script>
import CSon from './SonC.vue';
import BSon from './SonB.vue';
export default {
  name: 'Father',
  data() {
    return {
      msg: '向子组件BSon传值',
      info: '父元素向子元素传值',
      fru: ['苹果', '香蕉', '橘子', '菠萝'],
    };
  },
  methods: {},
  components: {
    BSon,
    CSon,
  },
};
</script>
<style lang="less" scoped>
.pass_container {
}
</style>
