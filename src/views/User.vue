<template>
  <div class="user">
    <h1>用户登录Login组件</h1>
    <!-- 当前在notlogin页面，点击按钮后，x_token没有了，路由全局导航守卫开始作用了 -->
    <!-- 点击button,清除了x-token,当时控制台报一个错误：Uncaught (in promise) 
    NavigationDuplicated: Avoided redundant navigation to current location: "/home/guard/login".
    意为，清除了x-token导航到了同一个路由 -->
    <!-- <button @click="clearToken">清除localStorage中的x_token</button> -->
    <!-- model和rules都写在data函数的return返回数据中，而校验规则写在data函数体中，return关键字之前 -->
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="myRef"
      label-width="100px"
    >
      <el-form-item label="用户名" prop="user">
        <el-input
          type="text"
          v-model="ruleForm.user"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input
          type="password"
          v-model="ruleForm.pass"
          autocomplete="off"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('myRef')">提交</el-button>
        <el-button @click="resetForm('myRef')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'User',
  data() {
    // 技巧：回调函数中，直接callback('字符串')，不满足的规则可以直接打印到控制台；但是使用callback(new Error(字符串))时，
    // 控制台中看不到打印的字符串信息
    let validUser = (rule, value, callback) => {
      // 用户名比较简单，设置为字母或数字，但位数在3到16位即可
      const regExp = /^[a-zA-Z0-9]{3,16}$/;
      // 一、value===''这个分支表示没有点击文本输入框，直接就点击了提交，给出的提示
      // 顶层的else表示至少点击了文本输入框，确实点击了文本框，分为点击了输入了内容和点击了未输入任何内容两种情况
      if (value === '') {
        callback(new Error('请输入用户名'));
      } else {
        if (this.ruleForm.user !== '') {
          // 注意：当前版本的element-ui为2.4.5，并不识别在其他高版本中的validateField('user')方法，
          //  this.$refs.ruleForm.validateField('user');强行使用该语句报错如下：
          // Vue warn]: Error in v-on handler: "RangeError: Maximum call stack size exceeded"
          if (!regExp.test(this.ruleForm.user)) {
            callback('你输入的用户名长度不在3到16个字符之间');
          } else {
            callback();
          }
        }
      }
    };
    let validPass = (rule, value, callback) => {
      // 密码必须为:1.数字和字母的组合，既不能是纯数字也不能是纯字母2.长度为3到16位
      // ?!表示负前瞻，以为前面能是，https://blog.csdn.net/csm0912/article/details/81206848
      // 正则表达式的探究：https://www.jianshu.com/p/56d589ea48a9
      const regExp = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9a-zA-Z]{3,16}$/;
      // let regExp = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{3,16}$/;
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.pass !== '') {
          // 输入的密码不能为纯数字或者纯字母,正则表达式的使用：
          if (!regExp.test(this.ruleForm.pass)) {
            callback(
              '输入的密码必须是3~18的数字和字母组合，不能是纯数字，也不能是纯字母'
            );
          } else {
            callback();
          }
        }
      }
    };
    return {
      ruleForm: {
        user: 'admin',
        pass: '123f',
      },
      rules: {
        user: [
          {
            required: true,
            validator: validUser,// validator验证器、校验器、校验程序
            // min: 2,
            // max: 16,
            // message表示失去焦点后，文本框下方出现的提示文字
            message: '哈哈，请输入正确的用户名',
            trigger: 'blur', // 失去焦点后，就能触发，并不需要点击提交按钮
          },
        ],
        pass: [
          {
            required: true,
            // 字符数量可以在正则中设置
            // min: 2,
            // max: 16,
            validator: validPass,
            message: '咳咳，请输入正确的密码~',
            trigger: 'blur',
          },
        ],
      },
    };
  },
  methods: {
    // 登录成功后，产生所需要的32位（需要其他位数，e传入其他值即可）随机字符串
    generateStr(e) {
      e = e || 32;
      const t =
        'ABCDEDFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let n = '';
      for (let i = 0; i < e; i++) {
        n += t.charAt(Math.floor(Math.random() * t.length));
      }
      return n;
    },
    // 清除token的事件
    // clearToken() {
    //   localStorage.clear();
    //   // 编程式导航跳转至login页面
    //   this.$router.push({ name: 'Login' });
    // },
    submitForm(formName) {
      // 注意区分：在规则中使用的是validator这个单词，而不是validate
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          console.log('Error Submit');
          return false;
        }
        this.$message({ message: '恭喜你登录成功', type: 'success' });
        // 登录成功后，添加x-token随机字符串
        localStorage.setItem('x-token', this.generateStr(32));
        // 登录成功后，编程式导航，进入/home界面
        this.$router.push('/home');
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
/**
 * 
 * @ 正则表达式的用法
 * 
 * 
 * 
 */ 
</script>
<style lang="less" scoped>
.login_container {
  form {
    table {
      width: 50%;
      margin: 0 auto;
      tr {
        td.first {
          width: 15%;
        }
        td.last {
          width: 85%;
          text-align: left;
          input {
            width: 100%;
          }
        }
      }
    }
  }
}
</style>
