<template>
  <div class="app-container" style="width: 95%;margin: 0 auto">
    <h3 style="font-size:18px;font-weight: normal;">{{$t('sealinfo.detail')}}</h3>
      <el-collapse v-model="activeNames">
        <el-collapse-item :title="$t('sealinfo.detail')" name="1" class="c">
          <seal :sealForm="form" v-if="update"   @update="updateFunc"></seal>
          <seal-detail :form="form" :registerOptions="registerOptions" :browOptions="browOptions" v-else></seal-detail>
          <div style="text-align: center" v-if="form.sealDict==7&& $store.getters.userId == form.createBy"  >
            <el-button type="primary"  v-if="!update" @click="update=true" v-prevent-repeat-click>{{$t('common.update')}}</el-button>
          </div>
        </el-collapse-item>
      </el-collapse>
      <flow-detail v-if="this.category==1" :showComment="showComment" :tableData="tableData" :workId="form.workId"></flow-detail>
  </div>
</template>

<script>
  import { getView} from "@/api/info/sealinfo";
  import sealDetail from "@/components/flow/sealDetail";
  import seal from "../../flow/apply/seal";
  import flowDetail from "../../components/flowDetail/flowDetail";
  import store from "../../../store";

  export default {
    name: "Contract",
    components: {
      sealDetail,
      flowDetail,seal
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
        category:0,
        browOptions:[],
        registerOptions:[],
        update:false
      };
    },
    methods: {
      getView() {
        this.getDicts("seal_brow").then(response => {
          this.browOptions = response.data;
        });
        this.getDicts("seal_register").then(response => {
          this.registerOptions = response.data;
        });

        this.hostId = this.$route.query.id
        this.userName = this.$store.getters.name
        this.loading = true;
        getView({supplyId:this.hostId,type:'0'}).then(response => {
          this.form = response.data.detail;
          this.form.isBrow = this.form.isBrow+""
          this.form.isRegister = this.form.isRegister+""
          this.tableData = response.data.history
          this.showComment = this.form.sealDict=='7'?true:false
          this.form.list[0].filePath = process.env.VUE_APP_BASE_DOWNLOAD_URL + this.form.list[0].fmsInfoId;
          this.loading = false;
        });
      },
      updateFunc(val){
        this.update=false;
        if (val){
          this.getView();
        }
      }
    },
    mounted(){
      this.category=this.$route.query.category;
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
