<template>
  <div class="app-container">
    <el-form :model="queryParams" @submit.native.prevent ref="queryForm" :inline="true" v-show="showSearch"
             :label-width="$i18n.locale=='en'?'100px':'68px'">
      <el-form-item :label="$t('sealinfo.sealName')" prop="sealName">
        <el-input
          v-model="queryParams.sealName"
          :placeholder="$t('common.placeholder')+' '+$t('sealinfo.sealName')"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('sealinfo.userId')" prop="userId">
        <el-select v-model="queryParams.userId" style="width: 100%"
                   :placeholder="$t('common.placeSelect')+' '+$t('sealinfo.userId')" filterable
                   ref="multiSelect1" :filter-method="searchUser" @keyup.enter.stop.native="handleQuery" clearable
                   size="small">
          <el-option
            v-for="user in userOptions"
            :key="user.userId"
            :label="user.nickName+' '+user.userNameEn+' '+user.userName"
            :value="user.userId"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('flow.treatmentState')" prop="sealDict">
        <el-select ref="multiSelect2" v-model="queryParams.sealDict" @keyup.enter.stop.native="handleQuery"
                   :placeholder="$t('common.placeSelect')+' '+$t('sealinfo.sealDict')" clearable size="small">
          <el-option
            v-for="dict in sealDictOptions"
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
          v-hasPermi="['info:sealinfo:add']"
        >{{ $t('common.add') + $t('sealinfo.seal') + $t('common.apply') }}
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd('history')"
          v-hasPermi="['info:sealinfo:addhistory']"
        >{{ $t('sealinfo.sealUpload') }}
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['info:sealinfo:export']"
        >{{ $t('common.export') + $t('sealinfo.seal') + $t('common.reportForm') }}
        </el-button>
      </el-col>

      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-right"
          size="mini"
          :disabled="single"
          @click="handleTransfer"
          v-hasPermi="['info:sealinfo:transfer']"
          v-has-role="['smts_seal_store','smts_seal_store_main','smts_admin','admin']"
        >{{ $t('common.transfer') + $t('sealinfo.seal') }}
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="sealinfoList" @selection-change="handleSelectionChange" border  >
      <el-table-column type="selection" :selectable='checkboxSelect' width="55" align="center" :resizable="false" v-if="selectionShow"/>
      <el-table-column width="100" :label="$t('sealinfo.fmsPath')" align="center" prop="fmsPath"  :resizable="false">
        <template slot-scope="scope">
          <el-image
            style="width: 50px; height: 50px"
            :src="scope.row.fmsPath"
            :preview-src-list="[scope.row.fmsPath]">
          </el-image>
        </template>
      </el-table-column>
      <el-table-column :label="$t('sealinfo.sealName')" align="center" prop="sealName"  :resizable="false"/>
      <el-table-column width="100" :label="$t('sealinfo.userId')" align="center" prop="userName"   :resizable="false"/>
      <el-table-column width="100" :label="$t('flow.applicant')" align="center" prop="applicant"  :resizable="false"/>
      <el-table-column width="120" :label="$t('sealinfo.beginTime')" align="center" prop="beginTime"   :resizable="false">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.beginTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column width="120" :label="$t('sealinfo.stopTime')" align="center" prop="stopTime"  :resizable="false">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.stopTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column width="100" :label="$t('sealinfo.nullifyImg')" align="center" prop="trashFmsPath"  :resizable="false">
        <template slot-scope="scope">
          <el-image v-if="scope.row.sealDict==4 && scope.row.trashFmsPath"
                    style="width: 50px; height: 50px"
                    :src="scope.row.trashFmsPath"
                    :preview-src-list="[scope.row.trashFmsPath]">
          </el-image>
        </template>
      </el-table-column>
      <el-table-column width="150" :label="$t('flow.treatmentState')" align="center" prop="sealDict" :formatter="sealDictFormat"  :resizable="false"/>
      <el-table-column width="150" :label="$t('common.examinationApproval')" align="center" prop="workName"  :resizable="false"/>
      <el-table-column width="80"  :label="$t('common.detailOperation')" align="center"  :resizable="false">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-view"
            @click="handleView(scope.row)"
            v-hasPermi="['info:sealinfo:view']"
          >{{ $t('common.view') }}</el-button>
          <!-- || scope.row.status==2 -->
        </template>
      </el-table-column>
      <el-table-column width="200" :label="$t('common.operation')" align="center"
                       class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <span v-if="scope.row.delWorkId != null">
            <el-button
              size="mini"
              type="text"
              icon="el-icon-view"
              @click="toDeleteDetail(scope.row)"
              v-hasPermi="['info:sealinfo:trash']"
            >{{ $t('common.delView') }}</el-button>
          </span>

          <span v-if="scope.row.sealDict==2">
            <el-button
              size="mini"
              type="text"
              icon="el-icon-delete"
              @click="handleNullify(scope.row)"
              v-hasPermi="['info:sealinfo:trash']"
            >{{ $t('common.nullify') }}</el-button>
          </span>

          <span v-if="scope.row.sealDict==0 && scope.row.createByLogin == $store.getters.userId">
            <el-button
              size="mini"
              type="text"
              icon="el-icon-edit"
              @click="handleUpdate(scope.row)"
              v-hasPermi="['info:sealinfo:edit']"
            >{{ $t('common.edit') }}</el-button>
          </span>
          <span v-if="scope.row.sealDict==4&&(scope.row.createByLogin == $store.getters.userId||scope.row.isTrashPic==1)">
            <el-button
              size="mini"
              type="text"
              icon="el-icon-edit"
              @click="handleNullifyImg(scope.row)"
              v-hasPermi="['info:sealinfo:trash']"
            >{{ $t('sealinfo.nullifyImg') }}</el-button>
          </span>
          <span v-if="showUpdateBtn(scope.row)">
            <el-button
              size="mini"
              type="text"
              icon="el-icon-edit"
              @click="handleUpdateImg(scope.row)"
            >{{ $t('sealinfo.updateImg') }}</el-button>
          </span>
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


    <!--查看印章申请对话框 -->
    <el-dialog :close-on-click-modal="false" :title="viewTitle" :visible.sync="viewOpen" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item :label="$t('sealinfo.sealName')" prop="sealName">
          <el-input disabled v-model="form.sealName"
                    :placeholder="$t('common.placeholder')+' '+$t('sealinfo.sealName')"/>
        </el-form-item>
        <el-form-item :label="$t('sealinfo.beginTime')" prop="beginTime">
          <el-date-picker disabled clearable size="small" style="width: 200px"
                          v-model="form.beginTime"
                          type="date"
                          value-format="yyyy-MM-dd"
                          :placeholder="$t('common.choose')+$t('sealinfo.beginTime')">
          </el-date-picker>
        </el-form-item>
        <el-form-item :label="$t('sealinfo.userId')" prop="userId">
          <el-input disabled v-model="form.userId" :placeholder="$t('common.placeholder')+' '+$t('sealinfo.userId')"/>
        </el-form-item>
        <el-form-item :label="$t('sealinfo.stopTime')" prop="stopTime">
          <el-date-picker disabled clearable size="small" style="width: 200px"
                          v-model="form.stopTime"
                          type="date"
                          value-format="yyyy-MM-dd"
                          :placeholder="$t('common.choose')+$t('sealinfo.stopTime')">
          </el-date-picker>
        </el-form-item>
        <el-form-item :label="$t('sealinfo.sealDict')" prop="sealDict">
          <el-select disabled v-model="form.sealDict"
                     :placeholder="$t('common.placeSelect')+' '+$t('sealinfo.sealDict')">
            <el-option
              v-for="dict in sealDictOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('sealinfo.isBrow')" prop="isBrow">
          <el-input disabled v-model="form.isBrow" :placeholder="$t('common.placeholder')+' '+$t('sealinfo.isBrow')"/>
        </el-form-item>
        <el-form-item :label="$t('sealinfo.deptId')" prop="deptId">
          <el-input disabled v-model="form.deptId" :placeholder="$t('common.placeholder')+' '+$t('sealinfo.deptId')"/>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 作废图片页面 -->
    <el-dialog :close-on-click-modal="false" :title="$t('sealinfo.nullifyImg')" :visible.sync="nullifyImgOpen" width="800px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label-width="130px" :label="$t('sealinfo.nullifyImg')" prop="fileId">
          <el-upload
            ref="upload"
            :limit="1"
            accept=".jpg, .png, .jpeg, .gif,.bmp"
            :action="upload.url"
            :headers="upload.headers"
            auto-upload
            :before-upload="handleFileUploadProgress"
            :on-preview="handleFilePreview"
            :on-success="handleFileSuccess"
            :file-list="upload.fileList"
            list-type="picture"
            class="upload-demo"
          >
            <el-button slot="trigger" size="small" type="primary">{{ $t('common.selectFile') }}</el-button>
            <div slot="tip" class="el-upload__tip">{{ $t('common.fileRemark') }}</div>
          </el-upload>
        </el-form-item>
        <el-form-item :label="$t('customer.remark')" prop="trashRemark">
          <el-input type="textarea" :rows="2" v-model="form.trashRemark"
                    :placeholder="$t('common.placeholder')+$t('customer.remark')"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitNullifyImgForm">{{ $t('common.submit') }}</el-button>
        <el-button @click="nullifyImgOpen=false">{{ $t('common.cancle') }}</el-button>
      </div>
    </el-dialog>

    <el-dialog :close-on-click-modal="false" :title="$t('common.transfer')+$t('sealinfo.seal')" :visible.sync="transferVisible" append-to-body
               width="700px">
      <el-form ref="transferForm" :model="transferForm" :rules="transferRules" label-width="150px">
        <el-form-item :label="$t('sealinfo.sealName')">
          {{ selectSeal.sealName }}
        </el-form-item>
        <el-form-item :label="$t('sealinfo.userId')" prop="userId">
          <el-select v-model="transferForm.userId">
            <el-option v-for="item in sealStoreList" :value="item.userId" :label="item.nickName"
                       v-bind:key="item.userId">{{ item.nickName }}
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('sealinfo.reserveUserId')">
          <el-select v-model="transferForm.reserveUserId">
            <el-option v-for="item in sealStoreList" :value="item.userId" :label="item.nickName"
                       v-bind:key="'reserve'+item.userId">{{ item.nickName }}
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitTransferForm">{{ $t('common.submit') }}</el-button>
        <el-button @click="transferVisible=false">{{ $t('common.cancle') }}</el-button>
      </div>
    </el-dialog>

    <!-- 更新图片页面 -->
    <el-dialog :title="$t('sealinfo.updateImg')" :visible.sync="updateImgOpen" width="800px" append-to-body :close-on-click-modal="false">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label-width="130px" :label="$t('sealinfo.updateImg')" prop="fileId">
          <el-upload
            ref="upload"
            :limit="1"
            accept=".jpg, .png, .jpeg, .gif,.bmp"
            :action="upload.url"
            :headers="upload.headers"
            auto-upload
            :before-upload="handleFileUploadProgress"
            :on-preview="handleFilePreview"
            :on-success="handleFileSuccess"
            :file-list="upload.fileList"
            list-type="picture"
            class="upload-demo"
          >
            <el-button slot="trigger" size="small" type="primary">{{ $t('common.selectFile') }}</el-button>
            <div slot="tip" class="el-upload__tip">{{ $t('common.fileRemark') }}</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitUpdateImgForm">{{ $t('common.submit') }}</el-button>
        <el-button @click="updateImgOpen=false">{{ $t('common.cancle') }}</el-button>
      </div>
    </el-dialog>
    <FilePreview ref="filePreview"></FilePreview>
  </div>
</template>

<script>
import {
  listSealinfo,
  getSealinfo,
  delSealinfo,
  addSealinfo,
  updateSealinfo,
  exportSealinfo,
  searchkeeper,
  uploadsealtrashpic,
  getSealStore,
  sealTransfer,
  uploadsealpic
} from "@/api/info/sealinfo";
import {getProcesHandler} from "@/api/info/flow";
import {getToken} from "@/utils/auth";
import {checkRole} from '@/utils/permission';
import FilePreview from "../../../components/FilePreview/index";
import store from "@/store";

export default {
  name: "Sealinfo",
  components: {
    FilePreview
  },
  data() {
    return {
      showViewer: false,
      preUrl:'',
      baseUrl: '',
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
      transferForm: {},
      transferVisible: false,
      // 总条数
      total: 0,
      // 印章申请表格数据
      sealinfoList: [],
      sealStoreList: [],
      // 弹出层标题
      title: "",
      viewTitle: "",
      viewOpen: false,
      selectSeal: {"sealName": ""},
      // 是否显示弹出层
      open: false,
      // 状态字典
      sealDictOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        sealName: null,
        userId: null,
        sealDict: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        fileId: [
          {required: true, message: "作废图片不能为空", trigger: "blur"}
        ],
      },
      transferRules: {
        userId: [
          {required: true, message: "请选择保管员", trigger: "blur"}
        ],
      },
      userOptions: [],
      nullifyImgOpen: false,
      updateImgOpen: false,
      upload: {
        // 是否禁用上传
        isUploading: false,
        // 设置上传的请求头部
        headers: {Authorization: "Bearer " + getToken()},
        // 上传的地址
        url: process.env.VUE_APP_BASE_API + "/info/file/upload?type=250",
        // 上传的文件列表
        fileList: []
      },
      userId: '',
    };
  },
  //vsc_sun添加
  computed:{
    selectionShow(){
      const value  = "info:sealinfo:transfer"
      const all_permission = "*:*:*";
      const permissions = store.getters && store.getters.permissions
      const hasPermissions = permissions.some(permission => {
        return all_permission === permission || value===permission
      })
      return hasPermissions;
    }
  },
  created() {
    this.baseUrl = process.env.VUE_APP_BASE_DOWNLOAD_URL
    this.userId = this.$store.getters.userId
    this.getDicts("seal_status").then(response => {
      this.sealDictOptions = response.data;
    });
    //获取保管员
    getSealStore().then(res => {
      this.sealStoreList = res.data;
    })
  },
  methods: {
    /** 查询印章申请列表 */
    getList() {
      this.loading = true;
      listSealinfo(this.queryParams).then(response => {
        var tablist = response.rows
        tablist.forEach(item => {
          item.workName = ''
          item.fmsPath = this.baseUrl + item.fmsPath
        })
        this.sealinfoList = response.rows;
        this.total = response.total;
        this.workIdFormat()
        this.loading = false;
      });
    },
    workIdFormat() {
      this.sealinfoList.forEach(item => {
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
    // 状态字典翻译
    sealDictFormat(row, column) {
      return this.selectDictLabel(this.sealDictOptions, row.sealDict);
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        supplyId: null,
        createTime: null,
        createBy: null,
        sealName: null,
        beginTime: null,
        userId: null,
        remark: null,
        stopTime: null,
        sealDict: null,
        isBrow: null,
        deptId: null,
        updateBy: null,
        updateTime: null,
        ver: null,
        trashRemark: '',
        fileId: ''
      };
      this.upload.fileList = []
      this.resetForm("form");
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
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.supplyId)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd(type) {
      this.$router.push("/flow/applySeal?type=" + type);
      // this.reset();
      // this.open = true;
      // this.title = this.$t('common.add')+this.$t('sealinfo.functionName');
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const supplyId = row.supplyId || this.ids
      this.$router.push("/flow/applySeal?type=" + (row.category == 1 ? '' : 'history') + "&id=" + row.supplyId);
    },
    /** 查看按钮操作 */
    handleView(row) {
      this.$router.push("/flow/sealDetail?id=" + row.supplyId + "&category=" + row.category);
    },
    toDeleteDetail(row) {
      this.$router.push("/flow/sealDeleteDetail?id=" + row.supplyId + "&category=" + row.category);
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.supplyId != null) {
            updateSealinfo(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess(this.$t('common.successEdit'));
                this.open = false;
                this.getList();
              }
            });
          } else {
            addSealinfo(this.form).then(response => {
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
    //移交
    handleTransfer() {
      this.transferVisible = true;
      this.transferForm = {};
      if (this.ids.length == 1) {
        this.transferForm.supplyId = this.ids[0]
        this.sealinfoList.forEach(item => {
          if (item.supplyId == this.ids[0]) {
            this.selectSeal = item;
          }
        })
      }
    },
    //移交印章
    submitTransferForm() {
      this.$refs["transferForm"].validate(valid => {
        if (valid) {
          sealTransfer(this.transferForm).then(res => {
            if (res.code == 200) {
              this.transferVisible = false;
              this.msgSuccess(this.$t('common.transfer') + this.$t('sealinfo.seal') + this.$t('common.success'));
              this.getList();
            }
          });
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const supplyIds = row.supplyId || this.ids;
      this.$confirm(this.$t('common.confirmDelete'), this.$t('common.warning'), {
        confirmButtonText: this.$t('common.submit'),
        cancelButtonText: this.$t('common.cancle'),
        type: "warning"
      }).then(function () {
        return delSealinfo(supplyIds);
      }).then(() => {
        this.getList();
        this.msgSuccess(this.$t('common.successDelete'));
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
        return exportSealinfo(queryParams);
      }).then(response => {
        this.download(response.msg);
      }).catch(function () {
      });
    },
    handleNullify(row) {
      const supplyId = row.supplyId || this.ids
      this.$router.push("/flow/sealDelete?id=" + row.supplyId + "&sealName=" + row.sealName);
    },
    searchUser(val) {
      this.userOptions = []
      searchkeeper({uName: val}).then(response => {
        if (response.code === 200) {
          this.userOptions = response.data
        }
      });
    },
    handleNullifyImg(row) {
      this.reset()
      this.nullifyImgOpen = true
      this.form.supplyId = row.supplyId
      this.upload.url = process.env.VUE_APP_BASE_API + "/info/file/upload?type=250&hostId=" + row.supplyId
    },
    handleUpdateImg(row) {
      this.reset()
      this.updateImgOpen = true
      this.form.supplyId = row.supplyId
      this.upload.url = process.env.VUE_APP_BASE_API + "/info/file/upload?type=210"
    },
    // 文件提交处理
    submitUpload() {
      this.$refs.upload.submit();
    },
    // 文件上传中处理
    handleFileUploadProgress(event, file, fileList) {
      this.upload.isUploading = true;
    },
    // 文件上传成功处理
    handleFileSuccess(response, file, fileList) {
      this.upload.isUploading = false;
      if (response.code == '200') {
        this.form.fileId = response.msg
      } else {
        this.msgSuccess(response.msg);
      }

    },
    //点击文件列表中已上传的文件时的钩子函数
    handleFilePreview(file){
      this.$nextTick(() => {
        this.$refs.filePreview.preview(file)
      })
    },
    submitNullifyImgForm() {
      if (!this.form.fileId) {
        this.msgError(this.$t("common.placeSelect") + this.$t('sealinfo.nullifyImg'));
        return
      }
      uploadsealtrashpic(this.form).then(response => {
        if (response.code === 200) {
          this.msgSuccess(this.$t('common.successEdit'));
          this.nullifyImgOpen = false;
          this.getList();
        }
      });
    },
    submitUpdateImgForm() {
      if (!this.form.fileId) {
        this.msgError(this.$t("common.placeSelect") + this.$t('sealinfo.updateImg'));
        return
      }
      uploadsealpic(this.form).then(response => {
        if (response.code === 200) {
          this.msgSuccess(response.msg);
          this.updateImgOpen = false;
          this.getList();
        }
      });
    },
    checkboxSelect (row, rowIndex) {
      let userId = this.$store.getters.userId;
      if ((row.sealDict==2 || row.sealDict==9) && checkRole(["smts_seal_store","smts_seal_store_main","smts_admin","admin"])) {
        return true // 不禁用
      }else{
        return false // 禁用
      }
    },
    showUpdateBtn(row,rowIndex){
      if((row.sealDict==2 || row.sealDict==9) && (row.createByLogin == this.$store.getters.userId || checkRole(["smts_seal_store_main","smts_admin","admin"]))){
        return true;
      }
      return false;
    }
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.getList()
    })
  },
};
</script>
