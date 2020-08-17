<template>
    <div class="warnWrapper">
        <div class="divider"></div>
        <div class="formBox">
            <el-form :model="form" class="demo-form-inline" label-position="top">
                <el-form-item label="项目名称">
                    <el-input size="small" v-model="form.projectName" :disabled="notMeFlag" placeholder="请输入项目名称" style="width:400px" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="是否保密">
                    <el-switch v-model="form.isEncryption" active-text="保密" inactive-text="公开" :disabled="notMeFlag"></el-switch>
                    <p>保密项目，仅 自己 和 江苏省工业和信息化厅 可见，项目将以密文展示</p>
                </el-form-item>
                <el-form-item label="项目介绍">
                    <el-input size="small" v-model="form.projectIntroduce" :disabled="notMeFlag" placeholder="请输入项目介绍，不超过500字" type="textarea" :rows="6" maxlength="500" style="width:400px" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="项目投资总额">
                    <el-input size="small" v-model="form.projectMoney"
                        :disabled="notMeFlag"
                        oninput = "value=value.replace(/[^\d.]/g,'')"
                        onkeyup="value=value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3')"
                        placeholder="请输入项目投资总额，单位：万元" style="width:400px" autocomplete="off">
                    </el-input>
                </el-form-item>
                <el-form-item label="项目关键字">
                    <el-input size="small" v-model="projectKeyword1" :disabled="notMeFlag" placeholder="关键字一" style="width:200px" autocomplete="off"></el-input>
                    <el-input size="small" v-model="projectKeyword2" :disabled="notMeFlag" placeholder="关键字二" style="width:200px" autocomplete="off"></el-input>
                    <el-input size="small" v-model="projectKeyword3" :disabled="notMeFlag" placeholder="关键字三" style="width:200px" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="项目启动时间">
                    <el-date-picker v-model="form.projectStart" type="date" :disabled="notMeFlag" placeholder="选择日期" style="width:400px"></el-date-picker>
                </el-form-item>
                <el-form-item label="项目拟完成时间">
                    <el-date-picker v-model="form.projectEnd" type="date" :disabled="notMeFlag" placeholder="选择日期" style="width:400px"></el-date-picker>
                </el-form-item>
                <!-- <el-form-item label="项目图片">
                    <el-upload
                        class="upload-demo"
                        list-type="picture-card"
                        action="http://120.55.161.93:6012/qiniu/upload"
                        name="file"
                        :file-list="fileList"
                        :before-upload="beforeAvatarUpload"
                        :on-success="handleAvatarSuccess"
                        :on-remove="handleRemove"
                        :on-preview="handlePreview"
                        :limit="8">
                        <div style="height:148px;display:flex;align-items:center;justify-content:center">
                            <i class="el-icon-plus"></i>
                        </div>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                    <p>可上传8张图片，每张图片大小不超过4m（支持格式为：png、jpeg）。</p>
                </el-form-item> -->
                <el-form-item>
                    <div>
                        <el-button v-if="companyProjectId === 0" size="small" type="primary" :disabled="notMeFlag" round style="width:100px" @click="addPostData">提交</el-button>
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
                <el-button @click="goProductList">项目列表</el-button>
                <el-button type="primary" @click="addContinue">继续新增</el-button>
            </span>
        </el-dialog>
        <el-dialog title="驳回理由" :visible.sync="rejectDialog" width="400px" center :close-on-click-modal="false" custom-class="dialogClass">
            <el-input type="textarea" :rows="6" v-model="remarks" autocomplete="off"></el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="rejectDialog = false">取消</el-button>
                <el-button type="primary" @click="sureReject">确定</el-button>
            </span>
        </el-dialog>
    </div>    
</template>

<script>
import {addProject,getCompanyProject,checkCompanyProject,updateProject} from '../../api/collect'
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
            proCode:'AA12QQ',
            companyProjectId:0,
            dialogVisible:false,
            dialogImageUrl:'',
            adminFlag:false,
            rejectDialog:false,
            remarks:'',
            notMeFlag: false,
            projectKeyword1: '',
            projectKeyword2: '',
            projectKeyword3: '',
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
                companyProjectId:proId
            }
            getCompanyProject(myData)
            .then(res=>{
                this.form = res.result
                let keywordList = []
                if(this.form.projectKeyword.indexOf('、')){
                    keywordList = this.form.projectKeyword.split('、')
                    // console.log(keywordList)
                    this.projectKeyword1 = keywordList[0]
                    this.projectKeyword2 = keywordList[1]
                    this.projectKeyword3 = keywordList[2]
                } else {
                    this.projectKeyword1 = this.form.projectKeyword
                }
                // 0只读，1可读写
                this.notMeFlag = this.form.wr === 0 ? true : false;
                this.companyProjectId = this.form.companyProjectId
                if(this.form.isEncryption === 1){
                    this.form.isEncryption = true
                }else{
                    this.form.isEncryption = false
                }
                res.result.imgList.forEach(l=>{
                    this.fileList.push({
                        name:l.companyProjectImgId,
                        url:l.imgUrl
                    })
                })
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
                    isEncryption:this.form.isEncryption ? 1 : 0,
                    projectStart:this.form.projectStart,
                    projectEnd:this.form.projectEnd,
                    projectIntroduce:this.form.projectIntroduce,
                    projectKeyword1:this.projectKeyword1,
                    projectKeyword2:this.projectKeyword2,
                    projectKeyword3:this.projectKeyword3,
                    projectName:this.form.projectName,
                    imgList:this.photos,
                    projectMoney:this.form.projectMoney
                }
            addProject(myData)
            .then(res=>{
                if(res.code === 200){
                    this.centerDialogVisible = true
                }else{
                    this.$message.error(res.message)
                }
            })
        },
        updatePostData(){
            let id = parseInt(JSON.parse(sessionStorage.getItem("user")).companyId)
            let comName = JSON.parse(sessionStorage.getItem("user")).comName
            let myData={
                    comName:comName,
                    companyId:id,
                    isEncryption:this.form.isEncryption ? 1 : 0,
                    projectStart:this.form.projectStart,
                    projectEnd:this.form.projectEnd,
                    projectIntroduce:this.form.projectIntroduce,
                    projectKeyword1:this.projectKeyword1,
                    projectKeyword2:this.projectKeyword2,
                    projectKeyword3:this.projectKeyword3,
                    projectName:this.form.projectName,
                    imgList:this.photos,
                    projectMoney:this.form.projectMoney,
                    companyProjectId:this.companyProjectId
                }
            updateProject(myData)
            .then(res=>{
                if(res.code === 200){
                    this.$message({
                        type: 'success',
                        message: '修改成功'
                    })
                    this.getInfo()
                }else{
                    this.$message.error(res.message)
                }
            })
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
        handlePreview(file){
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        goProductList(){
            let user =JSON.parse(sessionStorage.getItem("user")) 
            this.$router.push({
                path:'/project/projectList',
                query:{
                    id:user.companyId
                }
            })
        },
        addContinue(){
            this.centerDialogVisible = false
            this.form = {}
        },
        overSure(){
            this.$confirm('此操作将审核通过该项目, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    let comName = JSON.parse(sessionStorage.getItem("user")).comName
                    let myData = {
                        companyProjectId:this.companyProjectId,
                        comName:comName,
                        state:'N',
                        rejected:''
                    }
                    if(!myData.rejected){
                        this.$message.error('驳回理由必填')
                        return false
                    }
                    checkCompanyProject(myData)
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
                companyProjectId:this.companyProjectId,
                state:'F',
                rejected:this.remarks
            }
            checkCompanyProject(myData)
            .then(res=>{
                this.$message({
                    type:'info',
                    message:'驳回成功'
                })
                this.rejectDialog = false
                this.remarks = ''
            })
        },
        backToList(){
            this.$router.push({
                path:'/project/projectList',
                query:{
                    id:this.$route.query.comId
                }
            })
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
