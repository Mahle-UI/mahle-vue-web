<template>
  <div class="app-container">
    <el-form :model="queryParams" @submit.native.prevent ref="queryForm" :inline="true" v-show="showSearch"
             :label-width="$i18n.locale=='en'?'160px':'68px'">
      <el-form-item :label="$t('contractTemplate.keyword')" prop="keyWord">
        <el-input
          v-model="queryParams.keyWord"
          :placeholder="$t('common.placeholder')+' '+$t('contractTemplate.templateNoOrtemplateName')"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('contractTemplate.cateDict')" prop="contractCate">
        <el-select ref="multiSelect1" v-model="queryParams.contractCate"
                   :placeholder="$t('common.placeSelect')+' '+$t('contractTemplate.cateDict')"
                   @keyup.enter.stop.native="handleQuery" clearable size="small">
          <el-option
            v-for="contractcate in contractcateOptions"
            :key="contractcate.code"
            :label="contractcate.cn+' '+contractcate.en"
            :value="contractcate.code"
          />
        </el-select>
      </el-form-item>
      <el-form-item v-hasPermi="['info:contractTemplate:add']"  :label="$t('flow.treatmentState')" prop="templDict">
        <el-select ref="multiSelect2" v-model="queryParams.templDict"
                   :placeholder="$t('common.placeSelect')+' '+$t('contractTemplate.templDict')"
                   @keyup.enter.stop.native="handleQuery" clearable size="small">
          <el-option
            v-for="dict in templDictOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="cyan" icon="el-icon-search" size="mini" @click="handleQuery">{{ $t('common.search') }}
        </el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">{{ $t('common.reset') }}</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['info:contractTemplate:add']"
        >{{ $t('common.add') + $t('contractTemplate.functionName') }}
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-upload"
          size="mini"
          @click="addHistory"
          v-hasPermi="['info:contractTemplate:upload']"
        >{{ $t('contractTemplate.upload') + $t('contractTemplate.functionName') }}
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['info:contractTemplate:export']"
        >{{ $t('contractTemplate.exportForm') }}
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table ref="table" v-loading="loading" :data="contractTemplateList"
              :load="load" row-key="templId" lazy
              :tree-props="{children: 'children', hasChildren: 'hasChild'}" border>

      <el-table-column width="180" :label="$t('contractTemplate.templateNo')" align="center" prop="templNo" :resizable="false"/>
      <el-table-column :label="$t('contractTemplate.templateName')" align="center" prop="templName" :resizable="false"/>
      <el-table-column width="100" :label="$t('contractTemplate.createBy')" align="center" prop="uName" :resizable="false"/>
      <el-table-column width="240" :label="$t('contractTemplate.usedept')" align="center" prop="usageDeptName" :resizable="false"/>
      <el-table-column width="150" :label="$t('flow.treatmentState')" align="center" prop="templDict" :formatter="templDictFormat" :resizable="false"/>
      <el-table-column width="150" :label="$t('common.examinationApproval')" align="center" prop="workName" :resizable="false"/>
      <el-table-column :label="$t('contractTemplate.remark')" align="center" prop="remark" :resizable="false"/>
      <el-table-column width="80" :label="$t('common.detailOperation')" align="center" class-name="small-padding fixed-width" :resizable="false">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-view"
            @click="toDetail(scope.row)"
            v-hasPermi="['info:contractTemplate:view']"
          >{{ $t('common.view') }}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column width="200" :label="$t('common.operation')" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            v-if="scope.row.pointer === '1' && scope.row.templDict === '3'"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['info:contractTemplate:update']"
          >{{ $t('common.replace') }}
          </el-button>

          <el-button
            size="mini"
            type="text"
            icon="el-icon-circle-close"
            v-if="scope.row.templDict==3"
            @click="handleStatusChange(scope.row)"
            v-hasPermi="['info:contractTemplate:disable']"
          >{{ $t('common.stop') }}
          </el-button>

          <el-button
            size="mini"
            type="text"
            icon="el-icon-finished"
            v-if="scope.row.templDict==2 && scope.row.pointer=='1'"
            @click="handleStatusChange(scope.row)"
            v-hasPermi="['info:contractTemplate:start']"
          >{{ $t('common.start') }}
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
    <el-dialog :close-on-click-modal="false" :title="$t('contractTemplate.addOld')" :visible.sync="historyOpen"
               width="500px" append-to-body>
      <contractTemplate :history="history" @cancel="cancel"></contractTemplate>
    </el-dialog>

  </div>
</template>

<script>
import {
  listContractTemplate,
  loadcontractcate,
  changestatus,
  loadsubvers,
  getContractExport
} from "@/api/info/contractTemplate";
import {getProcesHandler} from "@/api/info/flow";
import contractTemplate from '../../components/contractTemplate/contractTemplate'

export default {
  name: "ContractTemplate",
  components: {
    contractTemplate
  },
  data() {
    return {
      history: true,
      // 遮罩层
      loading: true,
      // 显示搜索条件
      showSearch: true,
      tempChildMap: [],
      // 总条数
      total: 0,
      // 合同模板表格数据
      contractTemplateList: [],
      // 模板状态字典
      templDictOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        keyWord: null,
        cateDict: null,
        templDict: null,
      },
      historyOpen: false,
      contractcateOptions: []
    };
  },
  created() {
    this.getList()
    this.getDicts("templ_dict").then(response => {
      this.templDictOptions = response.data;
    });
    loadcontractcate().then(response => {
      if (response.code === 200) {
        this.contractcateOptions = response.data
      }
    });
  },
  methods: {
    /** 查询合同模板列表 */
    getList() {
      this.loading = false;
      listContractTemplate(this.queryParams).then(response => {
        var tablist = response.rows
        tablist.forEach(item => {
          item.workName = ''
        })
        this.contractTemplateList = tablist;
        this.total = response.total;
        this.workIdFormat()
        this.loading = false;
      });
    },
    workIdFormat() {
      this.contractTemplateList.forEach(item => {
        if (item.workId) {
          getProcesHandler({workId: item.workId}).then(response => {
            item.workName = response.data
          })
            .catch(() => {
              item.workName = ''
            })
        }
      })
    },
    load(tree, treeNode, resolve) {
      this.tempChildMap.push({tree, treeNode, resolve})
      loadsubvers({templId: tree.templId}).then(response => {
        var data = response.data;
        if (data.length > 0) {
          resolve(data)
        }
      });
    },
    // 模板状态字典翻译
    templDictFormat(row, column) {
      return this.selectDictLabel(this.templDictOptions, row.templDict);
    },
    addHistory() {
      this.historyOpen = true;
    },
    cancel() {
      this.historyOpen = false;
      this.getList()
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
      this.$refs.multiSelect1.blur()
      this.$refs.multiSelect2.blur()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    handleAdd() {
      this.$router.push("/flow/applyContractTemplate");
    },
    handleUpdate(row) {
      this.$router.push("/flow/applyContractTemplate?type=1&id=" + row.templId);
    },
    handleEdit(row) {
      this.$router.push("/flow/applyContractTemplate?type=2&id=" + row.templId);
    },
    toDetail(row) {
      this.$router.push("/flow/templateDetail?id=" + row.templId);
    },
    // 任务状态修改
    handleStatusChange(row) {
      let text = row.templDict == "2" ? this.$t('common.start') : this.$t('common.disable');
      this.$confirm(this.$t('common.makesureyouwantto') + '"' + text + '""' + row.templName + '"' + this.$t('common.doYou') + '?', this.$t('common.warning'), {
        confirmButtonText: this.$t('common.submit'),
        cancelButtonText: this.$t('common.cancle'),
        type: "warning"
      }).then(function () {
        //row.templDict  3 传 parentId
        var parentId = row.templDict == "2" ? row.parentId ? row.parentId : row.templId : ''
        return changestatus({
          templId: row.templId,
          parentId: parentId
          , status: row.templDict == "2" ? 3 : 2
        });
      }).then(() => {
        row.templDict = row.templDict == "2" ? 3 : 2
        this.msgSuccess(text + "成功");
        this.getList()
        this.reloadChild();
      }).catch(function () {
      });
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm(this.$t('common.confirmExport'), this.$t('common.warning'), {
        confirmButtonText: this.$t('common.submit'),
        cancelButtonText: this.$t('common.cancle'),
        type: "warning"
      }).then(function () {
        return getContractExport(queryParams);
      }).then(response => {
        this.download(response.msg);
      }).catch(function () {
      });
    },
    //重新加载子级表
    reloadChild() {
      let that = this;
      this.tempChildMap.forEach(item => {
        //console.log(that.$refs.table.store.states.lazyTreeNodeMap)
        loadsubvers({templId: item.tree.templId}).then(response => {
          that.$set(that.$refs.table.store.states.lazyTreeNodeMap, item.tree.templId, response.data);
        });
      });
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.getList();
      vm.reloadChild();
    })
  },
};
</script>
