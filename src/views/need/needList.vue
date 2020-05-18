<template>
    <div class="warnWrapper">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="主营产品需求" name="product">
                <el-table :data="productTabledata" style="width: 100%">
                    <el-table-column  prop="companyProductName" label="产品名称"></el-table-column>
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
                            <el-button type="text" @click="goDetail(scope.row.companyProductDemandId)">详情</el-button>
                            <el-button type="text" @click="handleDel(scope.row.companyProductDemandId)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="在研项目需求" name="second">
                <el-table :data="projectTabledata" style="width: 100%">
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
            <el-tab-pane label="其他需求" name="third">角色管理</el-tab-pane>
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
import {listCompanyProductDemand,listCompanyOtherDemand,listCompanyProjectDemand} from '@/api/need'
export default {
    data(){
        return{
            activeName:'product',
            productTabledata:[],
            projectTabledata:[],
            pageNum:1,
            pageSize:20,
            total:0
        }
    },
    mounted(){
        this.getProductData()
    },
    methods:{
        getProductData(){
            let comName = JSON.parse(sessionStorage.getItem("user")).comName
            let myData={
                comName:comName,
                pageNum:this.pageNum,
                pageSize:this.pageSize
            }
            listCompanyProductDemand(myData)
            .then(res=>{
                this.productTabledata = res.result.list
            })
        },
        goDetail(id,type){
            this.$router.push({
                path:'/need/needWaire',
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
