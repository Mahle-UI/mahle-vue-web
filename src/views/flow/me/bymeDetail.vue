<template>
  <div class="app-container" style="width: 95%;margin: 0 auto">
    <el-row style="text-align: right;display: flex;align-items: center">
      <el-col :span="12" style="text-align: left">
        <h3 style="font-size:18px;font-weight: normal;">
          {{ title }}
        </h3>
      </el-col>
    </el-row>
    <el-collapse v-model="activeNames">
      <el-collapse-item :title="$t('contract.contractDetails')" name="1" class="c">
        <contract v-if="update" :contractForm="form" :contractType='3' @update="updateCallback"></contract>
        <contract-detail v-else :form="form" :showArchive="showArchive"></contract-detail>
        <div style="text-align: center" v-if="form.contractDict==5&&form.applyForUserId == $store.getters.userId">
          <el-button type="primary" v-if="!update" @click="update=true" v-prevent-repeat-click>
            {{ $t('common.update') }}
          </el-button>
        </div>
      </el-collapse-item>
    </el-collapse>
    <!--  此处加个判断 如果是历史合同 不显示流程相关的数据  -->
    <flow-detail v-if="this.form.isHistory === '0'" :showComment="showComment" :form="form" :explan="form.explan"
                 :msgFlag="form.msgFlag" :hostId="hostId" :tableData="tableData" :workId="form.workId"></flow-detail>

  </div>
</template>

<script>
import {getView} from "@/api/flow/contract";
import contractDetail from "@/components/flow/contractBymeDetail";
import contract from "../apply/contract";
import flowDetail from "../../components/flowDetail/flowDetailContract";
import {getFlowOperateButton} from "@/api/info/flow";
import {getFlowType} from "@/api/info/proces";


export default {
  name: "Contract",
  components: {
    contractDetail, flowDetail, contract
  },
  data() {
    return {
      title:'',
      activeNames: ['1', '2', '4'],
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
      btn: [],
      temp: {radio: '', comment: ''},
      userName: '',
      hostId: '',
      showArchive: false,
      showComment: false,
      update: false
    };
  },
  created() {
    //console.log(this.update);
    this.initTitle();
  },
  methods: {
    initTitle(){
      let hostId = this.$route.query.id;
      if(hostId) {
        getFlowType(hostId).then(response => {
          if (response.code === 200 && response.data) {
            this.title = this.$t('contract.contractApprovalDetails') + "：" + response.data
            console.log(response)
          }else {
            this.title = this.$t('contract.historyContractDetails')
          }
        })
      }else {
        this.title = this.$t('contract.historyContractDetails')
      }
    },
    updateCallback(val){
      this.getView();
    },
    getView() {
      this.update=false;
      this.hostId = this.$route.query.id
      this.userName = this.$store.getters.name
      this.loading = true;
      getView({contractId: this.hostId}).then(response => {
        this.form = response.data.detail;
        this.form.objectArr = []
        this.form.objComboList.forEach(item => {
          this.form.objectArr.push(item.objId)
        })

        this.form.remark = this.form.reMark || ""
        this.form.applyForUserName = this.form.applyForUNameCn
        // +" "+this.form.applyForUNameEn
        this.form.applyForDeptName = this.form.applyForDeptCn + " " + this.form.applyForDeptEn
        this.form.concernDeptArr = []
        this.form.conCernDeptList.forEach(item => {
          this.form.concernDeptArr.push(Number(item.dictId))
        })
        this.tableData = response.data.history
        this.loading = false;
      });
    },
    getFlowOperateButton() {
      this.hostId = this.$route.query.id
      getFlowOperateButton({hostId: this.hostId}).then(response => {
        this.btn = response.data;
        if (!this.showArchive) {
          this.showArchive = false
          this.btn.forEach(item => {
            if (item.buttonId == 'archiveSubmit') {
              this.showArchive = true
            }
          })
        } else {
          this.showArchive = false
        }
      });
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.getView()
      vm.getFlowOperateButton()
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

.el-collapse {
  border: 0px;
}

.el-collapse-item__header {
  font-size: 16px;
  background-color: #f9f9f9;
  margin-bottom: 10px;
  padding-left: 10px;
  border-bottom: 1px solid #ededed;
}

.el-collapse-item {
  background-color: white;
  border: 1px solid #ededed;
  margin-top: 20px;
}

.el-collapse-item__content {
  padding: 10px;
}
</style>
<style>
.el-tag.el-tag--info {
  min-width: 90%;
}
</style>
