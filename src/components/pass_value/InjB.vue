<template>
  <div class="injb_container">
    <h2>这是InjectB组件</h2>
    <div>{{ notReactiveData }}</div>
    <inj-d></inj-d>
    <inj-e></inj-e>
  </div>
</template>
<script>
import InjD from './InjD.vue';
import InjE from './InjE.vue';
export default {
  name: 'InjB',
  data() {
    return {};
  },
  inject: ['notReactiveData'],
  methods: {},
  components: { InjD, InjE }
};
</script>
<style lang="less" scoped>
.injb_container {
  background-color: hotpink;
}
</style>
