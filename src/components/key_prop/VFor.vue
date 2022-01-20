<template>
  <div class="key_container">
    <h3>这是v-for渲染列表组件</h3>
    <p>添加数据区域</p>
    id:<input type="text" name="id" id="id" v-model="id" /> 名称：<input
      type="text"
      name="fru"
      id="fru"
      v-model="fru"
    />
    <input type="button" value="添加一条数据" @click="addItem" />
    <ul>
      <li v-for="item in list" :key="item.id">
        <input type="checkbox" name="" id="" />
        {{ item.id }}---{{ item.name }}
        <a href="javascript:;" @click="delItem(item.id)">删除</a>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'VFor',
  data() {
    return {
      // 添加的id
      id: '',
      // 添加的水果名称
      fru: '',
      // 定义一个包含键name和id的对象数组
      list: [
        { name: '苹果', id: 1 },
        { name: '香蕉', id: 2 },
        { name: '菠萝', id: 3 },
        { name: '桃子', id: 4 },
        { name: '西瓜', id: 5 },
      ],
    };
  },
  methods: {
    // 添加一条数据
    addItem() {
      // 检查一下新添加的id是否在list对象数据中已经声明过
      // 至少有一个通过了提供的函数测试，则返回true;否则返回false
      console.log(typeof this.id); // string
      let flag = this.list.some((item) => {
        if (item.id === parseInt(this.id)) {
          // 你添加的数据id已经存在，请重新输入id数值
          this.$message({
            type: 'warn',
            message: '你添加的id已经存在，请重新输入id值',
          });
          return true;
        }
      });
      // id值为重复，往list数组的末尾追加一条数据
      // flag为true, 表示输入的id有和数组list中某个元素的id重复;期望：不重复，没有任何一个元素通过测试；flag=false
      if (!flag) {
        this.list.push({ id: parseInt(this.id), name: this.fru });
      }
    },
  },
};
</script>
<style lang="less" scoped>
.key_container {
  ul {
    li {
      list-style-type: none;
      a {
        margin-left: 30px;
      }
    }
  }
}
</style>
