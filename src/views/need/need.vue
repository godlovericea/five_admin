<template>
    <div class="warnWrapper">
        <div class="divider"></div>
        <el-tabs type="border-card">
            <el-tab-pane label="主营产品合作需求" v-if="productDetailFlag">
                <div class="formBox">
                    <el-form :model="product" class="demo-form-inline" label-width="120px">
                        <el-form-item label="选择主营产品">
                            <el-select v-model="product.companyProductId" :disabled="notMeFlag" placeholder="请选择主营产品" style="width:400px">
                                <el-option v-for="item in productList" :key="item.companyProductId" :label="item.productName" :value="item.companyProductId"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="需求类别">
                            <el-checkbox-group v-model="demandProductClass" @change="handleChangeProduct" :disabled="notMeFlag">
                                <el-checkbox :label="1">资金支持</el-checkbox>
                                <el-checkbox :label="2">技术支撑</el-checkbox>
                                <el-checkbox :label="3">市场推广</el-checkbox>
                                <el-checkbox :label="4">其他</el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                        <el-form-item label="是否保密">
                            <el-switch v-model="productIsEncryption" active-text="保密" :disabled="notMeFlag" inactive-text="公开"></el-switch>
                            <p>保密的需求，仅 自己 和 江苏省工业和信息化厅 可见，该需求将以密文展示</p>
                        </el-form-item>
                        <el-form-item label="其他需求" v-if="flag.otherFlag">
                            <el-input size="small" v-model="product.otherDemand" :disabled="notMeFlag" placeholder="请输入需求名称，不超过20字" style="width:400px" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="所需资金" v-if="flag.moneyFlag">
                            <el-input size="small" oninput = "value=value.replace(/[^\d.]/g,'')"
                        onkeyup="value=value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3')" v-model="product.requiredMoney" :disabled="notMeFlag" placeholder="单位：万元" style="width:400px" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="技术需求简述" v-if="flag.techFlag">
                            <el-input type="textarea" v-model="product.technologyDemandInfo" :disabled="notMeFlag" placeholder="请填写技术要点，不超过100字" maxlength="100" style="width:400px" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="市场需求简述" v-if="flag.marketFlag">
                            <el-input type="textarea" v-model="product.marketDemandInfo" :disabled="notMeFlag" placeholder="请填写需求要点，不超过100字" maxlength="100" style="width:400px" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="需求描述">
                            <el-input size="small" v-model="product.demandInfo" :disabled="notMeFlag" type="textarea" placeholder="请填写具体的需求" :rows="6" style="width:400px" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <div>
                                <el-button v-if="companyProductDemandId === 0" size="small" type="primary" :disabled="notMeFlag" round style="width:100px" @click="addProductNeed">提交</el-button>
                                <el-button v-else size="small" type="primary" style="width:100px" :disabled="notMeFlag" round @click="updateProductNeed">修改</el-button>
                            </div>
                        </el-form-item>
                    </el-form>
                </div>
            </el-tab-pane>
            <el-tab-pane label="在研项目合作需求" v-if="projectDetailFlag">
                <div class="formBox">
                    <el-form :model="project" class="demo-form-inline" label-width="120px">
                        <el-form-item label="选择在研项目">
                            <el-select v-model="project.companyProjectId" placeholder="请选择在研项目" :disabled="notMeFlag" style="width:400px">
                                <el-option v-for="item in projectList" :key="item.companyProjectId" :label="item.projectName" :value="item.companyProjectId"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="需求类别">
                            <el-checkbox-group v-model="demandProjectClass" @change="handleChangeProject" :disabled="notMeFlag">
                                <el-checkbox :label="1">资金支持</el-checkbox>
                                <el-checkbox :label="2">技术支撑</el-checkbox>
                                <el-checkbox :label="3">市场推广</el-checkbox>
                                <el-checkbox :label="4">其他</el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                        <el-form-item label="是否保密">
                            <el-switch v-model="projectIsEncryption" :disabled="notMeFlag" active-text="保密" inactive-text="公开"></el-switch>
                            <p>保密的需求，仅 自己 和 江苏省工业和信息化厅 可见，该需求将以密文展示</p>
                        </el-form-item>
                        <el-form-item label="其他需求" v-if="flag.otherFlag">
                            <el-input size="small" v-model="project.otherDemand" :disabled="notMeFlag" placeholder="请输入需求名称，不超过20字" maxlength="20" style="width:400px" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="所需资金" v-if="flag.moneyFlag">
                            <el-input size="small" oninput = "value=value.replace(/[^\d.]/g,'')"
                        onkeyup="value=value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3')" v-model="project.requiredMoney" :disabled="notMeFlag" placeholder="单位：万元" style="width:400px" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="技术需求简述" v-if="flag.techFlag">
                            <el-input type="textarea" v-model="project.technologyDemandInfo" :disabled="notMeFlag" placeholder="请填写技术要点，不超过100字" maxlength="100" style="width:400px" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="市场需求简述" v-if="flag.marketFlag">
                            <el-input type="textarea" v-model="project.marketDemandInfo" :disabled="notMeFlag" placeholder="请填写需求要点，不超过100字" maxlength="100" style="width:400px" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="需求描述">
                            <el-input size="small" v-model="project.demandInfo" type="textarea" :disabled="notMeFlag" placeholder="请填写具体的需求" :rows="6" style="width:400px" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <div>
                                <el-button v-if="companyProjectDemandId === 0" :disabled="notMeFlag" size="small" type="primary" round style="width:100px" @click="addProjectNeed">提交</el-button>
                                <el-button v-else size="small" type="primary" :disabled="notMeFlag" style="width:100px" round @click="updateProjectNeed">修改</el-button>
                            </div>
                        </el-form-item>
                    </el-form>
                </div>
            </el-tab-pane>
            <el-tab-pane label="其他合作需求" v-if="otherDetailFlag">
                <div class="formBox">
                    <el-form :model="other" class="demo-form-inline" label-width="120px">
                        <el-form-item label="名称">
                            <el-input size="small" v-model="other.demandName" :disabled="notMeFlag" placeholder="请输入课题/项目/产品" style="width:400px" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="需求类别">
                            <el-checkbox-group v-model="demandOtherClass" @change="handleChangeOther" :disabled="notMeFlag">
                                <el-checkbox :label="1">资金支持</el-checkbox>
                                <el-checkbox :label="2">技术支撑</el-checkbox>
                                <el-checkbox :label="3">市场推广</el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                        <el-form-item label="是否保密">
                            <el-switch v-model="otherIsEncryption" active-text="保密" :disabled="notMeFlag" inactive-text="公开"></el-switch>
                            <p>保密的需求，仅 自己 和 江苏省工业和信息化厅 可见，该需求将以密文展示</p>
                        </el-form-item>
                        <el-form-item label="所需资金" v-if="flag.moneyFlag">
                            <el-input size="small" oninput = "value=value.replace(/[^\d.]/g,'')"
                        onkeyup="value=value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3')" v-model="other.requiredMoney" :disabled="notMeFlag" placeholder="单位：万元" style="width:400px" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="技术需求简述" v-if="flag.techFlag">
                            <el-input type="textarea" v-model="other.technologyDemandInfo" :disabled="notMeFlag" placeholder="请填写技术要点，不超过100字" maxlength="100" style="width:400px" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="市场需求简述" v-if="flag.marketFlag">
                            <el-input type="textarea" v-model="other.marketDemandInfo" :disabled="notMeFlag" placeholder="请填写需求要点，不超过100字" maxlength="100" style="width:400px" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="需求描述">
                            <el-input size="small" v-model="other.demandInfo" type="textarea" :disabled="notMeFlag" placeholder="请填写具体的需求" :rows="6" style="width:400px" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <div>
                                <el-button v-if="companyOtherDemandId === 0" size="small" type="primary" :disabled="notMeFlag" round style="width:100px" @click="addOtherNeed">提交</el-button>
                                <el-button v-else size="small" type="primary" style="width:100px" :disabled="notMeFlag" round @click="updateOtherNeed">修改</el-button>
                            </div>
                        </el-form-item>
                    </el-form>
                </div>
            </el-tab-pane>
        </el-tabs>
        <el-dialog title="提示" :visible.sync="centerDialogVisible" width="400px" center :close-on-click-modal="false" custom-class="dialogClass">
            <div style="text-align:center">
                <p>成功！</p>
                <i class="el-icon-circle-check"></i>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="goProductList">列表</el-button>
                <el-button type="primary" @click="addContinue">继续新增</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import {listProductNotPage,listProject,addProductDemand,getCompanyProductDemand,updateProductDemand,addProjectDemand,
        getCompanyProjectDemand,updateProjectDemand,addOtherDemand,getCompanyOtherDemand,updateOtherDemand,
        checkCompanyProjectDemand,checkCompanyProductDemand,checkCompanyOtherDemand} from '@/api/need'
export default {
    data(){
        return{
            adminFlag:false,
            productList:[],
            projectList:[],
            comName:'',
            companyId:0,

            productDetailFlag:true,
            projectDetailFlag:true,
            otherDetailFlag:true,

            product:{},
            project:{},
            other:{},
            demandProductClass:[],
            demandProjectClass:[],
            demandOtherClass:[],
            companyProductDemandId:0,
            companyProjectDemandId:0,
            companyOtherDemandId:0,
            productIsEncryption:false,
            projectIsEncryption:false,
            otherIsEncryption:false,
            
            flag:{
                moneyFlag:false,
                techFlag:false,
                marketFlag:false,
                otherFlag:false
            },
            centerDialogVisible:false,
            rejectDialog:false,
            remarks:'',
            notMeFlag: false
        }
    },
    mounted(){
        this.checkAdmin()
        this.getProductList()
        this.getProjectList()
        if(this.$route.query.id){
            if(this.$route.query.type === 'product'){
                this.productDetailFlag = true
                this.projectDetailFlag = false
                this.otherDetailFlag = false
                this.getProductDetail()
            }else if(this.$route.query.type === 'project'){
                this.productDetailFlag = false
                this.projectDetailFlag = true
                this.otherDetailFlag = false
                this.getProjectDetail()
            }else if(this.$route.query.type === 'other'){
                this.productDetailFlag = false
                this.projectDetailFlag = false
                this.otherDetailFlag = true
                this.getOtherDetail()
            }
        }
    },
    methods:{
        checkAdmin(){
            let isAdmin = JSON.parse(sessionStorage.getItem("user")).isAdmin
            this.comName = JSON.parse(sessionStorage.getItem("user")).comName
            this.companyId = JSON.parse(sessionStorage.getItem("user")).companyId

            if(isAdmin === 1){
                this.adminFlag = true
            }else{
                this.adminFlag = false
            }
        },
        getProductList(){
            listProductNotPage()
            .then(res=>{
                this.productList = res.result
            })
        },
        getProjectList(){
            listProject()
            .then(res=>{
                this.projectList = res.result
            })
        },
        addProductNeed(){
            const myData = {
                comName: this.comName,
                companyId: this.companyId,
                companyProductId: this.product.companyProductId,
                demandClass: this.demandProductClass,
                demandInfo: this.product.demandInfo,
                isEncryption: this.productIsEncryption ? 1:0,
                marketDemandInfo: this.product.marketDemandInfo,
                otherDemand: this.product.otherDemand,
                requiredMoney: this.product.requiredMoney,
                technologyDemandInfo: this.product.technologyDemandInfo
            }
            if(!myData.companyProductId){
                this.$message.error("请选择主营产品")
                return false
            }
            if(myData.demandClass.length === 0){
                this.$message.error("请选择需求类别")
                return false
            }
            addProductDemand(myData)
            .then(res=>{
                this.centerDialogVisible = true
            })
        },
        addProjectNeed(){
            const myData = {
                comName: this.comName,
                companyId: this.companyId,
                companyProjectId: this.project.companyProjectId,
                demandClass: this.demandProjectClass,
                demandInfo: this.project.demandInfo,
                isEncryption: this.projectIsEncryption ? 1:0,
                marketDemandInfo: this.project.marketDemandInfo,
                otherDemand: this.project.otherDemand,
                requiredMoney: this.project.requiredMoney,
                technologyDemandInfo: this.project.technologyDemandInfo
            }
            if(!myData.companyProjectId){
                this.$message.error("请选择在研项目")
                return false
            }
            if(myData.demandClass.length === 0){
                this.$message.error("请选择需求类别")
                return false
            }
            addProjectDemand(myData)
            .then(res=>{
                this.centerDialogVisible = true
            })
        },
        addOtherNeed(){
            const myData = {
                comName: this.comName,
                companyId: this.companyId,
                demandName: this.other.demandName,
                demandClass: this.demandOtherClass,
                demandInfo: this.other.demandInfo,
                isEncryption: this.otherIsEncryption ? 1:0,
                marketDemandInfo: this.other.marketDemandInfo,
                otherDemand: this.other.otherDemand,
                requiredMoney: this.other.requiredMoney,
                technologyDemandInfo: this.other.technologyDemandInfo
            }
            if(!myData.demandName){
                this.$message.error("请输入需求名称")
                return false
            }
            if(myData.demandClass.length === 0){
                this.$message.error("请选择需求类别")
                return false
            }
            addOtherDemand(myData)
            .then(res=>{
                this.centerDialogVisible = true
            })
        },
        getProductDetail(){
            let myData={
                companyProductDemandId:this.$route.query.id
            }
            getCompanyProductDemand(myData)
            .then(res=>{
                this.product = res.result
                // 0只读，1可读写
                this.notMeFlag = this.product.wr === 0 ? true : false;
                this.demandProductClass = this.product.demandClass
                this.handleChangeProduct(this.demandProductClass)
                this.productIsEncryption = this.product.isEncryption === 1 ? true :false
                this.companyProductDemandId = this.product.companyProductDemandId
            })
        },
        getProjectDetail(){
            let myData={
                companyProjectDemandId:this.$route.query.id
            }
            getCompanyProjectDemand(myData)
            .then(res=>{
                this.project = res.result
                // 0只读，1可读写
                this.notMeFlag = this.project.wr === 0 ? true : false;
                this.demandProjectClass = this.project.demandClass
                this.handleChangeProject(this.demandProjectClass)
                this.projectIsEncryption = this.project.isEncryption === 1 ? true :false
                this.companyProjectDemandId = this.project.companyProjectDemandId
            })
        },
        getOtherDetail(){
            let myData={
                companyOtherDemandId:this.$route.query.id
            }
            getCompanyOtherDemand(myData)
            .then(res=>{
                this.other = res.result
                // 0只读，1可读写
                this.notMeFlag = this.other.wr === 0 ? true : false;
                this.demandOtherClass = this.other.demandClass
                this.handleChangeOther(this.demandOtherClass)
                this.otherIsEncryption = this.other.isEncryption === 1 ? true :false
                this.companyOtherDemandId = this.other.companyOtherDemandId
            })
        },
        updateProductNeed(){
            const myData = {
                comName: this.comName,
                companyId: this.companyId,
                companyProductId: this.product.companyProductId,
                demandClass: this.demandProductClass,
                demandInfo: this.product.demandInfo,
                isEncryption: this.productIsEncryption ? 1:0,
                marketDemandInfo: this.product.marketDemandInfo,
                otherDemand: this.product.otherDemand,
                requiredMoney: this.product.requiredMoney,
                technologyDemandInfo: this.product.technologyDemandInfo,
                companyProductDemandId:this.companyProductDemandId
            }
            updateProductDemand(myData)
            .then(res=>{
                this.$message({
                    type:'success',
                    message:'修改成功'
                })
                this.getProductDetail()
            })
        },
        updateProjectNeed(){
            const myData = {
                comName: this.comName,
                companyId: this.companyId,
                companyProjectId: this.project.companyProjectId,
                demandClass: this.demandProjectClass,
                demandInfo: this.project.demandInfo,
                isEncryption: this.projectIsEncryption ? 1:0,
                marketDemandInfo: this.project.marketDemandInfo,
                otherDemand: this.project.otherDemand,
                requiredMoney: this.project.requiredMoney,
                technologyDemandInfo: this.project.technologyDemandInfo,
                companyProjectDemandId:this.companyProjectDemandId
            }
            updateProjectDemand(myData)
            .then(res=>{
                this.$message({
                    type:'success',
                    message:'修改成功'
                })
                this.getProjectDetail()
            })
        },
        updateOtherNeed(){
            const myData = {
                comName: this.comName,
                companyId: this.companyId,
                demandName: this.other.demandName,
                demandClass: this.demandOtherClass,
                demandInfo: this.other.demandInfo,
                isEncryption: this.otherIsEncryption ? 1:0,
                marketDemandInfo: this.other.marketDemandInfo,
                otherDemand: this.other.otherDemand,
                requiredMoney: this.other.requiredMoney,
                technologyDemandInfo: this.other.technologyDemandInfo,
                companyOtherDemandId:this.companyOtherDemandId
            }
            updateOtherDemand(myData)
            .then(res=>{
                this.$message({
                    type:'success',
                    message:'修改成功'
                })
                this.getOtherDetail()
            })
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
                path:'/need/needList',
                query:{
                    id:user.companyId
                }
            })
        },
        addContinue(){
            this.centerDialogVisible = false
            this.product = {}
            this.project = {}
            this.other = {}
            this.demandProductClass = []
            this.demandOtherClass = []
            this.demandProjectClass = []
            this.productIsEncryption = false
            this.projectIsEncryption = false
            this.otherIsEncryption = false
        },
        openReject(){
            this.rejectDialog = true
        },
        backToList(){
            this.$router.go(-1)
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
