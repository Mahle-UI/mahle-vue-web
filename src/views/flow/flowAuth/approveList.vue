<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" :label-width="$i18n.locale=='en'?'120px':'68px'">
      <el-form-item :label="$t('flowAuth.flowName')" prop="search">
        <el-select v-model="queryParams.flowId" :placeholder="$t('common.placeSelect')+$t('flowAuth.flowName')" clearable size="small">
              <el-option
                v-for="dict in procesTypeOptions"
                :key="dict.dictValue"
                :label="dict.dictLabel"
                :value="dict.dictValue"
              />
            </el-select>
      </el-form-item>
        <el-form-item :label="$t('flowAuth.title')" prop="title">
          <el-input  v-model="queryParams.title" :placeholder="$t('common.placeholder')+' '+$t('flowAuth.title')"/>
        </el-form-item>
      <el-form-item>
        <el-button type="cyan" icon="el-icon-search" size="mini" @click="handleQuery">{{$t('common.search')}}</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">{{$t('common.reset')}}</el-button>
      </el-form-item>
    </el-form>

    <el-table v-loading="loading" :data="flowList" border>
      <el-table-column :label="$t('flowAuth.title')" align="center" prop="title" :resizable="false">
        <template slot-scope="scope">
          <el-button type="text" @click="toDetail(scope.row)">{{scope.row.title}}</el-button>
        </template>
      </el-table-column>
      <el-table-column :label="$t('flowAuth.flowName')" align="center" prop="flowname" :resizable="false"/>
      <el-table-column :label="$t('flowAuth.approveTime')" align="center" prop="savetime" :resizable="false"/>
      <el-table-column :label="$t('flowAuth.authUser')" align="center" prop="agentusername" :resizable="false"/>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

  </div>
</template>

<script>
import { agentList } from "@/api/agent/agent";

export default {
  name: "SealUse",
  data() {
    return {
      radio:'1',
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
      // 流程表格数据
      flowList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        type:0
      },
      procesTypeOptions:[],
    };
  },
  created() {
    this.getDicts("proces_type").then(response => {
      this.procesTypeOptions = response.data;
    });
    this.getList();
  },
  methods: {
    /** 查询印章登记列表 */
    getList() {
      this.loading = true;
      agentList(this.queryParams).then(response => {
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
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    toDetail(row) {
      let hostId = row.hostId;
      if(row.procesType=='0'){
        //合同
        this.$router.push(`/me/detail?id=${hostId}`);
      }else if(row.procesType=='1'){
        //子合同
        this.$router.push("/me/detail?id="+hostId);
      }else if(row.procesType=='2'){
        //合同模板
        this.$router.push("/flow/templateDetail?id="+hostId);
      }else if(row.procesType=='3'){
        //印章制作申请
        this.$router.push("/flow/sealDetail?id="+hostId+"&category=1");
      }else if(row.procesType=='4'){
        //印章作废申请
        this.$router.push("/flow/sealDeleteDetail?id="+hostId);
      }else if(row.procesType=='5'){
        //子公司法人
        this.$router.push("/seal/sealUseDetail?id="+hostId);
      }else if(row.procesType == "6"){
        //公章外借
        this.$router.push("/flow/sealBorrowDetail?id="+hostId);
      }else if(row.procesType == "11"){
        //子合同2
        this.$router.push("/me/detail?id="+ hostId);
      }

    },
  }
};
</script>
