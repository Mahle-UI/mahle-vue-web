<template>
  <div class="app-container">
      <el-row style="text-align: right;display: flex;align-items: center">
        <el-col :span="12" style="text-align: left">
          <h3 style="font-size:18px;font-weight: normal;">{{$t('common.news')+$t('common.detail')}}</h3>
        </el-col>
      </el-row>
      <el-collapse v-model="activeNames">
        <el-collapse-item :title="$t('common.news')+$t('common.detail')" name="1" class="c">
            <el-form ref="form"  label-width="80px">
              <el-form-item :label="$t('flowAuth.title')+'：'" >
                {{form.newsTitle}}
              </el-form-item>
              <el-form-item :label="$t('common.date')+'：'" >
                {{form.creatTime}}
              </el-form-item>
              <el-form-item :label="$t('common.content')+'：'">
                {{form.newsContent}}
              </el-form-item>
            </el-form>
        </el-collapse-item>
      </el-collapse>
     
  </div>
</template>

<script>
import {   getNotice  } from "@/api/system/notice"; 

export default {
  name: "news", 
  data() {
    return { 
      // 表单参数
      form: {
        newsTitle:'标题',
        newsContent:'内容',
        creatTime:'2020-11-20 08:00:12'
      }, 
      activeNames:['1']
    };
  },
  created() {
    this.getView(); 
  },
  methods: { 
    getView() {
        // getNotice(this.$route.query.id).then(response => {
        //   this.form = response.data; 
        // });
    },
  }
};
</script>

<style>

  .header {
    text-align: center;
  }

  .text {
    font-size: 14px;
  }

  .selectWidth {
    width: 100% !important;
  }

  .item {
    margin-bottom: 18px;
    padding-bottom: 8px;
    text-align: center;
    border-bottom: 1px solid #f3f3f3;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .el-collapse{
    border: 0px;
  }

  .el-collapse-item__header{font-size:16px;
    background-color: #f9f9f9;margin-bottom: 10px; padding-left: 10px;
    border-bottom: 1px solid #ededed;
  }

  .el-collapse-item{
    background-color: white;
    border:1px solid #ededed;
    margin-top: 20px;
  }

  .el-collapse-item__content{
    padding: 10px;
  }
</style> 

<style scoped>
.el-form-item{margin-bottom:5px}
</style>
