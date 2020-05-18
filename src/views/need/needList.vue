<template>
    <div class="warnWrapper">
        <el-tabs v-model="activeName" type="card">
            <el-tab-pane label="主营产品需求" name="product">
                <el-table :data="productTabledata" style="width: 100%">
                    <el-table-column  prop="companyProductName" label="产品名称"></el-table-column>
                    <el-table-column  prop="demandInfo" label="需求介绍"></el-table-column>
                    <el-table-column  label="需求类别">
                        <template slot-scope="scope">
                            <span v-for="(item,index) in scope.row.demandClass" :key="index">
                                <span class="over" v-if="item === 1">资金支持</span>
                                <span class="fail" v-if="item === 2">技术支撑</span>
                                <span class="fail" v-if="item === 3">市场推广</span>
                                <span class="fail" v-if="item === 4">其他类型</span>
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column  label="是否加密" class-name="checkState">
                        <template slot-scope="scope">
                            <span class="wait" v-if="scope.row.isEncryption === 1">加密</span>
                            <span class="fail" v-if="scope.row.isEncryption === 0">公开</span>
                        </template>
                    </el-table-column>
                    <el-table-column  prop="encryptionCode" label="加密代号"></el-table-column>
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
                            <el-button type="text" @click="goDetail(scope.row.companyProductDemandId,'product')">详情</el-button>
                            <el-button type="text" @click="handleDel(scope.row.companyProductDemandId,'product')">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="在研项目需求" name="project">
                <el-table :data="projectTabledata" style="width: 100%">
                    <el-table-column  prop="companyProductName" label="项目名称"></el-table-column>
                    <el-table-column  prop="demandInfo" label="需求介绍"></el-table-column>
                    <el-table-column  label="需求类别">
                        <template slot-scope="scope">
                            <span v-for="(item,index) in scope.row.demandClass" :key="index">
                                <span class="over" v-if="item === 1">资金支持</span>
                                <span class="fail" v-if="item === 2">技术支撑</span>
                                <span class="fail" v-if="item === 3">市场推广</span>
                                <span class="fail" v-if="item === 4">其他类型</span>
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column  label="是否加密" class-name="checkState">
                        <template slot-scope="scope">
                            <span class="wait" v-if="scope.row.isEncryption === 1">加密</span>
                            <span class="fail" v-if="scope.row.isEncryption === 0">公开</span>
                        </template>
                    </el-table-column>
                    <el-table-column  prop="encryptionCode" label="加密代号"></el-table-column>
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
                            <el-button type="text" @click="goDetail(scope.row.companyProductDemandId,'product')">详情</el-button>
                            <el-button type="text" @click="handleDel(scope.row.companyProductDemandId,'product')">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="其他需求" name="other">
                <el-table :data="otherTabledata" style="width: 100%">
                    <el-table-column  prop="companyProductName" label="项目名称"></el-table-column>
                    <el-table-column  prop="demandInfo" label="需求介绍"></el-table-column>
                    <el-table-column  prop="projectKeyword" label="需求类别">
                        <template slot-scope="scope">
                            <span class="over" v-if="scope.row.isEncryption === 1">加密</span>
                            <span class="fail" v-if="scope.row.isEncryption === 0">公开</span>
                        </template>
                    </el-table-column>
                    <el-table-column  label="是否加密" class-name="checkState">
                        <template slot-scope="scope">
                            <span class="wait" v-if="scope.row.isEncryption === 1">加密</span>
                            <span class="fail" v-if="scope.row.isEncryption === 0">公开</span>
                        </template>
                    </el-table-column>
                    <el-table-column  prop="encryptionCode" label="加密代号"></el-table-column>
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
                            <el-button type="text" @click="goDetail(scope.row.companyProductDemandId,'product')">详情</el-button>
                            <el-button type="text" @click="handleDel(scope.row.companyProductDemandId,'product')">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>
        <div class="paginationBox">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="pageNum"
                :page-size="pageSize"
                layout="prev, pager, next"
                :total="total">
            </el-pagination>
        </div>
    </div>    
</template>

<script>
import {listCompanyProductDemand,listCompanyOtherDemand,listCompanyProjectDemand,deleteProductDemand,getCompanyProjectDemand} from '@/api/need'
export default {
    data(){
        return{
            activeName:'product',
            productTabledata:[],
            projectTabledata:[],
            otherTabledata:[],
            pageNum:1,
            pageSize:20,
            total:0
        }
    },
    mounted(){
        this.getProductData()
        this.getProjectData()
        this.getOtherData()
    },
    methods:{
        getProductData(){
            let myData={
                companyId:Number(this.$route.query.id),
                pageNum:this.pageNum,
                pageSize:this.pageSize
            }
            listCompanyProductDemand(myData)
            .then(res=>{
                this.productTabledata = res.result.list
            })
        },
        getProjectData(){
            let myData={
                companyId:Number(this.$route.query.id),
                pageNum:this.pageNum,
                pageSize:this.pageSize
            }
            listCompanyProjectDemand(myData)
            .then(res=>{
                this.projectTabledata = res.result.list
            })
        },
        getOtherData(){
            let myData={
                companyId:Number(this.$route.query.id),
                pageNum:this.pageNum,
                pageSize:this.pageSize
            }
            listCompanyOtherDemand(myData)
            .then(res=>{
                this.otherTabledata = res.result.list
            })
        },
        goDetail(id,type){
            this.$router.push({
                path:'/need/needWaire',
                query:{
                    id:id,
                    type:type
                }
            })
        },
        handleDel(id,type){
            this.$confirm('此操作将审核通过该公司, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    let comName = JSON.parse(sessionStorage.getItem("user")).comName
                    let myData={}
                    if(type === 'product'){
                        myData = {
                            companyProductDemandId:id,
                            comName:comName
                        }
                        deleteProductDemand(myData)
                        .then(res=>{
                            this.$message({
                                type:'success',
                                message:'删除成功'
                            })
                            this.getProductData()
                        })
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
