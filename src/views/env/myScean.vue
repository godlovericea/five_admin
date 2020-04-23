<template>
    <div class="tabBox">
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="scene" label="场景名称"></el-table-column>
            <el-table-column label="场景分类">
                <template slot-scope="scope">
                    <span v-if="scope.row.sceneClassification == 1">智慧交通</span>
                    <span v-if="scope.row.sceneClassification == 2">智能制造</span>
                    <span v-if="scope.row.sceneClassification == 3">智慧城市</span>
                    <span v-if="scope.row.sceneClassification == 4">智慧医疗</span>
                </template>
            </el-table-column>
            <el-table-column  label="操作">
                <template slot-scope="scope">
                    <el-button type="text" @click="goScean(scope.row.sceneId,scope.row.companyId)">详情</el-button>
                    <el-button type="text" @click="delScean(scope.row.sceneId)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        
    </div>
  </template>

<script>
import axios from 'axios'
import {listCompanyScene,checkCompany} from '../../api/collect'
export default {
    data(){
        return{
            pageNum:1,
            pageSize:20,
            total:0,
            tableData:[],
            state:''
        }
    },
    mounted(){
        this.getData()
    },
    methods:{
        getData(){
            let myData={
                companyId:parseInt(this.$route.query.id)
            }
            listCompanyScene(myData)
            .then(res=>{
                this.tableData = res.result
            })
        },
        check(params){
            this.$router.push({
                path:'/home/warning',
                query:{
                    id:params
                }
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
        goScean(sceanId,comId){
            this.$router.push({
                path:'/local/signManage',
                query:{
                    sceanId:sceanId,
                    comId:comId
                }
            })
        },
        delScean(params){
            let comName = parseInt(JSON.parse(sessionStorage.getItem("user")).comName)
            let myData={
                companySceneId:params,
                comName:comName
            }
            axios.post("http://120.55.161.93:6011/companyInfo/deleteCompanyScene",myData)
            .then(res=>{
                this.getData()
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