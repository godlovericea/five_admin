<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">修改密码</h3>
      </div>

      <el-form-item prop="comCode">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.comCode"
          placeholder="请输入统一社会信用代码"
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
          placeholder="请输入登录账号"
          name="username"
          type="text"
          tabindex="1"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item prop="pwd">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.pwd"
          placeholder="请输入旧密码或重置密码"
          name="username"
          type="text"
          tabindex="1"
          autocomplete="off"
          show-password
        />
      </el-form-item>
      <el-form-item prop="newPwd">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.newPwd"
          placeholder="请输入新密码"
          name="username"
          type="text"
          tabindex="1"
          autocomplete="off"
          show-password
        />
      </el-form-item>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleReset('loginForm')">确定</el-button>
      <div class="regBox">
        <div style="text-align:right">
          <span style="font-size:14px;color:#ffffff">去</span>
          <el-button :loading="loading" type="text" style="font-size:14px" @click.native.prevent="handleLogin">登录</el-button>
        </div>
        
      </div>
    </el-form>
  </div>
</template>

<script>
import {updatePwd} from '../../api/collect'

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
        loginName: '',
        pwd: '',
        comCode:''
      },
      loginRules: {
        loginName:[{required: true, trigger: 'blur', message: '用户名不能为空'}],
        comCode: [{ required: true, trigger: 'blur', validator: comCodeRule }],
        pwd:[{required: true, trigger: 'blur', validator: passwordRule}],
        newPwd:[{required: true, trigger: 'blur', validator: passwordRule}]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      flag:false
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
    handleLogin() {
      this.$router.push({
        path:'/login'
      })
    },
    handleRegister(){
      this.$router.push({
        path:'/register'
      })
    },
    handleReset(ruleForm){
      this.$refs[ruleForm].validate((typeValid) => {
        if(typeValid){
          let myData={
              comCode:this.loginForm.comCode,
              loginName:this.loginForm.loginName,
              newPwd:this.loginForm.newPwd,
              pwd:this.loginForm.pwd
          }
          if(myData.pwd === myData.newPwd){
            this.$message.error('新旧密码相同，请更换密码')
            return false
          }
          updatePwd(myData)
          .then(res=>{
              if(res.code === 200){
                  this.$message({
                    type:"success",
                    message:'修改成功'
                  })
                  this.loginForm={}
              }else{
                  this.$message.error(res.message)
              }
          })
        }else{
          return false
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

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
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
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
  }
}
</style>
