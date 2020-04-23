<template>
    <div class="tabBox">
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="comName" label="公司名称"></el-table-column>
            <el-table-column label="公司类型">
                <template slot-scope="scope">
                    <span v-if="scope.row.comType === 1">新型研发机构</span>
                    <span v-if="scope.row.comType === 2">孵化器</span>
                    <span v-if="scope.row.comType === 3">企业</span>
                    <span v-if="scope.row.comType === 4">服务机构</span>
                </template>
            </el-table-column>
            <el-table-column prop="comCode" label="社会统一信用代码"></el-table-column>
            <el-table-column prop="createDate" label="创建时间"></el-table-column>
            <el-table-column prop="loginName" label="登录名"></el-table-column>
            <el-table-column  label="操作">
                <template slot-scope="scope">
                    <el-button type="text" @click="goDetail(scope.row.companyId)">详情</el-button>
                    <el-button type="text" v-if="scope.row.state === 'F'" @click="handleCheck(scope.row.companyId)">审核</el-button>
                    <el-button type="text" @click="goScean(scope.row.companyId)">场景管理</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="提示" :visible.sync="centerDialogVisible" width="30%" center>
            <span slot="footer" class="dialog-footer">
                <el-button @click="onReject">不通过</el-button>
                <el-button type="primary" @click="onComfirm">通过</el-button>
            </span>
        </el-dialog>
        <div class="pagnation">
            <el-pagination layout="sizes,prev, pager, next"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :total="total">
            </el-pagination>
        </div>
        
    </div>
  </template>


<script>
import {listCompany,checkCompany} from '../../api/collect'
export default {
    data(){
        return{
            pageNum:1,
            pageSize:20,
            total:0,
            tableData:[],
            state:'',
            centerDialogVisible:false,
            companyId:0
        }
    },
    mounted(){
        this.getData()
    },
    methods:{
        getData(){
            let myData={
                pageNum:this.pageNum,
                pageSize:this.pageSize
            }
            listCompany(myData)
            .then(res=>{
                this.tableData = res.result.list
                this.total = res.result.total
            })
        },
        goDetail(params){
            this.$router.push({
                path:'/home/warning',
                query:{
                    id:params
                }
            })
        },
        handleCheck(id){
            this.companyId = id
            this.centerDialogVisible = true
        },
        onReject(){
            let comName = parseInt(JSON.parse(sessionStorage.getItem("user")).comName)
            let myData={
                companyId:this.companyId,
                state:'F',
                comName:comName
            }
            checkCompany(myData)
            .then(res=>{
                this.centerDialogVisible = false
                this.getData()
            })
        },
        onComfirm(){
            let comName = parseInt(JSON.parse(sessionStorage.getItem("user")).comName)
            let myData={
                companyId:this.companyId,
                state:'N',
                comName:comName
            }
            checkCompany(myData)
            .then(res=>{
                this.centerDialogVisible = false
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
        },
        goScean(params){
            this.$router.push({
                path:'/scean/myScean',
                query:{
                    id:params
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.tabBox{
    padding: 20px;
    .pagnation{
        padding: 20px 0;
        text-align: center;
    }
}
</style>