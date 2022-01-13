<template>
  <div class="hello_container">
    <h3>这是Hello页面</h3>
    <ul class="show">
      <li>从状态管理对象state直接获取count值:{{ $store.state.count }}</li>
      <li>从getters获取即时count值：{{ $store.getters.getCount }}</li>
      <li></li>
      <li></li>
    </ul>
    <!-- el-row中有relative相对定位，而el-button默认没有，el-row因为相对定位了，就放置在button上面了，点击事件才会无效 -->
    <el-row>
      <el-button @click.native="handleInc(1)">+</el-button>
      <el-button @click.native="handleDec(1)">-</el-button>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'Hello',
  data() {
    return {};
  },
  methods: {
    // 点加号增加
    handleInc(val) {
      this.$store.commit('inc', { pace: val });
    },
    // 点减号减少
    handleDec(val) {
      this.$store.dispatch('actionCount', { pace: val });
    },
  },
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
        left: 140px;
      }
      &:last-child {
        top: 0;
        left: 220px;
      }
    }
  }
}
</style>
