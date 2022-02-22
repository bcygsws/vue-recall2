<template>
  <div class="no_container">
    <h3>这是不缓存路由</h3>
    <!-- 路由切换后，再切换回来，文本框中输入的内容不能够保持 -->
    <input type="text" name="no-cache" id="no-cache" />
  </div>
</template>
<script>
export default {
  name: 'NoCacheC',
  data() {
    return {};
  }
};
</script>
