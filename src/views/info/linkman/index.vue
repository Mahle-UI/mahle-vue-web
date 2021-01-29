<template>
  <div class="app-container">
    <h3 style="">{{customerName}}</h3>
    <el-form :model="queryParams"  @submit.native.prevent  ref="queryForm" :inline="true" v-show="showSearch" :label-width="$i18n.locale=='en'?'120px':'68px'">
      <el-form-item :label="$t('linkman.linkManCn')" prop="linkMan">
        <el-input
          v-model="queryParams.linkName"
          :placeholder="$t('common.placeholder')+$t('linkman.linkManCn')"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('linkman.sex')" prop="sex">
        <el-select v-model="queryParams.sex" :placeholder="$t('common.placeSelect')+$t('linkman.sex')" clearable size="small">
          <el-option
            v-for="dict in sexOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('linkman.mobile')" prop="mobile">
        <el-input
          v-model="queryParams.mobile"
          :placeholder="$t('common.placeholder')+$t('linkman.mobile')"
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
          v-hasPermi="['info:linkman:add']"
        >{{$t('common.add')+$t('linkman.functionName')}}</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['info:linkman:remove']"
        >{{$t('common.delete')+$t('linkman.functionName')}}</el-button>
      </el-col>
	  <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="linkmanList" @selection-change="handleSelectionChange" border>
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column :label="$t('linkman.linkManCn')" align="center" prop="linkManCn" />
      <el-table-column :label="$t('linkman.linkManEn')" align="center" prop="linkManEn" />
      <el-table-column :label="$t('linkman.sex')" align="center" prop="sex" :formatter="sexFormat" />
      <el-table-column :label="$t('linkman.position')" align="center" prop="position" />
      <el-table-column :label="$t('linkman.telephone')" align="center" prop="telephone" />
      <el-table-column :label="$t('linkman.mobile')" align="center" prop="mobile" />
      <el-table-column :label="$t('linkman.email')" align="center" prop="email" />
      <el-table-column width="200" :label="$t('common.operation')" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['info:linkman:edit']"
          >{{$t('common.edit')}}</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['info:linkman:remove']"
          >{{$t('common.delete')}}</el-button>
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
    <dialogLinkman ref="dialogLinkman"  @getLinkMan="getLinkMan"></dialogLinkman>
  </div>
</template>

<script>
import { listLinkman, getLinkman, delLinkman, addLinkman, updateLinkman, exportLinkman } from "@/api/info/linkman";
import dialogLinkman from '../../components/linkman/dialog'
export default {
  name: "Linkman",
   components: {
      dialogLinkman
  },
  data() {
    return {
      customerId:'',
      customerName:'',
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
      // 联系人表格数据
      linkmanList: [],
      // 弹出层标题
      title: "",
      viewTitle:"",
      viewOpen:false,
      // 是否显示弹出层
      open: false,
      // 性别    0  :  未知 ; 1 : 男 ; 2 :  女 字典
      sexOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        linkName: null,
        sex: null,
        mobile: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        linkManCn: [
          { required: true,trigger: "blur" }
        ],
        sex: [
          { required: true, message: "性别不能为空", trigger: "blur" }
        ],
        position: [
          { required: true, message: "职务不能为空", trigger: "blur" }
        ],
        mobile: [
          { required: true, message: "联系方式不能为空", trigger: "blur" }
        ],
        email: [
          { required: true, message: "邮箱不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.customerId=this.$route.query.objId;
    this.customerName=this.$route.query.objNameCn;
    this.queryParams.objId=this.customerId;
    this.getList();
    this.getDicts("sys_user_sex").then(response => {
      this.sexOptions = response.data;
    });
  },
  activated(){
    this.customerId=this.$route.query.objId;
    this.customerName=this.$route.query.objNameCn;
    this.queryParams.objId=this.customerId;
    this.getList();
  },
  methods: {
    /** 查询联系人列表 */
    getList() {
      this.loading = true;
      listLinkman(this.queryParams).then(response => {
        this.linkmanList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 性别    0  :  未知 ; 1 : 男 ; 2 :  女 字典翻译
    sexFormat(row, column) {
      return this.selectDictLabel(this.sexOptions, row.sex);
    },

    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        linkId: null,
        createTime: null,
        createBy: null,
        linkManCn: null,
        linkManCn: null,
        sex: null,
        position: null,
        mobile: null,
        telephone: null,
        email: null,
        fax: null,
        remark: null,
        objId: null,
        isDefault: null,
        updateBy: null,
        updateTime: null,
        ver: null,
        isDelete: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.queryParams.linkName = '';
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      // this.ids = selection.map(item => item.linkId)
      this.ids = [];
      selection.forEach(item => {
        this.ids.push({id:item.linkId,ver:item.ver})
      });
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.form.objId = this.customerId
      this.$nextTick(()=>{
        this.$refs.dialogLinkman.showDialog(this.form,2);
      })
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const linkId = row.linkId || this.ids
      getLinkman({linkId:linkId,objId:this.queryParams.objId}).then(response => {
        this.form = response.data;
        this.form.objId = this.customerId
        this.$nextTick(()=>{
          this.$refs.dialogLinkman.showDialog(this.form,2);
        })
      });
    },
      /** 查看按钮操作 */
    handleView(row) {
       this.reset();
       const linkId = row.linkId || this.ids
       getLinkman(linkId).then(response => {
           this.form = response.data;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                     this.viewOpen = true;
          this.viewTitle = this.$t('common.view')+this.$t('linkman.functionName');
      });
    },

    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.linkId != null) {
            updateLinkman(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess(this.$t('common.successEdit'));
                this.open = false;
                this.getList();
              }
            });
          } else {
            addLinkman(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess(this.$t('common.successAdd'));
                this.open = false;
                this.getList();
              }
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const linkArr = row.linkId?[{id:row.linkId,ver:row.ver}]: this.ids;
      this.$confirm(this.$t('common.confirmDelete'), this.$t('common.warning'), {
          confirmButtonText: this.$t('common.submit'),
          cancelButtonText: this.$t('common.cancle'),
          type: "warning"
        }).then(function() {
          return delLinkman(linkArr);
        }).then(() => {
          this.getList();
          this.msgSuccess(this.$t('common.successDelete'));
        }).catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm(this.$t('common.confirmExport'), this.$t('common.warning'), {
          confirmButtonText: this.$t('common.submit'),
          cancelButtonText: this.$t('common.cancle'),
          type: "warning"
        }).then(function() {
          return exportLinkman(queryParams);
        }).then(response => {
          this.download(response.msg);
        }).catch(function() {});
    },
    getLinkMan(){
      this.getList()
    }
  }
};
</script>
