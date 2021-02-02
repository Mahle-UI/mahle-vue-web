<template>
  <div class="app-container">
    <el-form :model="queryParams"  @submit.native.prevent  ref="queryForm" :inline="true" v-show="showSearch" :label-width="$i18n.locale=='en'?'100px':'68px'">
      <el-form-item :label="$t('sealBorrow.keyword')" prop="searchContent">
        <el-input
          v-model="queryParams.searchContent"
          :placeholder="$t('common.placeholder')+' '+$t('sealBorrow.keywords')"
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

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['flow:sealBorrow:add']"
        >{{$t('sealBorrow.addSealBorrow')}}</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['flow:sealBorrow:export']"
        >{{$t('sealBorrow.exportSealBorrow')}}</el-button>
      </el-col>
	  <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="sealBorrowList" @selection-change="handleSelectionChange" border>
      <el-table-column :label="$t('sealBorrow.sealName')" align="center" prop="sealName" :resizable="false"/>
      <el-table-column width="100" :label="$t('flow.applicant')" align="center" prop="reserve" :resizable="false"/>
      <el-table-column width="100 " :label="$t('sealBorrow.user')" align="center" prop="borrowUserName" :resizable="false"/>
      <el-table-column width="240" :label="$t('sealBorrow.borrowDeptId')" align="center" prop="borrowDeptName" :resizable="false"/>
      <el-table-column :width= "$i18n.locale=='en'?'140px':'120px'" :label="$t('sealBorrow.planBorrowDate')" align="center" prop="planBorrowDate" :resizable="false" >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.planBorrowDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column width="200" :label="$t('sealBorrow.realityBorrowDate')" align="center" prop="realityBorrowDate" :resizable="false" >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.realityBorrowDate, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column width="200" :label="$t('sealBorrow.returnedDate')" align="center" prop="returnDate" :resizable="false">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.returnDate, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column width="150" :label="$t('common.examinationApproval')" align="center" prop="workName" :resizable="false"/>
      <el-table-column width="80" :label="$t('common.detailOperation')" align="center"
                       class-name="small-padding fixed-width" :resizable="false">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-view"
            @click="handleView(scope.row)"
            v-hasPermi="['flow:sealBorrow:query']"
          >{{$t('common.view')}}
          </el-button>
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

  </div>
</template>

<script>
import { listSealBorrow,exportSealBorrow } from "@/api/flow/sealBorrow";
   import { getProcesHandler } from "@/api/info/flow";

export default {
  name: "SealBorrow",
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
      // 印章表格数据
      sealBorrowList: [],
      // 弹出层标题
      title: "",
      viewTitle:"",
      viewOpen:false,
      // 是否显示弹出层
      open: false,
      // 状态字典
      sealDictOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        searchContent: null
      },
    };
  },
  methods: {
    /** 查询印章申请列表 */
    getList() {
      this.loading = true;
      listSealBorrow(this.queryParams).then(response => {
        var tablist = response.rows
        tablist.forEach(item => {
          item.workName = ''
        })
        this.sealBorrowList = tablist;
        this.total = response.total;
        this.workIdFormat()
        this.loading = false;
      });
    },
    workIdFormat() {
       this.sealBorrowList.forEach(item => {
        if(item.workId){
          getProcesHandler({workId:item.workId}).then(response => {
            item.workName = response.data
          })
          .catch(()=>{
            item.workName = ''
          })
        }
      })
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
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.supplyId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    handleAdd() {
        this.$router.push("/flow/sealBorrow");
    },
      /** 查看按钮操作 */
    handleView(row) {
       this.$router.push("/flow/sealBorrowDetail?id="+row.id);
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm(this.$t('common.confirmExport'), this.$t('common.warning'), {
          confirmButtonText: this.$t('common.submit'),
          cancelButtonText: this.$t('common.cancle'),
          type: "warning"
        }).then(function() {
          return exportSealBorrow(queryParams);
        }).then(response => {
          this.download(response.msg);
        }).catch(function() {});
    },
    handleNullify(row){
      const supplyId = row.supplyId || this.ids
      this.$router.push("/flow/sealDelete?id="+row.supplyId+"&sealName="+row.sealName);
    },
  },
  beforeRouteEnter(to,from,next){
        next((vm)=>{
          vm.getList()
      })
  },
};
</script>
