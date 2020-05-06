<template>
    <div class="warnWrapper">
        <el-table :data="tableData" style="width: 100%">
            <el-table-column  prop="productName" label="产品名称"></el-table-column>
            <el-table-column  prop="productIntroduce" label="产品介绍"></el-table-column>
            <el-table-column  prop="date" label="产品关键字"></el-table-column>
            <el-table-column label="审核状态" width="180" class-name="checkState">
                <template slot-scope="scope">
                    <span class="over" v-if="scope.row.state == 'N'">通过</span>
                    <span class="fail" v-if="scope.row.state == 'F'">未通过</span>
                    <span class="wait" v-if="scope.row.state == 'W'">待审核</span>
                </template>
            </el-table-column>
            <el-table-column  prop="createData" label="日期"></el-table-column>
            <el-table-column  label="操作" width="180">
                <template slot-scope="scope">
                    <el-button type="text" @click="goDetail(scope.row.companyProductId)">详情</el-button>
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
            industry:[],
            industyList:[
                {
                    value: 1,
                    label: '上游产业链',
                    children:[
                        {
                            value: 11,
                            label: '芯片',
                            children:[
                                {
                                    value: 111,
                                    label: '光芯片',
                                },
                                {
                                    value: 112,
                                    label: '射频芯片',
                                },
                                {
                                    value: 113,
                                    label: '基带芯片',
                                },
                                {
                                    value: 114,
                                    label: '其他芯片',
                                }
                            ]
                        },
                        {
                            value: 12,
                            label: '射频器件及模块',
                            children:[
                                {
                                    value: 121,
                                    label: '射频模块',
                                },
                                {
                                    value: 122,
                                    label: '滤波器',
                                },
                                {
                                    value: 123,
                                    label: '功率放大器',
                                },
                                {
                                    value: 124,
                                    label: '射频开关',
                                },
                                {
                                    value: 125,
                                    label: 'PCB',
                                }
                            ]
                        },
                        {
                            value: 13,
                            label: '光器件及模块',
                            children:[
                                {
                                    value: 131,
                                    label: '光模块',
                                },
                                {
                                    value: 132,
                                    label: '有源光器件',
                                },
                                {
                                    value: 133,
                                    label: '无源光器件',
                                },
                                {
                                    value: 134,
                                    label: '波分复用器',
                                }
                            ]
                        },
                        {
                            value: 14,
                            label: '传播介质',
                            children:[
                                {
                                    value: 141,
                                    label: '光纤光缆光棒',
                                },
                                {
                                    value: 142,
                                    label: '射频电缆(含连接器)',
                                }
                            ]
                        },
                        {
                            value: 15,
                            label: '天线',
                            children:[
                                {
                                    value: 151,
                                    label: '基站天线',
                                },
                                {
                                    value: 152,
                                    label: '小天线',
                                }
                            ]
                        }
                    ]
                },
                {
                    value: 2,
                    label: '中游产业链',
                    children:[
                        {
                           value: 21,
                            label: '传播设备',
                            children:[
                                {
                                    value: 211,
                                    label: '宏基站',
                                },
                                {
                                    value: 212,
                                    label: '微基站'
                                }
                            ]
                        },
                        {
                           value: 22,
                            label: '网络设备',
                            children:[
                                {
                                    value: 221,
                                    label: '交换机',
                                },
                                {
                                    value: 222,
                                    label: '路由器',
                                },
                                {
                                    value: 223,
                                    label: '服务器',
                                }
                            ]
                        },
                        {
                           value: 23,
                            label: '网络规划服务',
                            children:[
                                {
                                    value: 231,
                                    label: '规划设计',
                                },
                                {
                                    value: 232,
                                    label: 'SDN/NFV',
                                },
                                {
                                    value: 233,
                                    label: '网络优化和维护',
                                }
                            ]
                        }
                    ]
                },
                {
                    value: 3,
                    label: '下游产业链',
                    children:[
                        {
                            value: 31,
                            label: '终端设备',
                            children:[
                                {
                                    value: 311,
                                    label: '手机终端'
                                },
                                {
                                    value: 312,
                                    label: '智能终端'
                                },
                                {
                                    value: 313,
                                    label: '工业设备'
                                },
                                {
                                    value: 314,
                                    label: '智能穿戴设备'
                                },
                                
                            ]
                        },
                        {
                            value: 32,
                            label: '应用服务',
                            children:[
                                {
                                    value: 321,
                                    label: '工业互联网'
                                },
                                {
                                    value: 322,
                                    label: '车联网'
                                },
                                {
                                    value: 323,
                                    label: '智慧城市'
                                },
                                {
                                    value: 324,
                                    label: '智慧医疗'
                                },
                                {
                                    value: 325,
                                    label: '智慧教育'
                                },
                                {
                                    value: 326,
                                    label: '高清视频'
                                },
                                {
                                    value: 327,
                                    label: 'VR/AR'
                                }
                            ]
                        }
                    ]
                },
            ],
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
            let id = parseInt(JSON.parse(sessionStorage.getItem("user")).companyId)
            let myData={
                companyId:id,
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
        goDetail(id){
            this.$router.push({
                path:'/product/newProduct',
                query:{
                    id:id
                }
            })
        },
        handleDel(id){
            let comName = JSON.parse(sessionStorage.getItem("user")).comName
            let myData = {
                companyProductId:id,
                comName:comName
            }
            deleteProduct(myData)
            .then(res => {
                this.getData()
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
