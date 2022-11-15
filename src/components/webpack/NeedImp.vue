<template>
  <div class="need_container">
    <h3>按需引入的方式分析</h3>
  </div>
</template>
<script>
// 按需加载是通过设置引入组件的方式
// 参考文档：18.vue页面按需加载.note
//  http://note.youdao.com/noteshare?id=0916e1551a8ccfe7b09947d0b32b97ce&sub=CAA50B805E6A40589E9000481E799FEF
/**
 * 加载方式：1.不进行按需加载；2.按需加载（懒加载）的方式
 * 1.不进行按需加载 举例：import Home from '@/home/Home.vue';
 * 2.按需加载
 * 三个参数：
 * [] 代表需要传进来的一些模块的依赖
 * cb 成功回调，callback:function(require){}   ()=>r(require('@/home/Home.vue')) r参数，呼应外层箭头函数的r，不要使用其他变量名，以让webpack识别
 * cb 失败回调，callback:function(err){}
 * 'chunk-name' 字符串，组块名称
 * 
 *   a. common.js或者webpack 2.4版本以下，使用require.ensure()方法来实现按需加载（懒加载）
 *      举例：const Home= r=>require.ensure([],()=>r(require('@/home/Home.vue')),'home-chunk');
 *   b. webpack 2.4以上版本，require.ensure()这种方式被抛弃，采用更加简洁的写法：
 * */
// 举例：const Home=()=>import(/* webpackChunkName:'home-chunk' */'@/home/Home.vue');

// 【去掉警告】
// 解决终端命令中，关于prettier的一些警告问题，例如：warning Delete `␍` prettier/prettier
// 原因：是clone代码后，会自动将换行符LF（linefeed character）转化成回车符CRLF（carriage-return character），
// 修复命令：npm run lint --fix
// 以及在git中输入：git config --global core.autocrlf false   关闭掉这种自动转换
export default {
  name: 'NeedImp',
  data() {
    return {};
  }
};
</script>
