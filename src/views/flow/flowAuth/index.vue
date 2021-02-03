<template>
  <div class="app-container">
    <el-form :model="queryParams" @submit.native.prevent ref="queryForm" :inline="true" v-show="showSearch"
             :label-width="$i18n.locale=='en'?'120px':'68px'">
      <el-form-item :label="$t('flowAuth.flowName')" prop="flowName">
        <el-input
          v-model="queryParams.flowName"
          :placeholder="$t('common.placeholder')+' '+$t('flowAuth.flowName')"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
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
          type="warning"
          size="mini"
          @click="handleBatchSetting"
          v-hasPermi="['flow:contract:export']"
        >{{ $t('flowAuth.batchSetting') }}
        </el-button>
        <el-button
          type="warning"
          size="mini"
          @click="handleBatchCancelSetting"
          v-hasPermi="['flow:contract:export']"
        >{{ $t('flowAuth.batchCancelSetting') }}
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="flowList" @selection-change="handleSelectionChange" border>
      <el-table-column type="selection" width="55" align="center" :resizable="false"/>
      <el-table-column width="600" :label="$t('flowAuth.flowName')" align="left" prop="flowName" :resizable="false"/>
      <el-table-column :label="$t('flowAuth.authUser')" align="center" prop="agentUserName" :resizable="false"/>
      <el-table-column :label="$t('flowAuth.startTime')" align="center" prop="beginDate" :resizable="false">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.beginDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('flowAuth.endTime')" align="center" prop="endDate" :resizable="false">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.endDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('common.operation')" align="center" class-name="small-padding fixed-width" :resizable="false">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.status =='否'"
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleSetting(scope.row)">{{ $t('common.setting') }}
          </el-button>
          <el-button
            v-else
            size="mini"
            type="text"
            icon="el-icon-edit" @click="handleCancel(scope.row)">{{ $t('common.cancle') }}{{ $t('common.setting') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"/>

    <el-dialog :close-on-click-modal="false" :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" :label-width="$i18n.locale=='en'?'150px':'80px'">
        <el-form-item :label="$t('flowAuth.flowName')" prop="flowName">
          <el-input disabled="" v-model="form.flowName"/>
        </el-form-item>
        <el-form-item :label="$t('flowAuth.authUser')" prop="agentId">
          <el-select v-model="form.agentId" style="width: 100%"
                     :placeholder="$t('common.placeSelect')+' '+$t('flowAuth.authUser')" filterable
                     ref="searchSelect" :filter-method="searchUser" @change="selectUser" clearable size="small">
            <el-option
              v-for="user in userOptions"
              :key="user.userId"
              :label="user.nickName+' '+user.userNameEn+' '+user.userName"
              :value="user.userId"
            />
          </el-select>
        </el-form-item>

        <el-form-item :label="$t('flowAuth.startTime')" prop="startDate">
          <el-date-picker clearable size="small" style="width: 200px"
                          v-model="form.startDate"
                          type="date"
                          value-format="yyyy-MM-dd"
                          :placeholder="$t('common.choose')+$t('flowAuth.startTime')">
          </el-date-picker>
        </el-form-item>
        <el-form-item :label="$t('flowAuth.endTime')" prop="endDate">
          <el-date-picker clearable size="small" style="width: 200px"
                          v-model="form.endDate"
                          type="date"
                          value-format="yyyy-MM-dd"
                          :placeholder="$t('common.choose')+$t('flowAuth.endTime')">
          </el-date-picker>
        </el-form-item>
        <el-form-item :label="$t('flowAuth.noticeWay')" prop="noticeType">
          <el-checkbox-group v-model="noticeTypes">
            <el-checkbox
              v-for="dict in noticeTypeOptions"
              :key="dict.dictValue"
              :label="dict.dictValue">{{ dict.dictLabel }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">{{ $t('common.submit') }}</el-button>
        <el-button @click="cancel">{{ $t('common.cancle') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {personList, operateAction, cancelAction} from "@/api/agent/agent";
import {selectDeptUser} from "@/api/system/user";

export default {
  name: "personList",
  data() {
    return {
      radio1: 0,
      radio2: 0,
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
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 流程表格数据
      flowList: [],
      userOptions: [],
      noticeTypeOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        flowName: [
          {required: true, message: "流程名称不能为空", trigger: "blur"}
        ],
        agentId: [
          {required: true, message: "被授权人不能为空", trigger: "blur"}
        ],
        startDate: [
          {required: true, message: "开始时间不能为空", trigger: "blur"}
        ],
        endDate: [
          {required: true, message: "结束时间不能为空", trigger: "blur"}
        ],
      },
      selectItem: [],
      noticeTypes: [],

    };
  },
  created() {
    this.getList();
    this.getDicts("notice_type").then(response => {
      this.noticeTypeOptions = response.data;
    });
  },
  methods: {
    /** 查询印章登记列表 */
    getList() {
      this.loading = true;
      personList(this.queryParams).then(response => {
        this.flowList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    searchUser(val) {
      this.userOptions = []
      selectDeptUser({uName: val}).then(response => {
        if (response.code === 200) {
          this.userOptions = response.data
        }
      });
    },
    selectUser() {
      if (this.userOptions) {
        this.userOptions.forEach(item => {
          if (item.userId == this.form.agentId) {
            this.form.agentName = item.nickName
          }
        })
      }
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
      this.ids = selection.map(item => item.id)
      this.selectItem = selection
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        flowName: '',
        ids: '',
        agentId: '',
        startDate: '',
        endDate: '',
        noticeType: ''
      };
      this.resetForm("form");
    },
    handleBatchSetting() {
      if (this.selectItem.length == 0) {
        this.$message.error(this.$t("flowAuth.pleaseSelectTheDataToSet"));
        return;
      }
      let i = 0, status = this.selectItem[0].status;
      let ids = '', flowName = '';
      this.selectItem.forEach(item => {
        if (status != item.status) {
          i++;
        }
        ids += item.flowId + '~' + item.flowName + ";";
        flowName += item.flowName + ",";
      })
      if (i > 0) {
        this.$message.error(this.$t("flowAuth.pleaseSelectTheSameDataForOperation"));
        return;
      }
      if (status == '是') {
        this.$message.error(this.$t("flowAuth.pleaseSelectUnsetData"));
        return;
      }
      this.reset();
      this.open = true;
      this.form.ids = ids.substring(0, ids.length - 1);
      this.form.flowName = flowName.substring(0, flowName.length - 1);
      this.title = this.$t("flowAuth.functionName");
    },
    handleBatchCancelSetting() {
      if (this.selectItem.length == 0) {
        this.$message.error(this.$t("flowAuth.pleaseSelectTheDataToSet"));
        return;
      }
      let i = 0, status = this.selectItem[0].status;
      let ids = '';
      this.selectItem.forEach(item => {
        if (status != item.status) {
          i++;
        }
        ids += item.flowId + '~' + item.id + ";";
      })
      if (i > 0) {
        this.$message.error(this.$t("flowAuth.pleaseSelectTheSameDataForOperation"));
        return;
      }
      if (status == '否') {
        this.$message.error(this.$t("flowAuth.pleaseSelectTheSetData"));
        return;
      }
      this.$confirm(this.$t("flowAuth.cancle"), this.$t('common.warning'), {
        confirmButtonText: this.$t('common.submit'),
        cancelButtonText: this.$t('common.cancle'),
        type: "warning"
      }).then(function () {
        // ids参数说明：flowId(流程ID)~dataId(代办表中数据ID)，多个使用分号隔开，
        // 示例：seal_add~HZ28868f5cc3367c015cc33abb4d000a;seal_del~HZ28868f5cc3367c015cc33abb4d000e
        var mIds = ids.substring(0, ids.length - 1)
        return cancelAction({ids: mIds});
      }).then(() => {
        this.getList();
        this.msgSuccess(this.$t('common.successEdit'));
      }).catch(function () {
      });
    },
    handleSetting(row) {
      this.reset();
      this.open = true;
      // 代办设置操作，ids参数说明：流程ID~流程名称，多个使用分号隔开
      //示例：seal_add~印章制作申请;seal_del~印章废弃申请
      this.form.ids = row.flowId + '~' + row.flowName;
      this.form.flowName = row.flowName;
      this.title = this.$t("flowAuth.functionName");
    },
    handleCancel(row) {
      this.$confirm(this.$t("flowAuth.cancle"), this.$t('common.warning'), {
        confirmButtonText: this.$t('common.submit'),
        cancelButtonText: this.$t('common.cancle'),
        type: "warning"
      }).then(function () {
        let ids = row.flowId + '~' + row.id;
        return cancelAction({ids: ids});
      }).then(() => {
        this.getList();
        this.msgSuccess(this.$t('common.successEdit'));
      }).catch(function () {
      });
    },
    /** 提交按钮 */
    submitForm() {
      if (this.noticeTypes && this.noticeTypes.length > 0) {
        this.form.noticeType = this.noticeTypes.join(',')
      } else {
        this.form.noticeType = '';
      }
      this.$refs["form"].validate(valid => {
        if (valid) {
          operateAction(this.form).then(response => {
            if (response.code === 200) {
              this.msgSuccess(this.$t('common.successEdit'));
              this.open = false;
              this.getList();
            }
          });
        }
      });
    },
  }
};
</script>
