<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">注册</h3>
      </div>

      <el-form-item prop="comName">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.comName"
          placeholder="公司名称"
          name="username"
          type="text"
          tabindex="1"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item prop="comType">
        <el-select v-model="loginForm.comType" placeholder="请选择企业类型" style="width:100%" class="selectClass">
            <el-option label="新型研发机构" value="1"></el-option>
            <el-option label="孵化器" value="2"></el-option>
            <el-option label="企业" value="3"></el-option>
            <el-option label="服务机构" value="4"></el-option>
            <el-option label="金融机构" value="5"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="comCode">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.comCode"
          placeholder="统一社会信用代码"
          name="username"
          type="text"
          tabindex="1"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item prop="loginName">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.loginName"
          placeholder="用户名"
          name="username"
          type="text"
          tabindex="1"
          maxlength="20"
          autocomplete="off"
        />
      </el-form-item>

      <el-form-item prop="pwd">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.pwd"
          :type="passwordType"
          placeholder="密码（8-20位数字加字符组合）"
          name="password"
          tabindex="2"
          autocomplete="off"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <el-form-item>
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="compasswordType"
          ref="compassword"
          v-model="loginForm.comfirmPwd"
          :type="compasswordType"
          placeholder="确认密码（8-20位数字加字符组合）"
          name="compassword"
          tabindex="3"
          autocomplete="off"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showcomfirmPwd">
          <svg-icon :icon-class="compasswordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleRegister('loginForm')">注册</el-button>
      <div class="regBox">
        <span style="font-size:14px;color:#ffffff">已有账号，点击</span>
        <el-button :loading="loading" type="text" style="font-size:14px" @click.native.prevent="handleLogin">登录</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import {register} from '../../api/collect'

export default {
  name: 'Login',
  data() {
    const comCodeRule = (rule, value, callback) => {
        const reg = /[0-9A-HJ-NPQRTUWXY]{18}/g
        if (!reg.test(value)) {
            callback(new Error('请输入正确的统一社会信用代码'))
        } else {
            callback()
        }
    }
    const passwordRule = (rule, value, callback) => {
        const reg = /^(?=.*?[0-9])(?=.*?[a-zA-Z])[0-9a-zA-Z]{8,20}$/g
        if (!reg.test(value)) {
            callback(new Error('请输入8-20位数字加字母组合密码'))
        } else {
            callback()
        }
    }
    return {
      loginForm: {
        comName:'',
        comType:null,
        comCode:'',
        loginName: '',
        pwd: '',
        comfirmPwd:''
      },
      loginRules: {
        loginName:[{required: true, trigger: 'blur', message: '用户名不能为空'}],
        comName:[{required: true, trigger: 'blur', message: '公司名称不能为空'}],
        comType:[{required: true, trigger: 'blur', message: '请选择公司类型'}],
        comCode: [{ required: true, trigger: 'blur', validator: comCodeRule }],
        pwd:[{required: true, trigger: 'blur', validator: passwordRule}]

      },
      loading: false,
      passwordType: 'password',
      compasswordType: 'password',
      redirect: undefined,
      comName:'',
      comType:null,
      comCode:'',
      loginName: '',
        pwd: '',
        comfirmPwd:''
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
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    showcomfirmPwd() {
      if (this.compasswordType === 'password') {
        this.compasswordType = ''
      } else {
        this.compasswordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.compassword.focus()
      })
    },
    handleLogin() {
      this.$router.push({
        path:'/'
      })
    },
    handleRegister(ruleForm){
        if(this.loginForm.pwd !== this.loginForm.comfirmPwd){
            this.$message.error("两次密码不一致，请重新输入")
            this.pwd = ''
            this.comfirmPwd = ''
            return false
        }
        this.$refs[ruleForm].validate((typeValid) => {
            if (typeValid) {
                let myData={
                    comName:this.loginForm.comName,
                    comType:this.loginForm.comType,
                    comCode:this.loginForm.comCode,
                    loginName: this.loginForm.loginName,
                    pwd: this.loginForm.pwd
                }
                register(myData)
                .then(res=>{
                  if(res.code === 200){
                      this.$router.push({
                            path:'/'
                        })
                  }else{
                      this.$message.error(res.message)
                  }
                    
                })
            }
        })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
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
        box-shadow: 0 0 0px 1000px $bg inset !important;
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
  .selectClass{
    .el-input{
      width: 100%;
    }
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  // .tips {
  //   font-size: 14px;
  //   color: #fff;
  //   margin-bottom: 10px;

  //   span {
  //     &:first-of-type {
  //       margin-right: 16px;
  //     }
  //   }
  // }

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
  .regBox{
    text-align: right;
  }
  .tips{
    font-size: 14px;
    color: #889aa4;
    line-height: 24px;
  }
}
</style>
