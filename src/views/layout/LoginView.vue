<template>
  <div class="login">
    <a-form-model ref="loginForm" :model="loginForm" :rules="rules" v-bind="layout">
      <a-form-model-item has-feedback label="邮箱" prop="email">
        <a-input v-model="loginForm.email" type="text" autocomplete="off" />
      </a-form-model-item>
      <a-form-model-item has-feedback label="密码" prop="password">
        <a-input v-model="loginForm.password" type="password" autocomplete="off" />
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 18, offset: 4 }">
        <a-button type="primary" @click="submitForm('loginForm')">
          Submit
        </a-button>
        <a-button style="margin-left: 10px" @click="resetForm('loginForm')">
          Reset
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>
import userApi from '@/api/user';

export default {
  data() {
    const emailRegx = /^[\w-]+@[\w.-]+.com$/;
    const validateEmail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入邮箱账号'));
      } else if (!emailRegx.test(value)) {
        callback(new Error('邮箱格式不正确'));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        email: '',
        password: '',
      },
      rules: {
        email: [{ validator: validateEmail, trigger: 'change' }],
        password: [{ validator: validatePassword, trigger: 'change' }],
      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 18 },
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          try {
            const userInfo = await userApi.login(this.loginForm);
            this.$store.dispatch('setUserInfo', userInfo);
            this.$router.push({ name: 'home' });
          } catch (error) {
            this.$message.error(error);
          }
          return true;
        }
        return false;
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="less">
@import url('~@/assets/css/login-view.less');
</style>
