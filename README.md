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

### 五、6 种组件通信方式

#### 一、父子传值和子父传值

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

#### 二、中央事件总线法，实现父子、同级和跨级组件传值（小型的 vuex）

#### 2.1 \$emit 和\$on，中央事件总线（事件中心），实现父子、兄弟和跨级组件之间的数据传递

#### 2.2 在\$on 接收数据之前，如果出现多次触发的情况，可以进行先解绑事件（Event.\$off('事件名称')），再使用\$on 接收

- main.js 中空实例必须声明在 new Vue({})前面，否则引出\$on 和\$off 就会报出 TypeError
- 父子传值 SonB 到其子组件 SonSon
- 同级传值，SonB 向 SonC
- 跨级，Father 传给孙子组件 SonSon

#### 三、vuex 实现父子、同级和跨级组件通信

3.1 VueComponent 组件：视图

3.2 actions:操作行为处理模块，actions 中可以处理同步/异步数据，如：从后端接口中获取数据和批量操作同步数据
内部多个同步处理函数可以同名，会按照书写的顺序先后触发

3.3 dispatch：触发操作行为，是唯一可以提交 actions 的方法

3.4 actions 提交后（commit），交由 mutations 改变状态

3.5 mutations 改变状态管理对象值的对象，使用 commit 进行提交。与 actions 中不同之处在于：

3.5.1 mutations 中方法只能处理同步数据

3.5.2 mutations 不能有同名的方法
3.6 state 和 getters 中即时侦测数据变化，可以获取值。类似 computed 这个侦听属性

3.7 vuex 提供了一套简化模板 import {mapState,mapGetters,mapMutations,mapActions} from 'vuex';可以简化状态管理
的代码。注意：

3.7.1 注意操作时，函数名的双关性。如：@click="inc(props)" 用以通过...mapMutations 的方法改变数据，那么在 mutations:{
inc(state,props){ // 方法名必须是 inc }}

3.7.2 @click="inc(props)"传递的参数也不要做任何修饰

3.8 vuex 进行状态管理的数据，刷新页面后，数据又还原到操作前状态，在项目中配合各个接口进行操作（后端），在浏览器中测试时，可以先借助本地存储（localStorage），非常方便

#### 四、\$attrs 和\$listeners 跨级组件之间的通信

#### vue 2.4 以后新增的功能：

#### \$attrs 和\$listeners 是两个对象

4.1. 分别存储的是父组件中的非 props 中声明的属性（当然也不包括 style 和 class 属性），以及父组件中绑定的非.native 事件

4.2. $attrs 是 v-bind="\$attrs"，适用于父级向子级和孙子级等等，高级向低级

4.3. $listeners 中包含的是父组件中的非 native 事件(v-on="\$listeners")，类比子组件向父组件传值

#### 五、provide/inject 可以跨级传递数据，不能组件之间层级有多深，但这种方式不是响应式的，这是刻意为之的；如果传入一个可监听的对象，其属性是响应式的

#### 传入监听的对象，解决响应式:分两步

- 1、在 provide 声明所在组件，provide 提供函数式参数。示例代码：
- provide(){
- return {
- getReactiveInfo: () => this.info,
- }
- }
-
- 2、在 inject 所在的接收组件。示例代码：
- inject:['getReactiveInfo']
- 同时要使用侦听属性，侦听一个第三方变量
- changedGetReactiveInfo(){
- return this.getReactiveInfo();
- }

#### 六、ref \$parent 和\$children 为第六种组件通信方式

#### 简单了解，常用 ref="标识->this.\$refs.标识获取原生对象

- 举例：InjA 中获取了子组件 InjB

### 六、路由的前置导航守卫：router.beforeEach((to,from,next)=>{})

#### 配合登录验证来使用

##### 使用步骤，三段式

- 分支判断，to.path 是否去往登录页，直接放行（next()）
- 接下来，就是非'/user'页面了。获取 token 令牌，然后判断非登录页上，是否存在 token 令牌；不存在，也将去往登录页（next('/user')）
- 前两步已经判断了登录页，非登录页不存在 token 的情况；剩下的情形就是去往非登录页并且 token 令牌存在，可以放行（直接 next()）
  ##### 学习文档
  - [导航守卫学习](https://segmentfault.com/a/1190000015727279)

### 七、stylus 和 jade 的基本使用

#### stylus 的使用

- 安装 stylus 和 stylus-loader（注意版本的搭配）。"stylus": "^0.54.8";stylus-loader": "^3.0.2"
- 安装方式可以使用 cnpm install stylus stylus-loader --save-dev，也可以使用 vue ui 安装依赖
  在.vue 文件中声明，lang="stylus"

#### 全局使用 stylus 样式，在 ./assets/style/index.styl 文件

- 最好在终端添加 vue add style-resources-loader,可以实现在 vue.config.js 自动配置
  pluginOptions: { 'style-resources-loader': { preProcessor: 'stylus', patterns: [path.resolve(__dirname, './src/assets/style/index.styl')], // 默认 patterns 中是空的，路径自己手动配置 }, },

### 八、自定义指令和五个钩子函数

#### 语法：在 script 逻辑代码中声明：directives:{'str':{}} ;在 template 中需要绑定指定的标签，增加一个属性：v-str=""

#### 自定义指令的五个钩子

- bind:表示指令第一次绑定到元素时调用；这个钩子也执行一次
- inserted:绑定指令的标签被插入到父元素时调用（仅保证父节点存在，但不一定被插入文档中）。这个钩子只执行一次
- update:所有虚拟节点 VNode 更新时调用，更新发生在所有子 VNode 更新前。value 值可能变化，也可能没变化；这个钩子可以执行多次
- componentUpdated:所有 VNode 和子 VNode 更新后调用
- unbind：指令解绑时调用，该钩子只执行一次

### 九、事件委托与获取属性值的方法

#### 事件委托

- 背景：如在 v-for 循环中渲染列表时，需要为每个列表绑定一个事件。但是，若列表数组的长度值很大。这就使得创建的事件的数量剧增。解决方案：使用委托，将每个 li 上绑定的事件委托给其父元素
- 子节点事件处理程序代理给父节点，可以减少内存占有率
- 当动态增加子节点时，子节点会将事件自动绑定到父节点上

#### 属性值方法的获取

##### 原生环境下

- getAttribute('属性名')，一些特殊的，比如 data-index 属性，可以使用原生 obj.dataset.index 获取；clss 属性值，可以使用原生
  obj.className 获取

##### jQuery 环境下

- \$(选择器).attr() 使用场景：队友 html 的自定义属性，处理时使用 attr
- \$(选择器).prop() 使用场景：对于 html 的固有属性，处理时使用 prop 方法。如果固有属性强行使用 attr 方法获取，可能得到 undefined 或非期望值。[固有属性强行属性 attr 方法，未得到期望值的案例](https://www.cnblogs.com/Showshare/p/different-between-attr-and-prop.html)例如：<input id="chk1" type="checkbox" />是否可见
  <input id="chk2" type="checkbox" checked="checked" />是否可见。\$("#chk1").prop("checked") == false
  \$("#chk2").prop("checked") == true；强行使用 attr,得到错误的结果；\$("#chk1").attr("checked") == undefined
  \$("#chk2").attr("checked") == "checked"

### 十、动态绑定 class 的 6 种方式

#### 结合案例理解动态绑定 class（路径：\/dynamic_class）

### 十一、this.$nextTick(callback)的两个使用场景

#### 在 vue 生命周期的 created 阶段，操作 DOM，要是用 this.$nextTick(callback)

#### 在数据变化后要执行某个操作，这个操作要使用随着数据变化的 DOM 结构时，要使用 nextTick

- 参考文档：[nextTick 详解](https://www.cnblogs.com/qhantime/p/11379826.html)
- 官方解析：vue 异步更新 dom
  当数据变化时，组件不会立即渲染。当刷新队列时，组件在事件循环清空时的下一个 tick 更新

### 十二、低版本 vue1.0 和 vue2.0 分别获取对象的方式 v-el:名称和 v-ref:名称

#### 注意问题

- 参考文档：[弃用的 v-el 和 v-ref](https://blog.csdn.net/qq_26642611/article/details/104493828)
- 注意大小写的转换问题，在标签或者子组件中使用了大写 v-el:myCom 或者 v-ref:mySon。后面引用的时候，需要转换成小写 this\.\$els.mycom 和 this\.\$refs.myson

### 十三、监测属性变化的两个重要属性：侦听属性 watch 和计算属性 computed

#### 侦听属性 watch

- 使用场合：异步数据或者开销较大的数据监测中，通常使用 watch

1. watch 不支持缓存，数据变化立即触发
2. watch 支持异步数据，watch 监听的属性有两个参数(newVal,oldVal)
3. watch 有两个属性，immediately 和 deep。immediately 表示组件加载立即触发，deep 表示对所有变化了数据都加以监测(deep:true)
4. watch 还可以监控路由的变化

### 计算属性 computed

1. 某一个属性是由其他属性计算而来，依赖其他属性。是多对一或者一对一的关系
2. computed 支持缓存，依赖的属性值发生改变，才重新计算
3. computed 不支持异步，监测异步数据无变化
4. computed 默认走缓存，是基于其他属性的响应式依赖。这些依赖的属性包括 data 中声明的属性、其他组件传递过来的 props 属性等

### 十四、delete 和 Vue.delete（关联知识点 Vue.set）的区别与联系

#### delete 用于删除数组或对象中的元素（第一个参数 target 的类型）。

- 含义：delete 删除的是元素值，元素的空间仍然保留（控制台中键仍然不变，键值变成了 empty 或者 undefined）
- delete 的删除要配合 this.\$set(),用以保证删除 data 中某个属性后，视图能够更新

#### Vue.delete 用于删除数组中某个元素在内存中的占位，删除后键值改变了（数组中索引可以理解为它的键）

- 含义：Vue.delete 用于删除某个元素在内存中的占位，删除后键值改变了
- Vue.delete 用于删除对象中某个属性。如果对象时响应式的，要确保删除的这个 property 能够更新视图
- Vue.delete()的参数列表，Vue.delete(target[Array|Object 类型],properName/index[string|number 类型])

#### vue.delete 关联属性 Vue.set

- 含义：Vue.set 用于向响应式对象中添加一个 property，如果对象是响应式的，要确保添加的对象也是响应式的，且触发视图更新
- Vue.set 的参数列表，Vue.set(target[Object|Array 类型],properName/index[string|index 类型],value[任意类型])
- [Vue.set 参考文档](https://cn.vuejs.org/v2/api/#Vue-set)
