<template>
    <div class="warnWrapper">
        <div class="divider"></div>
        <el-tabs type="border-card">
            <el-tab-pane label="主营产品合作需求">
                <div class="formBox">
                    <el-form :model="form" class="demo-form-inline" label-width="120px">
                        <el-form-item label="选择主营产品">
                            <el-select v-model="form.value" placeholder="请选择主营产品" style="width:400px">
                                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="需求类别">
                            <el-checkbox-group v-model="demandProductClass" @change="handleChangeProduct">
                                <el-checkbox :label="1">资金支持</el-checkbox>
                                <el-checkbox :label="2">技术支撑</el-checkbox>
                                <el-checkbox :label="3">市场推广</el-checkbox>
                                <el-checkbox :label="4">其他</el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                        <el-form-item label="是否保密">
                            <el-switch v-model="form.pass" active-text="保密" inactive-text="公开"></el-switch>
                            <p>保密的需求，仅 自己 和 江苏省工业和信息化厅 可见，该需求将以密文展示</p>
                        </el-form-item>
                        <el-form-item label="其他需求" v-if="flag.otherFlag">
                            <el-input size="small" v-model="form.other" placeholder="单位：万元" style="width:400px"></el-input>
                        </el-form-item>
                        <el-form-item label="所需资金" v-if="flag.moneyFlag">
                            <el-input size="small" v-model="form.money" placeholder="单位：万元" style="width:400px"></el-input>
                        </el-form-item>
                        <el-form-item label="技术需求简述" v-if="flag.techFlag">
                            <el-input type="textarea" v-model="form.money" placeholder="请填写技术要点，不超过100字" maxlength="100" style="width:400px"></el-input>
                        </el-form-item>
                        <el-form-item label="市场需求简述" v-if="flag.marketFlag">
                            <el-input type="textarea" v-model="form.money" placeholder="请填写需求要点，不超过100字" maxlength="100" style="width:400px"></el-input>
                        </el-form-item>
                        <el-form-item label="需求描述">
                            <el-input size="small" v-model="form.demandIndo" type="textarea" placeholder="请填写具体的需求" :rows="6" style="width:400px"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button size="small" type="primary" round style="width:200px" @click="postData">提交主营产品合作需求</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-tab-pane>
            <el-tab-pane label="在研项目合作需求">
                <div class="formBox">
                    <el-form :model="form" class="demo-form-inline" label-width="120px">
                        <el-form-item label="选择在研项目">
                            <el-select v-model="form.value" placeholder="请选择在研项目" style="width:400px">
                                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="需求类别">
                            <el-checkbox-group v-model="demandProjectClass" @change="handleChangeProject">
                                <el-checkbox :label="1">资金支持</el-checkbox>
                                <el-checkbox :label="2">技术支撑</el-checkbox>
                                <el-checkbox :label="3">市场推广</el-checkbox>
                                <el-checkbox :label="4">其他</el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                        <el-form-item label="是否保密">
                            <el-switch v-model="form.pass" active-text="保密" inactive-text="公开"></el-switch>
                            <p>保密的需求，仅 自己 和 江苏省工业和信息化厅 可见，该需求将以密文展示</p>
                        </el-form-item>
                        <el-form-item label="其他需求" v-if="flag.otherFlag">
                            <el-input size="small" v-model="form.other" placeholder="单位：万元" style="width:400px"></el-input>
                        </el-form-item>
                        <el-form-item label="所需资金" v-if="flag.moneyFlag">
                            <el-input size="small" v-model="form.money" placeholder="单位：万元" style="width:400px"></el-input>
                        </el-form-item>
                        <el-form-item label="技术需求简述" v-if="flag.techFlag">
                            <el-input type="textarea" v-model="form.money" placeholder="请填写技术要点，不超过100字" maxlength="100" style="width:400px"></el-input>
                        </el-form-item>
                        <el-form-item label="市场需求简述" v-if="flag.marketFlag">
                            <el-input type="textarea" v-model="form.money" placeholder="请填写需求要点，不超过100字" maxlength="100" style="width:400px"></el-input>
                        </el-form-item>
                        <el-form-item label="需求描述">
                            <el-input size="small" v-model="form.demandIndo" type="textarea" placeholder="请填写具体的需求" :rows="6" style="width:400px"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button size="small" type="primary" round style="width:200px" @click="postData">提交在研项目合作需求</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-tab-pane>
            <el-tab-pane label="其他合作需求">
                <div class="formBox">
                    <el-form :model="form" class="demo-form-inline" label-width="120px">
                        <el-form-item label="名称">
                            <el-input size="small" v-model="form.other" placeholder="请输入课题/项目/产品" style="width:400px"></el-input>
                        </el-form-item>
                        <el-form-item label="需求类别">
                            <el-checkbox-group v-model="demandOtherClass" @change="handleChangeOther">
                                <el-checkbox :label="1">资金支持</el-checkbox>
                                <el-checkbox :label="2">技术支撑</el-checkbox>
                                <el-checkbox :label="3">市场推广</el-checkbox>
                                <el-checkbox :label="4">其他</el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                        <el-form-item label="是否保密">
                            <el-switch v-model="form.pass" active-text="保密" inactive-text="公开"></el-switch>
                            <p>保密的需求，仅 自己 和 江苏省工业和信息化厅 可见，该需求将以密文展示</p>
                        </el-form-item>
                        <el-form-item label="其他需求" v-if="flag.otherFlag">
                            <el-input size="small" v-model="form.other" placeholder="单位：万元" style="width:400px"></el-input>
                        </el-form-item>
                        <el-form-item label="所需资金" v-if="flag.moneyFlag">
                            <el-input size="small" v-model="form.money" placeholder="单位：万元" style="width:400px"></el-input>
                        </el-form-item>
                        <el-form-item label="技术需求简述" v-if="flag.techFlag">
                            <el-input type="textarea" v-model="form.money" placeholder="请填写技术要点，不超过100字" maxlength="100" style="width:400px"></el-input>
                        </el-form-item>
                        <el-form-item label="市场需求简述" v-if="flag.marketFlag">
                            <el-input type="textarea" v-model="form.money" placeholder="请填写需求要点，不超过100字" maxlength="100" style="width:400px"></el-input>
                        </el-form-item>
                        <el-form-item label="需求描述">
                            <el-input size="small" v-model="form.demandIndo" type="textarea" placeholder="请填写具体的需求" :rows="6" style="width:400px"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button size="small" type="primary" round style="width:200px" @click="postData">提交合作需求</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-tab-pane>
        </el-tabs>
        <el-dialog title="提示" :visible.sync="centerDialogVisible" width="400px" center :close-on-click-modal="false" custom-class="dialogClass">
            <div style="text-align:center">
                <p>新增成功！</p>
                <i class="el-icon-circle-check"></i>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="goProductList">需求列表</el-button>
                <el-button type="primary" @click="addContinue">继续新增</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import {addDemand,getCompanyDemand} from '../../api/collect'
export default {
    data(){
        return{
            demandProductClass:[],
            demandProjectClass:[],
            demandOtherClass:[],
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
                techFlag:false,
                marketFlag:false,
                otherFlag:false
            },
            checkBoxList:[],
            options:[],
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
                companySceneId:id
            }
            getCompanyDemand(myData)
            .then(res=>{
                this.form = res.result
                this.industry = this.form.industry
            })
        },
        postData(){
            this.centerDialogVisible = true
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
        handleChangeProduct(value){
            this.demandClass = value
            if(value.indexOf(1) === -1 ){
                this.flag.moneyFlag = false
            }else{
                this.flag.moneyFlag = true
            }
            if(value.indexOf(2) === -1 ){
                this.flag.techFlag = false
            }else{
                this.flag.techFlag = true
            }
            if(value.indexOf(3) === -1 ){
                this.flag.marketFlag = false
            }else{
                this.flag.marketFlag = true
            }
            if(value.indexOf(4) === -1 ){
                this.flag.otherFlag = false
            }else{
                this.flag.otherFlag = true
            }
        },
        handleChangeProject(value){
            this.demandClass = value
            if(value.indexOf(1) === -1 ){
                this.flag.moneyFlag = false
            }else{
                this.flag.moneyFlag = true
            }
            if(value.indexOf(2) === -1 ){
                this.flag.techFlag = false
            }else{
                this.flag.techFlag = true
            }
            if(value.indexOf(3) === -1 ){
                this.flag.marketFlag = false
            }else{
                this.flag.marketFlag = true
            }
            if(value.indexOf(4) === -1 ){
                this.flag.otherFlag = false
            }else{
                this.flag.otherFlag = true
            }
        },
        handleChangeOther(value){
            this.demandClass = value
            if(value.indexOf(1) === -1 ){
                this.flag.moneyFlag = false
            }else{
                this.flag.moneyFlag = true
            }
            if(value.indexOf(2) === -1 ){
                this.flag.techFlag = false
            }else{
                this.flag.techFlag = true
            }
            if(value.indexOf(3) === -1 ){
                this.flag.marketFlag = false
            }else{
                this.flag.marketFlag = true
            }
            if(value.indexOf(4) === -1 ){
                this.flag.otherFlag = false
            }else{
                this.flag.otherFlag = true
            }
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
