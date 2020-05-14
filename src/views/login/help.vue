<template>
    <div class="tabBox">
        <div class="helpHeaderBox">
            <h2>帮助文档</h2>
        </div>
        <div class="helpContent">
            <p class="contentTitle">一、使用流程介绍</p>
            <p>1，注册</p>
            <p>新企业用户在登录页面上点击 <el-button type="text" @click="goRegister">注册</el-button> 按钮，进入公司注册页面。</p>
            <p>请正确填写公司全称、社会统一信用代码，并牢记登录名。其中，<span class="tipsBtn">社会统一信用代码</span>是用户唯一身份标识。</p>
            <p>2，登录</p>
            <p>输入正确的登录名和密码，点击 <el-button type="text" @click="goLogin">登录</el-button> 按钮，即可进入系统。</p>
            <p>3，基本信息</p>
            <p>用户成功登录系统后，进入【基本信息】页面，填写基本信息，每次填写完毕，需点击 <span class="tipsBtn">提交</span> 或者 <span class="tipsBtn">修改</span> 按钮，方可保存信息。</p>
            <p>每次点击提交或者修改按钮，系统会自动保存之前未完成的信息，可在此基础上修改。</p>
            <p>4，主营产品</p>
            <p>用户点击菜单栏【主营产品】，进入主营产品填报页面，请根据产品实际情况填写信息</p>
            <p class="tipsBtn">注意：</p>
            <p>(1)，主营产品图片最多上传8张，单张图大小不超过4M，格式为png或jpeg</p>
            <p>(2)，主营产品视频最多上传1个，格式为MP4格式，如果不是该格式，请转换后上传，否则系统无法播放</p>
            <p class="tipsBtn">(3)，图片或者视频上传成功的标志为：右上角出现绿色对号。</p>
            <p class="tipsBtn">进度条出现100%，并不代表完全上传成功。如下图所示状态才为成功案例：</p>
            <div>
                <img src="@/assets/help/shili.png" alt="">
            </div>
            <p>5，在研项目</p>
            <p class="tipsBtn">在研项目是否保密，默认是公开，如该项目是保密项目，请点击开关切换成保密。</p>
            <p>6，合作需求</p>
            <p>合作需求分为 主营产品合作需求，在研项目合作需求，其他类型合作需求。请按照实际合作需求填写。</p>
            <p class="tipsBtn">合作需求是否保密，默认是公开，如该需求是保密需求，请点击开关切换成保密。</p>
        </div>
        <div class="concatBox">
            <p class="contentTitle">二、产业生态图QQ交流群(群号：657407015)</p>
            <p class="tipsBtn">进群之后，请勿添加非管理员账号，避免造成损失。</p>
            <div class="">
                <img src="../../assets/help/qq.png" alt="" class="qqPng">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    methods:{
        goLogin(){
            this.$router.push({
                path:'/'
            })
        },
        goRegister(){
            this.$router.push({
                path:'/register'
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.tabBox{
    padding: 20px;
    background-color: #2d3a4b;
    // height: 100%;
    .helpHeaderBox{
        width: 100%;
        text-align: center;
        color: #ffffff;
    }
    .warnTips{
        color: #f4f4f4;
        font-size: 18px;
    }
    .helpContent{
        font-size: 16px;
        color: #fff;
        width: 90%;
        margin: 0 auto;
        .contentTitle{
            font-size: 20px;
        }
        .stepsPng{
            width: 60%;
        }
        .tipsBtn{
            color: red;
        }
    }
    .concatBox{
        width: 90%;
        margin: 0 auto;
        color: #fff;
        font-size: 20px;
        .tipsBtn{
            color: red;
        }
    }
    .pagnation{
        padding: 20px 0;
        text-align: center;
    }
}
</style>