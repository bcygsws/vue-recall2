module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/prettier'],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    /*
    * 引号类型,为单引号；不是单引号，会给出警告；
    * 'off'或0，关闭规则；
    * 'warn'或1，打开规则的作为警告，不影响代码退出；
    * 'error'或2,把规则作为一个错误(退出代码触发时为1)
    *
    * */
    // quotes: [1, 'single'],
    // 设置函数局末必须有分号，否则报错。要注意顺序，结果集是一个数组'error'在前，'always'在后
    semi: ['error', 'always'],
    // 一行结束不能有空格，关闭
    // 'no-trailing-spaces': 'off',
    // 关闭空格报错检查
    'no-irregular-whitespace': 'off',
    // 函数名称和函数体左括号前有空格，关闭，0等同于off
    'space-before-function-paren': 0,
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
};
