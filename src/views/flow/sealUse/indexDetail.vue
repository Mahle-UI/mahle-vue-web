<template>
  <div class="app-container" style="width: 95%;margin: 0 auto">
    <el-row style="text-align: right;display: flex;align-items: center">
      <el-col :span="12" style="text-align: left">
        <h3 style="font-size:18px;font-weight: normal;">{{$t('contract.childSealDetail')}}</h3>
      </el-col>
    </el-row>
    <el-collapse v-model="activeNames">
      <el-collapse-item :title="$t('contract.childSealDetail')" name="1" class="c">
         <seal-use  v-if="update" :viewForm="form" @update="updateFunc"></seal-use>
         <seal-use-detail v-else :viewForm="form"></seal-use-detail>
        <div style="text-align: center"  v-if="form.status==3 && $store.getters.userId == form.createBy"  >
          <el-button type="primary"  v-if="!update" @click="update=true" v-prevent-repeat-click>{{$t('common.update')}}</el-button>
        </div>
      </el-collapse-item>
    </el-collapse>
    <flow-detail :showComment="showComment" :tableData="tableData" :workId="form.workId"></flow-detail>

  </div>
</template>

<script>
  import { getView} from "@/api/flow/contract";
  import { getSealUse} from "@/api/flow/sealUse";
  import {getToken} from "@/utils/auth";
  import sealUseDetail from "@/components/flow/sealUseDetail";
  import contract from "../apply/contract";
  import flowDetail from "../../components/flowDetail/flowDetail";
  import sealUse from "../../flow/apply/sealUse";

  export default {
    name: "Contract",
    components: {
      sealUseDetail,flowDetail,contract,sealUse
    },
    data() {
      return {
       activeNames: ['1','2','4'],
        showApplyType: true,
        tableData: [],
        activeName: 'first',
        // 遮罩层
        loading: true,
        // 选中数组
        ids: [],
        isTemplate: "1",
        // 非单个禁用
        single: true,
        // 非多个禁用
        multiple: true,
        // 显示搜索条件
        showSearch: true,
        // 总条数
        total: 0,
        // 表单参数
        form: {},
        //暂存：save   提交：submit  退回： reject  撤销：cancel
        btn:[],
        temp:{radio:'',comment:''},
        userName:'',
        hostId:'',
        showComment:false,
        update: false
      };
    },
    methods: {
      updateFunc(val){
        this.update = false;
        if(val){
          this.getView();
        }
      },
      getView() {
        this.hostId = this.$route.query.id
        this.userName = this.$store.getters.name
        this.loading = true;
        getSealUse(this.hostId).then(response => {
          if(response.code=='200'){
            this.form = response.data.detail
            this.form.file =  response.data.file
            this.form.relatedDept = (this.form.relatedDept ? this.form.relatedDept.split(",") : []).map(Number)
            this.form.isupload = response.data.isupload
            this.form.annexs =  response.data.annexs
            this.tableData = response.data.history
          }
        });
      },
    },
    beforeRouteEnter(to,from,next){
        next((vm)=>{
          vm.getView()
      })
    },
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
<style  >
.el-tag.el-tag--info {
    min-width: 90%;
}
</style>
