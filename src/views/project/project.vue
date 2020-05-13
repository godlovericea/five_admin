<template>
    <div class="warnWrapper">
        <div class="divider"></div>
        <div class="formBox">
            <el-form :model="form" class="demo-form-inline" label-width="120px">
                <el-form-item label="项目名称">
                    <el-input size="small" v-model="form.projectName" placeholder="请输入项目名称" style="width:400px"></el-input>
                </el-form-item>
                <el-form-item label="是否保密">
                    <el-switch v-model="form.pass" active-text="保密" inactive-text="公开"></el-switch>
                    <p>保密项目，仅 自己 和 江苏省工业和信息化厅 可见，项目将以密文展示</p>
                </el-form-item>
                <el-form-item label="项目介绍">
                    <el-input size="small" v-model="form.projectIntroduce" placeholder="请输入项目介绍，不超过500字" type="textarea" :rows="6" maxlength="500" style="width:400px"></el-input>
                </el-form-item>
                <el-form-item label="项目投资总额">
                    <el-input size="small" v-model="form.projectKeyword" placeholder="请输入项目投资总额，单位：万元" style="width:400px"></el-input>
                </el-form-item>
                <el-form-item label="项目关键字">
                    <el-input size="small" v-model="form.projectKeyword" placeholder="便于检索、项目对接，多个以顿号隔开" style="width:400px"></el-input>
                </el-form-item>
                <el-form-item label="项目启动时间">
                    <el-date-picker v-model="form.startdate" type="date" placeholder="选择日期" style="width:400px"></el-date-picker>
                </el-form-item>
                <el-form-item label="项目拟完成时间">
                    <el-date-picker v-model="form.date" type="date" placeholder="选择日期" style="width:400px"></el-date-picker>
                </el-form-item>
                <el-form-item label="项目图片">
                    <el-upload
                        class="upload-demo"
                        list-type="picture-card"
                        action="http://120.55.161.93:6011/qiniu/upload"
                        name="file"
                        :file-list="fileList"
                        :before-upload="beforeAvatarUpload"
                        :on-success="handleAvatarSuccess"
                        :on-remove="handleRemove"
                        :limit="8">
                        <div style="height:148px;display:flex;align-items:center;justify-content:center">
                            <i class="el-icon-plus"></i>
                        </div>
                    </el-upload>
                    <p>可上传8张图片，每张图片大小不超过4m（支持格式为：png、jpeg）。</p>
                </el-form-item>
                <el-form-item>
                    <el-tooltip class="item" effect="dark" content="点击提交之后，项目代码稍后弹出" placement="top">
                        <el-button size="small" type="primary" round style="width:200px" @click="postData">提交</el-button>
                    </el-tooltip>
                </el-form-item>
            </el-form>
        </div>
        <el-dialog title="提示" :visible.sync="centerDialogVisible" width="400px" center :close-on-click-modal="false" custom-class="dialogClass">
            <div style="text-align:center">
                <p>新增成功！</p>
                <i class="el-icon-circle-check"></i>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="goProductList">项目列表</el-button>
                <el-button type="primary" @click="addContinue">继续新增</el-button>
            </span>
        </el-dialog>
    </div>    
</template>

<script>
import {addProject,getCompanyProject} from '../../api/collect'
export default {
    data(){
        return{
            form:{
                isRecord:1,
                operateCom:'',
                video:''
            },
            photos:[],
            checkedCities:[],
            uploadData:{
                token:'',
                key:''
            },
            fileList:[],
            videofileList:[],
            editFileList:[],
            centerDialogVisible:false,
            proCode:'AA12QQ'
        }
    },
    mounted(){
        if(this.$route.query.id){
            this.getInfo()
        }
    },
    methods:{
        getInfo(){
            let id = parseInt(this.$route.query.id)
            let myData={
                companyProjectId:id
            }
            getCompanyProject(myData)
            .then(res=>{
                this.form = res.result
                this.industry = this.form.industry
                res.result.imgList.forEach(l=>{
                    this.fileList.push({
                        name:l.companyProjectImgId,
                        url:'http://qiniu.iwooke'+ l.imgUrl.substring(21)
                    })
                })
            })
        },
        postData(){
        this.centerDialogVisible = true
            let id = parseInt(JSON.parse(sessionStorage.getItem("user")).companyId)
            let comName = JSON.parse(sessionStorage.getItem("user")).comName
            let myData={
                    comName:comName,
                    companyId:id,
                    industry:this.industry,
                    isactualmake:this.form.isactualmake,
                    projectIntroduce:this.form.projectIntroduce,
                    projectKeyword:this.form.projectKeyword,
                    projectName:this.form.projectName,
                    imgList:this.photos
                }
            addProject(myData)
            .then(res=>{
                
            })
        },
        resetData(){

        },
        handleRemove(file, fileList) {
            // console.log(file)
            // console.log(fileList)
            this.editFileList = []
            fileList.forEach(l=>{
                this.editFileList.push('q3vbt7rr5.bkt.clouddn.com'+ l.url.substring(23))
            })
            // console.log(this.editFileList)
        },
        handleAvatarSuccess(res,file,fileList){
            // console.log(res)
            this.photos.push(res[0])
        },
        beforeAvatarUpload(file) {
            const isJPEG = file.type === 'image/jpeg';
            const isJPG = file.type === 'image/jpg';
            const isPNG = file.type === 'image/png';
            const isLt2M = file.size / 1024 / 1024 < 4
            if (!isLt2M) {
                this.$message.error('上传图片大小不能超过 4MB!')
                return false
            }
            if(!isJPG && !isPNG && !isJPEG){
                this.$message.error('上传图片只能是 JPG 或者 PNG 格式!')
                return false
            }
            return isLt2M && (!isJPG || !isPNG || !isJPEG)
        },
        handleVideoSuccess(res,file,fileList){
            this.form.video = res[0]
        },
        beforeVideoUpload(file) {
            const isJPEG = file.type === 'video/mp4';
            const isLt2M = file.size / 1024 / 1024 < 100
            if (!isLt2M) {
                this.$message.error('上传视频大小不能超过 100MB!')
                return false
            }
            if(!isJPEG){
                this.$message.error('上传视频只能是MP4格式!')
                return false
            }
            return  isLt2M && isJPEG
        },
        goProductList(){
            let user =JSON.parse(sessionStorage.getItem("user")) 
            this.$router.push({
                path:'/product/productList',
                query:{
                    id:user.companyId
                }
            })
        },
        addContinue(){
            this.centerDialogVisible = false
            this.form = {}
        }
    }
}
</script>

<style lang="less" scoped>
.warnWrapper{
    width: 100%;
    padding: 20px;
 
}
</style>
