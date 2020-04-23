<template>
    <div class="warnWrapper">
        <div class="divider"></div>
        <div class="formBox">
            <el-form :model="form" class="demo-form-inline" label-width="200px">
                    <el-form-item label="公司名称">
                        <el-input size="small" v-model="form.comName" placeholder="请输入公司名称" style="width:400px"></el-input>
                    </el-form-item>
                    <el-form-item label="公司简称">
                        <el-input size="small" v-model="form.litComName" placeholder="请输入公司简称" style="width:400px"></el-input>
                    </el-form-item>
                    <el-form-item label="企业资质">
                        <el-radio-group v-model="form.econkind">
                            <el-radio :label="1">规上</el-radio>
                            <el-radio :label="2">高企</el-radio>
                            <el-radio :label="3">独角兽</el-radio>
                            <el-radio :label="4">瞪羚羊</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="通讯地址">
                        <el-input size="small" v-model="form.adressInfo" placeholder="请输入通讯地址" style="width:400px"></el-input>
                    </el-form-item>
                    <el-form-item label="法人">
                        <el-input size="small" v-model="form.operName" placeholder="请输入法人" style="width:400px"></el-input>
                    </el-form-item>
                    <el-form-item label="注册资金（万元）">
                        <el-input size="small" v-model="form.registCapi" placeholder="请输入注册资金（万元）" style="width:400px"></el-input>
                    </el-form-item>
                    <el-form-item label="成立时间">
                        <el-date-picker v-model="form.startDate"  type="date" placeholder="选择日期" style="width:400px" :picker-options="picOptions"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="注册地址">
                        <el-input size="small" v-model="form.address" placeholder="请输入地址" style="width:400px"></el-input>
                    </el-form-item>
                    <el-form-item label="公司简介">
                        <el-input size="small" v-model="form.info" placeholder="请输入公司简介" style="width:400px"></el-input>
                    </el-form-item>
                    <el-form-item label="是否上市">
                        <el-radio-group v-model="form.isOnline">
                            <el-radio :label="1">已上市</el-radio>
                            <el-radio :label="0">未上市</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="员工人数">
                        <el-input size="small" v-model="form.staffNum" placeholder="请输入员工人数" style="width:400px"></el-input>
                    </el-form-item>
                    <el-form-item label="所属行业">
                        <el-cascader v-model="industry" :options="industyList" @change="handleChange" style="width:400px"></el-cascader>
                    </el-form-item>
                    <el-form-item label="主要项目">
                        <el-input size="small" type="textarea" :rows="4" v-model="form.mainProject" placeholder="请填写5G主要项目" style="width:400px"></el-input>
                    </el-form-item>
                    <el-form-item label="合作单位">
                        <el-input size="small" v-model="form.upCoroper" placeholder="请输入合作单位,多个以顿号分割" style="width:400px"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="中游合作单位">
                        <el-input size="small" v-model="form.midCoroper" placeholder="请输入联系方式" style="width:400px"></el-input>
                    </el-form-item>
                    <el-form-item label="下游合作单位">
                        <el-input size="small" v-model="form.lowCoroper" placeholder="请输入联系方式" style="width:400px"></el-input>
                    </el-form-item> -->
                    <el-form-item label="5G领域能力">
                        <el-input size="small" type="textarea" :rows="4" v-model="form.shortInfo" placeholder="请简述在5G领域的应用能力/技术能力/专利情况"  oninput = "value=value.replace(/[^\d.]/g,'')" style="width:400px"></el-input>
                    </el-form-item>
                    <el-form-item label="2019年收入总额（万元）">
                        <el-input size="small" v-model="form.lastIncome" placeholder="请输入2019年收入总额" style="width:400px"></el-input>
                    </el-form-item>
                    <el-form-item label="2018年收入总额（万元）">
                        <el-input size="small" v-model="form.oldIncome" placeholder="请输入2018年收入总额" style="width:400px"></el-input>
                    </el-form-item>
                    <el-form-item label="企业联系人姓名">
                        <el-input size="small" v-model="form.concatPerson"  placeholder="请输入企业联系人姓名" style="width:400px"></el-input>
                    </el-form-item>
                    <el-form-item label="联系人电话">
                        <el-input size="small" v-model="form.phone" placeholder="请输入联系人电话" style="width:400px"></el-input>
                    </el-form-item>
                    <el-form-item label="联系人邮件">
                        <el-input size="small" v-model="form.email" placeholder="请输入联系人邮件" style="width:400px"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button size="small" type="primary" style="width:100px" @click="postData">提交</el-button>
                    </el-form-item>
                </el-form>
        </div>
    </div>    
</template>

<script>
import {addInfo,getCompanyInfo,checkCompany} from '../../api/collect'
export default {
    data(){
        return{
            form:{},
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
            elements:[],
            classification:[],
            adminFlag:false,
            picOptions:{
                disabledDate(time) {
                    return time.getTime() > Date.now();
                }
            },
            comType:1,
            id:null
        }
    },
    mounted(){
        this.getInfo()
    },
    methods:{
        getInfo(){
            let id = null;
            this.comType = parseInt(JSON.parse(sessionStorage.getItem("user")).comType)
            if(this.$route.query.id){
                id = this.$route.query.id
                if(id == 1){
                    this.adminFlag = true
                }else{
                    this.adminFlag = false
                }
            }else{
                // id = parseInt(sessionStorage.getItem("userid"))
                id = parseInt(JSON.parse(sessionStorage.getItem("user")).companyId)
            }
            let myData={
                companyId:id
            }
            getCompanyInfo(myData)
            .then(res=>{
                if(res.code === 200){
                    this.industry = [2,21,212]
                    this.form = res.result
                    this.form.econkind = parseInt(res.result.econkind)
                    this.form.tecLayer = parseInt(res.result.tecLayer)
                    this.classification = JSON.parse(res.result.classification)
                    this.id = this.form.id
                }else{
                    this.id = null
                }
            })
        },
       postData(){
           let id = parseInt(JSON.parse(sessionStorage.getItem("user")).companyId)
           let comName = parseInt(JSON.parse(sessionStorage.getItem("user")).comName)
           let myData={
               
           }
           addInfo(myData)
           .then(res=>{
               if(res.code === 200){
                    this.$message({
                        message: '提交成功',
                        type: 'success'
                    });
                    this.getInfo()
               }
           })
       },
       handleChange(value){
           console.log(value)
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
