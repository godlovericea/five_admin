<template>
    <div class="warnWrapper">
        <div class="divider"></div>
        <div class="formBox">
            <el-form :model="form" class="demo-form-inline" label-width="200px">
                    <el-form-item label="主场景分类">
                        <el-radio-group v-model="form.sceneClassification">
                            <el-radio :label="1">智慧政务</el-radio>
                            <el-radio :label="2">智慧民生</el-radio>
                            <el-radio :label="3">智慧产业</el-radio>
                            <el-radio :label="4">疫情防控</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="场景名称">
                        <el-input size="small" v-model="form.scene" placeholder="如：以人找房" style="width:400px"></el-input>
                    </el-form-item>
                    <el-form-item label="场景的定义">
                        <el-input size="small" v-model="form.scenarioDefined" type="textarea" placeholder="如：人口，法人与房屋进行关联，实现以人找房，以房查人。举例，以一栋楼为例，这栋楼里有131个居民，居民的个人信息上面我们可以查看到，但是有一些个人隐私问题，我们做了脱敏的处理，同时这里面有21个法人，法人的基本信息，他的姓名，联系方式，经营范围，经营方式和成立日期等信息，在上面我们都可以查看到" :rows="6" maxlength="300" style="width:400px"></el-input>
                    </el-form-item>
                    <el-form-item label="场景关键字">
                        <el-input size="small" v-model="form.scenarioKeyword" placeholder="如:人、房、以人找房、人房管理（必填、以顿号分割）" style="width:400px"></el-input>
                    </el-form-item>
                    <el-form-item label="上传图片" prop="photos">
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
                    <el-form-item label="上传视频">
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
                    <el-form-item>
                        <el-button size="small" type="primary" style="width:100px" @click="postData">提交</el-button>
                        <el-button size="small" type="info" @click="resetData">重置</el-button>
                    </el-form-item>
                </el-form>
        </div>
        
    </div>    
</template>

<script>
import {addCompanyScene,getCompanyScene} from '../../api/collect'
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
        }
    },
    mounted(){
        if(this.$route.query.sceanId){
            this.getInfo()
        }
    },
    methods:{
        getInfo(){
            let id = parseInt(this.$route.query.sceanId)
            let myData={
                companySceneId:id
            }
            getCompanyScene(myData)
            .then(res=>{
                this.form = res.result
                this.form.sceneClassification = parseInt(res.result.sceneClassification)
                res.result.companySceneImgDTOList.forEach(l=>{
                    this.fileList.push({
                        name:l.companySceneId,
                        url:'http://qiniu.iwooke'+ l.scenarioImg.substring(21)
                    })
                })
                if(this.form.video){
                    this.videofileList.push({
                        name:this.form.scene,
                        // url:'http://'+ this.form.video
                        url:'http://qiniu.iwooke'+ this.form.video.substring(21)
                    })
                }
            })
        },
       postData(){
           let id = parseInt(JSON.parse(sessionStorage.getItem("user")).companyId)
           let comName = JSON.parse(sessionStorage.getItem("user")).comName
           let myData={}
           if(this.$route.query.sceanId){
               myData={
                    comName:comName,
                    companyId:this.$route.query.comId,
                    sceneId:this.$route.query.sceanId,
                    sceneClassification:this.form.sceneClassification,
                    scene:this.form.scene,
                    scenarioDefined:this.form.scenarioDefined,
                    scenarioKeyword:this.form.scenarioKeyword,
                    video:this.form.video,
                    scenarioImgList:this.editFileList.concat(this.photos)
                }
           }else{
               myData={
                    comName:comName,
                    companyId:id,
                    sceneClassification:this.form.sceneClassification,
                    scene:this.form.scene,
                    scenarioDefined:this.form.scenarioDefined,
                    scenarioKeyword:this.form.scenarioKeyword,
                    video:this.form.video,
                    scenarioImgList:this.photos
                }
           }
           addCompanyScene(myData)
           .then(res=>{
               console.log(res)
               this.fileList = []
                this.videoUrl = ''
                this.form.sceneClassification = ''
                this.form.scene = ''
                this.form.scenarioDefined = ''
                this.form.scenarioKeyword = ''
                this.photos = []
                this.form.video = ''
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

    }
}
</script>

<style lang="less" scoped>
.warnWrapper{
    width: 100%;
    padding: 20px;
 
}
</style>
