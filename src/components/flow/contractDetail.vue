<template>
    <div>
      <el-form ref="form" :model="form" :label-width="$i18n.locale=='en'?'180px':'100px'">
         <el-form-item   :label="$t('contractTemplate.templateName')" prop="templateName">
            <el-input disabled=""  v-model="form.templateName" :placeholder="$t('common.placeSelect')+' '+$t('contractTemplate.templateName')" />
          </el-form-item>
          <el-form-item :label="$t('contractTemplate.usedept')" prop="usageDepts">
            <el-select class="selectWidth" disabled="" v-model="form.usageDepts" :placeholder="$t('common.placeSelect')+' '+$t('contractTemplate.usedept')">
              <el-option
                  v-for="dept in deptOptions"
                  :key="dept.deptId"
                  :label="dept.deptName+' '+dept.deptNameEn"
                  :value="dept.deptId"
                />
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('contractTemplate.relevantdept')" prop="concernDept">
            <el-select class="selectWidth" disabled="" v-model="form.concernDept" multiple="" :placeholder="$t('common.placeSelect')+' '+$t('contractTemplate.relevantdept')">
              <el-option
                  v-for="dept in deptDictOptions"
                  :key="dept.dictCode"
                  :label="dept.remark"
                  :value="dept.dictCode"
                />
            </el-select>
          </el-form-item>
          <el-form-item  :label="$t('contract.cateId')" prop="cateDict">
            <el-select class="selectWidth" disabled="" v-model="form.cateDict" :placeholder="$t('common.placeSelect')+' '+$t('contract.cateId')">
              <el-option
                  v-for="contractcate in contractcateOptions"
                  :key="contractcate.code"
                  :label="contractcate.cn"
                  :value="contractcate.code"
                />
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('sealinfo.beginTime')" prop="beginTime"  >
            <el-date-picker clearable size="small" disabled=""
                    v-model="form.beginTime"
                    style="width:100%"
                    type="date"
                    value-format="yyyy-MM-dd"
                    :placeholder="$t('common.placeSelect')+$t('sealinfo.beginTime')">
            </el-date-picker>
          </el-form-item>
        <el-form-item :label="$t('common.history')+$t('contractTemplate.update')" prop="oldPoint">
          <el-input v-model="form.oldPoint" disabled="" :autosize="{ minRows: 2, maxRows: 10}" type="textarea" :placeholder="$t('common.inputContent')" />
        </el-form-item>
        <el-form-item :label="$t('contractTemplate.update')" prop="update">
            <el-input v-model="form.updPoint" disabled=""  :autosize="{ minRows: 2, maxRows: 10}" type="textarea" :placeholder="$t('common.inputContent')" />
          </el-form-item>
          <el-form-item :label="$t('contractTemplate.reason')" prop="reason">
            <el-input v-model="form.reason" disabled="" type="textarea" :placeholder="$t('common.inputContent')" />
          </el-form-item>
          <el-form-item :label="$t('contractTemplate.remark')" prop="remark">
            <el-input v-model="form.remark" disabled="" type="textarea" :placeholder="$t('common.inputContent')" />
          </el-form-item>
        <el-form-item :label="$t('contractTemplate.attachment')" prop="fmsInfoId">
          <div>{{form.list&&form.list.length>0?form.list[0].fileName:''}}
            <el-link @click="view(form.list&&form.list.length>0?form.list[0]:'')" type="success">{{$t('common.view')}}</el-link>
            <el-link @click="download(form.list&&form.list.length>0?form.list[0]:'')" type="danger">{{$t('common.download')}}</el-link></div>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
    import { downloadfile} from "@/api/flow/contract";
    export default {
        props:{
          form:Object,
          contractcateOptions:Array,
          deptOptions:Array,
          deptDictOptions:Array

        },
        name: "sealDetail",
        methods:{
          view(item){
            if(item.fileName.indexOf('doc')>-1){
                POBrowser.openWindowModeless(process.env.VUE_APP_BASE_API +'/page/office/view/'+item.fmsInfoId,'width=1200px;height=915px;')
            }else{
              window.open(item.filePath, '_blank')
            }
          },
           download(item){
             console.log(item)
            // window.open(filePath, '_blank')
              downloadfile({fileId:item.fmsInfoId}).then(response => {
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
    }
</script>

<style scoped>
.el-link{
    padding: 0 2px;
}
</style>
