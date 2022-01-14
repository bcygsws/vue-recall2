---
tags: []
created: 2022-01-14T19:12:32.817Z
modified: 2022-01-14T19:14:58.883Z
---

# vue-recall2

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## vue 基本概念、知识点-体会案例

### 一、为某个组件添加子组件-sub 文件夹

- 注意：components:{大写}，在模板中引入时需要小写

### 二、按需加载（懒加载）

1.  不按需加载，举例：正常加载 import Home from '@/home/Home.vue';
2.  按需加载（懒加载）

- common.js 唯一方式或者 webpack 低于 2.4 版本的方式;举例：const Home=r=>require.ensure([],()=>r(import()'@/home/Home.vue'),'chunk-home');
- webpack 高于 2.4 版本时，弃用上述方式；采用更加简洁的写法：const Home=()=>import(/\* webpackChunkName:'chunk-home' \*/'@/home/Home.vue');

### 三、keep-alive 的使用

1. 内置组件，所有不会渲染成 DOM 元素
2. 三属性：include、exclude(优先级大于 include，且两属性如果使用:exclude="/a|b/"或['a','b'],include 或 exclude 需要动态绑定，v-bind(:))、max;两个钩子函数：activated、deactivated
3. 缓存组件第一次渲染时，会依次执行 created、mounted、activated，退出时执行 deactivated;当再次进入时，只触发 activated（created 和 mounted 由于 keep-alive 的缓存作用，页面没有重新渲染，因此只触发

### 四、组件定义的注意事项

- 组件中 data 必须是函数，包括全局组件和私有组件
- 组件模板中的顶层标签必须是单个根元素
- 组件中模板除了引号，也可以使用模板字符串的形式（模板字符串中引入子组件时，子组件可以是驼峰命名法的组件，例如：<HelloWorld></HelloWorld>，可以将 HelloWorld 引入到另一个组件中
- 当使用驼峰命名法命名组件时，只有在全局组件定义和模板字符串中引入子组件才能使用驼峰的方式；普通标签中只能使用短横线的方式

### 六种组件通信方式

### 一、父子传值和子父传值

#### 1.1 父组件向组件传值

在父组件中，引用子组件处，添加属性，:attr="父组件 data";在子组件中，引入父组件数据，两种方法：数组和对象
['attr'] {attr:{
type:String,
default:"默认值",
required:true,// 父组件必须向子组件传值，否则报错
validate:(value)=>{
return value;}
}}

#### 1.2 子组件向父组件传值

在子组件中，在子组件汇中，@事件="\$emit('toFat',attr)";
在父组件中，引用子组件的标签，绑定事件@toFat="handle"
handle(value){
attr 就是这里的 value
}

### 二、中央事件总线法，实现父子、同级和跨级组件传值（小型的 vuex）

#### 2.1 \$emit 和\$on，中央事件总线（事件中心），实现父子、兄弟和跨级组件之间的数据传递

#### 2.2 在\$on 接收数据之前，如果出现多次触发的情况，可以进行先解绑事件（Event.\$off('事件名称')），再使用\$on 接收

- main.js 中空实例必须声明在 new Vue({})前面，否则引出\$on 和\$off 就会报出 TypeError
- 父子传值 SonB 到其子组件 SonSon
- 同级传值，SonB 向 SonC
- 跨级，Father 传给孙子组件 SonSon

### vuex 实现父子、同级和跨级组件通信

1. VueComponent 组件：视图

2. actions:操作行为处理模块，actions 中可以处理同步/异步数据，如：从后端接口中获取数据和批量操作同步数据
   内部多个同步处理函数可以同名，会按照书写的顺序先后触发
3. dispatch：触发操作行为，是唯一可以提交 actions 的方法
4. actions 提交后（commit），交由 mutations 改变状态
5. mutations 改变状态管理对象值的对象，使用 commit 进行提交。与 actions 中不同之处在于：

- mutations 中方法只能处理同步数据
- mutations 不能有同名的方法

6. state 和 getters 中即时侦测数据变化，可以获取值。类似 computed 这个侦听属性
7. vuex 提供了一套简化模板 import {mapState,mapGetters,mapMutations,mapActions} from 'vuex';可以简化状态管理
   的代码。注意：

- 注意操作时，函数名的双关性。如：@click="inc(props)" 用以通过...mapMutations 的方法改变数据，那么在 mutations:{
  inc(state,props){ // 方法名必须是 inc }}
- @click-"inc(props)"传递的参数也不要做任何修饰

8. vuex 进行状态管理的数据，刷新页面后，数据又还原到操作前状态，在项目中配合各个接口进行操作（后端），在浏览器中测试时，可以先借助本地存储（localStorage），非常方便

### \$attrs 和\$listeners 跨级组件之间的通信

#### vue 2.4 以后新增的功能：

#### \$attrs 和\$listeners 是两个对象

1.  分别存储的是父组件中的非 props 中声明的属性（当然也不包括 style 和 class 属性），以及父组件中绑定的非.native 事件
2.  $attrs 是 v-bind="\$attrs"，适用于父级向子级和孙子级等等，高级向低级
3.  $listeners 中包含的是父组件中的非 native 事件(v-on="\$listeners")，类比子组件向父组件传值
