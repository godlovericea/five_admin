<template>
    <div class="warnWrapper">
        <el-table :data="tableData" style="width: 100%">
            <el-table-column  prop="demandIndo" label="项目名称"></el-table-column>
            <el-table-column  prop="demandIndo" label="项目介绍"></el-table-column>
            <el-table-column  prop="projectKeyword" label="项目关键字"></el-table-column>
            <el-table-column label="审核状态" width="180" class-name="checkState">
                <template slot-scope="scope">
                    <span class="over" v-if="scope.row.state == 'N'">通过</span>
                    <span class="fail" v-if="scope.row.state == 'F'">未通过</span>
                    <span class="wait" v-if="scope.row.state == 'W'">待审核</span>
                </template>
            </el-table-column>
            <el-table-column  prop="createDate" label="日期"></el-table-column>
            <el-table-column  label="操作" width="180">
                <template slot-scope="scope">
                    <el-button type="text" @click="goDetail(scope.row.companyDemandId)">详情</el-button>
                    <el-button type="text" @click="handleDel(scope.row.companyDemandId)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="pageNum"
            :page-size="pageSize"
            layout="total, prev, pager, next"
            :total="total">
        </el-pagination>
    </div>    
</template>

<script>
import {listCompanyDemand,deleteDemand} from '@/api/collect'
export default {
    data(){
        return{
            tableData:[],
            pageNum:1,
            pageSize:20,
            total:0
        }
    },
    mounted(){
        this.getData()
    },
    methods:{
        getData(){
            let id = parseInt(JSON.parse(sessionStorage.getItem("user")).companyId)
            let myData={
                companyId:id,
                pageNum:this.pageNum,
                pageSize:this.pageSize
            }
            listCompanyDemand(myData)
            .then(res=>{
                this.tableData = res.result.list
            })
        },
        goDetail(id){
            this.$router.push({
                path:'/project/newProject',
                query:{
                    id:id
                }
            })
        },
        handleDel(id){
            let comName = JSON.parse(sessionStorage.getItem("user")).comName
            let myData = {
                companyDemandId:id,
                comName:comName
            }
            deleteDemand(myData)
            .then(res => {
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
}
</style>
