<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/layout' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>学生管理</el-breadcrumb-item>
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
            <el-form-item label="姓名" prop="name">
              <el-input
                v-model.trim="searchForm.name"
                placeholder="请输入姓名"
                maxlength="15"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="性别:" prop="sex">
              <el-input
                v-model.trim="searchForm.sex"
                placeholder="请输入性别"
                maxlength="15"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="学号：" prop="number">
              <el-input
                v-model.trim="searchForm.number"
                placeholder="请输入学号"
                maxlength="15"
                clearable
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="8">
            <el-form-item label="电话:" prop="phone">
              <el-input
                v-model.trim="searchForm.phone"
                placeholder="请输入电话"
                maxlength="13"
                clearable
              />
            </el-form-item>
          </el-col>

          <el-col :span="16" class="text-right">
            <el-button type="primary" @click="handleSearch"> 查询 </el-button>
            <el-button type="warning" @click="handleReset"> 重置 </el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="contractInformation" style="margin-top: 20px">
      <el-button type="primary" @click="handleFailed"> 添加用户 </el-button>
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
        <el-form-item label="账号" prop="username">
          <el-input
            v-model.trim="updateForm.username"
            placeholder="请输入账号"
            maxlength="15"
            clearable
          />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model.trim="updateForm.password"
            placeholder="请输入密码"
            maxlength="15"
            clearable
          />
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input
            v-model.trim="updateForm.name"
            placeholder="请输入姓名"
            maxlength="15"
            clearable
          />
        </el-form-item>
        <el-form-item label="性别:" prop="sex">
          <el-input
            v-model.trim="updateForm.sex"
            placeholder="请输入性别"
            maxlength="15"
            clearable
          />
        </el-form-item>
        <el-form-item label="学号：" prop="number">
          <el-input
            v-model.trim="updateForm.number"
            placeholder="请输入学号"
            maxlength="15"
            clearable
          />
        </el-form-item>
        <el-form-item label="电话:" prop="phone">
          <el-input
            v-model.trim="updateForm.phone"
            placeholder="请输入电话"
            maxlength="13"
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
import { Login, getAllUserInfo, addUserInfo, deleteUserInfo, fixUserInfo } from '../../api'
export default {
  mixins: [handleTable],
  components: {
    Table,
    Dialog,
  },
  data() {
    return {
      title: '添加用户',
      searchForm: {
        name: '',
        sex: '',
        phone: '',
        number: '',
      },
      updateForm: {
        nameuser: '',
        password: '',
        name: '',
        sex: '',
        phone: '',
        number: '',
      },
      failed_reason: '',
      failed_reasonshow: false,
    }
  },
  methods: {
    //增加
    signUp() {
      if (this.title === '添加用户') {
        addUserInfo(this.updateForm).then((res) => {
          this.getTableData()
          this.failed_reasonshow = false
          this.updateForm = {
            nameuser: '',
            password: '',
            name: '',
            sex: '',
            phone: '',
            number: '',
          }
        })
      } else {
        fixUserInfo(this.updateForm).then((res) => {
          this.getTableData()
          this.failed_reasonshow = false
          this.updateForm = {
            nameuser: '',
            password: '',
            name: '',
            sex: '',
            phone: '',
            number: '',
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
      getAllUserInfo(this.tableParams)
        .then((res) => {
          setTimeout(() => {
            this.loading = false
            this.tableData = res.result
            this.total = res.totalCount
          }, 500)
        })
        .catch(() => {
          this.loading = false
        })
    },
    //删除
    deleteUserInfobtn(val) {
      let data = {
        username: val.username,
      }

      this.$confirm('此操作将删除改用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          deleteUserInfo(data).then((res) => {
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
      this.title = '修改用户'
    },
    handleReset() {
      this.searchForm = {
        name: '',
        number: '',
        sex: '',
        phone: '',
      }
      this.start = 1
      this.limit = 10
      this.$refs['searchForm'].resetFields()
      this.getTableData()
    },

    handleFailed() {
      this.failed_reasonshow = true
    },
  },
  created() {
    this.tableHeader = [
      {
        label: '用户名',
        prop: 'username',
        overflow: true,
        align: 'center',
        minWidth: 200,
      },
      {
        label: '姓名',
        prop: 'name',
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
        // formatter: (row) => {
        //   return dateFormat(row.approved_time)
        //   console.log(row.approved_time)
        // },
      },
      {
        label: '学号',
        prop: 'number',
        overflow: true,
        align: 'center',
        minWidth: 200,
      },
      {
        label: '电话',
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
