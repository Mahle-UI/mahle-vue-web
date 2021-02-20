<template>
  <div class="app-container">
    <h3 style="text-align: center" v-if="queryType==1&&contractType!=3">{{ $t('contract.smts') }}</h3>
    <h3 style="text-align: center" v-if="queryType==2&&contractType!=3">
      {{ $t('contract.applicationForApprovalOfSubsidiaryContract') }}</h3>
    <h3 style="text-align: center" v-if="queryType==3&&contractType!=3">
      {{ $t('contract.historicalContractFiling') }}</h3>

    <el-form ref="form" :model="form" :rules="rules" label-width="0px"
             style="width: 90%;margin:0 auto">
      <el-form-item v-if="queryType==1&&contractType!=3" style="margin: 40px 0px 40px 20px;">
        <el-steps finish-status="success" align-center>
          <el-step :description="$t('sealinfo.applicant')"></el-step>
          <el-step :description="$t('contract.divisionManager')"></el-step>
          <el-step :description="$t('sealinfo.headOfApplicationDepartment')"></el-step>
          <el-step :description="$t('contract.financeMinister')"></el-step>
          <el-step :description="$t('contract.headOfRelevantDepartments')"></el-step>
          <el-step :description="$t('contract.seniorLegal')"></el-step>
          <el-step :description="$t('contract.viceGeneralManager')"></el-step>
          <el-step :description="$t('contract.generalManager')"></el-step>
          <el-step :description="$t('contract.filingOfApplicants')"></el-step>
        </el-steps>
      </el-form-item>

      <el-form-item v-if="queryType==2&&contractType!=3" style="margin: 40px 0 0 0;">
        <el-steps align-center finish-status="success" v-if="radio1==0 || radio2==0">
          <el-step :description="$t('sealinfo.applicant')"></el-step>
          <el-step :description="$t('contract.departmentManagerOfSubsidiary')+$t('contract.choose')"></el-step>
          <el-step :description="$t('contract.generalManagerOfSubsidiary')"></el-step>
          <el-step :description="'SMTS' + $t('contract.financeMinister')"></el-step>
          <el-step :description="$t('contract.headOfRelevantDepartments')"></el-step>
          <el-step :description="'SMTS' + $t('contract.seniorLegal')"></el-step>
          <el-step :description="$t('contract.viceGeneralManager')"></el-step>
          <el-step :description="$t('contract.generalManager')"></el-step>
          <el-step :description="$t('contract.filingOfApplicants')"></el-step>
        </el-steps>
        <el-steps align-center finish-status="success" v-if="radio1==1 && radio2==1" style="margin: 20px 0 0 0;">
          <el-step :description="$t('sealinfo.applicant')"></el-step>
          <el-step :description="$t('contract.departmentManagerOfSubsidiary')"></el-step>
          <el-step :description="$t('contract.SMTSfinanceMinister')"></el-step>
          <el-step :description="$t('contract.headOfRelevantDepartments')"></el-step>
          <el-step :description="'SMTS' + $t('contract.seniorLegal')"></el-step>
          <el-step :description="$t('contract.generalManagerOfSubsidiary')"></el-step>
          <el-step :description="$t('contract.filingOfApplicants')"></el-step>
        </el-steps>
      </el-form-item>
    </el-form>
    <!-- 添加或修改合同查询对话框 -->
    <el-form ref="form" :model="form" :rules="rules" :label-width="$i18n.locale=='en'?'250px':'150px'"
             style="width: 90%;margin:0 auto">
      <div v-if="queryType==2"
           style="padding: 8px 16px;background-color:#fff6f7;border-radius:4px;border-left:5px solid #fe6c6f;margin:20px auto;width: 90%">
        <el-form ref="form1" label-position="left" v-show="!showCondition">
          <el-form-item :label="$t('contract.problem1')" style="margin-bottom: 10px">
            <el-radio disabled="" v-model="radio1" label="1">{{ $t('common.yes') }}</el-radio>
            <el-radio disabled="" v-model="radio1" label="0">{{ $t('common.no') }}</el-radio>
          </el-form-item>
          <el-form-item :label="$t('contract.problem2')" style="margin-bottom: 0">
            <el-radio disabled="" v-model="radio2" label="1">{{ $t('common.yes') }}</el-radio>
            <el-radio disabled="" v-model="radio2" label="0">{{ $t('common.no') }}</el-radio>
          </el-form-item>
        </el-form>
      </div>
      <el-row v-if="queryType==3" :gutter="24">
        <el-col :span="12">
          <el-form-item :label="$t('contract.no')" prop="contractNo">
            <el-input v-model="form.contractNo" :placeholder="$t('common.placeholder')+' '+$t('contract.no')"/>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item :label="$t('contract.contractName')" prop="contractName">
            <el-input v-model="form.contractName"
                      :placeholder="$t('common.placeholder')+' '+$t('contract.contractName')"/>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="12">
            <el-form-item :label="$t('contract.themes')" prop="themes">
              <el-input v-model="form.themes" :placeholder="$t('common.placeholder')+' '+$t('contract.themes')"/>
            </el-form-item>
          </el-col> -->
      </el-row>
      <el-row v-if="queryType!=3" :gutter="24">
        <el-col :span="12">
          <el-form-item :label="$t('contract.contractName')" prop="contractName">
            <el-input v-model="form.contractName"
                      :placeholder="$t('common.placeholder')+' '+$t('contract.contractName')"/>
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
            <el-select class="selectWidth" v-model="form.cateDict"
                       :placeholder="$t('common.placeSelect')+' '+$t('contract.cateId')">
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
            <el-select class="selectWidth" v-model="form.langsDict"
                       :placeholder="$t('common.placeSelect')+' '+$t('contract.lang')">
              <el-option
                v-for="dict in langOptions"
                :key="dict.dictValue"
                :label="dict.dictLabel"
                :value="dict.dictValue"
              ></el-option>
            </el-select>
          </el-form-item>

        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple"></div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple"></div>
        </el-col>
      </el-row>


      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item :label="$t('contract.deptId')" prop="signDeptId">
            <el-select :filterable="true" class="selectWidth" v-model="form.signDeptId"
                       :placeholder="$t('common.placeSelect')+' '+$t('contract.deptId')">
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
            <el-select ref="objectSelect" v-model="form.objectArr" class="select-width"
                       multiple
                       filterable
                       remote
                       reserve-keyword
                       @visible-change="remoteMethod2"
                       :remote-method="remoteMethod"
                       :placeholder="$t('common.placeSelect')+' '+$t('contract.customerName')">
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
            <!-- <el-select v-model="form.applyForUserId" style="width: 100%"
              :placeholder="$t('common.placeSelect')+' '+$t('contract.applyForUserId')" filterable
              ref="searchSelect" :filter-method="searchUser" @change="selectUser" clearable size="small">

                <el-option
                  v-for="user in userOptions"
                  :key="user.userId"
                  :label="user.nickName+' '+user.userNameEn"
                  :value="user.userId"
                />
            </el-select> -->
            <el-input v-model="form.applyForUserName" disabled=""/>
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
            <el-select class="selectWidth" v-model="form.currencyDict"
                       :placeholder="$t('common.placeSelect')+' '+$t('contract.currency')">
              <el-option
                v-for="dict in currencyOptions"
                :key="dict.dictValue"
                :label="dict.dictLabel"
                :value="dict.dictValue"
              ></el-option>
            </el-select>
          </el-form-item>

        </el-col>
        <el-col :span="12">
          <el-row>
            <el-col :span="14">
              <el-form-item :label="$t('contract.amount')" prop="amountDict">
                <el-select v-model="form.amountDict" style="width:100%"
                           @change="amountChange">
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
              <el-form-item label-width="0px" style="margin-left: 5px;" prop="amount">
                <el-input v-model="form.amount" :placeholder="$t('common.placeholder')+' '+$t('contract.amount')"/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row :gutter="24" v-if="queryType==3">
        <el-col :span="12">
          <el-form-item :label="$t('contract.startTime')" prop="archiveBeginTime">
            <el-input v-model="form.archiveBeginTime"
                      :placeholder="$t('common.placeholder')+$t('contract.startTime')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('contract.endTime')" prop="archiveEndTime">
            <el-input v-if="!message" v-model="form.archiveEndTime"
                      :placeholder="$t('common.placeholder')+$t('contract.endTime')"></el-input>
            <el-date-picker v-if="message" clearable class="selectWidth"
                            v-model="form.archiveEndTime"
                            type="date"
                            value-format="yyyy-MM-dd"
                            :placeholder="$t('common.choose')+$t('contract.endTime')">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item :label="$t('contract.tax')" prop="taxRate">
            <el-input v-model="form.taxRate" :placeholder="$t('common.placeSelect')+' '+$t('contract.tax')">
              <template slot="append">%</template>
            </el-input>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item :label="$t('contract.taxDict')" prop="taxDict">
            <el-select v-model="form.taxDict" :placeholder="$t('common.placeholder')+' '+$t('contract.taxDict')"
                       class="select-width">
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


      <el-row :gutter="24" v-if="queryType!=3">
        <el-col :span="12">
          <el-form-item :label="$t('contract.isMangerApprove')" prop="isMangerApprove">
            <el-select v-model="form.isMangerApprove" :disabled="isexistmanager=='null'||!isexistmanager?true:false"
                       :placeholder="$t('common.placeSelect')+' '+$t('contract.isMangerApprove')" class="select-width">
              <el-option :label="$t('common.yes')" value="1"></el-option>
              <el-option :label="$t('common.no')" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item :label="$t('contract.concernDeptArr')" prop="concernDeptArr">
            <el-select v-model="form.concernDeptArr" multiple="" @change="concernDept"
                       :placeholder="$t('common.placeSelect')+' '+$t('contract.concernDeptArr')" class="select-width">
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

      <el-row :gutter="24" v-if="queryType!=3">
        <el-col :span="12">
          <el-form-item :label="$t('contract.sybmolP')" prop="sybmolP">
            <el-select class="selectWidth" v-model="form.sybmolP"
                       :placeholder="$t('common.placeSelect')+' '+$t('contract.sybmolP')">
              <el-option :label="$t('common.yes')" :value="1"></el-option>
              <el-option :label="$t('common.no')" :value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('contract.link')" prop="parentId" v-if="form.sybmolP==1">
            <el-select v-model="form.parentId" style="width: 100%"
                       :placeholder="$t('common.placeholder')+' '+$t('contract.likePlaceholder')" filterable
                       ref="searchSelect" :filter-method="searchParent" clearable size="small">
              <el-option
                v-for="contract in parentOptions"
                :key="contract.contractId"
                :label="contract.contractNo+' '+contract.contractName"
                :value="contract.contractId"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="24" v-if="queryType!=3">
        <el-col :span="12">
          <el-form-item :label="$t('contract.sybmolT')" prop="sybmolT">
            <el-select class="selectWidth" v-model="form.sybmolT" @change="()=>{if(form.sybmolT === 0){form.templateId = '';selectTemplate('')}}" placeholder="">
              <el-option :label="$t('common.yes')" :value="1"></el-option>
              <el-option :label="$t('common.no')" :value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item v-if="form.sybmolT=='1'" :label="$t('contract.templateId')" prop="templateId">
            <el-col :span="20" style="padding-left: 0">
              <el-select v-model="form.templateId" style="width: 100%"
                         :placeholder="$t('common.placeSelect')+' '+$t('contract.templateId')" filterable
                         ref="searchSelect" :filter-method="searchTemplate" @change="selectTemplate" clearable
                         size="small">
                <el-option
                  v-for="template in templateOptions"
                  :key="template.templateId"
                  :label="template.templateName"
                  :value="template.templateId"
                />
              </el-select>
            </el-col>
            <el-col :span="4">
              <el-button type="primary" size="mini" @click="wordTemplate" :disabled="form.templateId?false:true"
                         icon="el-icon-edit"></el-button>

            </el-col>
          </el-form-item>
        </el-col>

      </el-row>


      <el-row :gutter="24" v-if="queryType!=3">
        <el-col :span="12">
          <el-form-item :label="$t('flow.level')" prop="priorityDict">
            <el-select class="selectWidth" v-model="form.priorityDict"
                       :placeholder="$t('common.placeSelect')+' '+$t('flow.level')">
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
          <el-form-item v-if="form.priorityDict==1" :label="$t('contract.urgentReason')" prop="urgentReason">
            <el-input type="textarea" v-model="form.urgentReason"
                      :placeholder="$t('common.placeholder')+' '+$t('contract.urgentReason')"></el-input>
          </el-form-item>
        </el-col>

      </el-row>

      <el-row :gutter="24">
        <el-col :span="24">
          <el-form-item :label="$t('contract.contractFileIdArr')" prop="contractFileIdArr">
            <el-upload
              ref="upload"
              multiple
              :limit="20"
              accept=".docx,.doc,.pdf,.png,.jpg,.jpeg,.gif,.bmp"
              :action="UploadUrl()"
              :headers="upload.headers"
              :file-list="upload.fileList"
              :before-upload="handleFileUploadProgress"
              :on-preview="handleFilePreview"
              :on-success="handleFileSuccess"
              :before-remove="beforeRemove"
              :on-remove="handleFileRemove"
              auto-upload>
              <el-button slot="trigger" size="small" @click="queryType==1?type=110:queryType==2?type=120:type=160"
                         type="primary">{{ $t('contract.fileContract') }}
              </el-button>
              <el-button slot="trigger" size="small" @click="queryType==1?type=111:queryType==2?type=121:type=131"
                         type="primary">{{ $t('contract.fileContracts') }}
              </el-button>
              <div slot="tip" class="el-upload__tip">{{ $t('common.filePdfPngRemark') }}</div>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24" v-if="queryType==3">
        <el-col :span="24">
          <el-form-item :label="$t('contract.originalcopyAddress')" prop="originPlace">
            <el-input type="textarea" v-model="form.originPlace"
                      :placeholder="$t('common.placeholder')+' '+$t('contract.originalcopyAddress')"/>
          </el-form-item>
        </el-col>
      </el-row>
      <!--归档-->
      <span v-if="this.form.status==5">
          <el-row :gutter="24">
            <el-col :span="12">
                 <el-form-item :label="$t('contract.archivedBy')" prop="archivedBy">
                    <el-input v-model="form.archivedBy"
                              :placeholder="$t('common.placeholder')+' '+$t('contract.archivedBy')"/>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item :label="$t('contract.archivedTime')" prop="archivedTime">
                    <el-input v-model="form.archivedTime"
                              :placeholder="$t('common.placeholder')+' '+$t('contract.archivedTime')"/>
                </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item :label="$t('contract.archivedAttachment')" prop="archivedAttachment">
              <el-upload
                ref="upload"
                accept=".docx, .doc,.pdf"
                multiple
                :action="upload.url"
                :headers="upload.headers"
                :file-list="upload.fileList"
                :before-upload="handleFileUploadProgress"
                :on-preview="handleFilePreview"
                :on-success="handleFileSuccess"
                :auto-upload="false">
                <el-button slot="trigger" size="small" type="primary">{{ $t('common.selectFile') }}</el-button>
                <div slot="tip" class="el-upload__tip">{{ $t('common.fileRemark') }}</div>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        </span>
      <el-form-item :label="$t('contract.remark')" prop="remark">
        <el-input type="textarea" v-model="form.remark"
                  :placeholder="$t('common.placeholder')+' '+$t('contract.remark')"/>
      </el-form-item>
      <el-row :gutter="24" v-if="queryType==3">
        <el-col :span="12">
          <el-form-item :label="$t('contract.contractExpirationReminder')" prop="warn">
            <el-switch
              v-model="message"
              @change="switchChange"
              active-color="#13ce66"
              inactive-color="#b6b6b6">
            </el-switch>
          </el-form-item>
        </el-col>
<!--        <el-col :span="12">
          <el-form-item :label="$t('contract.noticeWay')" prop="files" v-if="message">
            <el-checkbox v-model="notificationRadio1">{{ $t('contract.email1') }}</el-checkbox>
            <el-checkbox v-model="notificationRadio2">{{ $t('contract.systemNotification') }}</el-checkbox>
          </el-form-item>
        </el-col>-->
      </el-row>
    </el-form>
    <div style="text-align: center" v-if="queryType!=3">
      <el-button type="primary" @click="submitForm" v-prevent-repeat-click>
        {{ form.contractDict == 5 ? $t('common.updatecomplete') : $t('common.submit') }}
      </el-button>
      <el-button type="success" @click="temporaryStorageForm" v-if="contractType!=3" v-prevent-repeat-click>
        {{ $t('common.temporaryStorage') }}
      </el-button>
      <el-button @click="cancel" v-if="contractType!=3" v-prevent-repeat-click>{{ $t('common.cancle') }}</el-button>
      <el-button @click="cancelUpdate" v-if="form.contractDict == 5" v-prevent-repeat-click>{{
          $t('common.cancle')
        }}
      </el-button>
    </div>
    <div style="text-align: center" v-if="queryType==3">
      <el-button type="primary" @click="submitAndContinueForm" v-prevent-repeat-click>
        {{ $t('common.completeAndContinue') }}
      </el-button>
      <el-button type="primary" @click="submitForm" v-prevent-repeat-click>{{ $t('common.complete') }}</el-button>
      <el-button type="success" @click="temporaryStorageForm" v-prevent-repeat-click>
        {{ $t('common.temporaryStorage') }}
      </el-button>
      <el-button type="danger" @click="reset" v-prevent-repeat-click>{{ $t('common.clear') }}</el-button>
    </div>
    <el-dialog :close-on-click-modal="false" :title="$t('contract.selectionConditions')" append-to-body
               :visible.sync="showCondition">
      <el-form ref="form2" label-position="top" style="width: 90%;margin: 0 auto">
        <el-form-item :label="$t('contract.problem1')">
          <el-radio v-model="radio1" label="1">{{ $t('common.yes') }}</el-radio>
          <el-radio v-model="radio1" label="0">{{ $t('common.no') }}</el-radio>
        </el-form-item>
        <el-form-item :label="$t('contract.problem2')">
          <el-radio v-model="radio2" label="1">{{ $t('common.yes') }}</el-radio>
          <el-radio v-model="radio2" label="0">{{ $t('common.no') }}</el-radio>
        </el-form-item>
      </el-form>
      <div style="text-align: center">
        <el-button type="primary" @click="()=>{showCondition=false}">{{ $t('common.nextStep') }}</el-button>
      </div>
    </el-dialog>
    <FilePreview ref="filePreview"></FilePreview>
  </div>
</template>

<script>
import {
  loadsigndept,
  loadobjcombo,
  loaddeptcombo,
  searchapplyman,
  searchcontempname,
  addsimpleobj,
  getView,
  updcontractinfo,
  getPageOfficeCopyTemp,
  searchmastercontract,
  searchtmpcontract,
  addcontractinfo,
  updcontractfile,
  inithistorycontractno,
  loadsupplyman,
  continfoIsexistmanager
} from "@/api/flow/contract";
import {getToken} from "@/utils/auth";
import FilePreview from "../../../components/FilePreview/index";
import {reject} from "lodash-es";

export default {
  name: "Contract",
  components: {FilePreview},
  props: {
    contractForm: Object,
    contractType: Number
  },
  data() {
    const vaildContractFile = (rule, value, callback) => {
      console.log("sssss")
      let fileSize = this.form.contractFileIdArr.length;
      let isTemplate = !this.form.copyTempFileId
      if (fileSize == 0 && isTemplate) {
        callback(new Error("请选择合同文件"));
        return
      }
      callback()
    };
    return {
      message: false,
      queryType: 1,
      type: 110,
      radio1: '1',
      radio2: '1',
      notificationRadio1: '',
      notificationRadio2: '',
      showCondition: false,
      showReason: false,
      isMaster: false,
      // 上传参数
      upload: {
        // 是否禁用上传
        isUploading: false,
        // 设置上传的请求头部
        headers: {Authorization: "Bearer " + getToken()},
        // 上传的地址
        url: process.env.VUE_APP_BASE_API + "/info/file/upload?type=110",
        // 上传的文件列表
        fileList: []
      },
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      isTemplate: '2',
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
      archivedOpen: false,
      // 合同语言字典
      langOptions: [],
      typeOptions: [],
      statusOptions: [],
      currencyOptions: [],
      // 所属公司字典
      deptIdOptions: [],
      // 签约方字典
      signDeptOptions: [],
      cateDictOptions: [],
      amountOptions: [],
      taxOptions: [],
      priorityOptions: [],
      objectOptions: [],
      objectArray: [],
      concernDeptOptions: [],
      userOptions: [],
      templateOptions: [],
      parentOptions: [],
      isComplex: false,
      // 表单参数
      form: {
        sybmolT: 0,
        sybmolP: 0,
        contractFileIdArr: [],
        contractConCernFileIdArr: [],
        contractNo: '',
        copyTempFileId:''
      },
      // 表单校验
      rules: {
        contractNo: [
          {required: true, message: "合同编号不能为空", trigger: "blur"}
        ],
        isTemplate: [
          {required: true, message: "请选择是否使用模板", trigger: ["blur", "change"]}
        ],
        contractName: [
          {required: true, message: "合同名称不能为空", trigger: "blur"}
        ],
        cateDict: [
          {required: true, message: "合同分类不能为空", trigger: ["blur", "change"]}
        ],
        type: [
          {required: true, message: "合同类型不能为空", trigger: "blur"}
        ],
        langsDict: [
          {required: true, message: "合同语言不能为空", trigger: ["blur", "change"]}
        ],
        deptId: [
          {required: true, message: "所属公司不能为空", trigger: "blur"}
        ],
        signDeptId: [
          {required: true, message: "签约主体不能为空", trigger: ["blur", "change"]}
        ],
        archiveBeginTime: [
          {required: true, message: "开始时间不能为空", trigger: "blur"}
        ],
        archiveEndTime: [
          {required: true, message: "结束时间不能为空", trigger: "blur"}
        ],
        amount: [
          {required: true, message: "金额不能为空", trigger: ["blur", "change"]}
        ],
        amountDict: [
          {required: true, message: "请选择金额类型", trigger: ["blur", "change"]}
        ],
        taxRate: [
          {required: true, message: "税点不能为空", trigger: ["blur", "change"]}
        ],
        taxDict: [
          {required: true, message: "税种不能为空", trigger: ["blur", "change"]}
        ],
        currencyDict: [
          {required: true, message: "币种不能为空", trigger: ["blur", "change"]}
        ],
        isMangerApprove: [
          {required: true, message: "本部门经理审批不能为空", trigger: "blur"}
        ],
        concernDeptArr: [
          {required: true, message: "请选择相关部门", trigger: ["blur", "change"]}
        ],
        sybmolP: [
          {required: true, message: "请选择有主协议", trigger: ["blur", "change"]}
        ],
        sybmolT: [
          {required: true, message: "请选择是否模板", trigger: ["blur", "change"]}
        ],
        templateId: [
          {required: true, message: "请选择模板名称", trigger: ["blur", "change"]}
        ],
        priorityDict: [
          {required: true, message: "请选择紧急程度", trigger: ["blur", "change"]}
        ],
        urgentReason: [
          {required: true, message: "请输入紧急理由", trigger: "blur"}
        ],
        parentId: [
          {required: true, message: "关联主协议", trigger: ["blur", "change"]}
        ],
        originPlace: [
          {required: true, message: "原件存放地址不能为空", trigger: "blur"}
        ],
        objectArr: [
          {required: true, message: "请选择相对方", trigger: ["blur", "change"]}
        ],
        contractFileIdArr: [
          {required: true, message: "请选择合同文件", trigger: ["blur", "change"], validator: vaildContractFile}
        ],
      },
      continue: 0,
      isexistmanager: '',
      query: '',
      supplymandata: {}
    };
  },
  methods: {
    amountChange() {
      if (this.form.amountDict == '0' || this.form.amountDict == '3') {
        this.form.amount = 'N/A';
        this.form.taxRate = 'N/A';
        return;
      }
      this.form.amount = '';
      this.form.taxRate = '';
    },
    //合同到期提醒切换
    switchChange() {
      this.form.archiveEndTime = ""
    },
    searchUser(val) {
      this.userOptions = []
      searchapplyman({uName: val}).then(response => {
        if (response.code === 200) {
          this.userOptions = response.data
        }
      });
    },
    selectUser() {
      this.form.applyForDeptName = ''
      this.form.applyForDeptId = ''
      if (this.userOptions) {
        this.userOptions.forEach(item => {
          if (item.userId == this.form.applyForUserId) {
            this.form.applyForDeptName = item.unDeptName + ' ' + item.unDeptNameEn
            this.form.applyForDeptId = item.unDeptId
          }
        })
      }
    },
    searchTemplate(val) {
      let that = this;
      this.templateOptions = []
      searchcontempname({conTempName: val}).then(response => {
        if (response.code === 200) {
          that.templateOptions = response.data
        }
      });
    },
    searchParent(val) {
      this.parentOptions = []
      searchmastercontract({contractName: val}).then(response => {
        if (response.code === 200) {
          this.parentOptions = response.data
        }
      });
    },
    continfoIsexistmanager() {
      continfoIsexistmanager().then(response => {
        if (response.code === 200) {
          this.isexistmanager = response.data
          this.form.isMangerApprove = '2'
        }
      });
    },
    handleArchived(row) {
      this.archivedOpen = true;
    },
    UploadUrl: function () {
      // //总公司
      // this.type = 110
      // this.type = 111
      // //分公司
      // this.type = 120
      // this.type = 121
      // //历史合同
      // this.type = 130
      // this.type = 131
      return process.env.VUE_APP_BASE_API + "/info/file/upload?type=" + this.type;
    },
    // 文件上传中处理
    handleFileUploadProgress(event, file, fileList) {
      this.upload.isUploading = true;
    },
    // 文件上传成功处理
    handleFileSuccess(response, file, fileList) {
      this.upload.isUploading = false;
      if (response.code == '200') {
        if (this.type == '110' || this.type == '120' || this.type == '160') {
          this.form.contractFileIdArr.push(response.msg)
        } else if (this.type == '111' || this.type == '121' || this.type == '131') {
          this.form.contractConCernFileIdArr.push(response.msg)
        }
      } else {
        this.msgSuccess(response.msg);
      }
    },
    //点击文件列表中已上传的文件时的钩子函数
    handleFilePreview(file) {
      this.$nextTick(() => {
        this.$refs.filePreview.preview(file)
      })
    },
    beforeRemove(file, fileList) {
      console.log(file)
      console.log(fileList)
      console.log(this.form.sybmolT)
      let fileId;
      if (file.response !== undefined) {
        fileId = file.response.msg;
      } else {
        fileId = file.fileId;
      }
      if (this.form.sybmolT === 1 && this.form.copyTempFileId === fileId) {
        this.form.sybmolT = 0;
        this.form.templateId = '';
      }
    },
    //文件列表移除文件时的钩子
    handleFileRemove(file, fileList) {
      console.log("删除被调用了")
      let fileId;
      if (file.fileId) {
        fileId = file.fileId;
      }
      if (file.response && file.response.msg) {
        fileId = file.response.msg;
      }
      let index1 = this.form.contractFileIdArr.findIndex((value, index, arr) => {
        return value === fileId
      })
      let index2 = this.form.contractConCernFileIdArr.findIndex((value, index, arr) => {
        return value === fileId
      })
      if (index1 !== -1) {
        this.form.contractFileIdArr.splice(index1, 1);
      }
      if (index2 !== -1) {
        this.form.contractConCernFileIdArr.splice(index2, 1);
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
        sybmolP: 0,
        parentId: null,
        sybmolT: 0,
        templateId: null,
        priorityDict: null,
        urgentReason: null,
        remark: null,
        contractFileIdArr: [],
        contractConCernFileIdArr: [],
        contractNo: ''
      };
      this.upload.fileList = []
      this.resetForm("form");
      this.form.applyForUserId = this.supplymandata.userId
      this.form.applyForUserName = this.supplymandata.nickName
      this.form.applyForDeptName = this.supplymandata.deptName + ' ' + this.supplymandata.deptNameEn
      this.form.applyForDeptId = this.supplymandata.deptId
      this.continue = 0
    },// 取消按钮
    cancel() {
      this.$store.state.tagsView.visitedViews.splice(this.$store.state.tagsView.visitedViews.findIndex(item => item.path === this.$route.path), 1)
      this.$router.push("/contract/contract")
      this.reset();
    },
    cancelUpdate() {
      this.$emit('update', false);
    },
    submitAndContinueForm() {
      this.continue = 1
      this.submitForm()
    },
    /** 提交按钮 */
    submitForm() {
      if (this.queryType == 1) {
        //总公司
        this.form.isHistory = 0
        this.form.isMaster = 1
        this.form.contractDict = 1
      } else if (this.queryType == 2) {
        //分公司
        this.form.isHistory = 0
        this.form.isMaster = 0
        this.form.isProduce = this.radio1
        this.form.isPriceless = this.radio2
        this.form.contractDict = 1
      } else if (this.queryType == 3) {
        //历史合同
        this.form.isHistory = 1
        this.form.isMaster = 1
        this.form.contractDict = 4
      }
      if (this.contractType == 3) {
        this.form.contractDict = 5
      }
      this.submit()
    },
    temporaryStorageForm() {
      if (this.queryType == 1) {
        //总公司
        this.form.isHistory = 0
        this.form.isMaster = 1
        this.form.contractDict = 0
      } else if (this.queryType == 2) {
        //分公司
        this.form.isHistory = 0
        this.form.isMaster = 0
        this.form.contractDict = 0
      } else if (this.queryType == 3) {
        //历史合同
        this.form.isHistory = 1
        this.form.isMaster = 1
        this.form.contractDict = 0
      }
      this.submit()
    },
    submit() {

      this.form.templateId = this.form.sybmolT == 0 ? '' : this.form.templateId
      this.form.templateName = this.form.sybmolT == 0 ? '' : this.form.templateName
      this.form.urgentReason = this.form.priorityDict == 1 ? this.form.urgentReason : ''

      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.contractDict && this.form.contractDict == 5) {
            updcontractinfo(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess(this.$t('common.successEdit'));
                this.$emit('update', true)
              } else {
                this.msgError(response.msg);
              }
            })
          } else {
            addcontractinfo(this.form).then(response => {
              if (response.code === 200) {
                if(this.form.contractDict && this.form.contractDict === 0){
                  this.msgSuccess(this.$t('common.temporaryStorage') + this.$t('common.success'));
                }else {
                  this.msgSuccess(this.$t('common.successAdd'));
                }
                if (this.continue == 1) {
                  this.reset()
                } else {
                  this.$store.state.tagsView.visitedViews.splice(this.$store.state.tagsView.visitedViews.findIndex(item => item.path === this.$route.path), 1)
                  this.$router.push("/contract/contract")
                }
              }
            });
          }
        }
      });
    },
    getItem() {
      this.queryType = this.$route.query.type;
      console.log(this.queryType)
      if (this.queryType == 2) {
        this.showCondition = true;
      }
      this.reset()
      this.getData()
      if (this.$route.path == '/contract/contractHistory') {
        this.queryType = 3
        this.form.contractNo = this.$i18n.locale == 'en' ? "None" : "无";
      }
      if (this.contractType != 3) {
        searchtmpcontract({differ: this.queryType - 1}).then(response => {
          if (response.code == '200') {
            var data = response.data
            if (data) {
              data.objectArr = []
              data.concernDeptArr = []
              data.contractFileIdArr = []
              data.remark = data.reMark
              this.form = data;
              this.getDataItem()
            }
          }
        });
      } else {
        getView({contractId: this.contractForm.contractId}).then(response => {
          if (response.code == '200') {
            var data = response.data.detail;
            if (data) {
              data.objectArr = []
              data.concernDeptArr = []
              data.contractFileIdArr = []
              data.remark = data.reMark
              this.form = data;
              this.queryType = this.form.fileType == '111' ? 1 : this.form.fileType == '121' ? 2 : 3
              this.getDataItem()
            }
          }
        });
      }
    },
    getDataItem() {
      this.form.taxDict = Number(this.form.taxDict)
      this.upload.fileList = []
      this.upload.fileList = this.upload.fileList.concat(this.form.contractFileList)
      this.upload.fileList = this.upload.fileList.concat(this.form.contractParamList)
      this.upload.fileList = this.upload.fileList.concat(this.form.contractTempFileList)
      this.form.contractFileIdArr = []
      this.form.contractFileList.forEach(item => {
        this.form.contractFileIdArr.push(item.fileId)
      })
      if (this.form.sybmolT == '1') {
        this.form.copyTempFileId = this.form.contractTempFileList[0].fileId;
        this.form.contractFileIdArr.push(this.form.contractTempFileList[0].fileId)
      }
      this.form.contractConCernFileIdArr = []
      this.form.contractParamList.forEach(item => {
        this.form.contractConCernFileIdArr.push(item.fileId)
      })
      this.upload.fileList.forEach(item => {
        item.name = item.fileName
        item.url = item.filePath
      })
      /*this.parentOptions = [{
        contractName: this.form.parentContractName,
        contractId: this.form.parentId,
      }]*/
      //this.form.objectArr = []
      this.form.objComboList.forEach(item => {
        this.form.objectArr.push(item.objId)
      })
      this.form.applyForUserName = this.form.applyForUNameCn
      this.form.applyForDeptName = this.form.applyForDeptCn + " " + this.form.applyForDeptEn
      // this.form.concernDeptArr = []
      this.form.conCernDeptList.forEach(item => {
        this.form.concernDeptArr.push(Number(item.dictId))
      })
      this.objectOptions = []
      var that = this
      this.objectArray.forEach(item => {
        that.form.objectArr.forEach(item1 => {
          if (item.objId == item1) {
            that.objectOptions.push(item)
          }
        });
      });
      console.log(this.form.contractFileIdArr)
    },
    getData() {
      this.searchParent("");
      this.searchTemplate("")
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
      this.getDicts("urgent").then(response => {
        this.priorityOptions = response.data;
      });
      loadsigndept().then(response => {
        this.signDeptOptions = response.data;
      });
      loadobjcombo().then(response => {
        this.objectArray = response.data;
      });
      loaddeptcombo().then(response => {
        this.concernDeptOptions = response.data;
      });

      let that = this
      loadsupplyman().then(response => {
        let data = response.data;
        that.supplymandata = data;
        that.form.applyForUserId = data.userId
        that.form.applyForUserName = data.nickName
        that.form.applyForDeptName = data.deptName + ' ' + data.deptNameEn
        that.form.applyForDeptId = data.deptId
      });
      this.continfoIsexistmanager()
    },
    remoteMethod(query) {
      var that = this
      this.query = ""
      if (query !== '') {
        this.objectOptions = this.objectArray.filter(item => {
          return item.objNameCn ? item.objNameCn
            .indexOf(query) > -1 : false
            // ||item.objNameEn.toLowerCase()
            // .indexOf(query.toLowerCase()) > -1
            ;
        });

        let items = this.objectArray.filter(item =>  item.objNameCn === query);
        if (items.length === 0) {
          this.query = query
        }
      } else {
        this.objectOptions = [];
      }
    },
    remoteMethod2(callback) {
      if (!callback) {
        if (this.query.trim()) {
          var that = this
          this.$confirm(this.$t('contract.objectNoMistake') + "“" + this.query + "”" + this.$t('contract.objectNoMistake1'), this.$t('common.tips'), {
            confirmButtonText: this.$t('common.submit'),
            cancelButtonText: this.$t('common.cancle'),
            type: "warning"
          }).then(function () {
            return addsimpleobj({objName: that.query});
          }).then(response => {
            if (response.code == '200') {
              that.objectArray.push({
                objId: response.msg,
                objNameCn: that.query,
                objNameEn: "",
              })
              that.objectOptions.push({
                objId: response.msg,
                objNameCn: that.query,
                objNameEn: "",
              })

              // that.query = ""
              this.form.objectArr = this.form.objectArr || []
              this.form.objectArr.push(response.msg)
            }

          }).catch(function () {
          });
        }
      }
    },
    selectTemplate(id) {
      console.log("111111111111")
      let index = this.form.contractFileIdArr.findIndex(item => item === this.form.copyTempFileId);
      if (index !== -1) {
        this.form.contractFileIdArr.splice(index, 1);
      }
      index = this.upload.fileList.findIndex(item => item.fileId === this.form.copyTempFileId);
      if (index !== -1) {
        this.upload.fileList.splice(index, 1);
      }
      if (!!id) {
        getPageOfficeCopyTemp({id: id}).then(response => {
          const {fileName, fileId} = response.data;
          this.form.contractFileIdArr.push(fileId)
          this.form.copyTempFileId = fileId;
          let tempFile = response.data;
          tempFile.name = fileName;
          tempFile.url = process.env.VUE_APP_BASE_DOWNLOAD_URL + fileId;
          tempFile.response = {msg: fileId};
          this.upload.fileList = this.upload.fileList.concat([tempFile]);
        });
      }else {
        this.form.copyTempFileId = ''
      }
    },
    wordTemplate() {
      if (this.form.copyTempFileId) {
        POBrowser.openWindowModeless(process.env.VUE_APP_BASE_API + '/page/office/word/' + this.form.copyTempFileId, 'width=1200px;height=915px;')
      }

    },
    concernDept() {
      if (this.form.concernDeptArr.length > 1 && this.form.concernDeptArr.indexOf(135) > -1) {
        this.msgError("选择了无，就不能选择其他部门了");
        this.form.concernDeptArr = [135]
        return
      }

    }
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.getItem()
    })
  },
  watch: {
    // contractForm(val){
    //   this.form = val
    //   this.getData()
    //   this.getDataItem()
    //   this.queryType = this.form.fileType=='111'?1:this.form.fileType=='121'?2:3
    // }
  },
  created() {
    this.getItem()
  }
};
</script>


<style>

.header {
  text-align: center;
}

.text {
  font-size: 14px;
}

.selectWidth {
  width: 100% !important;
}

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

.el-step__title {
  font-size: 13px
}
</style>
