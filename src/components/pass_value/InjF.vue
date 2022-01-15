<template>
  <div class="injf_container">
    <h3>这是InjectF组件</h3>
  </div>
</template>
<script>
export default {
  name: 'InjF',
  data() {
    return {};
  },
  // inject: ['name'],
  // mounted() {
  //   console.log(this.name);
  // },
  // 接收组件A提供的color
  methods: {},
  components: {},
};
</script>
<style lang="less" scoped>
.injf_container {
  background-color: pink;
}
</style>
