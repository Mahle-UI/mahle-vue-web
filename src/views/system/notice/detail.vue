<template>
  <div class="app-container">
    <el-card style="width: 90%;margin:0 auto">
      <h2>{{info.noticeTitle}}</h2>
      <div class="info">发布时间: {{info.createTime}}</div>
      <el-divider></el-divider>
      <div class="content" v-html="info.noticeContent"></div>
    </el-card>
  </div>
</template>

<script>
import { getNotice} from "@/api/system/notice";
export default {
  name: "notice",
  data() {
    return {
       info:{},
       id:0
    };
  },
  created() {
    this.id=this.$route.query.id;
    this.getDetail()
  },
  methods:{
     getDetail(){
        getNotice(this.id).then(res=>{
          if(res.code==200){
            this.info=res.data;
          }
        })
     }
  }
};
</script>

<style>
  .info{font-size:14px;color: #5e5e5e;margin: 20px 0px;}
</style>
