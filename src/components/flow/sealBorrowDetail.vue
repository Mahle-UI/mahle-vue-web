<template>
    <div>
      <el-form ref="form" :model="form" :label-width="$i18n.locale=='en'?'180px':'120px'">
         <el-form-item :label="$t('sealBorrow.sealId')"  prop="sealId">
          <el-input disabled v-model="form.sealName" :placeholder="$t('common.placeSelect')+' '+$t('sealBorrow.sealId')"
          suffix-icon="el-icon-search"/>
      </el-form-item>
        <el-form-item :label="$t('sealBorrow.borrowUserId')" prop="borrowUserId">
            <el-input disabled v-model="form.borrowUserName" :placeholder="$t('common.placeSelect')+' '+$t('sealBorrow.borrowUserId')"
            suffix-icon="el-icon-search"/>
        </el-form-item>
        <el-form-item :label="$t('sealBorrow.borrowDeptId')" prop="borrowDeptId">
            <el-input disabled v-model="form.borrowDeptName" :placeholder="$t('common.placeSelect')+' '+$t('sealBorrow.borrowDeptId')"
            suffix-icon="el-icon-search"/>
        </el-form-item>
        
        <el-form-item :label="$t('sealBorrow.planBorrowDate')" prop="planBorrowDate">
          <el-date-picker disabled=""  clearable size="small" style="width: 100%"
            v-model="form.planBorrowDate"
            type="date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            :placeholder="$t('common.choose')+$t('sealBorrow.planBorrowDate')">
          </el-date-picker>
        </el-form-item>
        <el-form-item :label="$t('sealBorrow.realityBorrowDate')" prop="realityBorrowDate">
          <el-date-picker disabled=""  clearable size="small" style="width: 100%"
            v-model="form.realityBorrowDate"
            type="date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            :placeholder="$t('common.choose')+$t('sealBorrow.realityBorrowDate')">
          </el-date-picker>
        </el-form-item>
        <el-form-item :label="$t('sealBorrow.returnedDate')" prop="returnDate">
          <el-date-picker disabled=""  clearable size="small" style="width: 100%"
            v-model="form.returnDate"
            type="date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            :placeholder="$t('common.choose')+$t('sealBorrow.returnedDate')">
          </el-date-picker>
        </el-form-item>
        <el-form-item :label="$t('sealBorrow.borrowExplain')" prop="borrowExplain">
          <el-input disabled=""
            type="textarea"
            v-model="form.borrowExplain"
            :placeholder="$t('common.placeholder')+' '+$t('sealBorrow.borrowExplain')"
            clearable
            size="small"
          />
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
    export default {
        props:{
          form:Object
        },
        name: "sealBorrow",
    }
</script>

<style scoped>

</style>
