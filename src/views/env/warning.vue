<template>
    <div class="warnWrapper">
        <div class="divider"></div>
        <div class="formBox">
            <el-form :model="form" class="demo-form-inline" label-width="200px">
                    <el-form-item label="是否备案" v-if="comType == 1">
                        <el-radio-group v-model="form.isRecord">
                            <el-radio :label="1">已备案</el-radio>
                            <el-radio :label="0">未备案</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="入库批次" v-if="comType == 1">
                        <el-input size="small" v-model="form.incomingBatches" placeholder="请输入入库批次" style="width:400px"></el-input>
                    </el-form-item>
                    <el-form-item label="运营公司名称">
                        <el-input size="small" v-model="form.operateCom" placeholder="请输入运营公司名称" style="width:400px"></el-input>
                    </el-form-item>
                    <el-form-item label="共建高校院所">
                        <el-input size="small" v-model="form.school" placeholder="请输入共建高校院所" style="width:400px"></el-input>
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
                    <el-form-item label="地址">
                        <el-input size="small" v-model="form.address" placeholder="请输入地址" style="width:400px"></el-input>
                    </el-form-item>
                    <el-form-item label="所在园区">
                        <el-select v-model="form.area" style="width:400px">
                            <el-option v-for="(item,index) in parkList" :key="index" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="资质">
                        <el-radio-group v-model="form.econkind">
                            <el-radio :label="1">规上</el-radio>
                            <el-radio :label="2">高企</el-radio>
                            <el-radio :label="3">独角兽</el-radio>
                            <el-radio :label="4">瞪羚羊</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="企业简介">
                        <el-input size="small" type="textarea" :rows="5" v-model="form.shortInfo" placeholder="请输入企业简介" style="width:400px"></el-input>
                    </el-form-item>
                    <el-form-item label="企业联系人">
                        <el-input size="small" v-model="form.contact" placeholder="请输入企业联系人" style="width:400px"></el-input>
                    </el-form-item>
                    <el-form-item label="联系方式">
                        <el-input size="small" v-model="form.phone" placeholder="请输入联系方式" style="width:400px"></el-input>
                    </el-form-item>
                    <el-form-item label="技术分层">
                        <el-radio-group v-model="form.tecLayer">
                            <el-radio :label="1">基础层</el-radio>
                            <el-radio :label="2">技术层</el-radio>
                            <el-radio :label="3">硬件终端</el-radio>
                            <el-radio :label="4">应用层</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="AI业务占比">
                        <el-input size="small" v-model="form.aiPercent" placeholder="请输入AI业务百分比"  oninput = "value=value.replace(/[^\d.]/g,'')" style="width:400px"></el-input>
                    </el-form-item>
                    <el-form-item label="主营业务">
                        <el-input size="small" v-model="form.business" placeholder="请输入主营业务" style="width:400px"></el-input>
                    </el-form-item>
                    <el-form-item label="AI业务方向">
                        <el-input size="small" v-model="form.aiBusiness" placeholder="请输入AI业务方向" style="width:400px"></el-input>
                    </el-form-item>
                    <el-form-item label="专利总数">
                        <el-input size="small" v-model="form.patent" onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')" placeholder="请输入专利总数" style="width:400px"></el-input>
                    </el-form-item>
                    <el-form-item label="主要专利名称">
                        <el-input size="small" v-model="form.patentName" placeholder="请输入主要专利名称（以顿号分割）" style="width:400px"></el-input>
                    </el-form-item>
                    <el-form-item label="主要项目内容">
                        <el-input size="small" v-model="form.projectContents" placeholder="请输入主要项目内容" style="width:400px"></el-input>
                    </el-form-item>
                    <el-form-item label="七要素">
                        <el-checkbox-group v-model="elements">
                            <el-checkbox v-for="item in sevenCheckList" :label="item.label" :key="item.label">{{item.label}}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="行业分类">
                        <el-checkbox-group v-model="classification">
                            <el-checkbox v-for="item in industryCheckList" :label="item.label" :key="item.value"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="主要项目">
                        <el-input size="small" v-model="form.project" placeholder="请输入主要项目"  style="width:400px"></el-input>
                    </el-form-item>
                    <el-form-item label="涉及领域">
                        <el-input size="small" v-model="form.field" placeholder="请输入涉及领域" style="width:400px"></el-input>
                    </el-form-item>
                    <el-form-item label="2019年营业总收入（万元）">
                        <el-input size="small" v-model="form.countIncome" placeholder="请输入2019年营业总收入（万元）" style="width:400px"></el-input>
                    </el-form-item>
                    <el-form-item label="2019年利润总额（万元）">
                        <el-input size="small" v-model="form.countproFits"  placeholder="请输入2019年利润总额（万元）" style="width:400px"></el-input>
                    </el-form-item>
                    <el-form-item label="2019年净利润（万元）">
                        <el-input size="small" v-model="form.profits"  placeholder="请输入2019年净利润（万元）" style="width:400px"></el-input>
                    </el-form-item>
                    <el-form-item label="2019年主营业务收入构成">
                        <el-input size="small" v-model="form.incomesPercent" placeholder="请输入2019年主营业务收入构成" style="width:400px"></el-input>
                    </el-form-item>
                    <el-form-item label="2019年度纳税总额（万元）">
                        <el-input size="small" v-model="form.tax"  placeholder="请输入2019年度纳税总额（万元）" style="width:400px"></el-input>
                    </el-form-item>
                    <el-form-item label="职工人数（人）">
                        <el-input size="small" v-model="form.workerCount"  placeholder="请输入职工人数（人）" style="width:400px"></el-input>
                    </el-form-item>
                    <el-form-item label="研发人数（人）">
                        <el-input size="small" v-model="form.developmentCount" placeholder="请输入研发人数（人）" style="width:400px"></el-input>
                    </el-form-item>
                    <el-form-item label="总投资（万元）">
                        <el-input size="small" v-model="form.investment" placeholder="请输入总投资（万元）" style="width:400px"></el-input>
                    </el-form-item>
                    <el-form-item label="研发投入占比">
                        <el-input size="small" v-model="form.developmentPercent" placeholder="请输入研发投入占比" style="width:400px"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button size="small" type="primary" style="width:100px" @click="postData">提交</el-button>
                        <!-- <el-button size="small" type="info" style="width:100px" @click="resetData">重置</el-button> -->
                        <el-button size="small" type="danger" style="width:100px" @click="checkState" v-if="adminFlag">审核</el-button>
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
            form:{
                "address": "",
                "aiBusiness": "",
                "aiPercent": "",
                "area": "",
                "business": "",
                "classification": "",
                "companyUserId": 0,
                "contact": "",
                "countIncome": "",
                "countproFits": "",
                "developmentCount": 0,
                "developmentPercent": "",
                "econkind": "",
                "elements": "",
                "field": "",
                "id": 0,
                "incomesPercent": '',
                "incomingBatches": '',
                "investment": '',
                "isRecord": 0,
                "operName": "",
                "operateCom": "",
                "patent": '',
                "patentName": '',
                "phone":'',
                "profits": "",
                "project": "",
                "projectContents": "",
                "registCapi": "",
                "scenarioDefined": "",
                "scenarioImgList": [],
                "scenarioKeyword": "",
                "scene": "",
                "sceneClassification": "",
                "school": "",
                "shortInfo": "",
                "startDate": "",
                "tax": "",
                "tecLayer": "",
                "workerCount": 0
            },
            parkList:[
                {
                    id:"1",
                    name:'地理信息园',
                    lnglat:[118.9196460753, 32.0805948414]
                },
                {
                    id:"2",
                    name:'红枫科技园',
                    lnglat:[119.0074381520, 32.1506175173]
                },
                {
                    id:"3",
                    name:'汇智科技园',
                    lnglat:[118.8972030341, 32.1540342558]
                },
                {
                    id:"4",
                    name:'金港科创园',
                    lnglat:[118.9071760853, 32.1229797257]
                },
                {
                    id:"5",
                    name:'经开区大型企业',
                    lnglat:[118.8868264429, 32.1677016171]
                },
                {
                    id:"6",
                    name:'龙港科技园',
                    lnglat:[118.8668622750, 32.1545634113]
                },
                {
                    id:"7",
                    name:'马群科技园',
                    lnglat:[118.8959620397, 32.0765321268]
                },
                {
                    id:"8",
                    name:'迈皋桥创业园',
                    lnglat:[118.8617908083, 32.1088420528]
                },
                {
                    id:"9",
                    name:'南大科学园',
                    lnglat:[118.9647133439, 32.1252232831]
                },
                {
                    id:"10",
                    name:'十月公社科技创业园',
                    lnglat:[118.9118422897,32.1272772467]
                },
                {
                    id:"11",
                    name:'仙林智谷',
                    lnglat:[118.9656460815, 32.1353513329]
                },
                {
                    id:"12",
                    name:'兴智科技园',
                    lnglat:[118.872749,32.140334]
                },
                {
                    id:"13",
                    name:'紫东创意园',
                    lnglat:[118.9116075953, 32.0790420514]
                },
                {
                    id:"14",
                    name:'其他园区',
                    lnglat:[118.9116075953, 32.0790420514]
                }
            ],
            elements:[],
            classification:[],
            sevenCheckList:[
                {
                    label:'算法',
                    value:1
                },
                {
                    label:'芯片',
                    value:2
                },
                {
                    label:'模块',
                    value:3
                },
                {
                    label:'终端',
                    value:4
                },
                {
                    label:'系统',
                    value:5
                },
                {
                    label:'网络',
                    value:6
                },
                {
                    label:'平台',
                    value:7
                }
            ],
            // sevenCheckList:['算法','芯片','模块','终端','系统','网络','平台'],
            industryCheckList:[
                {
                    label:'AI芯片',
                    value:1
                },
                {
                    label:'视觉传感器',
                    value:2
                },
                {
                    label:'计算机视觉',
                    value:3
                },{
                    label:'智能语言',
                    value:4
                },{
                    label:'自然语言处理',
                    value:5
                },{
                    label:'机器学习/知识图谱',
                    value:6
                },{
                    label:'云平台/OS/大数据服务',
                    value:7
                },{
                    label:'智能家居',
                    value:8
                },{
                    label:'服务机器人',
                    value:9
                },{
                    label:'移动设备/UAV',
                    value:10
                },{
                    label:'智能驾驶',
                    value:11
                },{
                    label:'行业应用',
                    value:12
                }
            ],
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
                    this.form = res.result
                    this.form.econkind = parseInt(res.result.econkind)
                    this.form.tecLayer = parseInt(res.result.tecLayer)
                    this.elements = JSON.parse(res.result.elements)
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
               comName:comName,
                "id": this.id,
                "address": this.form.address,
                "aiBusiness": this.form.aiBusiness,
                "aiPercent": this.form.aiPercent,
                "area": this.form.area,
                "business": this.form.business,
                "classification": this.classification,
                "companyUserId": id,
                "contact": this.form.contact,
                "countIncome": this.form.countIncome,
                "countproFits": this.form.countproFits,
                "developmentCount": this.form.developmentCount,
                "developmentPercent": this.form.developmentPercent,
                econkind:this.form.econkind,
                "elements": this.elements,
                "field": this.form.field,
                "incomesPercent": this.form.incomesPercent,
                "incomingBatches": this.form.incomingBatches,
                "investment": this.form.investment,
                "isRecord": this.form.isRecord,
                "operName": this.form.operName,
                "operateCom":this.form.operateCom,
                "area": this.form.area,
                "patent": this.form.patent,
                "patentName": this.form.patentName,
                "phone": this.form.phone,
                "profits": this.form.profits,
                "project": this.form.project,
                "projectContents": this.form.projectContents,
                "registCapi": this.form.registCapi,
                "school": this.form.school,
                "shortInfo": this.form.shortInfo,
                "startDate": this.form.startDate,
                "tax": this.form.tax,
                "tecLayer": this.form.tecLayer,
                "workerCount": this.form.workerCount
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
       checkState(){
           let myData={
                companyId:parseInt(this.$route.query.id),
                state:''
            }
           this.$confirm('此操作将通过该公司信息资料审核, 是否通过?', '提示', {
                confirmButtonText: '通过',
                cancelButtonText: '驳回',
                type: 'warning',
                center: true
            }).then(() => {
                myData.state = 'N'
                checkCompany(myData)
                .then(res=>{
                    this.$message({
                        type: 'success',
                        message: '审核成功!'
                    });
                })
                }).catch(() => {
                    myData.state = 'F'
                    checkCompany(myData)
                    .then(res=>{
                        this.$message({
                            type: 'info',
                            message: '已驳回'
                        });
                    })
            });
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
