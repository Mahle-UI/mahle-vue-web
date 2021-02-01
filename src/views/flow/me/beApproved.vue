<template>
  <div class="app-container">
    <el-row :gutter="15">
      <el-col :span="24">
        <el-form :model="queryParams"  @submit.native.prevent  ref="queryForm" :inline="true" v-show="showSearch" label-width="68">
          <el-form-item :label="$t('fromme.applicationType')" prop="procesType">
             <el-select ref="multiSelect1" v-model="queryParams.procesType"  @keyup.enter.stop.native="handleQuery" :placeholder="$t('common.placeSelect')+$t('fromme.applicationType')" clearable size="small">
              <el-option
                v-for="dict in procesTypeOptions"
                :key="dict.dictValue"
                :label="dict.dictLabel"
                :value="dict.dictValue"
              />
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('common.keyWords')" prop="keywords">
            <el-input
              v-model="queryParams.keywords"
              :placeholder="$t('common.placeholder')+' '+$t('common.keyWords')"
              clearable
              size="small"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item :label="$t('common.date')" prop="dateRange">
            <el-date-picker
              v-model="dateRange"
              type="daterange"
              size="small"
              @change="queryDateChange"
              @keyup.enter.native="handleQuery"
              :range-separator="$t('common.to')"
              :start-placeholder="$t('common.startDate')"
              :end-placeholder="$t('common.endDate')" style="width: 260px">
            </el-date-picker>
          </el-form-item>
          <el-form-item :label="$t('flow.status')" prop="procesStatus" label-width="80">
            <el-select ref="multiSelect2" v-model="queryParams.procesStatus"  @keyup.enter.stop.native="handleQuery" :placeholder="$t('common.placeSelect')+' '+$t('contract.status')" clearable size="small">
               <el-option
                v-for="dict in procesStatusOptions"
                :key="dict.dictValue"
                :label="dict.dictLabel"
                :value="dict.dictValue"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="cyan" icon="el-icon-search" size="mini" @click="handleQuery">{{$t('common.search')}}</el-button>
            <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">{{$t('common.reset')}}</el-button>
          </el-form-item>
        </el-form>
        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5" v-if="false">
            <el-button
              type="primary"
              icon="el-icon-plus"
              size="mini"
              @click="handleAdd"
              v-hasPermi="['flow:contract:add']"
            >{{$t('common.add')}}</el-button>
          </el-col>
          <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
        <el-table v-loading="loading" :data="flowList" :stripe="true" border>
          <el-table-column width="150" :label="$t('flow.applicant')" align="center" prop="applicantName" :show-overflow-tooltip="true"/>
          <el-table-column width="180" :label="$t('flow.flowNo')" align="center" prop="procesSn" :show-overflow-tooltip="true"/>
          <el-table-column width="100" :label="$t('flow.level')" align="center" prop="urgent" :formatter="urgentFormat" :show-overflow-tooltip="true"/>
          <el-table-column width="220" :label="$t('flow.flowType')" align="center" prop="procesType" :formatter="procesTypeFormat" :show-overflow-tooltip="true"/>
          <el-table-column  :label="$t('flow.flowTitle')" align="center" prop="procesName" :show-overflow-tooltip="true" />
          <el-table-column width="100" :label="$t('flow.status')" align="center" prop="procesStatus" :formatter="procesStatusFormat" :show-overflow-tooltip="true"/>
          <el-table-column width="200" :label="$t('common.examinationApproval')" align="center" prop="currentApprove" :show-overflow-tooltip="true"/>
          <el-table-column width="180" :label="$t('flow.approvedTime')"   align="center" prop="procesTime" :show-overflow-tooltip="true">
            <template slot-scope="scope">
            {{parseTime(scope.row.procesTime,'{y}-{m}-{d} {h}:{i}')}}
            </template>
          </el-table-column>
          <el-table-column width="80" :label="$t('common.detailOperation')" align="center" class-name="small-padding fixed-width">
            <template slot-scope="scope">
               <el-button
                 size="mini"
                 type="text"
                 icon="el-icon-view"
                  @click="handleView(scope.row)"
                 v-hasPermi="['flow:contract:edit']"
               >{{$t('common.view')}}</el-button>
            </template>
          </el-table-column>
        </el-table>

        <pagination
          v-show="total>0"
          :total="total"
          :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize"
          @pagination="getList"
        />

      </el-col>
    </el-row>
  </div>
</template>

<script>
import { hadDoneList } from "@/api/info/proces";
import { getToken } from "@/utils/auth";
export default {
  name: "beApproved",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      isTemplate:"1",
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 流程表格数据
      flowList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      archivedOpen:false,
      procesTypeOptions:[],
      procesStatusOptions: [],
      urgentOptions:[],
      // 日期范围
      dateRange: [new Date(new Date().getFullYear()-3,0,1),new Date()],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10
      },
    };
  },
  created() {
    this.getList();
    this.getDicts("proces_type").then(response => {
      this.procesTypeOptions = response.data;
    });
    this.getDicts("proces_status").then(response => {
      this.procesStatusOptions = response.data;
    });
    this.getDicts("urgent").then(response => {
      this.urgentOptions = response.data;
    });

  },
  methods: {
    /** 查询合同查询列表 */
    getList() {
      this.loading = true;
      hadDoneList(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
        this.flowList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    procesStatusFormat(row, column) {
      return this.selectDictLabel(this.procesStatusOptions, row.procesStatus);
    },
    procesTypeFormat(row, column) {
      return this.selectDictLabel(this.procesTypeOptions, row.procesType);
    },
    urgentFormat(row, column) {
      return this.selectDictLabel(this.urgentOptions, row.urgent);
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.dateRange = []
      this.handleQuery();
      this.$refs.multiSelect1.blur()
      this.$refs.multiSelect2.blur()
    },
    //日期
    queryDateChange(){
      this.handleQuery()
    },
    handleView(row) {
      if(row.procesType=='0'){
        //合同
        this.$router.push("/me/detail?id="+row.hostId);
      }else if(row.procesType=='1'){
        //子合同
        this.$router.push("/me/detail?id="+row.hostId);
      }else if(row.procesType=='2'){
        //合同模板
        this.$router.push("/flow/templateDetail?id="+row.hostId);
      }else if(row.procesType=='3'){
        //印章制作申请
        this.$router.push("/flow/sealDetail?id="+row.hostId+"&category=1");
      }else if(row.procesType=='4'){
        //印章作废申请
        this.$router.push("/flow/sealDeleteDetail?id="+row.hostId);
      }else if(row.procesType=='5'){
        //子公司法人
        this.$router.push("/seal/sealUseDetail?id="+row.hostId);
      }else if(row.procesType == "6"){
        //公章外借
        this.$router.push("/flow/sealBorrowDetail?id="+row.hostId);
      }else if(row.procesType == "11"){
        //子合同2
        this.$router.push("/me/detail?id="+row.hostId);
      }

    },
  }
};
</script>

<style>

  .header{text-align: center;
  }
  .text {
    font-size: 14px;
  }
  .selectWidth{width:100%!important;}
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
</style>
