<template>
    <div>
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item :label="$t('sealinfo.sealName')" prop="name">
          <el-input disabled="" v-model="form.sealName" :placeholder="$t('common.placeholder')+' '+$t('sealinfo.sealName')" />
        </el-form-item>
        <el-form-item :label="$t('sealinfo.beginTime')" prop="startTime">
          <el-date-picker disabled="" clearable size="small" style="width: 200px"
                          v-model="form.beginTime"
                          type="date"
                          value-format="yyyy-MM-dd"
                          :placeholder="$t('common.choose')+$t('sealinfo.beginTime')">
          </el-date-picker>
        </el-form-item>
        <el-form-item :label="$t('sealinfo.isBrow')"  prop="isBrow">
        <el-select v-model="form.isBrow" disabled="" style="width: 100%" :placeholder="$t('common.placeSelect')+' '+$t('sealinfo.isBrow')" clearable size="small">
          <el-option
            v-for="dict in browOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('sealinfo.isRegister')"  prop="isRegister">
        <el-select v-model="form.isRegister" disabled="" style="width: 100%" :placeholder="$t('common.placeSelect')+' '+$t('sealinfo.isRegister')" clearable size="small">
          <el-option
            v-for="dict in registerOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
        <el-form-item :label="$t('sealinfo.userId')" prop="keeperUser">
           <el-input disabled="" v-model="form.userName"
           :placeholder="$t('common.placeholder')+' '+$t('sealinfo.userId')" />
        </el-form-item>
        <el-form-item :label="$t('sealinfo.reserveUserId')" prop="reserveUserId">
          <el-input disabled="" v-model="form.reserveUserName"
           :placeholder="$t('common.placeholder')+' '+$t('sealinfo.userId')" />
        </el-form-item>
        <el-form-item :label="$t('sealinfo.deptId')" prop="deptId">
          <el-input v-model="form.deptName" disabled=""/>
        </el-form-item>
        <el-form-item :label="$t('sealinfo.sealUrl')" prop="keeperUser">
          <div v-if="form.list&&form.list.length>0">
            {{form.list&&form.list.length>0?form.list[0].fileName:''}}
            <span  v-if="form.list[0].fileName.toLowerCase().indexOf('.png')>-1||form.list[0].fileName.toLowerCase().indexOf('.jpg')>-1||form.list[0].fileName.toLowerCase().indexOf('.jpeg')>-1">
              <el-image   :id="form.list[0].fmsInfoId"
                          style="width: 0; height: 0"
                          :src="form.list[0].filePath"
                          :preview-src-list="[form.list[0].filePath]">
              </el-image>
              <el-link @click="viewImg(form.list[0].fmsInfoId)" type="success">{{$t('common.view')}}</el-link>
            </span>
          </div>
        </el-form-item>

        <el-form-item :label="$t('sealinfo.remark')" prop="remark">
          <el-input
            disabled=""
            type="textarea"
            v-model="form.remark"
            :placeholder="$t('common.placeholder')+' '+$t('sealinfo.remarkPlaceholder')"
            clearable
            size="small"
          />
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
import {downloadfile} from "@/api/flow/contract";

export default {
  props: {
    form: Object,
    browOptions: Array,
    registerOptions: Array
  },
  name: "sealDetail",
  methods: {
    viewImg(id){
      document.getElementById(id).click();
    },
  }

}
</script>

<style scoped>

</style>
