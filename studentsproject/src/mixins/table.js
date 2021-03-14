import pagerMixin from './pager'
export default {
  mixins: [pagerMixin],
  data() {
    return {
      loading: false,
      searchForm: {},
      sortParams: {
        order: '',
        orderField: ''
      },
      tableParams: {},
      tableHeader: [],
      tableData: []
    }
  },
  methods: {
    // 查询事件
    handleSearch() {
      this.start = 1
      this.$nextTick(() => {
        this.$refs.table.$children[0].clearSort()
      })
      this.sortParams = {}
      this.getTableData()
    },
    // 重置
    handleReset(limit = 10) {
      this.start = 1
      this.limit = limit
      this.$nextTick(() => {
        this.$refs.searchForm.resetFields()
        this.$refs.table.$children[0].clearSort()
      })
      this.sortParams = {}
      this.getTableData()
    },
    // 获取表格参数
    getTableParams() {
      let opts = {
        ...this.sortParams,
        start: this.start - 1, // 页数第一页默认为0
        limit: this.limit
      }
      let params = Object.assign({}, this.searchForm, opts)
      params.customCode && (params.customCode = params.customCode.join(','))
      params.customCodes && (params.customCodes = params.customCodes.join(','))
      // 默认获取一周
      // 日期时间写死 00:00:00 - 23:59:59
      if ('startTime' in params && 'endTime' in params) {
        // 初始化时间
        if (!params.startTime || !params.endTime) {
          params.startTime =
            this.$filters.formatDate(Date.now() - 3600 * 1000 * 24 * 7) + ' 00:00:00'
          params.endTime = this.$filters.formatDate(Date.now()) + ' 23:59:59'
        }
      }
      this.tableParams = params
    },
    validatePageSize() {
      const prevPage = this.start - 1 > 0 ? this.start - 1 : 1
      if (this.total === prevPage * this.limit + 1) {
        this.start = prevPage
      }
    },
    // 排序方法
    handleSort({ prop, order }) {
      this.start = 1
      const sortObj = {
        ascending: 'ASC',
        descending: 'DESC'
      }
      if (order) {
        this.sortParams = {
          order: sortObj[order],
          orderField: prop
        }
      } else {
        this.sortParams = {
          order: '',
          orderField: ''
        }
      }
      this.getTableData()
    }
  }
}
