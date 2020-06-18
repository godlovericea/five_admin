<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <span class="welcome">欢迎！</span>
      <span class="username">{{userName}}</span>
      <a class="alink" target="_blank" href="http://5gecomap.com/five/#/dashboard">可视化大屏</a>
      <el-button type="text" v-if="!adminFlag" @click="goproductsList">我的产品</el-button>
      <el-button type="text" v-if="!adminFlag" @click="goprojectList" >我的项目</el-button>
      <el-button type="text" v-if="!adminFlag" @click="goneedList">我的需求</el-button>
      
      <el-button type="text" @click="goAdmin" v-if="adminFlag">管理员入口</el-button>
      <el-button type="text" @click="gologs" v-if="adminFlag">日志</el-button>
      <el-button type="text" v-if="!adminFlag" @click="goHelp">帮助</el-button>
      <el-button type="text" v-if="adminFlag" @click="goAdminHelp">帮助</el-button>
      <el-button type="text" @click="logout">退出</el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  data(){
    return{
      userName:'南邮信息产业技术研究院',
      adminFlag:true
    }
  },
  mounted(){
    this.getUserName()
  },
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    logout() {
      sessionStorage.clear()
      this.$router.push(`/`)
    },
    getUserName(){
      if(sessionStorage.getItem("user")){
         let user =JSON.parse(sessionStorage.getItem("user"))
         this.userName = user.loginName
         if(user.isAdmin === 1){
           this.adminFlag = true
         }else{
           this.adminFlag = false
         }
      }else{
        this.$router.push(`/`)
      }
    },
    goproductsList(){
      let user =JSON.parse(sessionStorage.getItem("user")) 
      this.$router.push({
        path:'/product/productList',
        query:{
          id:user.companyId
        }
      })
    },
    goprojectList(){
      let user =JSON.parse(sessionStorage.getItem("user")) 
      this.$router.push({
        path:'/project/projectList',
        query:{
          id:user.companyId
        }
      })
    },
    goneedList(){
      let user =JSON.parse(sessionStorage.getItem("user"))
      this.$router.push({
        path:'/need/needList',
        query:{
          id:user.companyId
        }
      })
    },
    goAdmin(){
      // console.log("123")
      this.$router.push({
        path:'/admin/com'
      })
    },
    gologs(){
      this.$router.push({
        path:'/logs/logs'
      })
    },
    goHelp(){
      this.$router.push({
        path:'/help'
      })
    },
    goAdminHelp(){
      this.$router.push({
        path:'/adminHelp'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
    margin-right: 20px;
    .welcome{
      color: rgb(217, 83, 79);
      font-size: 14px;
    }
    .username{
      font-size: 14px;
    }

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
    .alink{
      font-size: 14px;
      color: #409EFF;
    }
  }
}
</style>
