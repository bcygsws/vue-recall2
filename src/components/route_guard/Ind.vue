<template>
  <div class="ind_container">
    <h6>这是Ind组件，是NotLogin的子路由</h6>
    <!-- 添加清除token的按钮 -->
    <button @click="clearToken">清除x-token令牌，观察路由跳转</button>
  </div>
</template>
<script>
  /**
   * 
   * @编程式导航
   * 官网：
   * https://router.vuejs.org/zh/guide/essentials/navigation.html#%E5%AF%BC%E8%88%AA%E5%88%B0%E4%B8%8D%E5%90%8C%E7%9A%84%E4%BD%8D%E7%BD%AE
   * 导航的两种方式：
   * a.模板中router-link
   * b.编程式导航
   * 一、push方式
   * 编程式导航的几种方式
   * 1 字符串，this.$router.push('/user/bcygsws') 导航至：/user/bcygsws
   * 2 路径对象，this.$router.push({path:'/user/bcygsws'}) 导航至/user/bcygsws
   * 3 带查询参数，this.$router.push({path:'/user/bcygsws',query:{id:1}}) 导航至/user/bcygsws?id=1
   * 4 命名组件，this.$router.push({name:'User',params:{username:'bcygsws'}}) 导航至路由/user/bcygsws
   * 5 带hash，this.$router.push({path:'/user',hash:'#myhash'}) 导航至/user#myhash
   * 
   * 特别注意：路径对象使用path和params时，params参数无效；因此，需要使用name组件命名和params来实现 
   * 
   * 二、go和back的方式
   * 向前一层路由this.$router.go(1)
   * 后退一层，this.$router.go(-1)或者this.$router.back(1)
   * 
   * 三、replace的方式
   * this.$router.replace('/user/bcygsws') replace顾名思义是替换，和push的唯一区别在于不会在history中添加一条新记录，而只是
   * 替换
   * 
   * 
  */
export default {
  name: 'Ind',
  methods: {
    clearToken() {
      // 清除token,本地localStorage的清除，clear()
      localStorage.clear();
      // 编程式导航进入login页面
      this.$router.push({ name: 'User' });
    }
  }
};
</script>
