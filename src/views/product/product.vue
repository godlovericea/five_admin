<template>
    <div class="warnWrapper">
        <div class="divider"></div>
        <div class="formBox">
            <el-form :model="form" class="demo-form-inline" label-position="top">
                <el-form-item label="产品名称">
                    <el-input size="small" v-model="form.productName" :disabled="notMeFlag" placeholder="请输入产品名称" style="width:400px" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="产品介绍(不超过200字)">
                    <el-input size="small" v-model="form.productIntroduce" :disabled="notMeFlag" type="textarea" placeholder="请输入产品介绍，不超过200字" :rows="4" maxlength="200" style="width:400px" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="产品技术参数">
                    <el-input size="small" v-model="form.productParameters" :disabled="notMeFlag" type="textarea" placeholder="请输入产品主要参数" :rows="4" style="width:400px" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="产品销售额(单位：万元)">
                    <el-input size="small" v-model="form.productSales" :disabled="notMeFlag" placeholder="请输入产品销售额，单位：万元"
                        oninput = "value=value.replace(/[^\d.]/g,'')"
                        onkeyup="value=value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3')"
                     style="width:400px" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="产品检索关键字（根据实际情况填写）">
                    <el-input size="small" v-model="form.productKeyword" placeholder="关键字一" style="width:200px" autocomplete="off" :disabled="notMeFlag"></el-input>
                    <el-input size="small" v-model="form.productKeyword" placeholder="关键字二" style="width:200px" autocomplete="off" :disabled="notMeFlag"></el-input>
                    <el-input size="small" v-model="form.productKeyword" placeholder="关键字三" style="width:200px" autocomplete="off" :disabled="notMeFlag"></el-input>
                </el-form-item>
                <el-form-item label="产品图片">
                    <el-upload
                        class="upload-demo"
                        list-type="picture-card"
                        action="http://5gecomap.com:6012/qiniu/upload"
                        name="file"
                        :file-list="fileList"
                        :before-upload="beforeAvatarUpload"
                        :on-success="handleAvatarSuccess"
                        :on-remove="handleRemove"
                        :on-preview="handlePreview"
                        :limit="8"
                        :disabled="notMeFlag">
                        <div style="height:148px;display:flex;align-items:center;justify-content:center">
                            <i class="el-icon-plus"></i>
                        </div>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                    <p>可上传8张图片，每张图片大小不超过4m（支持格式为：png、jpeg）。</p>
                </el-form-item>
                <el-form-item label="产品宣传视频">
                    <el-upload
                        class="upload-demo"
                        list-type="picture"
                        action="http://5gecomap.com:6012/qiniu/upload"
                        name="file"
                        :file-list="videofileList"
                        :before-upload="beforeVideoUpload"
                        :on-success="handleVideoSuccess"
                        :limit="1"
                        :disabled="notMeFlag">
                        <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                    <p>可上传1个视频，视频大小不超过100M（支持格式为：mp4）。</p>
                </el-form-item>
                <el-form-item label="视频预览" v-if="form.productVideo">
                    <video :src="form.myVideo" controls class="myVideo"></video>
                </el-form-item>
                <el-form-item label="驳回理由" v-if="form.rejected">
                    <el-input v-model="form.rejected" type="textarea" :rows="6" disabled autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <div>
                        <el-button v-if="companyProductId === 0" size="small" type="primary" round style="width:100px" :disabled="notMeFlag" @click="addPostData">提交</el-button>
                        <el-button v-else size="small" type="primary" style="width:100px" :disabled="notMeFlag" round @click="updatePostData">修改</el-button>
                    </div>
                </el-form-item>
            </el-form>
        </div>
        <el-dialog title="提示" :visible.sync="centerDialogVisible" width="400px" center :close-on-click-modal="false" custom-class="dialogClass">
            <div style="text-align:center">
                <p>成功！</p>
                <i class="el-icon-circle-check"></i>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="goProductList">产品列表</el-button>
                <el-button type="primary" @click="addContinue">继续新增</el-button>
            </span>
        </el-dialog>
    </div>    
</template>

<script>
import {addProduct,getProduct,updateProduct,checkCompanyProduct} from '@/api/collect'
export default {
    data(){
        return{
            form:{
                isRecord:1,
                operateCom:'',
                video:''
            },
            photos:[],
            uploadData:{
                token:'',
                key:''
            },
            fileList:[],
            videofileList:[],
            editFileList:[],
            centerDialogVisible:false,
            dialogVisible:false,
            dialogImageUrl:'',
            rejectDialog:false,
            remarks:'',
            adminFlag:false,
            companyProductId:0,
            removeFlag:false,
            removeTimeStamp:0,
            upTimeStamp:0,
            upFlag:false,
            productImgList:[],
            notMeFlag: false
        }
    },
    mounted(){
        this.checkAdmin()
        if(this.$route.query.proId){
            this.getInfo()
        }
    },
    methods:{
        getInfo(){
            let proId = parseInt(this.$route.query.proId)
            let myData={
                companyProductId:proId
            }
            getProduct(myData)
            .then(res=>{
                this.fileList = []
                this.form = res.result
                // 0只读，1可读写
                this.notMeFlag = this.form.wr === 0 ? true : false;
                this.companyProductId = this.form.companyProductId
                if(res.result.imgList){
                    res.result.imgList.forEach(l=>{
                        this.fileList.push({
                            name:l.companyProductImgId,
                            url:l.imgUrl
                        })
                    })
                }
                
                if(this.form.productVideo){
                    this.videofileList.push({
                        name:this.form.productName,
                        url:this.form.productVideo
                    })
                    this.form.myVideo = this.form.productVideo
                }
            })
        },
        checkAdmin(){
            let isAdmin = JSON.parse(sessionStorage.getItem("user")).isAdmin
            if(isAdmin === 1){
                this.adminFlag = true
            }else{
                this.adminFlag = false
            }
        },
        addPostData(){
            let id = parseInt(JSON.parse(sessionStorage.getItem("user")).companyId)
            let comName = JSON.parse(sessionStorage.getItem("user")).comName
            let myData={
                    comName:comName,
                    companyId:id,
                    productName:this.form.productName,
                    productIntroduce:this.form.productIntroduce,
                    productParameters:this.form.productParameters,
                    productKeyword:this.form.productKeyword,
                    productVideo:this.form.productVideo,
                    imgList:this.photos,
                    productSales:this.form.productSales
                }
            addProduct(myData)
            .then(res=>{
                if(res.code === 200){
                    this.centerDialogVisible = true
                }
            })
        },
        updatePostData(){
            let imgList = []
            if(!this.removeFlag && !this.upFlag){
                this.fileList.forEach(el=>{
                    imgList.push(el.url)
                })
            }else if(this.removeFlag && !this.upFlag){
                imgList = this.productImgList
            }else if(!this.removeFlag && this.upFlag){
                imgList = this.photos
            }else if(this.removeFlag && this.upFlag){
                if(this.removeTimeStamp > this.upTimeStamp){
                    imgList = this.productImgList
                }else{
                    imgList = this.photos
                }
            }
            let id = parseInt(JSON.parse(sessionStorage.getItem("user")).companyId)
            let comName = JSON.parse(sessionStorage.getItem("user")).comName
            let myData={
                    comName:comName,
                    companyId:id,
                    companyProductId:this.companyProductId,
                    productName:this.form.productName,
                    productIntroduce:this.form.productIntroduce,
                    productParameters:this.form.productParameters,
                    productKeyword:this.form.productKeyword,
                    productVideo:this.form.productVideo,
                    imgList:imgList,
                    productSales:this.form.productSales
                }
            updateProduct(myData)
            .then(res=>{
                if(res.code === 200){
                    this.$message({
                        type: 'success',
                        message: '修改成功!'
                    })
                }
            })
        },
        handleRemove(file, fileList) {
            // console.log(file)
            // console.log(fileList)
            this.productImgList = []
            this.removeFlag = true
            
            fileList.forEach(el=>{
                if(el.size){
                    this.productImgList.push(el.response[0])
                }else{
                    this.productImgList.push(el.url)
                }
            })
            this.removeTimeStamp =new Date().getTime()
        },
        handlePreview(file){
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        handleAvatarSuccess(res,file,fileList){
            this.upFlag = true
            // console.log(fileList)
            // console.log(res)
            this.photos =[]
            fileList.forEach(el=>{
                if(el.size){
                    this.photos.push(el.response[0])
                }else{
                    this.photos.push(el.url)
                }
            })
            this.upTimeStamp =new Date().getTime()
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
            this.form.productVideo = res[0]
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
            this.fileList =[]
        },
        backToList(){
            this.$router.push({
                path:'/product/productList',
                query:{
                    comId:this.$route.query.comId,
                    proId:this.$route.query.proId
                }
            })
        },
        overSure(){
            this.$confirm('此操作将审核通过该项目, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    let comName = JSON.parse(sessionStorage.getItem("user")).comName
                    let myData = {
                        companyProductId:this.companyProductId,
                        comName:comName,
                        state:'N',
                        rejected:''
                    }
                    checkCompanyProduct(myData)
                    .then(res => {
                        this.$message({
                            type:'success',
                            message:'通过'
                        })
                    })
                })
        },
        openReject(){
            this.rejectDialog = true
        },
        sureReject(){
            let comName = JSON.parse(sessionStorage.getItem("user")).comName
            const myData = {
                comName:comName,
                companyProductId:this.companyProductId,
                state:'F',
                rejected:this.remarks
            }
            if(!myData.rejected){
                this.$message.error('驳回理由必填')
                return false
            }
            checkCompanyProduct(myData)
            .then(res=>{
                this.$message({
                    type:'info',
                    message:'驳回成功'
                })
                this.rejectDialog = false
                this.remarks = ''
                // this.getInfo()
            })
        }
    }
}
</script>

<style lang="less" scoped>
.warnWrapper{
    width: 100%;
    padding: 20px;
    .myVideo{
        max-width: 300px;
        max-height: 150px;
    }
}
</style>
