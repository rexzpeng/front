<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/layout' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>故障报修</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="contractInformation">
      <el-form
        ref="searchForm"
        :model="searchForm"
        label-width="130px"
        @keyup.enter.native="handleSearch"
      >
        <el-row :gutter="24">
          <el-col :span="8">
            <el-form-item label="报修人:" prop="bugName">
              <el-input
                v-model.trim="searchForm.bugName"
                placeholder="请输入报修人姓名"
                maxlength="15"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系电话:" prop="bugPhone">
              <el-input
                v-model.trim="searchForm.bugPhone"
                placeholder="请输入联系号码"
                maxlength="15"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="楼宇号:" prop="floorNumber">
              <el-select v-model="searchForm.floorNumber" clearable placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.floorNumber"
                  :label="item.floorNumber"
                  :value="item.floorNumber"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="8">
            <el-form-item label="宿舍号:" prop="dormitoryNo">
              <el-input
                v-model.trim="searchForm.dormitoryNo"
                placeholder="请输入宿舍号"
                maxlength="15"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="报修日期:" prop="bugDate">
              <el-input
                v-model.trim="searchForm.bugDate"
                placeholder="请输入报修日期"
                maxlength="15"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="报修时间:" prop="bugTime">
              <el-input
                v-model.trim="searchForm.bugTime"
                placeholder="请输入报修时间"
                maxlength="15"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="问题描述:" prop="describe">
              <el-input
                v-model.trim="searchForm.describe"
                placeholder="请输入问题描述"
                maxlength="15"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="8" class="text-right">
            <el-button type="primary" @click="handleReset"> 重置 </el-button>
            <el-button type="warning" @click="handleSubmit"> 提交报修 </el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>
<script>
import { addFault, getFloorNo } from '../../api'
export default {
  data() {
    return {
      options: [],
      searchForm: {
        bugName: '',
        bugPhone: '',
        floorNumber: '',
        dormitoryNo: '',
        bugDate: '',
        bugTime: '',
        describe: '',
      },
    }
  },
  methods: {
    handleReset() {
      this.searchForm = {
        bugName: '',
        bugPhone: '',
        floorNumber: '',
        dormitoryNo: '',
        bugDate: '',
        bugTime: '',
        describe: '',
      }
    },
    handleSubmit() {
      addFault(this.searchForm).then((res) => {
        this.$message.success(res.message)
        this.handleReset()
      })
    },
  },
  created() {
    getFloorNo().then((res) => {
      this.options = res.result
    })
  },
}
</script>
<style lang="less">
.el-breadcrumb {
  margin-bottom: 8px;
}
.el-form {
  margin: 0;
}

.contractInformation {
  background: #fff;
  padding: 20px;
}
.text-right {
  text-align: right;
}
</style>
