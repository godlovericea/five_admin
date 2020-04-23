<template>
    <div class="logsBox">
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="content" label="操作内容"></el-table-column>
            <el-table-column prop="loginName" label="公司"></el-table-column>
            <el-table-column prop="createDate" label="操作时间"></el-table-column>
        </el-table>
    </div>
</template>

<script>
import {listLog} from '../../api/collect'
    export default{
        data(){
            return{
                tableData:[]
            }
        },
        mounted(){
            this.getData()
        },
        methods:{
            getData(){
                listLog()
                .then(res=>{
                    this.tableData = res.result.list
                })
            }
        }
    }
</script>

<style scoped>
.logsBox{
    padding: 30px;
}
</style>