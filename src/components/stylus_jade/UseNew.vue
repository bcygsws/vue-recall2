<template>
  <div class="un_container">
    <h3>使用jade和stylus简化模板和样式</h3>
    <p>你好</p>
    <div class="box">
      <div class="mix1">混入1</div>
      <div class="mix2">混入2</div>
      <div class="mix3">混入3</div>
    </div>
  </div>
</template>
<script>
/**
 *
 * @ stylus的使用
 * stylus:富于表现力、动态、健壮的CSS
 * stylus中文网：https://www.stylus-lang.cn/docs/interpolation.html
 * 
 * [ˈstaɪləs]触笔，唱针，指示笔（在电脑上书写、画画等）
 * 1.使用vue ui安装开发依赖，stylus  stylus-loader
 * 2.在.vue文件中style标签配置lang="stylus"
 * 
 *
 * @ 全局导入stylus的样式文件，index.styl
 * 如果全局插入stylus的样式文件，例如：index.styl
 *
 * 可以在项目所在路径终端输入：
 * vue add style-resources-loader
 *
 * 安装过程中会根据需要来选择使用CSS预处理器，可以选择stylus(less也可以),这种方式最为方便，会自动在vue.config.js文件中配置下列代码
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
 *  is not a function和Module build failed: TypeError: this.getOptions is not a function的原因，那是因
 * 为stylus和stylus-loader的版本兼容问题
 * 
 * 原文链接：https://blog.csdn.net/small_hello/article/details/117451914
 * 参考：https://www.cnblogs.com/shy1766IT/p/11070642.html
 *
 */
export default {
  name: 'UseNew',
  data() {
    return {};
  }
};
</script>
<style lang="less" scoped>
/* 类似python式缩进，来区分级别;参考文档：http://t.zoukankan.com/matd-p-10997973.html
  1.语法 2.变量 3.嵌套 4.混合mixins的使用,需要配置*/
.un_container {
  h3 {
    color: blue;
    /* &表示使用父级选择器，color green是h3的css属性，&符号和h3齐平，这个&代表的父类就是h3；后面跟一个伪类 :hover */
    &:hover {
      color: orange;
    }
  }
}
</style>
