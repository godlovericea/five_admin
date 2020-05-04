<template>
    <div class="warnWrapper">
        <div class="divider"></div>
        <div class="formBox">
            <el-form :model="form" class="demo-form-inline" label-width="200px">
                <el-form-item label="所属行业">
                    <el-cascader v-model="industry" :options="industyList" style="width:400px"></el-cascader>
                </el-form-item>
                <el-form-item label="产品名称">
                    <el-input size="small" v-model="form.productName" placeholder="产品名称" style="width:400px"></el-input>
                </el-form-item>
                <el-form-item label="产品介绍">
                    <el-input size="small" v-model="form.productIntroduce" type="textarea" placeholder="" :rows="6" maxlength="300" style="width:400px"></el-input>
                </el-form-item>
                <el-form-item label="产品搜索关键字">
                    <el-input size="small" v-model="form.productKeyword" placeholder="如：光纤、电缆、无人驾驶，多个以顿号分割" style="width:400px"></el-input>
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
                    <el-button size="small" type="primary" style="width:100px" @click="postData">提交</el-button>
                    <el-button size="small" type="info" @click="resetData">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>    
</template>

<script>
import {addProduct,getProduct} from '@/api/collect'
export default {
    data(){
        return{
            industry:[],
            industyList:[
                {
                    value: 1,
                    label: '上游产业链',
                    children:[
                        {
                            value: 11,
                            label: '芯片',
                            children:[
                                {
                                    value: 111,
                                    label: '光芯片',
                                },
                                {
                                    value: 112,
                                    label: '射频芯片',
                                },
                                {
                                    value: 113,
                                    label: '基带芯片',
                                },
                                {
                                    value: 114,
                                    label: '其他芯片',
                                }
                            ]
                        },
                        {
                            value: 12,
                            label: '射频器件及模块',
                            children:[
                                {
                                    value: 121,
                                    label: '射频模块',
                                },
                                {
                                    value: 122,
                                    label: '滤波器',
                                },
                                {
                                    value: 123,
                                    label: '功率放大器',
                                },
                                {
                                    value: 124,
                                    label: '射频开关',
                                },
                                {
                                    value: 125,
                                    label: 'PCB',
                                }
                            ]
                        },
                        {
                            value: 13,
                            label: '光器件及模块',
                            children:[
                                {
                                    value: 131,
                                    label: '光模块',
                                },
                                {
                                    value: 132,
                                    label: '有源光器件',
                                },
                                {
                                    value: 133,
                                    label: '无源光器件',
                                },
                                {
                                    value: 134,
                                    label: '波分复用器',
                                }
                            ]
                        },
                        {
                            value: 14,
                            label: '传播介质',
                            children:[
                                {
                                    value: 141,
                                    label: '光纤光缆光棒',
                                },
                                {
                                    value: 142,
                                    label: '射频电缆(含连接器)',
                                }
                            ]
                        },
                        {
                            value: 15,
                            label: '天线',
                            children:[
                                {
                                    value: 151,
                                    label: '基站天线',
                                },
                                {
                                    value: 152,
                                    label: '小天线',
                                }
                            ]
                        }
                    ]
                },
                {
                    value: 2,
                    label: '中游产业链',
                    children:[
                        {
                           value: 21,
                            label: '传播设备',
                            children:[
                                {
                                    value: 211,
                                    label: '宏基站',
                                },
                                {
                                    value: 212,
                                    label: '微基站'
                                }
                            ]
                        },
                        {
                           value: 22,
                            label: '网络设备',
                            children:[
                                {
                                    value: 221,
                                    label: '交换机',
                                },
                                {
                                    value: 222,
                                    label: '路由器',
                                },
                                {
                                    value: 223,
                                    label: '服务器',
                                }
                            ]
                        },
                        {
                           value: 23,
                            label: '网络规划服务',
                            children:[
                                {
                                    value: 231,
                                    label: '规划设计',
                                },
                                {
                                    value: 232,
                                    label: 'SDN/NFV',
                                },
                                {
                                    value: 233,
                                    label: '网络优化和维护',
                                }
                            ]
                        }
                    ]
                },
                {
                    value: 3,
                    label: '下游产业链',
                    children:[
                        {
                            value: 31,
                            label: '终端设备',
                            children:[
                                {
                                    value: 311,
                                    label: '手机终端'
                                },
                                {
                                    value: 312,
                                    label: '智能终端'
                                },
                                {
                                    value: 313,
                                    label: '工业设备'
                                },
                                {
                                    value: 314,
                                    label: '智能穿戴设备'
                                },
                                
                            ]
                        },
                        {
                            value: 32,
                            label: '应用服务',
                            children:[
                                {
                                    value: 321,
                                    label: '工业互联网'
                                },
                                {
                                    value: 322,
                                    label: '车联网'
                                },
                                {
                                    value: 323,
                                    label: '智慧城市'
                                },
                                {
                                    value: 324,
                                    label: '智慧医疗'
                                },
                                {
                                    value: 325,
                                    label: '智慧教育'
                                },
                                {
                                    value: 326,
                                    label: '高清视频'
                                },
                                {
                                    value: 327,
                                    label: 'VR/AR'
                                }
                            ]
                        }
                    ]
                },
            ],
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
