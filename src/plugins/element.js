import Vue from 'vue';
import { Button, Row, Form, FormItem, Input, Message } from 'element-ui';

Vue.use(Row);
Vue.use(Button);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
// Message消息提示有些特，需要使用原型，全局定义，而不是使用Vue.use()的形式
Vue.prototype.$message = Message;
