<template>
  <div class="app-container"  style="width: 95%;margin:0 auto">
    <h3 style="text-align: center">{{$t('contract.applicationForApprovalOfSubsidiaryContract')}}</h3>
        <!-- 添加或修改合同查询对话框 -->
        <el-form ref="form" :model="form" :rules="rules" label-width="130px">

          <el-form-item>
            <el-steps align-center :space="300"  finish-status="success" v-if="radio1==2 || radio2==2">
              <el-step :title="$t('sealinfo.applicant')"></el-step>
              <el-step :title="$t('contract.departmentManagerOfSubsidiary')+$t('contract.choose')"></el-step>
              <el-step :title="$t('contract.generalManagerOfSubsidiary')"></el-step>
              <el-step :title="$t('contract.financeMinister')"></el-step>
              <el-step :title="$t('contract.headOfRelevantDepartments')"></el-step>
              <el-step :title="$t('contract.seniorLegal')"></el-step>
              <el-step :title="$t('contract.viceGeneralManager')"></el-step>
              <el-step :title="$t('contract.generalManager')"></el-step>
              <el-step :title="$t('contract.filingOfApplicants')"></el-step>
            </el-steps>
            <el-steps align-center :space="300"  finish-status="success" v-if="radio1==1 && radio2==1">
              <el-step :title="$t('sealinfo.applicant')"></el-step>
              <el-step :title="$t('contract.departmentManagerOfSubsidiary')"></el-step>
              <el-step :title="$t('contract.SMTSfinanceMinister')"></el-step>
              <el-step :title="$t('contract.headOfRelevantDepartments')"></el-step>
              <el-step :title="$t('contract.seniorLegal')"></el-step>
              <el-step :title="$t('contract.generalManagerOfSubsidiary')"></el-step>
              <el-step :title="$t('contract.filingOfApplicants')"></el-step>
            </el-steps>
          </el-form-item>

          <div style="padding: 8px 16px;background-color:#fff6f7;border-radius:4px;border-left:5px solid #fe6c6f;margin:20px auto;width: 90%">
            <el-form ref="form1" label-position="left" v-show="!showCondition">
              <el-form-item :label="$t('contract.problem1')">
                <el-radio disabled="" v-model="radio1" label="1">{{$t('common.yes')}}</el-radio><el-radio disabled="" v-model="radio1" label="2">{{$t('common.no')}}</el-radio>
              </el-form-item>
              <el-form-item :label="$t('contract.problem2')">
                <el-radio disabled="" v-model="radio2" label="1">{{$t('common.yes')}}</el-radio><el-radio disabled="" v-model="radio2" label="2">{{$t('common.no')}}</el-radio>
              </el-form-item>
            </el-form>
          </div>

           <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item :label="$t('contract.contractName')" prop="contractName">
              <el-input v-model="form.contractName" :placeholder="$t('common.placeholder')+' '+$t('contract.contractName')"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('contract.themes')" prop="themes">
              <el-input v-model="form.themes" :placeholder="$t('common.placeholder')+' '+$t('contract.themes')"/>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item :label="$t('contract.cateId')" prop="cateDict">
              <el-select class="selectWidth" v-model="form.cateDict" :placeholder="$t('common.placeSelect')+' '+$t('contract.cateId')">
                <el-option
                  v-for="dict in cateDictOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('contract.lang')" prop="langsDict">
              <el-select class="selectWidth" v-model="form.langsDict" :placeholder="$t('common.placeSelect')+' '+$t('contract.lang')">
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
            <el-form-item :label="$t('contract.deptId')" prop="signDeptId">
              <el-select  :filterable="true" class="selectWidth" v-model="form.signDeptId" :placeholder="$t('common.placeSelect')+' '+$t('contract.deptId')">
                <el-option
                  v-for="dept in signDeptOptions"
                  :key="dept.deptId"
                  :label="dept.deptName+' '+dept.deptNameEn"
                  :value="dept.deptId"
                ></el-option>

              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('contract.customerId')" prop="objectArr">
              <el-select v-model="form.objectArr" class="select-width" autocomplete multiple="" :filterable="true" :placeholder="$t('common.placeSelect')+' '+$t('contract.customerName')">
                <el-option
                  v-for="obj in objectOptions"
                  :key="obj.objId"
                  :label="obj.objNameCn"
                  :value="obj.objId"
                ></el-option>
                <!-- +' '+obj.objNameEn -->
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item :label="$t('contract.applyForUserId')" prop="applyForUserId">
              <el-select v-model="form.applyForUserId" style="width: 100%"
                :placeholder="$t('common.placeSelect')+' '+$t('contract.applyForUserId')" filterable
                ref="searchSelect" :filter-method="searchUser" @change="selectUser" clearable size="small">
                  <el-option
                    v-for="user in userOptions"
                    :key="user.userId"
                    :label="user.nickName+' '+user.userNameEn"
                    :value="user.userId"
                  />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('contract.applyForDeptId')" prop="applyForDeptId">
              <el-input v-model="form.applyForDeptName" disabled=""/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item :label="$t('contract.currency')" prop="currencyDict">
              <el-select  class="selectWidth" v-model="form.currencyDict" :placeholder="$t('common.placeSelect')+' '+$t('contract.currency')">
                <el-option
                  v-for="dict in currencyOptions"
                  :key="dict.dictCode"
                  :label="dict.dictLabel"
                  :value="dict.dictCode"
                ></el-option>
              </el-select>
            </el-form-item>

          </el-col>
          <el-col :span="12">
            <el-row>
              <el-col :span="14">
                <el-form-item :label="$t('contract.amount')"  prop="amountDict">
                  <el-select v-model="form.amountDict">
                    <el-option
                      v-for="dict in amountOptions"
                      :key="dict.dictValue"
                      :label="dict.dictLabel"
                      :value="dict.dictValue"
                    ></el-option>
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
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item :label="$t('contract.tax')" prop="taxRate">
              <el-input v-model="form.taxRate" :placeholder="$t('common.placeSelect')+' '+$t('contract.tax')" >
                <template slot="append">%</template>
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item :label="$t('contract.taxDict')" prop="taxDict">
              <el-select v-model="form.taxDict"   :placeholder="$t('common.placeholder')+' '+$t('contract.taxDict')" class="select-width">
                 <el-option
                      v-for="dict in taxOptions"
                      :key="dict.dictCode"
                      :label="dict.dictLabel"
                      :value="dict.dictCode"
                    ></el-option>
              </el-select>
            </el-form-item>
          </el-col>

        </el-row>


        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item :label="$t('contract.isMangerApprove')" prop="isMangerApprove">
              <el-select v-model="form.isMangerApprove" :placeholder="$t('common.placeSelect')+' '+$t('contract.isMangerApprove')" class="select-width">
                <el-option :label="$t('common.yes')" value="1"></el-option>
                <el-option :label="$t('common.no')" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item :label="$t('contract.concernDeptArr')" prop="concernDeptArr">
              <el-select v-model="form.concernDeptArr" multiple="" :placeholder="$t('common.placeSelect')+' '+$t('contract.concernDeptArr')" class="select-width">
                 <el-option
                  v-for="dict in concernDeptOptions"
                  :key="dict.dictCode"
                  :label="dict.remark"
                  :value="dict.dictCode"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item :label="$t('contract.sybmolP')" prop="sybmolP">
              <el-select class="selectWidth" v-model="form.sybmolP" :placeholder="$t('common.placeSelect')+' '+$t('contract.sybmolP')">
                <el-option :label="$t('common.yes')" value="1"></el-option>
                <el-option :label="$t('common.no')" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('contract.link')" prop="parentId"  v-if="form.sybmolP==1">
              <el-select v-model="form.parentId" style="width: 100%"
                :placeholder="$t('common.placeholder')+''+$t('contract.likePlaceholder')" filterable
                ref="searchSelect" :filter-method="searchParent"  clearable size="small">
                  <el-option
                    v-for="contract in parentOptions"
                    :key="contract.contractId"
                    :label="contract.contractName+' '+contract.contractNo"
                    :value="contract.contractId"
                  />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item :label="$t('contract.sybmolT')" prop="sybmolT">
              <el-select  class="selectWidth" v-model="form.sybmolT" placeholder="">
                <el-option :label="$t('common.yes')" value="1"></el-option>
                <el-option :label="$t('common.no')" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item v-show="form.sybmolT=='1'" :label="$t('contract.templateId')" prop="templateId">
              <el-select v-model="form.templateId" style="width: 100%"
                :placeholder="$t('common.placeSelect')+' '+$t('contract.templateId')" filterable
                ref="searchSelect" :filter-method="searchTemplate" clearable size="small">
                  <el-option
                    v-for="template in templateOptions"
                    :key="template.templateId"
                    :label="template.templateName"
                    :value="template.templateId"
                  />
              </el-select>
            </el-form-item>
          </el-col>

        </el-row>


        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item :label="$t('flow.level')" prop="priorityDict">
              <el-select  class="selectWidth" v-model="form.priorityDict" :placeholder="$t('common.placeSelect')+' '+$t('flow.level')" @change="(val)=>{if(val==1){this.showReason=false}else{this.showReason=true}}">
                 <el-option
                      v-for="dict in priorityOptions"
                      :key="dict.dictValue"
                      :label="dict.dictLabel"
                      :value="dict.dictValue"
                    ></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item v-show="showReason" :label="$t('contract.urgentReason')" prop="urgentReason">
              <el-input type="textarea" v-model="form.urgentReason" :placeholder="$t('common.placeholder')+' '+$t('contract.urgentReason')"></el-input>
            </el-form-item>
          </el-col>

        </el-row>

        <el-row :gutter="24">
          <el-col :span="24">
            <el-form-item :label="$t('contract.contractFileIdArr')" prop="attachment">
              <el-upload
                ref="upload"
                multiple
                accept=".docx, .doc, .pdf"
                :action="UploadUrl()"
                :headers="upload.headers"
                :file-list="upload.fileList"
                :before-upload="handleFileUploadProgress"
                :on-preview="handleFilePreview"
                :on-success="handleFileSuccess"
                :on-remove="handleFileRemove"
                auto-upload>
                <el-button slot="trigger" size="small" @click="type=120" type="primary">{{$t('contract.fileContract')}}</el-button>
                <el-button slot="trigger" size="small" @click="type=121" type="primary">{{$t('contract.fileContracts')}}</el-button>
                <div slot="tip" class="el-upload__tip">{{$t('common.filePdfRemark')}}</div>
              </el-upload>
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
            <el-form-item :label="$t('contract.archivedAttachment')" prop="archivedAttachment">
              <el-upload
                ref="upload"
                accept=".docx,.doc, .pdf"
                multiple
                :action="upload.url"
                :headers="upload.headers"
                :file-list="upload.fileList"
                :before-upload="handleFileUploadProgress"
                :on-preview="handleFilePreview"
                :on-success="handleFileSuccess"
                :auto-upload="false">
                <el-button slot="trigger" size="small" type="primary">{{$t('common.selectFile')}}</el-button>
                <div slot="tip" class="el-upload__tip">{{$t('common.fileRemark')}}</div>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        </span>
        <el-form-item  :label="$t('contract.remark')" prop="remark">
          <el-input type="textarea" v-model="form.remark" :placeholder="$t('common.placeholder')+' '+$t('contract.remark')" />
        </el-form-item>
      </el-form>
    <div style="text-align: center">
      <el-button type="primary" @click="submitForm" v-prevent-repeat-click>{{$t('common.submit')}}</el-button>
      <el-button type="success" @click="submitForm" v-prevent-repeat-click>{{$t('common.temporaryStorage')}}</el-button>
      <el-button @click="cancel" >{{$t('common.cancle')}}</el-button>
    </div>

      <el-dialog :close-on-click-modal="false" :title="$t('contract.selectionConditions')" append-to-body :visible.sync="showCondition">
        <el-form ref="form2" label-position="top" style="width: 90%;margin: 0 auto">
          <el-form-item :label="$t('contract.problem1')">
            <el-radio v-model="radio1" label="1">{{$t('common.yes')}}</el-radio><el-radio v-model="radio1" label="2">{{$t('common.no')}}</el-radio>
          </el-form-item>
          <el-form-item :label="$t('contract.problem2')">
            <el-radio v-model="radio2" label="1">{{$t('common.yes')}}</el-radio><el-radio v-model="radio2" label="2">{{$t('common.no')}}</el-radio>
          </el-form-item>
        </el-form>
        <div style="text-align: center">
          <el-button type="primary" @click="()=>{showCondition=false}">{{$t('common.nextStep')}}</el-button>
        </div>
      </el-dialog>
    <FilePreview ref="filePreview"></FilePreview>
  </div>
</template>

<script>
import { loadsigndept,loadobjcombo,loaddeptcombo,searchapplyman,searchcontempname,
searchmastercontract,searchtmpcontract,addcontractinfo,chkcontractname } from "@/api/flow/contract";
import { getToken } from "@/utils/auth";
import FilePreview from "../../../components/FilePreview/index";
export default {
  name: "Contract",
  components: {FilePreview},
  data() {
    const vaildContractName = (rule, value, callback) => {
      if (!this.form.contractName) {
        callback(new Error("合同名称不能为空"));
      } else {
        this.vaildContractName(callback)
      }
    };
    return {
       type:110,
      radio1:'1',
      radio2:'1',
      showCondition:true,
      showReason:false,
      isMaster:false,
      // 上传参数
      // 上传参数
      upload: {
        // 是否禁用上传
        isUploading: false,
        // 设置上传的请求头部
        headers: { Authorization: "Bearer " + getToken() },
        // 上传的地址
        url: process.env.VUE_APP_BASE_API + "/info/file/upload?type=120",
        // 上传的文件列表
        fileList: []
      },
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      isTemplate:"2",
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
      signDeptOptions: [],
      cateDictOptions:[],
      amountOptions:[],
      taxOptions:[],
      priorityOptions:[],
      objectOptions:[],
      concernDeptOptions:[],
      userOptions:[],
      templateOptions:[],
      parentOptions:[],
      isComplex:false,
      // 表单参数
      form: {
        sybmolT:'2',
        sybmolP:'2',
        contractFileIdArr:[],
        contractConCernFileIdArr:[]
      },
      // 表单校验
      rules: {
        isTemplate:[
          { required: true, message: "请选择是否使用模板", trigger: "blur" }
        ],
        contractName: [
          { required: true, trigger: "blur",validator: vaildContractName }
        ],
        cateDict: [
          { required: true, message: "合同分类不能为空", trigger: "blur" }
        ],
        type: [
          { required: true, message: "合同类型不能为空", trigger: "blur" }
        ],
        langsDict: [
          { required: true, message: "合同语言不能为空", trigger: "blur" }
        ],
        deptId: [
          { required: true, message: "所属公司不能为空", trigger: "blur" }
        ],
        signDeptId: [
          { required: true, message: "签约方不能为空", trigger: "blur" }
        ],
        startTime: [
          { required: true, message: "开始时间不能为空", trigger: "blur" }
        ],
        amount: [
          { required: true, message: "金额不能为空", trigger: "blur" }
        ],
        amountDict: [
          { required: true, message: "请选择类型", trigger: "blur" }
        ],
        taxRate: [
          { required: true, message: "税率不能为空", trigger: "blur" }
        ],
        taxDict: [
          { required: true, message: "税种不能为空", trigger: "blur" }
        ],
        currencyDict: [
          { required: true, message: "币种不能为空", trigger: "blur" }
        ],
        isMangerApprove: [
          { required: true, message: "本部门经理审批不能为空", trigger: "blur" }
        ],
        concernDeptArr:[
          { required: true, message: "请选择相关部门", trigger: "blur" }
        ],
        sybmolP:[
          { required: true, message: "请选择有主协议", trigger: "blur" }
        ],
        sybmolT:[
          { required: true, message: "请选择是否模板", trigger: "blur" }
        ],
        templateId:[
          { required: true, message: "请选择模板名称", trigger: "blur" }
        ],
        priorityDict:[
          { required: true, message: "请选择紧急程度", trigger: "blur" }
        ],
        parentId:[
          { required: true, message: "关联主协议", trigger: "blur" }
        ]
      }
    };
  }
  ,methods: {
     /** 验证 */
    vaildContractName(callback) {
      if(this.form.contractName){
          chkcontractname({contractName:this.form.contractName,contractId:this.form.contractId}).then(response => {
            if(response.code=='200'){
              callback()
            }else{
              callback(new Error("合同名称已存在"))
            }
          });
      }else{
        callback()
      }
    },
    searchUser(val){
      this.userOptions = []
      searchapplyman({uName :val}).then(response => {
          if (response.code === 200) {
            this.userOptions = response.data
          }
      });
    },
    selectUser(){
      this.form.applyForDeptName = ''
      this.form.applyForDeptId = ''
      if(this.userOptions){
        this.userOptions.forEach(item=>{
            if(item.userId == this.form.applyForUserId){
              this.form.applyForDeptName = item.upDeptName+' '+item.upDeptNameEn
              this.form.applyForDeptId = item.upDeptId
            }
        })
      }
    },
    searchTemplate(val){
      this.templateOptions = []
      searchcontempname({conTempName :val}).then(response => {
          if (response.code === 200) {
            this.templateOptions = response.data
          }
      });
    },
    searchParent(val){
      this.parentOptions = []
      searchmastercontract({contractName :val}).then(response => {
          if (response.code === 200) {
            this.parentOptions = response.data
          }
      });
    },

    handleArchived(row){
      this.archivedOpen=true;
    },
    UploadUrl:function(){
      // //总公司
      // this.type = 110
      // this.type = 111
      // //分公司
      // this.type = 120
      // this.type = 121
      // //历史合同
      // this.type = 130
      // this.type = 131
      return process.env.VUE_APP_BASE_API + "/info/file/upload?type="+this.type;
    },
    // 文件上传中处理
    handleFileUploadProgress(event, file, fileList) {
      this.upload.isUploading = true;
    },
    // 文件上传成功处理
    handleFileSuccess(response, file, fileList) {
      this.upload.isUploading = false;
      if(response.code=='200'){
        if(this.type =='120'){
          this.form.contractFileIdArr.push( response.msg)
        }else if(this.type =='121'){
          this.form.contractConCernFileIdArr.push( response.msg)
        }
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
    handleFileRemove(file, fileList) {
      if(this.type =='110'){
        this.form.contractFileIdArr.splice(this.form.contractFileIdArr.indexOf(response.msg), 1);
      }else if(this.type =='111'){
        this.form.contractConCernFileIdArr.splice(this.form.contractFileIdArr.indexOf(response.msg), 1);
      }
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        contractName: null,
        themes: null,
        cateDict: null,
        langsDict: null,
        signDeptId: null,
        objectArr: null,
        applyForUserId: null,
        applyForDeptId: null,
        applyForDeptName: null,
        currencyDict: null,
        amountDict: null,
        amount: null,
        taxRate: null,
        taxDict: null,
        isMangerApprove: null,
        concernDeptArr: null,
        sybmolP: '2',
        parentId: null,
        sybmolT: '2',
        templateId: null,
        priorityDict: null,
        urgentReason: null,
        remark: null,
        contractFileIdArr:[],
        contractConCernFileIdArr:[]
      };
      this.upload.fileList = []
      this.resetForm("form");
    },// 取消按钮
    cancel() {
      this.$store.state.tagsView.visitedViews.splice(this.$store.state.tagsView.visitedViews.findIndex(item => item.path === this.$route.path), 1)
      this.$router.push("/contract/contract")
      this.reset();
    },
    /** 提交按钮 */
    submitForm() {
      //总公司
      // this.form.isHistory = 0
      // this.form.isMaster = 1
      // this.form.contractDict = 1
      // //分公司
      this.form.isHistory = 0
      this.form.isMaster = 0
      this.form.contractDict = 1
      // //历史合同
      // this.form.isHistory = 1
      // this.form.isMaster = 1
      // this.form.contractDict = 4
      this.submit()
    },
    temporaryStorageForm(){
      //总公司
      // this.form.isHistory = 0
      // this.form.isMaster = 1
      // this.form.contractDict = 0
      // //分公司
      this.form.isHistory = 0
      this.form.isMaster = 0
      this.form.contractDict = 0
      // //历史合同
      // this.form.isHistory = 1
      // this.form.isMaster = 1
      // this.form.contractDict = 0
      this.submit()
    },
    submit(){
      this.$refs["form"].validate(valid => {
        if (valid) {
          addcontractinfo(this.form).then(response => {
            if (response.code === 200) {
              this.msgSuccess(this.$t('common.successAdd'));
              this.$store.state.tagsView.visitedViews.splice(this.$store.state.tagsView.visitedViews.findIndex(item => item.path === this.$route.path), 1)
              this.$router.push("/contract/contract")
            }
          });
        }
      });
    },
    getItem(){
        let type=this.$route.query.type;
        this.reset()
        this.getData()
        searchtmpcontract({differ:1}).then(response => {
          if(response.code=='200'){
            var data = response.data
            if(data){
              this.form = data;
              this.form.deptName = data.deptName+' '+data.deptNameEn
              this.userOptions = [{
                deptId: this.form.deptId,
                upDeptName: this.form.deptName,
                upDeptNameEn: this.form.deptNameEn,
                nickName: this.form.userName,
                userId: this.form.userId,
                userName: this.form.userName,
                userNameEn: this.form.userNameEn,
              }]
            }
          }
        });
    },
    getData(){
      this.getDicts("currency").then(response => {
        this.currencyOptions = response.data;
      });
      this.getDicts("langs").then(response => {
        this.langOptions = response.data;
      });
      this.getDicts("contract_cate").then(response => {
        this.cateDictOptions = response.data;
      });
      this.getDicts("amount").then(response => {
        this.amountOptions = response.data;
      });
      this.getDicts("tax_kind").then(response => {
        this.taxOptions = response.data;
      });
      this.getDicts("priority").then(response => {
        this.priorityOptions = response.data;
      });
      loadsigndept().then(response => {
        this.signDeptOptions = response.data;
      });
      loadobjcombo().then(response => {
        this.objectOptions = response.data;
      });
      loaddeptcombo().then(response => {
        this.concernDeptOptions = response.data;
      });
    }
  },
  beforeRouteEnter(to,from,next){
      next((vm)=>{
        vm.showCondition=true;
        vm.getItem()
    })
  },
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
