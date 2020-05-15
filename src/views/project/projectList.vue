<template>
    <div class="warnWrapper">
        <el-table :data="tableData" style="width: 100%">
            <el-table-column  prop="projectName" label="项目名称" width="200"></el-table-column>
            <el-table-column  prop="projectIntroduce" label="项目介绍" show-overflow-tooltip></el-table-column>
            <el-table-column  prop="projectKeyword" label="项目关键字"  width="180"></el-table-column>
            
            <el-table-column  prop="projectStart" label="启动日期" width="180"></el-table-column>
            <el-table-column  prop="projectEnd" label="拟完成日期" width="150"></el-table-column>
            <el-table-column  label="是否加密" width="180">
                <template slot-scope="scope">
                    <span class="over" v-if="scope.row.isEncryption == 1">加密</span>
                    <span class="fail" v-if="scope.row.isEncryption == 0">公开</span>
                </template>
            </el-table-column>
            <el-table-column label="审核状态" width="180" class-name="checkState">
                <template slot-scope="scope">
                    <span class="over" v-if="scope.row.state == 'N'">通过</span>
                    <span class="fail" v-if="scope.row.state == 'F'">未通过</span>
                    <span class="wait" v-if="scope.row.state == 'W'">待审核</span>
                </template>
            </el-table-column>
            <el-table-column  label="操作" width="180">
                <template slot-scope="scope">
                    <el-button type="text" @click="goDetail(scope.row.companyProjectId,scope.row.companyId)">详情</el-button>
                    <el-button type="text" @click="handleDel(scope.row.companyProjectId)">删除</el-button>
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
import {listCompanyProject,deleteProject} from '@/api/collect'
export default {
    data(){
        return{
            tableData:[],
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
            // let id = parseInt(JSON.parse(sessionStorage.getItem("user")).companyId)
            let myData={
                companyId:this.$route.query.id,
                pageNum:this.pageNum,
                pageSize:this.pageSize
            }
            listCompanyProject(myData)
            .then(res=>{
                this.total = res.result.total
                this.tableData = res.result.list
            })
        },
        goDetail(proId,comId){
            this.$router.push({
                path:'/project/newProject',
                query:{
                    comId:comId,
                    proId:proId
                }
            })
        },
        handleDel(id){
            this.$confirm('此操作将删除该项目, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    let comName = JSON.parse(sessionStorage.getItem("user")).comName
                    let myData = {
                        companyProjectId:id,
                        comName:comName
                    }
                    deleteProject(myData)
                    .then(res => {
                        this.getData()
                    })
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
