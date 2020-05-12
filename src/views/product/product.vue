<template>
    <div class="warnWrapper">
        <div class="divider"></div>
        <div class="formBox">
            <el-form :model="form" class="demo-form-inline" label-width="120px">
                <el-form-item label="产品名称">
                    <el-input size="small" v-model="form.productName" placeholder="请输入产品名称" style="width:400px"></el-input>
                </el-form-item>
                <el-form-item label="产品介绍">
                    <el-input size="small" v-model="form.productIntroduce" type="textarea" placeholder="请输入产品介绍，不超过200字" :rows="4" maxlength="200" style="width:400px"></el-input>
                </el-form-item>
                <el-form-item label="产品技术参数">
                    <el-input size="small" v-model="form.productIntroduce" type="textarea" placeholder="请输入产品主要参数" :rows="4" style="width:400px"></el-input>
                </el-form-item>
                <el-form-item label="产品销售额">
                    <el-input size="small" v-model="form.productName" placeholder="请输入产品销售额，单位：万元" style="width:400px"></el-input>
                </el-form-item>
                <el-form-item label="产品检索关键字">
                    <el-input size="small" v-model="form.productKeyword" placeholder="便于检索、产品对接。多个以顿号分割。" style="width:400px"></el-input>
                </el-form-item>
                <el-form-item label="产品图片" prop="photos">
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
                <el-form-item label="产品宣传视频">
                    <el-upload
                        class="upload-demo"
                        list-type="picture"
                        action="http://120.55.161.93:6011/qiniu/upload"
                        name="file"
                        :file-list="videofileList"
                        :before-upload="beforeVideoUpload"
                        :on-success="handleVideoSuccess"
                        :limit="8">
                        <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                    <p>可上传1个视频，视频大小不超过100M（支持格式为：mp4）。</p>
                </el-form-item>
                <el-form-item label="视频预览" v-if="form.productVideo">
                    <video :src="form.myVideo" controls class="myVideo"></video>
                </el-form-item>
                <el-form-item>
                    <el-button size="small" type="primary" round style="width:200px" @click="postData">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-dialog title="提示" :visible.sync="centerDialogVisible" width="400px" center :close-on-click-modal="false">
            <div style="text-align:center">
                <p>新增成功！</p>
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
import {addProduct,getProduct} from '@/api/collect'
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
            centerDialogVisible:false
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
                companyProductId:id
            }
            getProduct(myData)
            .then(res=>{
                this.form = res.result
                this.industry = this.form.industry
                res.result.imgList.forEach(l=>{
                    this.fileList.push({
                        name:l.companyProductImgId,
                        url:'http://qiniu.iwooke'+ l.imgUrl.substring(21)
                    })
                })
                if(this.form.productVideo){
                    this.videofileList.push({
                        name:this.form.productName,
                        // url:'http://'+ this.form.video
                        url:'http://qiniu.iwooke'+ this.form.productVideo.substring(21)
                    })
                    this.form.myVideo = 'http://qiniu.iwooke'+ this.form.productVideo.substring(21)
                }
            })
        },
        postData(){
            this.centerDialogVisible = true
            let id = parseInt(JSON.parse(sessionStorage.getItem("user")).companyId)
            let comName = JSON.parse(sessionStorage.getItem("user")).comName
            let myData={
                    comName:comName,
                    companyId:id,
                    productName:this.form.productName,
                    productIntroduce:this.form.productIntroduce,
                    industry:this.industry,
                    scenarioDefined:this.form.scenarioDefined,
                    productKeyword:this.form.productKeyword,
                    productVideo:this.form.productVideo,
                    imgList:this.photos
                }
            addProduct(myData)
            .then(res=>{
                console.log(res)
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
    .myVideo{
        max-width: 300px;
        max-height: 150px;
    }
}
</style>
