<template>
  <div class="un_container">
    <h3>使用jade和stylus简化模板和样式</h3>
    <p>你好</p>
  </div>
</template>
<script>
/**
 *
 * @ stylus的使用
 * 1.使用vue ui安装开发依赖，stylus  stylus-loader
 * 2.在.vue文件中style标签配置lang="stylus"
 *
 * @ 全局导入stylus的样式文件，index.styl
 * 如果全局插入stylus的样式文件，例如：index.styl
 *
 * 可以在项目所在路径终端输入：
 * vue add style-resources-loader
 *
 * 安装过程中会选择使用的样式 预处理器，可以选择stylus,这种方式最为方便，会自动在vue.config.js文件中配置下列代码
 * pluginOptions: {
 *  'style-resources-loader': {
 *  preProcessor: 'stylus',
 *  patterns: [path.resolve(__dirname, './src/assets/style/index.styl')], // 默认patterns中是空的，路径自己手动配置
 *         },
  },
 *
 *
 * 版本兼容问题：
 * 安装stylus-loader stylus老是报UnhandledPromiseRejectionWarning: TypeError: loaderContext.getResolve
 *  is not a function和Module build failed: TypeError: this.getOptions is not a function的原因，那是因为stylus和stylus-loader的版本兼容问题
 * 
 * 原文链接：https://blog.csdn.net/small_hello/article/details/117451914
 * 参考：https://www.cnblogs.com/shy1766IT/p/11070642.html
 *
 */
export default {
  name: 'UseNew',
  data() {
    return {};
  },
};
</script>
<style lang="stylus" scoped>
.un_container h3
  color green
</style>
