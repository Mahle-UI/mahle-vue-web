<template>
  <div class="app-container">
    <h3 style="text-align: center">{{$t('contract.historicalContractFiling')}}</h3>

    <!-- 添加或修改合同查询对话框 -->
    <el-form ref="form" :model="form" :rules="rules" label-width="120px" style="width: 80%;margin:0 auto">
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item :label="$t('contract.no')" prop="no">
            <el-input v-model="form.no" :placeholder="$t('common.placeholder')+' '+$t('contract.no')"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('contract.name')" prop="name">
            <el-input v-model="form.name" :placeholder="$t('common.placeholder')+' '+$t('contract.name')"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item :label="$t('contract.cateId')" prop="cateId">
            <el-select class="selectWidth" v-model="form.cateId" :placeholder="$t('common.placeSelect')+' '+$t('contract.cateId')">
              <el-option label="采购合同" value="1" />
              <el-option label="服务合同" value="2" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('contract.lang')" prop="lang">
            <el-select class="selectWidth" v-model="form.lang" :placeholder="$t('common.placeSelect')+' '+$t('contract.lang')">
              <el-option
                v-for="dict in langOptions"
                :key="dict.dictValue"
                :label="dict.dictLabel"
                :value="dict.dictValue"
              ></el-option>
            </el-select>
          </el-form-item>

        </el-col>
        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
      </el-row>



      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item :label="$t('contract.deptId')" prop="deptId">
            <el-select class="selectWidth" multiple="" :filterable="true" v-model="form.deptId" :placeholder="$t('common.placeSelect')+' '+$t('contract.deptId')">
              <el-option label="上海马勒热系统有限公司" value="11"></el-option>
              <el-option label="成都马勒汽车热系统有限公司" value="22"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('contract.customerId')" prop="customerId">
            <el-select v-model="form.customerName" class="select-width" autocomplete multiple="" :filterable="true" :placeholder="$t('common.placeSelect')+' '+$t('contract.customerName')">
              <el-option label="相对方1" value="11"></el-option>
              <el-option label="相对方2" value="22"></el-option>
              <el-option label="相对方3" value="23"></el-option>
              <el-option label="相对方4" value="24"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-bind:hidden="true" :label="$t('contract.customerName')" prop="customerName">
            <el-input v-model="form.customerName" :placeholder="$t('common.placeSelect')+' '+$t('contract.customerName')" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item label="申请人" prop="createBy">
            <el-input v-model="form.createBy" placeholder="请选择经办人" suffix-icon="el-icon-search" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="申请部门" prop="createDeptId">
            <el-input v-model="form.createDeptId" disabled=""/>
          </el-form-item>
        </el-col>

      </el-row>

      <el-row :gutter="24" v-if="false">
        <el-col :span="12">
          <el-form-item label="联系人" prop="linkman">
            <el-input v-model="form.phone" :placeholder="$t('common.placeSelect')+' '+$t('contract.customerId')" suffix-icon="el-icon-search" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联系电话" prop="phone">
            <el-input v-model="form.phone" placeholder="请输入联系电话"/>
          </el-form-item>
        </el-col>
      </el-row>



      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item :label="$t('contract.currency')" prop="currency">
            <el-select  class="selectWidth" v-model="form.currency" :placeholder="$t('common.placeSelect')+' '+$t('contract.currency')">
              <el-option
                v-for="dict in currencyOptions"
                :key="dict.dictValue"
                :label="dict.dictLabel"
                :value="parseInt(dict.dictValue)"
              ></el-option>
            </el-select>
          </el-form-item>

        </el-col>
        <el-col :span="12">
          <el-row>
            <el-col :span="14">
              <el-form-item :label="$t('contract.amount')"  prop="amountType">
                <el-select v-model="form.ttt">
                  <el-option label="无金额合同" value="1"></el-option>
                  <el-option label="有金额合同(含税)" value="2"></el-option>
                  <el-option label="有金额合同(未税)" value="3"></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="10">
              <el-form-item label-width="0px"  style="margin-left: 5px;" prop="amount">
                <el-input v-model="form.amount" :placeholder="$t('common.placeholder')+' '+$t('contract.amount')" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
      </el-row>


      <el-row :gutter="24" v-if="false">
        <el-col :span="12">
          <el-form-item label="是否模板">
            <el-select  class="selectWidth" v-model="isTemplate" placeholder="">
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item v-if="isTemplate==1" :label="$t('contract.templateId')" prop="templateId">
            <el-input v-model="form.templateId" :placeholder="$t('common.placeSelect')+' '+$t('contract.templateId')" suffix-icon="el-icon-search"/>
          </el-form-item>
        </el-col>
      </el-row>




      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item :label="$t('contract.startTime')" prop="startTime">
            <el-input v-model="form.startTime" :placeholder="$t('common.placeholder')+$t('contract.startTime')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('contract.endTime')" prop="endTime">
            <el-input v-if="!message" v-model="form.endTime" :placeholder="$t('common.placeholder')+$t('contract.endTime')"></el-input>
            <el-date-picker v-if="message" clearable class="selectWidth"
                            v-model="form.endTime"
                            type="date"
                            value-format="yyyy-MM-dd"
                            :placeholder="$t('common.choose')+$t('contract.endTime')">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item :label="$t('contract.tax')" prop="tax">
            <el-input v-model="form.tax" :placeholder="$t('common.placeSelect')+' '+$t('contract.tax')" >
              <template slot="append">%</template>
            </el-input>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item :label="$t('contract.taxType')" prop="tax">
            <el-select v-model="form.taxType" multiple placeholder="请选择税种" class="select-width">
              <el-option label="增值税" value="1"></el-option>
              <el-option label="营业税" value="2">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>


      <el-row :gutter="24">
        <el-col :span="24">
          <el-form-item label="主题事项" prop="item">
            <el-input v-model="form.item" :placeholder="$t('common.placeholder')+'主题事项'"/>
          </el-form-item>
        </el-col>
      </el-row>


      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item :label="$t('contract.type')" prop="type">
            <el-select class="selectWidth" v-model="form.type" :placeholder="$t('common.placeSelect')+' '+$t('contract.type')">
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('contract.link')" prop="link"  v-if="!type">
            <el-input v-model="form.link" :placeholder="$t('common.placeSelect')+' '+$t('contract.link')" suffix-icon="el-icon-search" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="24">
        <el-col :span="12">
        <el-form-item label="合同文件" prop="attachment">
          <el-upload
            ref="upload"
            :limit="1"
            accept=".docx, doc,.pdf"
            :action="upload.url"
            :headers="upload.headers"
            :file-list="upload.fileList"
            :on-progress="handleFileUploadProgress"
            :on-preview="handleFilePreview"
            :on-success="handleFileSuccess"
            :auto-upload="false">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button slot="trigger" size="small" type="primary">选取相关文件</el-button>
            <div slot="tip" class="el-upload__tip">只能上传pdf/word文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        </el-col>
      </el-row>


      <el-row :gutter="24">
        <el-col :span="24">
        <el-form-item :label="$t('contract.originalcopyAddress')" prop="originalcopyAddress">
          <el-input type="textarea" v-model="form.originalcopyAddress" :placeholder="$t('common.placeholder')+' '+$t('contract.originalcopyAddress')" />
        </el-form-item>
        </el-col>


      </el-row>

      <el-row :gutter="24">
        <el-col :span="24">
          <el-form-item :label="$t('contract.remark')" prop="remark">
            <el-input type="textarea" v-model="form.remark" :placeholder="$t('common.placeholder')+' '+$t('contract.remark')" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item label-width="130px" label="合同到期提醒" prop="warn">
            <el-switch
              v-model="message"
              active-color="#13ce66"
              inactive-color="#b6b6b6">
            </el-switch>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label-width="130px"  :label="$t('flowAuth.noticeWay')" prop="files" v-if="message">
            <el-checkbox v-model="radio1">邮箱</el-checkbox>
            <el-checkbox v-model="radio2">系统通知</el-checkbox>
          </el-form-item>
        </el-col>
      </el-row>

      <!--归档-->
      <span v-if="this.form.status==5">
          <el-row :gutter="24">
            <el-col :span="12">
                 <el-form-item :label="$t('contract.archivedBy')" prop="archivedBy">
                    <el-input v-model="form.archivedBy" :placeholder="$t('common.placeholder')+' '+$t('contract.archivedBy')" />
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item :label="$t('contract.archivedTime')" prop="archivedTime">
                    <el-input v-model="form.archivedTime" :placeholder="$t('common.placeholder')+' '+$t('contract.archivedTime')" />
                </el-form-item>
            </el-col>
          </el-row>



          <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="归档文档" prop="archivedAttachment">
              <el-upload
                ref="upload"
                :limit="1"
                accept=".docx, .doc,.pdf"
                :action="upload.url"
                :headers="upload.headers"
                :file-list="upload.fileList"
                :on-progress="handleFileUploadProgress"
                :on-preview="handleFilePreview"
                :on-success="handleFileSuccess"
                :auto-upload="false">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        </span>


      <el-form-item v-if="false" :label="$t('contract.flowDefinedId')" prop="flowDefinedId">
        <el-input v-model="form.flowDefinedId" :placeholder="$t('common.placeSelect')+' '+$t('contract.flowDefinedId')" />
      </el-form-item>
      <el-form-item v-if="false" :label="$t('contract.flowInstanceId')" prop="flowInstanceId">
        <el-input v-model="form.flowInstanceId" :placeholder="$t('common.placeSelect')+' '+$t('contract.flowInstanceId')" />
      </el-form-item>
      <el-form-item v-if="false" :label="$t('contract.explain')" prop="explain">
        <el-input v-model="form.explain" :placeholder="$t('common.placeSelect')+' '+$t('contract.explain')" />
      </el-form-item>
      <el-form-item v-if="false" :label="$t('contract.status')">
        <el-select v-model="form.status" :placeholder="$t('common.placeSelect')+' '+$t('contract.status')">
          <el-option label="$t('common.placeSelect')" value="" />
        </el-select>
      </el-form-item>
    </el-form>
    <div style="text-align: center">
      <el-button type="primary" @click="cancel">{{$t('common.completeAndContinue')}}</el-button>
      <el-button type="primary" @click="submitForm" v-prevent-repeat-click>{{$t('common.complete')}}</el-button>
      <el-button type="success" @click="submitForm" v-prevent-repeat-click>暂存</el-button>
      <el-button type="danger" @click="cancel">{{$t('common.clear')}}</el-button>

    </div>
    <FilePreview ref="filePreview"></FilePreview>
  </div>
</template>

<script>
  import { listContract, getContract, delContract, addContract, updateContract, exportContract } from "@/api/flow/contract";
  import { getToken } from "@/utils/auth";
  import FilePreview from "../../../components/FilePreview/index";
  export default {
    name: "Contract",
    components: {FilePreview},
    data() {
      return {
        isMaster:false,
        message:false,
        // 上传参数
        upload: {
          // 是否禁用上传
          isUploading: false,
          // 设置上传的请求头部
          headers: { Authorization: "Bearer " + getToken() },
          // 上传的地址
          url: process.env.VUE_APP_BASE_API + "/common/upload",
          // 上传的文件列表
          fileList: []
        },
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
        // 合同查询表格数据
        contractList: [],
        // 弹出层标题
        title: "",
        // 是否显示弹出层
        open: false,
        archivedOpen:false,
        // 合同语言字典
        langOptions: [],
        typeOptions: [],
        statusOptions: [],
        currencyOptions: [],
        // 所属公司字典
        deptIdOptions: [],
        // 签约方字典
        customerIdOptions: [],
        // 表单参数
        form: {
          type:"2"
        },
        // 表单校验
        rules: {
          amountType: [
            { required: true, message: "请选择类型", trigger: "blur" }
          ],
          name: [
            { required: true, message: "合同名称必须填写", trigger: "blur" }
          ],
          no: [
            { required: true, message: "无编号请填写无", trigger: "blur" }
          ],
          cateId: [
            { required: true, message: "分类不能为空", trigger: "blur" }
          ],
          type: [
            { required: true, message: "合同类型不能为空", trigger: "blur" }
          ],
          lang: [
            { required: true, message: "合同语言不能为空", trigger: "blur" }
          ],
          deptId: [
            { required: true, message: "所属公司不能为空", trigger: "blur" }
          ],
          customerId: [
            { required: true, message: "签约方不能为空", trigger: "blur" }
          ],
          startTime: [
            { required: true, message: "开始时间不能为空", trigger: "blur" }
          ],
          endTime: [
            { required: true, message: "结束时间不能为空", trigger: "blur" }
          ],
          amount: [
            { required: true, message: "金额不能为空", trigger: "blur" }
          ],
          link: [
            { required: true, message: "请选择主协议", trigger: "blur" }
          ],
          tax: [
            { required: true, message: "税率不能为空", trigger: "blur" }
          ],
          currency: [
            { required: true, message: "币种不能为空", trigger: "blur" }
          ],
          originalcopyAddress:[
            { required: true, message: "原件存放地址", trigger: "blur" }
          ]
        }
      };
    },
    computed:{
      type(){
        if(this.form.type=="2"){
          return true;
        }else{
          return false;
        }
      }
    },
    created() {

      this.getDicts("contract_type").then(response => {
        this.typeOptions = response.data;
      });
      this.getDicts("currency").then(response => {
        this.currencyOptions = response.data;
      });
      this.getDicts("contract_status").then(response => {
        this.statusOptions = response.data;
      });
      this.getDicts("langs").then(response => {
        this.langOptions = response.data;
      });
      this.getDicts("common_status").then(response => {
        this.deptIdOptions = response.data;
      });
      this.getDicts("common_status").then(response => {
        this.customerIdOptions = response.data;
      });
    },
    methods: {
      handleArchived(row){
        this.archivedOpen=true;
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
        this.form.filePath = response.url;
        this.msgSuccess(response.msg);
      },
      //点击文件列表中已上传的文件时的钩子函数
      handleFilePreview(file){
        this.$nextTick(() => {
          this.$refs.filePreview.preview(file)
        })
      },
      // 表单重置
      reset() {
        this.form = {
          id: null,
          cateId: null,
          no: null,
          preNo: null,
          type: null,
          lang: null,
          deptId: null,
          link: null,
          customerId: null,
          customerName: null,
          startTime: null,
          endTime: null,
          amount: null,
          tax: null,
          templateId: null,
          currency: null,
          remark: null,
          createBy: null,
          createTime: null,
          updateBy: null,
          updateTime: null,
          flowDefinedId: null,
          flowInstanceId: null,
          explain: null,
          status: null
        };
        this.resetForm("form");
      },
      /** 新增按钮操作 */
      handleAdd() {
        this.reset();
        this.open = true;
        this.title = this.$t('common.edit')+this.$t('contract.functionName');
      },
      /** 修改按钮操作 */
      handleUpdate(row) {
        this.reset();
        const id = row.id || this.ids
        getContract(id).then(response => {
          this.form = response.data;
          this.open = true;
          this.title = this.$t('common.edit')+this.$t('contract.functionName');
        });
      },
      /** 提交按钮 */
      submitForm() {
        this.$refs["form"].validate(valid => {
          if (valid) {
            if (this.form.id != null) {
              updateContract(this.form).then(response => {
                if (response.code === 200) {
                  this.msgSuccess(this.$t('common.successEdit'));
                  this.open = false;

                }
              });
            } else {
              addContract(this.form).then(response => {
                if (response.code === 200) {
                  this.msgSuccess(this.$t('common.successAdd'));
                  this.open = false;

                }
              });
            }
          }
        });
      },
      /** 删除按钮操作 */
      handleDelete(row) {
        const ids = row.id || this.ids;
        this.$confirm(this.$t('common.confirmDelete'), this.$t('common.warning'), {
          confirmButtonText: this.$t('common.submit'),
          cancelButtonText: this.$t('common.cancle'),
          type: "warning"
        }).then(function() {
          return delContract(ids);
        }).then(() => {

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
          return exportContract(queryParams);
        }).then(response => {
          this.download(response.msg);
        }).catch(function() {});
      }
    }
  };
</script>


<style>

  .header{text-align: center;
  }
  .text {
    font-size: 14px;
  }
  .selectWidth{width: 100%!important;}
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
  .el-step__title{font-size: 13px}
</style>
