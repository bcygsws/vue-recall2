<template>
  <div class="injc_container">
    <h2>这是InjectC组件</h2>
    <div>{{ notReactiveData }}</div>
    <inj-f></inj-f>
  </div>
</template>
<script>
import InjF from './InjF.vue';
export default {
  name: 'InjC',
  data() {
    return {};
  },
  inject: ['notReactiveData'],
  methods: {},
  components: { InjF }
};
</script>
<style lang="less" scoped>
.injc_container {
  background-color: orange;
}
</style>
