<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/layout' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>楼宇管理</el-breadcrumb-item>
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
            <el-form-item label="姓名" prop="personInCharge">
              <el-input
                v-model.trim="searchForm.personInCharge"
                placeholder="请输入姓名"
                maxlength="15"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="楼宇号:" prop="floorNumber">
              <el-input
                v-model.trim="searchForm.floorNumber"
                placeholder="请输入楼宇号"
                maxlength="15"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="8" class="text-right">
            <el-button type="primary" @click="handleSearch"> 查询 </el-button>
            <el-button type="warning" @click="handleReset"> 重置 </el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="contractInformation" style="margin-top: 20px">
      <el-button type="primary" @click="handleFailed"> 添加 </el-button>
      <Table
        ref="table"
        style="margin-top: 20px"
        @now-page="handlePage"
        @now-size="handleSize"
        @table-sort="handleSort"
        :current-page="start"
        :page-size="limit"
        :total="total"
        :table-data="tableData"
        :header-data="tableHeader"
        :loading="loading"
      />
    </div>
    <Dialog
      ref="failed_reasonshow"
      :title="title"
      :visible.sync="failed_reasonshow"
      width="700px"
      :close-on-click-modal="false"
      @submit="signUp"
    >
      <el-form status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="楼宇号" prop="floorNumber">
          <el-input
            v-model.trim="updateForm.floorNumber"
            placeholder="请输入楼宇号"
            maxlength="15"
            clearable
            :disabled="disabled"
          />
        </el-form-item>
        <el-form-item label="负责人" prop="personInCharge">
          <el-input
            v-model.trim="updateForm.personInCharge"
            placeholder="请输入负责人"
            maxlength="15"
            clearable
          />
        </el-form-item>

        <el-form-item label="性别:" prop="sex">
          <el-radio-group v-model="updateForm.sex">
            <el-radio :label="0">男</el-radio>
            <el-radio :label="1">女</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="联系方式:" prop="phone">
          <el-input
            v-model.trim="updateForm.phone"
            placeholder="请输入联系方式"
            maxlength="11"
            clearable
          />
        </el-form-item>
      </el-form>
    </Dialog>
  </div>
</template>
<script>
import Dialog from '@/components/Dialog'
import Table from '@/components/Table'
import handleTable from '@/mixins/table.js'
import { getFloorList, deleteFloor, fixFloor, addFloor } from '../../api'
export default {
  mixins: [handleTable],
  components: {
    Table,
    Dialog,
  },
  data() {
    return {
      disabled: false,
      title: '添加楼宇',
      searchForm: {
        personInCharge: '',
        floorNumber: '',
      },
      updateForm: {
        floorNumber: '',
        personInCharge: '',
        sex: 0,
        phone: '',
      },
      failed_reason: '',
      failed_reasonshow: false,
    }
  },
  methods: {
    //增加
    signUp() {
      if (this.title === '添加楼宇') {
        addFloor(this.updateForm).then((res) => {
          this.$message.success(res.message)
          this.getTableData()
          this.failed_reasonshow = false
          this.updateForm = {
            floorNumber: '',
            personInCharge: '',
            sex: 0,
            phone: '',
          }
        })
      } else {
        fixFloor(this.updateForm).then((res) => {
          this.getTableData()
          this.failed_reasonshow = false
          this.updateForm = {
            floorNumber: '',
            personInCharge: '',
            sex: 0,
            phone: '',
          }
          this.$message({
            type: 'success',
            message: '修改成功!',
          })
        })
      }
    },
    getTableData() {
      this.loading = true
      this.getTableParams()
      getFloorList(this.tableParams)
        .then((res) => {
          console.log(res)
          setTimeout(() => {
            this.loading = false
            this.tableData = res.result.list
            this.total = res.result.count
          }, 500)
        })
        .catch(() => {
          this.loading = false
        })
    },
    //删除
    deleteUserInfobtn(val) {
      let data = {
        floorNumber: val.floorNumber,
      }
      this.$confirm('此操作将删除该楼宇?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          deleteFloor(data).then((res) => {
            this.getTableData()
          })
          this.$message({
            type: 'success',
            message: '删除成功!',
          })
        })
        .catch(() => {})
    },

    //修改
    fixUserInfobtn(val) {
      this.failed_reasonshow = true
      this.updateForm = { ...val }
      this.title = '修改楼宇'
      this.disabled = true
    },
    handleReset() {
      this.searchForm = {
        floorNumber: '',
        personInCharge: '',
      }
      this.start = 1
      this.limit = 10
      this.getTableData()
    },

    handleFailed() {
      this.disabled = false
      this.failed_reasonshow = true
    },
  },
  created() {
    this.tableHeader = [
      {
        label: '楼宇号',
        prop: 'floorNumber',
        overflow: true,
        align: 'center',
        minWidth: 200,
      },
      {
        label: '负责人',
        prop: 'personInCharge',
        overflow: true,
        align: 'center',
        minWhith: 200,
      },
      {
        label: '性别',
        prop: 'sex',
        overflow: true,
        align: 'center',
        minWidth: 200,
        formatter: (row) => {
          return row.sex === 0 ? '男' : '女 '
        },
      },
      {
        label: '联系方式',
        prop: 'phone',
        overflow: true,
        align: 'center',
        minWidth: 200,
      },

      {
        label: '操作',
        align: 'center',
        minWidth: 120,
        buttonList: [
          {
            text: '修改',
            type: 'text',
            event: (row) => {
              return this.fixUserInfobtn(row)
            },
          },
          {
            text: '删除',
            type: 'text',
            event: (row) => {
              return this.deleteUserInfobtn(row)
            },
          },
        ],
      },
    ]
    this.getTableData()
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
