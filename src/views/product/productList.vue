<template>
    <div class="warnWrapper">
        <el-table :data="tableData" style="width: 100%">
            <el-table-column  prop="productName" label="产品名称"></el-table-column>
            <el-table-column  prop="productSales" label="销售额"></el-table-column>
            <el-table-column  prop="productIntroduce" label="产品介绍" show-overflow-tooltip></el-table-column>
            <el-table-column  prop="date" label="产品关键字"></el-table-column>
            <!-- <el-table-column label="审核状态" width="180" class-name="checkState">
                <template slot-scope="scope">
                    <span class="over" v-if="scope.row.state == 'N'">通过</span>
                    <span class="fail" v-if="scope.row.state == 'F'">未通过</span>
                    <span class="wait" v-if="scope.row.state == 'W'">待审核</span>
                </template>
            </el-table-column> -->
            <el-table-column  prop="createData" label="日期"></el-table-column>
            <el-table-column  label="操作" width="180">
                <template slot-scope="scope">
                    <el-button type="text" @click="goDetail(scope.row.companyProductId,scope.row.companyId)">详情</el-button>
                    <el-button type="text" @click="handleDel(scope.row.companyProductId)">删除</el-button>
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
import {deleteProduct,listProduct} from '@/api/collect'
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
            let myData={
                companyId:this.$route.query.id,
                pageNum:this.pageNum,
                pageSize:this.pageSize
            }
            listProduct(myData)
            .then(res=>{
                this.total = res.result.total
                this.tableData = res.result.list
            })
        },
        postData(){
            let id = parseInt(JSON.parse(sessionStorage.getItem("user")).companyId)
            let comName = JSON.parse(sessionStorage.getItem("user")).comName
            let myData={
                    comName:comName,
                    companyId:id,
                    productIntroduce:this.form.productIntroduce,
                    industry:this.industry,
                    scenarioDefined:this.form.scenarioDefined,
                    productKeyword:this.form.productKeyword,
                    productVideo:this.form.productVideo,
                    imgList:this.photos
                }
            addProduct(myData)
            .then(res=>{
                console.log(res)
            })
        },
        goDetail(proId,comId){
            this.$router.push({
                path:'/product/newProduct',
                query:{
                    proId:proId,
                    comId:comId
                }
            })
        },
        handleDel(id){
            this.$confirm('此操作将永久删除该公司, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    let comName = JSON.parse(sessionStorage.getItem("user")).comName
                    let myData = {
                        companyProductId:id,
                        comName:comName
                    }
                    deleteProduct(myData)
                    .then(res => {
                        this.getData()
                    })
            })
        },
        handleRemove(file, fileList) {
            // console.log(file)
            // console.log(fileList)
            this.editFileList = []
            fileList.forEach(l=>{
                this.editFileList.push('q3vbt7rr5.bkt.clouddn.com'+ l.url.substring(23))
            })
            // console.log(this.editFileList)
        },
        handleAvatarSuccess(res,file,fileList){
            // console.log(res)
            this.photos.push(res[0])
        },
        beforeAvatarUpload(file) {
            const isJPEG = file.type === 'image/jpeg';
            const isJPG = file.type === 'image/jpg';
            const isPNG = file.type === 'image/png';
            const isLt2M = file.size / 1024 / 1024 < 4
            if (!isLt2M) {
                this.$message.error('上传图片大小不能超过 4MB!')
                return false
            }
            if(!isJPG && !isPNG && !isJPEG){
                this.$message.error('上传图片只能是 JPG 或者 PNG 格式!')
                return false
            }
            return isLt2M && (!isJPG || !isPNG || !isJPEG)
        },
        handleVideoSuccess(res,file,fileList){
            this.form.video = res[0]
        },
        beforeVideoUpload(file) {
            const isJPEG = file.type === 'video/mp4';
            const isLt2M = file.size / 1024 / 1024 < 100
            if (!isLt2M) {
                this.$message.error('上传视频大小不能超过 100MB!')
                return false
            }
            if(!isJPEG){
                this.$message.error('上传视频只能是MP4格式!')
                return false
            }
            return  isLt2M && isJPEG
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
