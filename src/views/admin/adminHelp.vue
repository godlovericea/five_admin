<template>
    <div class="tabBox">
        <div class="helpHeaderBox">
            <h2>管理员帮助文档</h2>
        </div>
        <div class="helpContent">
            <p class="contentTitle">一、使用流程介绍</p>
            <p>企业填报完毕，进入待审核状态，审核通过才可以在5G产业联盟生态图展示。审核状态有：待审核、通过、驳回3种。企业用户每次提交或者修改，状态都为待审核状态。</p>
            <p class="tipsBtn">管理员无权限修改公司填报的信息，只有查看功能。如果审核意见为通过，该企业填报的信息会在生态图大屏幕展示；如果管理员选择驳回，请输入驳回理由，企业在登录系统之后，可以看到驳回意见。</p>
            <p>1，审核公司基本信息</p>
            <p>2，审核公司主营产品</p>
            <p>3，审核公司在研项目</p>
            <p>4，审核公司合作需求</p>
        </div>
        <div class="concatBox">
            <p class="contentTitle">二、产业生态图QQ交流群(群号：985078520)</p>
            <p class="tipsBtn">此群为5G产业联盟管理员使用，请勿拉非系统管理员账号</p>
            <div class="">
                <img src="../../assets/help/adminqq.png" alt="" class="qqPng">
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
    // background-color: #2d3a4b;
    // height: 100%;
    .helpHeaderBox{
        width: 100%;
        text-align: center;
        color: #282828;
    }
    .warnTips{
        color: #f4f4f4;
        font-size: 18px;
    }
    .helpContent{
        font-size: 16px;
        color: #282828;
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
        color: #282828;
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