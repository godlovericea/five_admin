<template>
    <div class="warnWrapper">
        <div class="divider"></div>
        
    </div>    
</template>

<script>
import {addCompanyScene,getCompanyScene} from '../../api/collect'
export default {
    data(){
        return{
            industry:'',
            tableData:[]
        }
    },
    mounted(){
        
    },
    methods:{
        
    }
}
</script>

<style lang="less" scoped>
.warnWrapper{
    width: 100%;
    padding: 20px;
 
}
</style>
