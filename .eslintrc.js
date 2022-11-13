module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/prettier'],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    // 不检查单双引号
    singleQuote: 0,
    // 设置函数局末必须有分号，否则报错。要注意顺序，结果集是一个数组'error'在前，'always'在后
    semi: ['error', 'always'],
    // 一行结束不能有空格，关闭
    // 'no-trailing-spaces': 'off',
    // 关闭空格报错检查
    'no-irregular-whitespace': 'off',
    // 函数名称和函数体左括号前有空格，关闭，0等同于off
    'space-before-function-paren': 0,
    // "no-constant-condition": 2,// 禁止在条件中使用常量表达式 if(true) if(1)
    "no-constant-condition": 0,// 在条件中使用常量表达式 if(true) if(1)
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
};
