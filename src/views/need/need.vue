<template>
    <div class="warnWrapper">
        <div class="divider"></div>
        <div class="formBox">
            <el-form :model="form" class="demo-form-inline" label-width="120px">
                <el-form-item label="需求名称">
                    <el-input size="small" v-model="form.money" placeholder="以万元单位" style="width:400px"></el-input>
                </el-form-item>
                <el-form-item label="需求分类">
                    <el-checkbox-group v-model="form.demandClass" @change="handleChangeCheckBox">
                        <el-checkbox :label="1">资金支持</el-checkbox>
                        <el-checkbox :label="2">人才支持</el-checkbox>
                        <el-checkbox :label="3">技术支持</el-checkbox>
                        <el-checkbox :label="4">市场支持</el-checkbox>
                        <el-checkbox :label="5">其他</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="项目/课题">
                    <el-input size="small" v-model="form.money" placeholder="请输入需要合作的项目或者课题" style="width:400px"></el-input>
                </el-form-item>
                <el-form-item label="需求简述">
                    <el-input size="small" v-model="form.demandIndo" type="textarea" placeholder="如：在研****课题，需要模式识别专业博士2名，硕士5名，市场推广专员20名等，资金***万元" :rows="6" maxlength="300" style="width:400px"></el-input>
                </el-form-item>
                <el-form-item label="上传附件" prop="photos">
                    <el-upload
                        class="upload-demo"
                        action="http://120.55.161.93:6012/file/upload"
                        :on-change="handleChange"
                        :on-success="handleAvatarSuccess"
                        :file-list="fileList">
                        <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                    <p>请上传具体需求文档</p>
                </el-form-item>
                <el-form-item>
                    <el-button size="small" type="primary" style="width:100px" @click="postData">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>    
</template>

<script>
import {addDemand,getCompanyDemand} from '../../api/collect'
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
                video:'',
                demandClass:[]
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
            flag:{
                moneyFlag:false,
                personFlag:false,
                techFlag:false,
                marketFlag:false,
                otherFlag:false
            },
            checkBoxList:[]
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
                companySceneId:id
            }
            getCompanyDemand(myData)
            .then(res=>{
                this.form = res.result
                this.industry = this.form.industry
            })
        },
        postData(){
            let id = parseInt(JSON.parse(sessionStorage.getItem("user")).companyId)
            let comName = JSON.parse(sessionStorage.getItem("user")).comName
            let myData={
                comName:comName,
                companyId:id,
                attachmentUrl:this.form.attachmentUrl,
                demandClass:this.form.demandClass,
                demandIndo:this.form.demandIndo,
                industry:this.industry
            }
            addDemand(myData)
            .then(res=>{
                this.$message({
                    type:'success',
                    message:'提交成功'
                })
            })
        },
        resetData(){

        },
        handleChange(file){
            
        },
        handleAvatarSuccess(file){
            console.log(file.result.url)
            this.form.attachmentUrl = file.result.url
        },
        handleChangeCheckBox(value){
            console.log(value)
            this.demandClass = value
            value.forEach(l=>{
                if(l===1){
                    this.flag.moneyFlag = true
                }
                if(l===2){
                    this.flag.personFlag = true
                }
                if(l===3){
                    this.flag.techFlag = true
                }
                if(l===4){
                    this.flag.marketFlag = true
                }
                if(l===5){
                    this.form.sceneClassification = [5]
                    this.flag.moneyFlag = false
                    this.flag.personFlag = false
                    this.flag.techFlag = false
                    this.flag.marketFlag = false
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
