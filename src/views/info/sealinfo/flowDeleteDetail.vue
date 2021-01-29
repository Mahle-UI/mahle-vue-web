<template>
  <div class="app-container" style="width: 95%;margin: 0 auto">
    <h3 style="font-size:18px;font-weight: normal;">{{$t('sealinfo.deleteDetail')}}</h3>
      <el-collapse v-model="activeNames">
        <el-collapse-item :title="$t('sealinfo.deleteDetail')" name="1" class="c">
          <el-form ref="form" :model="form"  :label-width="$i18n.locale=='en'?'150px':'130px'" style="width: 50%;">

        <el-form-item :label="$t('sealinfo.seal')" prop="supplyId">
          <el-input type="input" v-model="form.sealName" class="select-width" disabled=""></el-input>
        </el-form-item>
        <el-form-item :label="$t('sealinfo.reason')"  prop="trashReason">
          <el-input type="textarea" v-model="form.trashReason" disabled="" :placeholder="$t('common.placeholder')+' '+$t('sealinfo.reason')"/>
        </el-form-item>
        <el-form-item :label="$t('contractcate.remark')"  prop="remark">
          <el-input type="textarea" v-model="form.trashRemark" disabled="" :placeholder="$t('common.placeholder')+' '+$t('contractcate.remark')"/>
        </el-form-item>
      </el-form>
        </el-collapse-item>
      </el-collapse>
      <flow-detail :tableData="tableData" :workId="form.workId"></flow-detail>
  </div>
</template>

<script>
  import { getView} from "@/api/info/sealinfo";
  import sealDetail from "@/components/flow/sealDetail";
  import flowDetail from "../../components/flowDetail/flowDetail";

  export default {
    name: "Contract",
    components: {
      sealDetail,
      flowDetail
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
        temp:{radio:1,comment:''},
        userName:'',
        hostId:'',
        category:0
      };
    },
    methods: {
      getView() {
        this.hostId = this.$route.query.id
        this.userName = this.$store.getters.name
        this.loading = true;
        getView({supplyId:this.hostId,type:'1'}).then(response => {
          this.form = response.data.detail;
          this.tableData = response.data.history
          this.loading = false;
        });
      }
    },
    mounted(){
      this.category=this.$route.query.category;
    },
    beforeRouteEnter(to,from,next){
        next((vm)=>{
          vm.getView();
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
