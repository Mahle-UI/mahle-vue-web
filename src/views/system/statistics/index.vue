<template>
  <div class="app-container" >
    <el-row :gutter="20">
      <!--数量和完成率-->
      <el-col :span="4" :xs="24">
        <div class="head-container panel-group">
          <div class="card-panel" style="background-color: #49a95f">
            <el-tooltip class="item" effect="dark" content="所有申请的合同数量，不包含历史合同" placement="top">
              <i class="el-icon-question custom-tips"></i>
            </el-tooltip>
            <div class="card-panel-icon-wrapper">
              <count-to :start-val="0" :end-val="num1" :duration="3200" />
            </div>
            <div class="bottom-text"> {{$t('statistics.contractNumber')}} </div>
          </div>
        </div>
      </el-col>
       <el-col :span="4" :xs="24">
        <div class="head-container panel-group">
          <div class="card-panel" style="background-color: #49a95f">
            <el-tooltip class="item" effect="dark" content="合同审批完成率% =（状态待归档+状态已归档）/(状态待归档+状态已归档+状态审批中+状态退回中）" placement="top">
              <i class="el-icon-question custom-tips"></i>
            </el-tooltip>
            <div class="card-panel-icon-wrapper">
              {{num2}}
            </div>
            <div class="bottom-text"> {{$t('statistics.contractApprovalCompletionRate')}} </div>
          </div>
        </div>
      </el-col>
       <el-col :span="4" :xs="24">
        <div class="head-container panel-group">
          <div class="card-panel" style="background-color: #49a95f">
            <el-tooltip class="item" effect="dark" content="合同归档完成率%=（状态已归档）/（状态待归档+状态已归档）" placement="top">
              <i class="el-icon-question custom-tips"></i>
            </el-tooltip>
            <div class="card-panel-icon-wrapper">
              {{num3}}
            </div>
            <div class="bottom-text"> {{$t('statistics.completionRateOfContractFiling')}} </div>
          </div>
        </div>
      </el-col>
      <el-col :span="4" :xs="24">
        <div class="head-container panel-group">
          <div class="card-panel" style="background-color: #49a95f">
            <el-tooltip class="item" effect="dark" content="所有历史合同的数量" placement="top">
              <i class="el-icon-question custom-tips"></i>
            </el-tooltip>
            <div class="card-panel-icon-wrapper">
              {{num6}}
            </div>
            <div class="bottom-text"> {{$t('statistics.historyContractNumber')}} </div>
          </div>
        </div>
      </el-col>
       <el-col :span="4" :xs="24">
        <div class="head-container panel-group">
          <div class="card-panel"  >
            <el-tooltip class="item" effect="dark" content="没有被作废的印章数量" placement="top">
              <i class="el-icon-question custom-tips"></i>
            </el-tooltip>
            <div class="card-panel-icon-wrapper">
              <count-to :start-val="0" :end-val="num4" :duration="3200" />
            </div>
            <div class="bottom-text"> {{$t('statistics.sealNumber')}} </div>
          </div>
        </div>
      </el-col>
       <el-col :span="4" :xs="24">
        <div class="head-container panel-group">
          <div class="card-panel"  >
            <el-tooltip class="item" effect="dark" content="印章审批完成率%=1-状态审批中/除暂存状态的所有印章" placement="top">
              <i class="el-icon-question custom-tips"></i>
            </el-tooltip>
            <div class="card-panel-icon-wrapper">
              {{num5}}
            </div>
            <div class="bottom-text"> {{$t('statistics.SealApprovalCompletionRate')}} </div>
          </div>
        </div>

      </el-col>
      <!--合同统计分页-->
      <el-col :span="24" :xs="24" >
        <div style="margin-top:20px;background-color: #ffffff;padding:20px;width:100%" >
          <el-form :model="queryParams" ref="queryForm"  @submit.native.prevent  :inline="true" v-show="showSearch" label-width="110px">
            <el-form-item :label="$t('statistics.ProcessCategory')" prop="procesType">
              <el-select v-model="queryParams.procesType" :placeholder="$t('statistics.ProcessCategory')" clearable size="small"  >
                <el-option v-for="dict in procesTypeOptions" :key="dict.dictValue" :label="dict.dictLabel" :value="dict.dictValue" />
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('statistics.deptName')" prop="deptId"  >
              <treeselect v-model="queryParams.deptId"  style="width: 240px" size="small" :options="deptOptions" :show-count="true" :placeholder="$t('statistics.deptName')" />
            </el-form-item>
            <el-form-item  :label="$t('statistics.year')" prop="year">
              <el-date-picker v-model="queryParams.year" size="small"   value-format="yyyy"  type="year"  ></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="cyan" icon="el-icon-search" size="mini" @click="handleQuery">{{$t('common.search')}}</el-button>
              <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">{{$t('common.reset')}}</el-button>
            </el-form-item>
          </el-form>

        <!-- <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button type="primary" size="mini" @click="handleContractGroup" v-hasPermi="['system:user:add']">{{$t('statistics.ContractProcessStatistics')}}</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="primary" size="mini" @click="handleQuantity" v-hasPermi="['system:user:edit']">{{$t('statistics.StatisticsContractsPendingApproval')}}</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="primary" size="mini" @click="handleContractApprovalCompletionRate" v-hasPermi="['system:user:remove']">{{$t('statistics.ContractApprovalCompletionRateStatistics')}}</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="primary" size="mini" @click="handleContractArchiveCompletionRate" v-hasPermi="['system:user:import']">{{$t('statistics.ContractFilingCompletionRateStatistics')}}</el-button>
          </el-col>
        </el-row> -->
          <el-row :gutter="10" class="mb8">
            <el-col :span="1.5">
              <el-button
                type="warning"
                icon="el-icon-download"
                size="mini"
                @click="handleExport"
                v-hasPermi="['flow:contract:export']"
              >{{$t('common.export')}}</el-button>
            </el-col>
          </el-row>
          <el-table v-loading="loading" :data="dataList"  style="background-color: #ffffff;" border>
            <el-table-column type="selection" width="50" align="center" v-if="false" />
            <el-table-column :label="$t('statistics.ProcessCategory')" align="center" prop="procesType" :formatter="procesTypeFormat" />
            <el-table-column :label="$t('statistics.cateId')" align="center" prop="cateDict" :formatter="cateDictFormat" :show-overflow-tooltip="true" />
            <el-table-column :label="$t('statistics.contractName')" align="center" prop="contractName" :show-overflow-tooltip="true" />
            <el-table-column :label="$t('statistics.deptName')" align="center" prop="deptName" :show-overflow-tooltip="true" />
            <el-table-column :label="$t('statistics.createTime')" align="center" prop="createTime" width="160">
              <template slot-scope="scope">
                <span>{{ parseTime(scope.row.createTime) }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('statistics.doTimes')" align="center" prop="doTimes" width="120" />
            <el-table-column :label="$t('statistics.warningSum')" align="center" prop="warningSum" width="120" />
          </el-table>

          <pagination v-show="total>0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize" @pagination="getList" />
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import {countAndRate,contractStatistics,exportStatisticsData} from "@/api/system/statistics";
import CountTo from 'vue-count-to'
import { getToken } from "@/utils/auth";
import { treeselect } from "@/api/system/dept";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

export default {
  name: "User",
   components: {
    CountTo,
    Treeselect,
  },
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 表格数据
      dataList: null,
      // 弹出层标题
      title: "",
      // 部门树选项
      deptOptions: undefined,
      // 是否显示弹出层
      open: false,
      // 部门名称
      deptName: undefined,
      // 默认密码
      initPassword: undefined,
      // 日期范围
      dateRange: [],
      // 状态数据字典
      procesTypeOptions: [],
      // 表单参数
      form: {},
      defaultProps: {
        children: "children",
        label: "label",
      },
      // 用户导入参数
      upload: {
        // 是否显示弹出层（用户导入）
        open: false,
        // 弹出层标题（用户导入）
        title: "",
        // 是否禁用上传
        isUploading: false,
        // 是否更新已经存在的用户数据
        updateSupport: 0,
        // 设置上传的请求头部
        headers: { Authorization: "Bearer " + getToken() },
        // 上传的地址
        url: process.env.VUE_APP_BASE_API + "/system/user/importData",
      },
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        userName: undefined,
        phonenumber: undefined,
        status: undefined,
        deptId: undefined,
      },
      num1:0,
      num2:0,
      num3:0,
      num4:0,
      num5:0,
      num6:0,
      cateDictOptions:[]
    };
  },
  created() {
    this.getList();
    this.getNum();
    this.getDicts("proces_type").then((response) => {
      this.procesTypeOptions = response.data;
    });
    this.getDicts("contract_cate").then(response => {
      this.cateDictOptions = response.data;
    });
    treeselect().then((response) => {
      this.deptOptions = response.data;
    });
  },
  methods: {
    procesTypeFormat(row, column) {
      return this.selectDictLabel(this.procesTypeOptions, row.procesType);
    },
    cateDictFormat(row, column) {
      return this.selectDictLabel(this.cateDictOptions, row.cateDict);
    },
    /** 查询列表 */
    getList() {
      this.loading = true;
      contractStatistics(this.queryParams).then(
        (response) => {
          this.dataList = response.rows;
          this.total = response.total;
          this.loading = false;
        }
      );
    },
    /** 查询数量 */
    getNum() {
      countAndRate().then((response) => {
          var data = response.data;
          this.num1 = data&&data.contractCount ?data.contractCount:0
          this.num2 = data&&data.contractApprovalCompletionRate ?data.contractApprovalCompletionRate:0
          this.num3 = data&&data.contractArchiveRate ?data.contractArchiveRate:0
          this.num4 = data&&data.sealCount ?data.sealCount:0
          this.num5 = data&&data.sealApprovalCompletionRate ?data.sealApprovalCompletionRate:0
          this.num6 = data&&data.historyContractCount ?data.historyContractCount:0
        }
      );
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.page = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = [];
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.userId);
      this.single = selection.length != 1;
      this.multiple = !selection.length;
    },
    handleContractGroup(){
       this.$router.push("/system/contractGroup");
    },
    handleContractApprovalCompletionRate(){
       this.$router.push("/system/contractApprovalCompletionRate");
    },
    handleContractArchiveCompletionRate(){
       this.$router.push("/system/contractArchiveCompletionRate");
    },
    handleQuantity(){
      this.$router.push("/system/quantity");
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm(this.$t('common.confirmExport'), this.$t('common.warning'), {
        confirmButtonText: this.$t('common.submit'),
        cancelButtonText: this.$t('common.cancle'),
        type: "warning"
      }).then(function() {
        return exportStatisticsData(queryParams);
      }).then(response => {
        this.download(response.msg);
      }).catch(function() {});
    },
  },
};
</script>

<style lang="scss" scoped>
.app-container{
  background-color: #f0f2f5;
  height: 100%;
}
.panel-group {
  margin-top: 10px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    border-radius: 5px;
    height: 108px;
    cursor: pointer;
    font-size: 30px;
    position: relative;
    overflow: hidden;
    color: #ffffff;
    background: #3c91ff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);

    .bottom-text{position: absolute;bottom:0px; padding:10px;font-size: 15px; text-align: center;width: 100%;opacity: 0.5;background-color: #717171
    }

    .card-panel-num {
      display: block;
      font-size: 20px;
      position: absolute;
      top:10px;
      right:10px;
    }

    .card-panel-icon-wrapper {
      margin-top: 20px;
      -webkit-transition: all 0.38s ease-out;
      transition: all 0.38s ease-out;
      border-radius: 6px;
      text-align: center;
    }
    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 33px;
      margin-left: 0px;
      position: relative;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 18px;
        margin-bottom: 12px;
      }
    }
    .custom-tips{
      position: absolute;
      top: 5px;
      right: 6px;
      font-size: 22px;
      border: none;
    }
  }
}

@media (max-width:550px) {
  .card-panel-description {
    display: none;
  }
}
</style>
