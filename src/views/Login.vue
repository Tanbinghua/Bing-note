<template>
  <div id="login">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
      <div class="title-container">
        <h3 class="title">{{ signin ? $t('login.inTitle') : $t('login.upTitle') }}</h3>
        <lang-select class="set-language"/>
      </div>
      <el-form-item prop="username" v-if="!signin">
        <span class="svg-container">
          <i class="bing-icon-user"></i>
        </span>
        <el-input
          v-model="loginForm.username"
          :placeholder="$t('login.username')"
          name="username"
          type="text"
          auto-complete="on"
        />
      </el-form-item>
      <el-form-item prop="email">
        <span class="svg-container">
          <i class="el-icon-message"></i>
        </span>
        <el-input
          v-model="loginForm.email"
          :placeholder="$t('login.email')"
          name="email"
          type="text"
          auto-complete="on"
        />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <i class="bing-icon-password"></i>
        </span>
        <el-input
          :type="passwordType"
          v-model="loginForm.password"
          :placeholder="$t('login.password')"
          name="password"
          auto-complete="on"
          @keyup.enter.native="handleLogin" />
        <span class="show-pwd" @click="showPwd">
          <i :class="passwordType === 'password' ? 'bing-icon-password-not-view' : 'bing-icon-password-view'"></i>
        </span>
      </el-form-item>
      <el-form-item prop="code" v-if="!signin" class="code">
        <el-input
          type="text"
          v-model="loginForm.code"
          :placeholder="$t('login.code')"
          name="code" />
      </el-form-item>
      <el-button v-if="!signin" :disabled="waitTime !== ''" @click="sendEmail">{{ $t('login.getCode') + waitTime }}</el-button>
      <el-button :loading="loading" type="primary" style="width:100%;margin: 0;" @click.native.prevent="handleLogin">{{ signin ? $t('login.signin') : $t('login.signup') }}</el-button>
      <el-button type="text" @click="changeState(!signin)">{{ signin ? $t('login.signup') : $t('login.signin') }}</el-button>
    </el-form>
  </div>
</template>

<script>
import { isvalidateEmail } from '../utils/validate'
import LangSelect from '../components/LangSelect'
import { signUp, signIn, sendEmail } from '../utils/api'

export default {
  name: 'Login',
  components: { LangSelect },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The username can not be less than 6 word'))
      } else {
        callback()
      }
    }
    const validateEmail = (rule, value, callback) => {
      if (!isvalidateEmail(value)) {
        callback(new Error('Please enter the correct email'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: '',
        email: '',
        code: '',
      },
      waitTime: '',
      timer: null,
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        email: [{ required: true, trigger: 'blur', validator: validateEmail }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        code: [{ required: true, trigger: 'blur', message: 'Code can\'t be null!' }],
      },
      passwordType: 'password',
      loading: false,
      signin: true,
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          if (this.signin) {
            signIn({
              email: this.loginForm.email,
              password: this.loginForm.password,
            }).then(() => {
              this.$router.push({ path: this.redirect || '/' })
            }).catch(() => {
              this.loading = false
            })
          } else {
            signUp({
              name: this.loginForm.username,
              email: this.loginForm.email,
              password: this.loginForm.password,
              code: this.loginForm.code,
            }).then((data) => {
              this.signin = true
              this.loading = false
              this.$message(data.msg)
            }).catch(() => {
              this.loading = false
            })
          }
        } else {
          return false
        }
      })
    },
    changeState(flag) {
      this.signin = flag
      this.$refs.loginForm.resetFields()
    },
    sendEmail() {
      sendEmail({ email: this.loginForm.email }).then((data) => {
        this.$message(data.msg)
      })
      let time = 120
      this.timer = setInterval(() => {
        if (time > 0) {
          this.waitTime = '( ' + (time--) + 's )'
        } else {
          clearInterval(this.timer)
          this.waitTime = ''
        }
      }, 1000)
    }
  }

}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg:#283443;
$light_gray:#eee;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  #login .el-input input {
    color: $cursor;
    &::first-line {
      color: $light_gray;
    }
  }
}

/* reset element-ui css */
#login {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #283443;
$dark_gray: #889aa4;
$light_gray: #eee;

#login {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  .login-form {
    position: absolute;
    width: 404px;
    padding: 0 35px;
    margin: 0 auto;
    overflow: hidden;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .set-language {
      color: #fff;
      position: absolute;
      top: 5px;
      right: 0px;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
.code {
  width: 200px;
  display: inline-block;
  margin-right: 20px;
}
</style>
