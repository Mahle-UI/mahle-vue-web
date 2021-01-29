<template>
  <div class="app-container">
    <el-form :model="queryParams"  @submit.native.prevent  ref="queryForm" :inline="true" v-show="showSearch" :label-width="$i18n.locale=='en'?'100px':'68px'">
      <el-form-item :label="$t('sealUse.sealId')" prop="sealName">
        <el-input
          v-model="queryParams.sealName"
          :placeholder="$t('common.placeholder')+' '+$t('sealUse.sealId')"
          clearable
          size="small"
          suffix-icon="el-icon-search"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('sealUse.userName')" prop="userName">
        <el-input
          v-model="queryParams.userName"
          :placeholder="$t('common.placeholder')+' '+$t('sealUse.userName')"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('sealUse.useDate')" prop="borrowDate" label-width="150">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.borrowDate"
          type="date"
          @change="queryDateChange"
          value-format="yyyy-MM-dd"
          @keyup.enter.native="handleQuery"
          :placeholder="$t('common.placeSelect')+' '+$t('sealUse.useDate')">
        </el-date-picker>
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
          v-hasPermi="['flow:sealUse:add']"
        >{{$t('common.add')}}{{$t('sealUse.functionName')}}</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          v-if="isShanghai=='0'"
          @click="handleAddChildSeal"
          v-hasPermi="['flow:sealUse:add']"
        >{{$t('sealinfo.childSeal')}}</el-button>
      </el-col>
      <el-col :span="1.5" v-if="false">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['flow:sealUse:edit']"
        >{{$t('common.edit')}}</el-button>
      </el-col>
      <el-col :span="1.5" v-if="false">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['flow:sealUse:remove']"
        >{{$t('common.delete')}}</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['flow:sealUse:export']"
        >{{$t('common.export')}}{{$t('sealUse.export')}}</el-button>
      </el-col>
	  <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="sealUseList" border>
      <el-table-column v-if="false" :label="$t('sealUse.id')" align="center" prop="id" />
      <el-table-column :label="$t('sealUse.sealId')" align="center" prop="sealName" />
      <el-table-column :label="$t('flow.applicant')" align="center" prop="applicant" />
      <el-table-column :label="$t('sealUse.userName')" align="center" prop="userName" />
      <el-table-column v-if="false" :label="$t('sealUse.userId')" align="center" prop="userId" />
      <el-table-column :label="$t('sealUse.useDate')" align="center" prop="useDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.useDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('sealUse.files')" align="center" prop="files" />
      <el-table-column :label="$t('sealUse.filesNum')" align="center" prop="filesNum" />
      <el-table-column :label="$t('sealUse.realUseDate')" align="center" prop="realUseDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.realUseDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('sealUse.status')" align="center" prop="status" :formatter="statusFomatter"/>
      <el-table-column width="150" :label="$t('common.examinationApproval')" align="center" prop="workName" />
      <el-table-column :label="$t('common.detailOperation')" align="center" width="100">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-view"
            @click="view(scope.row)"
            v-hasPermi="['flow:sealUse:list']"
          >{{$t('common.view')}}</el-button>
          <!-- || scope.row.status==2 -->
        </template>
      </el-table-column>
      <el-table-column :label="$t('common.operation')" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            @click="used(scope.row.id)"
            v-if="scope.row.show"
          >{{$t('sealUse.complete')}}</el-button>
          <!-- || scope.row.status==2 -->
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

    <!-- 添加或修改印章登记对话框 -->
    <el-dialog :close-on-click-modal="false" :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" :label-width="$i18n.locale=='en'?'160px':'130px'">
        <el-form-item :label="$t('sealUse.sealId')" prop="sealId">
          <el-select v-model="form.sealId" @change="selectSeal" style="width: 100%"
           :placeholder="$t('common.placeSelect')+' '+$t('sealUse.sealId')" clearable size="small">
            <el-option
              v-for="seal in sealOptions"
              :key="seal.supplyId"
              :label="seal.sealName"
              :value="seal.supplyId"
            />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('sealinfo.userId')">
          <el-input disabled v-model="form.custodian" />
        </el-form-item>
        <el-form-item :label="$t('sealUse.userName')" prop="userName">
        <el-input v-model="form.userName" :placeholder="$t('common.placeholder')+' '+$t('sealUse.userName')" />

        </el-form-item>
        <el-form-item :label="$t('sealUse.useDate')" prop="useDate">
          <el-date-picker clearable size="small" style="width: 200px"
                          v-model="form.useDate"
                          type="date"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          :placeholder="$t('common.choose')+$t('sealUse.useDate')">
          </el-date-picker>
        </el-form-item>
        <el-form-item :label="$t('sealUse.files')" prop="files">
          <el-input v-model="form.files" :placeholder="$t('common.placeholder')+' '+$t('sealUse.files')" />
        </el-form-item>
        <el-form-item :label="$t('sealUse.filesNum')" prop="filesNum">
          <el-input v-model="form.filesNum" :placeholder="$t('common.placeholder')+' '+$t('sealUse.filesNum')" />
        </el-form-item>

            <el-form-item :label="$t('sealUse.file')" prop="attachment">
              <el-upload
                ref="upload"
                :limit="1"
                accept=".docx, .doc,.pdf"
                :action="upload.url"
                :headers="upload.headers"
                auto-upload
                :before-upload="handleFileUploadProgress"
                :on-preview="handleFilePreview"
                :on-success="handleFileSuccess"
                :file-list="upload.fileList">
                <el-button slot="trigger" size="small" type="primary">{{$t('common.selectFile')}}</el-button>
                <div slot="tip" class="el-upload__tip">{{$t('common.filePdfRemark')}}</div>
              </el-upload>
            </el-form-item>

        <el-form-item :label="$t('sealUse.createDate')" prop="createDate" v-if="false">
          <el-date-picker clearable size="small" style="width: 200px"
                          v-model="form.createDate"
                          type="date"
                          value-format="yyyy-MM-dd"
                          :placeholder="$t('common.choose')+$t('sealUse.createDate')">
          </el-date-picker>
        </el-form-item>
        <el-form-item :label="$t('sealUse.remark')" prop="remark">
          <el-input type="textarea" v-model="form.remark" :placeholder="$t('common.placeholder')+' '+$t('sealUse.remark')" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">{{$t('common.submit')}}</el-button>
        <el-button @click="cancel">{{$t('common.cancle')}}</el-button>
      </div>
    </el-dialog>



    <el-dialog :close-on-click-modal="false" :title="$t('common.view')" :visible.sync="viewOpen" width="500px" append-to-body>
      <el-form ref="form" :model="viewForm" :label-width="$i18n.locale=='en'?'150px':'130px'">
        <el-form-item :label="$t('sealUse.sealId')" prop="sealName">
          <el-input disabled="" v-model="viewForm.sealName" :placeholder="$t('common.placeSelect')+' '+$t('sealUse.sealId')" suffix-icon="el-icon-search" />
        </el-form-item>
        <el-form-item :label="$t('sealUse.userName')" prop="userId">
          <el-input disabled v-model="viewForm.userName" :placeholder="$t('common.placeSelect')+' '+$t('sealUse.userName')" />
        </el-form-item>
        <el-form-item :label="$t('sealUse.useDate')" prop="useDate">
          <el-date-picker disabled clearable size="small" style="width: 200px"
                          v-model="viewForm.useDate"
                          type="date"
                          value-format="yyyy-MM-dd"
                          :placeholder="$t('common.choose')+$t('sealUse.useDate')">
          </el-date-picker>
        </el-form-item>
        <el-form-item :label="$t('sealUse.files')" prop="files">
          <el-input disabled v-model="viewForm.files" :placeholder="$t('common.placeholder')+' '+$t('sealUse.files')" />
        </el-form-item>
        <el-form-item :label="$t('sealUse.filesNum')" prop="filesNum">
          <el-input disabled v-model="viewForm.filesNum" :placeholder="$t('common.placeholder')+' '+$t('sealUse.filesNum')" />
        </el-form-item>


        <el-form-item :label="$t('sealUse.file')" prop="attachment">
          <div v-if="viewForm.file&&viewForm.file.fileName">{{viewForm.file&&viewForm.file.fileName?viewForm.file.fileName:''}}
            <el-link @click="viewFile(viewForm.file)" type="success">{{$t('common.view')}}</el-link>&nbsp;&nbsp;&nbsp;&nbsp;
            <el-link @click="downloadFile(viewForm.file)" type="danger">{{$t('common.download')}}</el-link></div>
        </el-form-item>


        <el-form-item :label="$t('sealUse.createDate')" prop="createDate" v-if="false">
          <el-date-picker clearable size="small" style="width: 200px"
                          v-model="viewForm.createDate"
                          type="date"
                          value-format="yyyy-MM-dd"
                          :placeholder="$t('common.choose')+$t('sealUse.createDate')">
          </el-date-picker>
        </el-form-item>
        <el-form-item :label="$t('sealUse.remark')" prop="remark">
          <el-input disabled type="textarea" v-model="viewForm.remark" :placeholder="$t('common.placeholder')+' '+$t('sealUse.remark')" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="()=>{viewOpen=false}">{{$t('common.submit')}}</el-button>
        <el-button @click="()=>{viewOpen=false}">{{$t('common.cancle')}}</el-button>
      </div>
    </el-dialog>
    <FilePreview ref="filePreview"></FilePreview>
  </div>
</template>

<script>
import { listSealUse, getSealUse,  addSealUse, exportSealUse,getSealcombo,usedSealUse,canUsedSealUse } from "@/api/flow/sealUse";
import { getProcesHandler } from "@/api/info/flow";
import { downloadfile} from "@/api/flow/contract";
import { getToken } from "@/utils/auth";
import {checkRole} from '@/utils/permission';
import FilePreview from "../../../components/FilePreview/index";

export default {
  name: "SealUse",
  components: {
    FilePreview
  },
  data() {
    return {
      viewOpen:false,
      // 上传参数
      upload: {
          // 是否禁用上传
          isUploading: false,
          // 设置上传的请求头部
          headers: { Authorization: "Bearer " + getToken() },
          // 上传的地址
          url: process.env.VUE_APP_BASE_API + "/info/file/upload?type=220",
          // 上传的文件列表
          fileList: []
        },
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
      // 印章登记表格数据
      sealUseList: [],

      useStatusDict: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        sealId: null,
        user: null,
        userId: null,
        useDate: null,
        files: null,
        filesNum: null,
      },
      // 表单参数
      form: {},
      viewForm:{
        sealId:"合同章",
        user:"李四",
        useDate:"2020-10-01 10:00",
        realUseDate:"2020-10-01 10:00",
        files:"采购合同",
        filesNum:"10",
        remark:"备注"
      },
      // 表单校验
      rules: {
        sealId: [
          { required: true, message: "印章名称不能为空", trigger: "blur" }
        ],
        userName: [
          { required: true, message: "使用人不能为空", trigger: "blur" }
        ],
        useDate: [
          { required: true, message: "计划用印日期不能为空", trigger: "blur" }
        ],
        files: [
          { required: true, message: "用印文件不能为空", trigger: "blur" }
        ],
        filesNum: [
          { required: true, message: "文件数量不能为空", trigger: "blur" }
        ]
      },
      userOptions:[],
      sealOptions: [],
      isShanghai:''
    };
  },
  created() {
    this.isShanghai = this.$store.getters.isShanghai
    this.getDicts("use_status").then(response => {
      this.useStatusDict = response.data;
    });
    this.getList();
    this.sealcombo();
  },
  activated(){
    this.getList()
  },
  methods: {
    /** 查询印章登记列表 */
    getList() {
      this.loading = true;
      listSealUse(this.queryParams).then(response => {
        var tablist = response.rows
        tablist.forEach(item => {
          item.workName = '';
          this.usedShow(item)
        })
        this.sealUseList = tablist;
        this.total = response.total;
        this.workIdFormat()
        this.loading = false;
      });
    },
    workIdFormat() {
       this.sealUseList.forEach(item => {
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
    statusFomatter(row,column){
      return this.selectDictLabel(this.useStatusDict, row.status);
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    //日期
    queryDateChange(){
      this.handleQuery()
    },
    // 表单重置
    reset() {
      this.form = {};
      this.resetForm("form");
      this.upload.fileList = []
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
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
     // this.$router.push("/flow/sealUse");
      this.title="新增用印登记";
      this.reset();
      this.open = true;
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          addSealUse(this.form).then(response => {
            if (response.code === 200) {
              this.msgSuccess(this.$t('common.successAdd'));
              this.open = false;
              this.getList();
            }
          });
        }
      });
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm(this.$t('common.confirmExport'), this.$t('common.warning'), {
          confirmButtonText: this.$t('common.submit'),
          cancelButtonText: this.$t('common.cancle'),
          type: "warning"
        }).then(function() {
          return exportSealUse(queryParams);
        }).then(response => {
          this.download(response.msg);
        }).catch(function() {});
    },
    selectSeal(supplyId){
      var sealItem = this.sealOptions.find((item)=>{
        return item.supplyId === supplyId;
      });
      if(sealItem){
        this.form.sealName = sealItem.sealName;
        this.form.custodian = sealItem.custodian;
      }else {
        this.form.sealName = "";
        this.form.custodian = "";
      }
    },
    sealcombo(){
      getSealcombo().then(response => {
        if(response.code=='200'){
          this.sealOptions = response.data
        }
      });
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
        if(response.code=='200'){
          this.form.attachmentId = response.msg
        }else{
          this.msgSuccess(response.msg);
        }
      },
    //点击文件列表中已上传的文件时的钩子函数
    handleFilePreview(file){
      this.$nextTick(() => {
        this.$refs.filePreview.preview(file)
      })
    },
      view(row){
        if(row.useType==0){
          getSealUse(row.id).then(response => {
            if(response.code=='200'){
              this.viewForm = response.data.detail
              this.viewForm.file =  response.data.file
              this.viewOpen=true
            }
          });
        }else{
          this.$router.push("/seal/sealUseDetail?id="+row.id)
        }
      },
      usedShow(row){
        row.show = false;
        if(row.status==0){
          if(checkRole(['smts_seal_store_main'])){
            row.show = true;
          }else {
           canUsedSealUse(row.id).then(response => {
              if (response.code == '200') {
                row.show = response.data
              }
            });
          }
        }
      },
      used(id){
        let that = this;
        this.$confirm(this.$t('sealUse.confirmUsed'), this.$t('common.warning'), {
          confirmButtonText: this.$t('common.submit'),
          cancelButtonText: this.$t('common.cancle'),
          type: "warning"
        }).then(function() {
          usedSealUse(id).then(response => {
            if(response.code=='200'){
              that.getList();
              that.msgSuccess(that.$t('common.successEdit'));
            }
          });
        }).catch(function() {});
      },
      /*downloadFile(filePath){
        window.open(process.env.VUE_APP_BASE_API + filePath, '_blank')
      },*/
      handleAddChildSeal(){
        this.$router.push("/flow/sealUse")
      },
    viewFile(item){
      this.$nextTick(()=>{
        this.$refs.filePreview.viewFile(item.fileName,item.fmsId);
      })
    },
    downloadFile(item){
      downloadfile({fileId:item.fmsId}).then(response => {
        var data = response
        if (!data) {
          return
        }
        //判断ie
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(new Blob([data]), item.fileName)
        }else {
          let url = window.URL.createObjectURL(new Blob([data]))
          let link = document.createElement('a')
          link.style.display = 'none'
          link.href = url
          link.setAttribute('download', item.fileName)

          document.body.appendChild(link)
          link.click()
        }

      }).catch(function() {});

    },
  }
};
</script>
