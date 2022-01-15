<template>
  <div class="injc_container">
    <h2>这是Inject组件</h2>
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
  methods: {},
  components: { InjF },
};
</script>
<style lang="less" scoped>
.injc_container {
  background-color: orange;
}
</style>
