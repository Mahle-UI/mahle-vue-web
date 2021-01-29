<template>
  <div>
    <el-form ref="form" :model="form" :label-width="$i18n.locale=='en'?'280px':'150px'">

      <div v-if="form.isMaster==0"
           style="padding: 8px 16px;background-color:#fff6f7;border-radius:4px;border-left:5px solid #fe6c6f;margin:20px auto;width: 90%">

        <el-form ref="form1" label-position="left">
          <el-form-item :label="$t('contract.problem1')">
            <el-radio disabled="" v-model="form.isProduce" label="1">{{ $t('common.yes') }}</el-radio>
            <el-radio disabled="" v-model="form.isProduce" label="0">{{ $t('common.no') }}</el-radio>
          </el-form-item>
          <el-form-item :label="$t('contract.problem2')">
            <el-radio disabled="" v-model="form.isPriceless" label="1">{{ $t('common.yes') }}</el-radio>
            <el-radio disabled="" v-model="form.isPriceless" label="0">{{ $t('common.no') }}</el-radio>
          </el-form-item>
        </el-form>
      </div>
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item :label="$t('contract.no')" prop="contractNo">
            <el-input disabled="" v-model="form.contractNo"
                      :placeholder="$t('common.placeholder')+' '+$t('contract.no')"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('contract.contractPreNo')" prop="themes">
            <el-input disabled="" v-model="form.contractPreNo"
                      :placeholder="$t('common.placeholder')+' '+$t('contract.contractPreNo')"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item :label="$t('contract.contractName')" prop="contractName">
            <el-input disabled="" v-model="form.contractName"
                      :placeholder="$t('common.placeholder')+' '+$t('contract.contractName')"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('contract.themes')" prop="themes">
            <el-input disabled="" v-model="form.themes"
                      :placeholder="$t('common.placeholder')+' '+$t('contract.themes')"/>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item :label="$t('contract.cateId')" prop="cateDict">
            <el-select disabled="" class="selectWidth" v-model="form.cateDict"
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
            <el-select disabled="" class="selectWidth" v-model="form.langsDict"
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
            <el-select disabled="" :filterable="true" class="selectWidth" v-model="form.signDeptId"
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
            <el-select disabled="" v-model="form.objectArr" class="select-width" autocomplete multiple=""
                       :filterable="true" :placeholder="$t('common.placeSelect')+' '+$t('contract.customerName')">
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
            <el-input disabled="" v-model="form.applyForUserName"
                      :placeholder="$t('common.placeSelect')+' '+$t('contract.applyForUserId')"/>

          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('contract.applyForDeptId')" prop="applyForDeptId">
            <el-input disabled="" v-model="form.applyForDeptName"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item :label="$t('contract.currency')" prop="currencyDict">
            <el-select disabled="" class="selectWidth" v-model="form.currencyDict"
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
                <el-select disabled="" style="width:100%" v-model="form.amountDict">
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
                <el-input disabled="" v-model="form.amount"
                          :placeholder="$t('common.placeholder')+' '+$t('contract.amount')"/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
      </el-row>

      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item :label="$t('contract.tax')" prop="taxRate">
            <el-input disabled="" v-model="form.taxRate" :placeholder="$t('common.placeSelect')+' '+$t('contract.tax')">
              <template slot="append">%</template>
            </el-input>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item :label="$t('contract.taxDict')" prop="taxDict">
            <el-select disabled="" v-model="form.taxDict"
                       :placeholder="$t('common.placeholder')+' '+$t('contract.taxDict')" class="select-width">
              <el-option
                v-for="dict in taxOptions"
                :key="dict.dictCode+''"
                :label="dict.dictLabel"
                :value="dict.dictCode+''"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>

      </el-row>


      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item :label="$t('contract.isMangerApprove')" prop="isMangerApprove">
            <el-select disabled="" v-model="form.isMangerApprove"
                       :placeholder="$t('common.placeSelect')+' '+$t('contract.isMangerApprove')" class="select-width">
              <el-option :label="$t('common.yes')" value="1"></el-option>
              <el-option :label="$t('common.no')" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item :label="$t('contract.concernDeptArr')" prop="concernDeptArr">
            <el-select disabled="" v-model="form.concernDeptArr" multiple=""
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

      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item :label="$t('contract.sybmolP')" prop="sybmolP">
            <el-select disabled="" class="selectWidth" v-model="form.sybmolP"
                       :placeholder="$t('common.placeSelect')+' '+$t('contract.sybmolP')">
              <el-option :label="$t('common.yes')" :value="1"></el-option>
              <el-option :label="$t('common.no')" :value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('contract.link')" prop="parentId" v-if="form.sybmolP=='1'">
            <!-- <el-select disabled="" v-model="form.parentId" style="width: 100%"
              :placeholder="$t('common.placeSelect')+' '+$t('contract.link')" filterable
              ref="searchSelect"  clearable size="small">
                <el-option
                  v-for="contract in parentOptions"
                  :key="contract.contractId"
                  :label="contract.contractName"
                  :value="contract.contractId"
                />
            </el-select> -->
            <el-input disabled="" v-model="form.parentContractName"/>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item :label="$t('contract.sybmolT')" prop="sybmolT">
            <el-select disabled="" class="selectWidth" v-model="form.sybmolT" placeholder="">
              <el-option :label="$t('common.yes')" :value="1"></el-option>
              <el-option :label="$t('common.no')" :value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item v-show="form.sybmolT=='1'" :label="$t('contract.templateId')" prop="templateId">

            <el-input disabled="" v-model="form.templateName"
                      :placeholder="$t('common.placeSelect')+' '+$t('contract.templateId')"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item :label="$t('flow.level')" prop="priorityDict">
            <el-select disabled="" class="selectWidth" v-model="form.priorityDict"
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
          <el-form-item v-show="form.priorityDict==1" :label="$t('contract.urgentReason')" prop="urgentReason">
            <el-input disabled="" type="textarea" v-model="form.urgentReason"
                      :placeholder="$t('common.placeholder')+' '+$t('contract.urgentReason')"></el-input>
          </el-form-item>
        </el-col>

      </el-row>

      <el-row :gutter="24">
        <el-col :span="24">
          <el-form-item :label="$t('contract.contractFileIdArr')" prop="attachment">
            <!-- contractFileList  >> 合同文件
            contractParamList >> 相关文件
            contractApprovalList  >>  审批意见单
            contractPlaceList  >>  归档文件
            contractTerminationList  >>   终止文件  -->
            <div v-if="form.contractFileList&&form.contractFileList.length>0">
              <b>{{ $t('common.contractApplicationFile') }}:</b>
              <span v-for="(item,index) in form.contractFileList" :key="item.fileId" style="padding:0 10px">
                    {{ item.fileName }}
                    <span
                      v-if="item.fileName.indexOf('.png')>-1||item.fileName.indexOf('.jpg')>-1||item.fileName.indexOf('.jpeg')>-1">
                      <el-image :id="item.fileId"
                                style="width: 0px; height: 0px"
                                :src="item.filePath"
                                :preview-src-list="[item.filePath]">
                      </el-image>
                      <el-link @click="viewImg(item.fileId)" type="success">{{ $t('common.view') }}</el-link>
                    </span>
                    <el-link v-else-if="item.fileName.indexOf('.pdf')>-1" @click="viewPdf(item)"
                             type="success">{{ $t('common.view') }}</el-link>
                    <el-link v-else @click="view(item)" type="success">{{ $t('common.view') }}</el-link>
                    <el-link v-if="form.download" @click="download(item)" type="danger">{{ $t('common.download') }}</el-link>
                </span>
              <!-- </div>
              <div v-if="form.contractParamList&&form.contractParamList.length>0"><b>相关文件:</b> -->
              <span v-for="(item,index) in form.contractParamList" :key="item.fileId" style="padding:0 10px">
                   {{ item.fileName }}
                    <span
                      v-if="item.fileName.indexOf('.png')>-1||item.fileName.indexOf('.jpg')>-1||item.fileName.indexOf('.jpeg')>-1">
                      <el-image :id="item.fileId"
                                style="width: 0px; height: 0px"
                                :src="item.filePath"
                                :preview-src-list="[item.filePath]">
                      </el-image>
                      <el-link @click="viewImg(item.fileId)" type="success">{{ $t('common.view') }}</el-link>
                    </span>
                    <el-link v-else-if="item.fileName.indexOf('.pdf')>-1" @click="viewPdf(item)"
                             type="success">{{ $t('common.view') }}</el-link>
                    <el-link v-else @click="view(item)" type="success">{{ $t('common.view') }}</el-link>
                    <el-link v-if="form.download" @click="download(item)" type="danger">{{ $t('common.download') }}</el-link>
                </span>

            </div>
            <div v-if="form.contractParentPlaceList&&form.contractParentPlaceList.length>0">
              <b>{{ $t('common.MasterAgreementArchiving') }}:</b>
              <span v-for="(item,index) in form.contractParentPlaceList" :key="item.fileId" style="padding:0 10px">
                   {{ item.fileName }}
                    <span
                      v-if="item.fileName.indexOf('.png')>-1||item.fileName.indexOf('.jpg')>-1||item.fileName.indexOf('.jpeg')>-1">
                      <el-image :id="item.fileId"
                                style="width: 0px; height: 0px"
                                :src="item.filePath"
                                :preview-src-list="[item.filePath]">
                      </el-image>
                      <el-link @click="viewImg(item.fileId)" type="success">{{ $t('common.view') }}</el-link>
                    </span>
                    <el-link v-else-if="item.fileName.indexOf('.pdf')>-1" @click="viewPdf(item)"
                             type="success">{{ $t('common.view') }}</el-link>
                    <el-link v-else @click="view(item)" type="success">{{ $t('common.view') }}</el-link>
                    <el-link v-if="form.download" @click="download(item)" type="danger">{{ $t('common.download') }}</el-link>
                </span>
            </div>
            <div v-if="form.contractApprovalList&&form.contractApprovalList.length>0">
              <b>{{ $t('common.ApprovalOpinionSheet') }}:</b>
              <span v-for="(item,index) in form.contractApprovalList" :key="item.fileId" style="padding:0 10px">
                   {{ item.fileName }}
                    <span
                      v-if="item.fileName.indexOf('.png')>-1||item.fileName.indexOf('.jpg')>-1||item.fileName.indexOf('.jpeg')>-1">
                      <el-image :id="item.fileId"
                                style="width: 0px; height: 0px"
                                :src="item.filePath"
                                :preview-src-list="[item.filePath]">
                      </el-image>
                      <el-link @click="viewImg(item.fileId)" type="success">{{ $t('common.view') }}</el-link>
                    </span>
                    <el-link v-else-if="item.fileName.indexOf('.pdf')>-1" @click="viewPdf(item)"
                             type="success">{{ $t('common.view') }}</el-link>
                    <el-link v-else @click="view(item)" type="success">{{ $t('common.view') }}</el-link>
                    <el-link v-if="form.download" @click="download(item)" type="danger">{{ $t('common.download') }}</el-link>
                </span>
            </div>

            <div v-if="form.contractPlaceList&&form.contractPlaceList.length>0"><b>{{ $t('common.ArchiveFile') }}:</b>
              <span v-for="(item,index) in form.contractPlaceList" :key="item.fileId" style="padding:0 10px">
                   {{ item.fileName }}
                    <span
                      v-if="item.fileName.indexOf('.png')>-1||item.fileName.indexOf('.jpg')>-1||item.fileName.indexOf('.jpeg')>-1">
                      <el-image :id="item.fileId"
                                style="width: 0px; height: 0px"
                                :src="item.filePath"
                                :preview-src-list="[item.filePath]">
                      </el-image>
                      <el-link @click="viewImg(item.fileId)" type="success">{{ $t('common.view') }}</el-link>
                    </span>
                    <el-link v-else-if="item.fileName.indexOf('.pdf')>-1" @click="viewPdf(item)"
                             type="success">{{ $t('common.view') }}</el-link>
                    <el-link v-else @click="view(item)" type="success">{{ $t('common.view') }}</el-link>
                    <el-link v-if="form.download" @click="download(item)" type="danger">{{ $t('common.download') }}</el-link>
                </span>
            </div>

            <div v-if="form.contractTerminationList&&form.contractTerminationList.length>0">
              <b>{{ $t('common.TerminationDocument') }}:</b>
              <span v-for="(item,index) in form.contractTerminationList" :key="item.fileId" style="padding:0 10px">
                   {{ item.fileName }}
                    <span
                      v-if="item.fileName.indexOf('.png')>-1||item.fileName.indexOf('.jpg')>-1||item.fileName.indexOf('.jpeg')>-1">
                      <el-image :id="item.fileId"
                                style="width: 0px; height: 0px"
                                :src="item.filePath"
                                :preview-src-list="[item.filePath]">
                      </el-image>
                      <el-link @click="viewImg(item.fileId)" type="success">{{ $t('common.view') }}</el-link>
                    </span>
                    <el-link v-else-if="item.fileName.indexOf('.pdf')>-1" @click="viewPdf(item)"
                             type="success">{{ $t('common.view') }}</el-link>
                    <el-link v-else @click="view(item)" type="success">{{ $t('common.view') }}</el-link>
                    <el-link v-if="form.download" @click="download(item)" type="danger">{{ $t('common.download') }}</el-link>
                </span>
            </div>
            <div v-if="form.archiveInfoSheetList&&form.archiveInfoSheetList.length>0">
              <b>{{ $t('common.ArchiveInfoSheet') }}:</b>
              <span v-for="(item,index) in form.archiveInfoSheetList" :key="item.fileId" style="padding:0 10px">
                   {{ item.fileName }}
                    <span
                      v-if="item.fileName.indexOf('.png')>-1||item.fileName.indexOf('.jpg')>-1||item.fileName.indexOf('.jpeg')>-1">
                      <el-image :id="item.fileId"
                                style="width: 0px; height: 0px"
                                :src="item.filePath"
                                :preview-src-list="[item.filePath]">
                      </el-image>
                      <el-link @click="viewImg(item.fileId)" type="success">{{ $t('common.view') }}</el-link>
                    </span>
                    <el-link v-else-if="item.fileName.indexOf('.pdf')>-1" @click="viewPdf(item)"
                             type="success">{{ $t('common.view') }}</el-link>
                    <el-link v-else @click="view(item)" type="success">{{ $t('common.view') }}</el-link>
                    <el-link v-if="form.download" @click="download(item)" type="danger">{{ $t('common.download') }}</el-link>
                </span>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item :label="$t('contract.remark')" prop="remark">
        <el-input disabled="" type="textarea" v-model="form.reMark"
                  :placeholder="$t('common.placeholder')+' '+$t('contract.remark')"/>
      </el-form-item>
    </el-form>
    <pdfview ref="pdfview"></pdfview>
  </div>
</template>

<script>
import {loadsigndept, loadobjcombo, downloadfile, loaddeptcombo} from "@/api/flow/contract";
import pdfview from '@/components/PdfView/index'

export default {
  props: {
    form: Object,
    showArchive: Boolean
  },
  components: {
    pdfview
  },
  data() {
    return {
      cateDictOptions: [],
      langOptions: [],
      signDeptOptions: [],
      objectOptions: [],
      userOptions: [],
      currencyOptions: [],
      amountOptions: [],
      taxOptions: [],
      concernDeptOptions: [],
      parentOptions: [],
      templateOptions: [],
      priorityOptions: [],
      archivedOpen: false,
      contractFileList: []
    }
  },
  name: "sealDetail",
  created() {
    this.getData();
  },
  methods: {
    mergeFiles() {
      if(this.form.sybmolT === 1){
        this.form.contractFileList = this.form.contractFileList.concat(this.form.contractTempFileList);
      }
    },
    view(item) {
      if (item.fileName.indexOf('doc') > -1) {
        POBrowser.openWindowModeless(process.env.VUE_APP_BASE_API + '/page/office/view/' + item.fileId, 'width=1200px;height=915px;')
      } else {
        window.open(item.filePath, '_blank')
      }
    },
    viewImg(id) {
      document.getElementById(id).click();
    },
    viewPdf(item) {
      this.$nextTick(() => {
        this.$refs.pdfview.showDialog(item.filePath);
      })
    },
    download(item) {
      // window.open(filePath, '_blank')
      downloadfile({fileId: item.fileId}).then(response => {
        var data = response
        if (!data) {
          return
        }

        //判断ie
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(new Blob([data]), item.fileName)
        } else {
          let url = window.URL.createObjectURL(new Blob([data]))
          let link = document.createElement('a')
          link.style.display = 'none'
          link.href = url
          link.setAttribute('download', item.fileName)

          document.body.appendChild(link)
          link.click()
        }

      }).catch(function () {
      });

    },
    getData() {
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
        this.objectOptions = response.data;
      });
      loaddeptcombo().then(response => {
        this.concernDeptOptions = response.data;
      });
    },

  },
  watch: {
    form(val) {
      this.form = val
      val&&this.mergeFiles();
    }
  }
}
</script>

<style scoped>
.el-form-item {
  margin-bottom: 5px
}

.el-link {
  padding: 0 2px;
}
</style>
