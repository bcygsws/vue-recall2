<template>
  <div class="home">
    <router-link to="/home/sub">子组件的用法</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: 'Home',
  components: {},
};
</script>
