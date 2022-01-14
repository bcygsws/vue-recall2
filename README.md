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
### 父子传值和子父传值

