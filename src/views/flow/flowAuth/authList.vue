<template>
  <div class="app-container">
    <el-form :model="queryParams"  @submit.native.prevent  ref="queryForm" :inline="true" v-show="showSearch" :label-width="$i18n.locale=='en'?'120px':'68px'">
      <el-form-item :label="$t('flowAuth.flowName')" prop="search">
        <el-input
          v-model="queryParams.search"
          :placeholder="$t('common.placeholder')+' '+$t('flowAuth.flowName')"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="cyan" icon="el-icon-search" size="mini" @click="handleQuery">{{$t('common.search')}}</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">{{$t('common.reset')}}</el-button>
      </el-form-item>
    </el-form>

    <el-table v-loading="loading" :data="flowList" border>

      <el-table-column :label="$t('flowAuth.flowName')" align="center" prop="flowName"/>
      <el-table-column :label="$t('flowAuth.authUser')" align="center" prop="agentUserName" />
      <el-table-column :label="$t('flowAuth.userAuth')" align="center" prop="userName" />
      <el-table-column :label="$t('flowAuth.startTime')" align="center" prop="beginDate">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.beginDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('flowAuth.endTime')" align="center" prop="endDate">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.endDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('common.status')" align="center" prop="status">

      </el-table-column>
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
import { recordList } from "@/api/agent/agent";

export default {
  name: "authList",
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
        pageSize: 10
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询印章登记列表 */
    getList() {
      this.loading = true;
      recordList(this.queryParams).then(response => {
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
  }
};
</script>
