<template>
  <div class="no_container">
    <h3>不缓存的组件</h3>
    <!-- 路由切换后，再切换回来，文本框中输入的内容能够保持 -->
    <input type="text" name="no_cache" id="no_cache" />
  </div>
</template>
<script>
export default {
  name: 'NoCache',
  data() {
    return {};
  }
};
</script>
