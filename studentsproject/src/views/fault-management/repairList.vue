<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/layout' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>报修列表</el-breadcrumb-item>
    </el-breadcrumb>
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
</template>
<script>
import Table from '@/components/Table'
import handleTable from '@/mixins/table.js'
import { getfaultManagment, fixFault, deleteFault } from '../../api'
export default {
  mixins: [handleTable],
  components: {
    Table,
  },
  data() {
    return {
      searchForm: {
        dormitoryNo: '',
        status: '',
      },
    }
  },
  methods: {
    getTableData() {
      this.loading = true
      this.getTableParams()
      getfaultManagment(this.tableParams)
        .then((res) => {
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
    handleDelete(val) {
      let data = {
        floorNumber: val.floorNumber,
      }
      this.$confirm('此操作将删除该报修数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          deleteFault(data).then((res) => {
            this.getTableData()
          })
          this.$message({
            type: 'success',
            message: '删除成功!',
          })
        })
        .catch(() => {})
    },
    handleProcessed(row) {
      this.$confirm('该报修已处理?', '提示', {
        confirmButtonText: '是',
        cancelButtonText: '否',
        type: 'warning',
      })
        .then(() => {
          row.status = 1
          fixFault(row).then((res) => {
            this.$message.success(res.message)
            this.getTableData()
            this.$message({
              type: 'success',
              message: '操作成功!',
            })
          })
        })
        .catch(() => {})
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
        label: '宿舍号',
        prop: 'dormitoryNo',
        overflow: true,
        align: 'center',
        minWhith: 200,
      },
      {
        label: '报修人',
        prop: 'bugName',
        overflow: true,
        align: 'center',
        minWidth: 200,
        // formatter: (row) => {
        //   return row.sex === 0 ? '男' : '女 '
        // },
      },
      {
        label: '联系方式',
        prop: 'bugPhone',
        overflow: true,
        align: 'center',
        minWidth: 200,
      },
      {
        label: '报修日期',
        prop: 'bugDate',
        overflow: true,
        align: 'center',
        minWidth: 200,
      },
      {
        label: '报修时间',
        prop: 'bugTime',
        overflow: true,
        align: 'center',
        minWidth: 200,
      },
      {
        label: '描述',
        prop: 'describe',
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
            text: '已处理',
            type: 'text',
            event: (row) => {
              console.log(row)
              return this.handleProcessed(row)
            },
            disabled: (row) => {
              return row.status === 1
            },
          },
          {
            text: '删除',
            type: 'text',
            event: (row) => {
              return this.handleDelete(row)
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
