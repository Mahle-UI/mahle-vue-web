<template>
  <div style="width: 100%;">
    <iframe :src="picurl" style="width: 100%;border:0px;height:550px;margin-top: -200px;margin-bottom: -30px;"></iframe>
  </div>
</template>

<script>
    export default {
        name: "FlowPic",
        props:{
          workId:String
        },
        data(){
          return{
            //picurl:"http://101.231.37.170:8888/horizon-workflow-boot/workflow/module/designer/index_1.html?showtype=2&dataid="  + this.workId
            //picurl:"/horizon-workflow-boot/workflow/module/designer/index_1.html?showtype=2&dataid="  + this.workId
            picurl:"http://10.196.90.115/horizon-workflow-boot/workflow/module/designer/index_1.html?showtype=2&dataid="  + this.workId
          }
        },
      watch:{
          workId(val){
            this.workId = val;
            this.picurl = "http://10.196.90.115/horizon-workflow-boot/workflow/module/designer/index_1.html?showtype=2&dataid="  + val;
          }
      }
    }
</script>

<style scoped>

</style>
