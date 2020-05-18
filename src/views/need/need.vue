<template>
    <div class="warnWrapper">
        <div class="divider"></div>
        <el-tabs type="border-card">
            <el-tab-pane label="主营产品合作需求" v-if="productDetailFlag">
                <div class="formBox">
                    <el-form :model="product" class="demo-form-inline" label-width="120px">
                        <el-form-item label="选择主营产品">
                            <el-select v-model="product.companyProductId" placeholder="请选择主营产品" style="width:400px">
                                <el-option v-for="item in productList" :key="item.companyProductId" :label="item.productName" :value="item.companyProductId"></el-option>
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
                            <el-switch v-model="productIsEncryption" active-text="保密" inactive-text="公开"></el-switch>
                            <p>保密的需求，仅 自己 和 江苏省工业和信息化厅 可见，该需求将以密文展示</p>
                        </el-form-item>
                        <el-form-item label="其他需求" v-if="flag.otherFlag">
                            <el-input size="small" v-model="product.otherDemand" placeholder="请输入需求名称，不超过20字" style="width:400px"></el-input>
                        </el-form-item>
                        <el-form-item label="所需资金" v-if="flag.moneyFlag">
                            <el-input size="small" type="number" v-model="product.requiredMoney" placeholder="单位：万元" style="width:400px"></el-input>
                        </el-form-item>
                        <el-form-item label="技术需求简述" v-if="flag.techFlag">
                            <el-input type="textarea" v-model="product.technologyDemandInfo" placeholder="请填写技术要点，不超过100字" maxlength="100" style="width:400px"></el-input>
                        </el-form-item>
                        <el-form-item label="市场需求简述" v-if="flag.marketFlag">
                            <el-input type="textarea" v-model="product.marketDemandInfo" placeholder="请填写需求要点，不超过100字" maxlength="100" style="width:400px"></el-input>
                        </el-form-item>
                        <el-form-item label="需求描述">
                            <el-input size="small" v-model="product.demandInfo" type="textarea" placeholder="请填写具体的需求" :rows="6" style="width:400px"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <div v-if="!adminFlag">
                                <el-button v-if="companyProductDemandId === 0" size="small" type="primary" round style="width:100px" @click="addProductNeed">提交</el-button>
                                <el-button v-else size="small" type="primary" style="width:100px" round @click="updateProductNeed">修改</el-button>
                            </div>
                            <div v-if="adminFlag">
                                <el-button size="small" type="success" round style="width:100px" @click="overProductSure">通过</el-button>
                                <el-button size="small" type="danger" round style="width:100px" @click="openReject">驳回</el-button>
                                <el-button size="small" type="primary" round style="width:100px" @click="backToList">返回列表</el-button>
                            </div>
                        </el-form-item>
                    </el-form>
                </div>
            </el-tab-pane>
            <el-tab-pane label="在研项目合作需求" v-if="projectDetailFlag">
                <div class="formBox">
                    <el-form :model="form" class="demo-form-inline" label-width="120px">
                        <el-form-item label="选择在研项目">
                            <el-select v-model="form.companyProjectId" placeholder="请选择在研项目" style="width:400px">
                                <el-option v-for="item in projectList" :key="item.companyProjectId" :label="item.projectName" :value="item.companyProjectId"></el-option>
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
                            <el-switch v-model="projectIsEncryption" active-text="保密" inactive-text="公开"></el-switch>
                            <p>保密的需求，仅 自己 和 江苏省工业和信息化厅 可见，该需求将以密文展示</p>
                        </el-form-item>
                        <el-form-item label="其他需求" v-if="flag.otherFlag">
                            <el-input size="small" v-model="form.other" placeholder="请输入需求名称，不超过20字" maxlength="20" style="width:400px"></el-input>
                        </el-form-item>
                        <el-form-item label="所需资金" v-if="flag.moneyFlag">
                            <el-input size="small" type="number" v-model="form.money" placeholder="单位：万元" style="width:400px"></el-input>
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
                            <div v-if="!adminFlag">
                                <el-button v-if="companyProjectDemandId === 0" size="small" type="primary" round style="width:100px" @click="addProjectNeed">提交</el-button>
                                <el-button v-else size="small" type="primary" style="width:100px" round @click="updateProjectNeed">修改</el-button>
                            </div>
                            <div v-if="adminFlag">
                                <el-button size="small" type="success" round style="width:100px" @click="overProjectSure">通过</el-button>
                                <el-button size="small" type="danger" round style="width:100px" @click="openReject">驳回</el-button>
                                <el-button size="small" type="primary" round style="width:100px" @click="backToList">返回列表</el-button>
                            </div>
                        </el-form-item>
                    </el-form>
                </div>
            </el-tab-pane>
            <el-tab-pane label="其他合作需求" v-if="otherDetailFlag">
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
                            </el-checkbox-group>
                        </el-form-item>
                        <el-form-item label="是否保密">
                            <el-switch v-model="form.pass" active-text="保密" inactive-text="公开"></el-switch>
                            <p>保密的需求，仅 自己 和 江苏省工业和信息化厅 可见，该需求将以密文展示</p>
                        </el-form-item>
                        <el-form-item label="所需资金" v-if="flag.moneyFlag">
                            <el-input size="small" type="number" v-model="form.money" placeholder="单位：万元" style="width:400px"></el-input>
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
                            <div v-if="!adminFlag">
                                <el-button v-if="companyOtherDemandId === 0" size="small" type="primary" round style="width:100px" @click="addOtherNeed">提交</el-button>
                                <el-button v-else size="small" type="primary" style="width:100px" round @click="updateOtherNeed">修改</el-button>
                            </div>
                            <div v-if="adminFlag">
                                <el-button size="small" type="success" round style="width:100px" @click="overOtherSure">通过</el-button>
                                <el-button size="small" type="danger" round style="width:100px" @click="openReject">驳回</el-button>
                                <el-button size="small" type="primary" round style="width:100px" @click="backToList">返回列表</el-button>
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
        <el-dialog title="驳回理由" :visible.sync="rejectDialog" width="400px" center :close-on-click-modal="false" custom-class="dialogClass">
            <el-input type="textarea" :rows="6" v-model="remarks"></el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="rejectDialog = false">取消</el-button>
                <el-button type="primary" @click="sureReject">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import {listProductNotPage,listProject,addProductDemand,getCompanyProductDemand,updateProductDemand} from '@/api/need'
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
            remarks:''
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
                demandClass: this.demandProductClass,
                demandInfo: this.project.demandInfo,
                isEncryption: this.projectIsEncryption ? 1:0,
                marketDemandInfo: this.project.marketDemandInfo,
                otherDemand: this.project.otherDemand,
                requiredMoney: this.project.requiredMoney,
                technologyDemandInfo: this.project.technologyDemandInfo
            }
            addProductDemand(myData)
            .then(res=>{
                this.centerDialogVisible = true
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
            addProductDemand(myData)
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
                this.demandProductClass = this.product.demandClass
                this.handleChangeProduct(this.demandProductClass)
                this.productIsEncryption = this.product.isEncryption === 1 ? true :false
                this.companyProductDemandId = this.product.companyProductDemandId
            })
        },
        getProjectDetail(){
            let myData={
                companyProductDemandId:this.$route.query.id
            }
            getCompanyProductDemand(myData)
            .then(res=>{
                this.product = res.result
                this.demandProductClass = this.product.demandClass
                this.handleChangeProduct(this.demandProductClass)
                this.productIsEncryption = this.product.isEncryption === 1 ? true :false
                this.companyProductDemandId = this.product.companyProductDemandId
            })
        },
        getOtherDetail(){
            let myData={
                companyProductDemandId:this.$route.query.id
            }
            getCompanyProductDemand(myData)
            .then(res=>{
                this.product = res.result
                this.demandProductClass = this.product.demandClass
                this.handleChangeProduct(this.demandProductClass)
                this.productIsEncryption = this.product.isEncryption === 1 ? true :false
                this.companyProductDemandId = this.product.companyProductDemandId
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
            this.form = {}
        },
        overSure(){
            
        },
        openReject(){
            this.rejectDialog = true
        },
        sureReject(){
            
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
