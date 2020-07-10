<template>
    <div class="warnWrapper">
        <div class="divider"></div>
        <div class="formBox">
            <el-form :inline="true" :model="form" class="demo-form-inline">
                <el-form-item label="公司名称">
                    <el-input v-model="form.comName" size="small" placeholder="请输入公司名称" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="所在市区">
                    <el-select v-model="form.city" :disabled="adminFlag">
                        <el-option v-for="(item, index) in cityList" :key="index" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="small" @click="getData">查询</el-button>
                    <el-button type="info" size="small" @click="resetData">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="comName" label="公司全称"></el-table-column>
            <el-table-column prop="city" label="公司全称"></el-table-column>
            <el-table-column prop="comCode" label="统一社会信用代码"></el-table-column>
            <el-table-column prop="comCode" label="公司类型">
                <template slot-scope="scope">
                    <span class="over" v-if="scope.row.comType == 1">新型研发机构</span>
                    <span class="fail" v-if="scope.row.comType == 2">孵化器</span>
                    <span class="wait" v-if="scope.row.comType == 3">企业</span>
                    <span class="wait" v-if="scope.row.comType == 4">服务机构</span>
                    <span class="wait" v-if="scope.row.comType == 5">金融机构</span>
                </template>
            </el-table-column>
            <el-table-column prop="loginName" label="登录名"></el-table-column>
            <el-table-column label="设置管理员">
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.adminStatus" active-text="是" inactive-text="否" @change="changeAdmin(scope.row.companyId,scope.row.adminStatus)"></el-switch>
                </template>
            </el-table-column>
            <el-table-column label="审核状态" width="180" class-name="checkState">
                <template slot-scope="scope">
                    <span class="over" v-if="scope.row.state == 'N'">通过</span>
                    <span class="fail" v-if="scope.row.state == 'F'">未通过</span>
                    <span class="wait" v-if="scope.row.state == 'W'">待审核</span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="text" @click="showDetail(scope.row.companyId,'/home/basicInfo')">基本信息</el-button>
                    <el-button type="text" @click="showDetail(scope.row.companyId,'/product/productList')">产品</el-button>
                    <el-button type="text" @click="showDetail(scope.row.companyId,'/project/projectList')">项目</el-button>
                    <el-button type="text" @click="showDetail(scope.row.companyId,'/need/needList')">需求</el-button>
                    <el-button type="text" @click="delCompany(scope.row.companyId)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="paginationBox">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="pageNum"
                :page-size="pageSize"
                layout="total, prev, pager, next"
                :total="total">
            </el-pagination>
        </div>
    </div>    
</template>

<script>
import {listCompany,updateCompanyAdmin,deleteCompany} from '@/api/collect'
export default {
    data(){
        return{
            adminFlag:false,
            tableData:[],
            form:{},
            pageNum:1,
            pageSize:20,
            total:0,
            cityList:[
                {
                value: 0,
                label:'全省'
                },
                {
                value: 1,
                label:'南京市'
                },
                {
                value: 2,
                label:'无锡市'
                },
                {
                value: 3,
                label:'徐州市'
                },
                {
                value: 4,
                label:'常州市'
                },
                {
                value: 5,
                label:'苏州市'
                },
                {
                value: 6,
                label:'南通市'
                },
                {
                value: 7,
                label:'连云港市'
                },
                {
                value: 8,
                label:'淮安市'
                },
                {
                value: 9,
                label:'盐城市'
                },
                {
                value: 10,
                label:'扬州市'
                },
                {
                value: 11,
                label:'镇江市'
                },
                {
                value: 12,
                label:'泰州市'
                },
                {
                value: 13,
                label:'宿迁市'
                }
            ]
        }
    },
    mounted(){
        this.getData()
    },
    methods:{
        getData(){
            const cityType = JSON.parse(sessionStorage.getItem('user')).cityType
            // console.log(Object.prototype.toString.call(cityType))
            if(cityType == '0') {
                this.adminFlag = false
            } else {
                this.adminFlag = true
            }
            const myData = {
                cityType:cityType,
                city:this.form.city || cityType,
                comName:this.form.comName,
                pageNum:this.pageNum,
                pageSize:this.pageSize
            }
            listCompany(myData)
            .then(res=>{
                this.tableData = []
                res.result.list.forEach(el=>{
                    if(el.isAdmin === 0){
                        el.adminStatus = false
                    }else{
                        el.adminStatus = true
                    }
                    this.tableData.push(el)
                })
                this.total = res.result.total
            })
        },
        resetData(){
            this.form = {}
            this.getData()
        },
        delCompany(id){
            this.$confirm('此操作将永久删除该公司, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    let comName = JSON.parse(sessionStorage.getItem("user")).comName
                    let myData = {
                        comName:comName,
                        companyId:id
                    }
                    deleteCompany(myData)
                    .then(res=>{
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        })
                        this.getData()
                    })
            })
        },
        showDetail(id,path){
            this.$router.push({
                path:path,
                query:{
                    id:id
                }
            })
        },
        changeAdmin(id,state){
            // console.log(id,state)
            let comName = JSON.parse(sessionStorage.getItem("user")).comName
            let myData = {
                companyId:id,
                isAdmin:state?1:0,
                comName:comName
            }
            updateCompanyAdmin(myData)
            .then(res=>{
                this.getData()
            })
        },
        handleSizeChange(val){
            this.pageSize = val
            this.getData()
        },
        handleCurrentChange(val){
            this.pageNum = val
            this.getData()
        }
    }
}
</script>

<style lang="less" scoped>
.warnWrapper{
    width: 100%;
    padding: 20px;
    .formBox{
        border-bottom: 1px solid #dddddd;
    }
}
</style>
