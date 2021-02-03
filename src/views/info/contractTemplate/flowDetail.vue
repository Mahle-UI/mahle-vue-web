<template>
  <div class="app-container" style="width: 95%;margin: 0 auto">
    <div class="flow-container">
    <h3 style="font-size:18px;font-weight: normal;">{{$t('contractTemplate.functionName')+$t('common.detail')}}</h3>
      <el-collapse v-model="activeNames">
        <el-collapse-item :title="$t('contractTemplate.functionName')+$t('common.detail')" name="1" class="c">
              <contract-template  v-if="update" :templId="hostId" :type='3' @update="update=false"></contract-template>
              <contract-detail v-else :deptOptions="deptOptions" :deptDictOptions="deptDictOptions" :contractcateOptions="contractcateOptions" :form="form"></contract-detail>
              <div style="text-align: center" v-if="form.templDict=='4'"  >
                <el-button type="primary"  v-if="!update" @click="update=true" v-prevent-repeat-click>{{$t('common.update')}}</el-button>
              </div>
        </el-collapse-item>
      </el-collapse>

      <flow-detail v-if="form.category === '1'" :showComment="showComment" :tableData="tableData" :workId="form.workId"></flow-detail>
    </div>
  </div>
</template>

<script>
  import { loaddictdept,loaddept,loadcontractcate,contemplView } from "@/api/info/contractTemplate";
  import contractDetail from '@/components/flow/contractDetail'
  import contractTemplate from '../../components/contractTemplate/contractTemplate'
  import {getToken} from "@/utils/auth";
  import flowDetail from "../../components/flowDetail/flowDetail";

  export default {
    name: "Contract",
    components: {
      flowDetail,
      contractDetail,
      contractTemplate
    },
    data() {
      return {
        activeNames: ['1','2','4'],
        form:{},
        tableData:[],
        hostId:'',
        deptOptions:[],
        deptDictOptions:[],
        contractcateOptions:[],
        showComment:false,
        update:false
      };
    },
    created() {

    },
    methods: {
      // 取消按钮
      cancel() {
        this.closeCurrentTag();
      },
      getView() {
        this.hostId = this.$route.query.id
        this.userName = this.$store.getters.name
        this.loading = true;
        contemplView({templId:this.hostId}).then(response => {
          var data = response.data.detail;
          data.usageDepts = ''
          if(data.usageDeptList&&data.usageDeptList.length>0){
            data.usageDepts = data.usageDeptList[0].deptId? Number(data.usageDeptList[0].deptId):''
          }
          data.concernDept = []
          if(data.concernDeptList&&data.concernDeptList.length>0){
            data.concernDeptList.forEach(item=>{
              data.concernDept.push(Number(item.dictId))
            })
          }
          this.form = data;
          this.tableData = response.data.history
          this.showComment = this.form.templDict=='4'?true:false
          this.loading = false;
        });
        loaddept().then(response => {
            if (response.code === 200) {
              this.deptOptions = response.data
            }
        });
        loaddictdept().then(response => {
            if (response.code === 200) {
              this.deptDictOptions = response.data
            }
        });
        loadcontractcate().then(response => {
            if (response.code === 200) {
              this.contractcateOptions = response.data
            }
        });
      }
    },
    beforeRouteEnter(to,from,next){
        next((vm)=>{
          vm.getView()
      })
    },
  };
</script>


<style scoped>

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
