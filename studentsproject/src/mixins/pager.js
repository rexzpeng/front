export default {
  data() {
    return {
      total: 1, // 表格数据总数
      start: 1, // 分页当前页码
      limit: 10 // 当前页显示数量
    }
  },
  methods: {
    // 监听 now-page 变化
    handlePage(val) {
      this.start = val
      this.getTableData()
    },
    // 监听 now-size 变化
    handleSize(val) {
      this.limit = val
      this.handlePage(1)
    }
  }
}
