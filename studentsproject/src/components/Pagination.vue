<template>
  <div class="page-wrapper">
    <el-pagination
      :layout="pageLayout"
      :small="small"
      :hide-on-single-page="single"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="cPage"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      :total="total"
      :pager-count="pagerCount"
      v-bind="$attrs"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: 'yq-page',
  data() {
    return {
      start: (this.currentPage - 1) * this.pageSize + 1,
    }
  },
  /**
   * 从父组件获取，
   * 但是又要在子组件中改变
   * 这时就需要一个中间桥梁
   * 利用computed中的get和set就可以很好的实现
   */
  computed: {
    cPage: {
      get() {
        return this.currentPage
      },
      set(val) {
        if (val !== this.currentPage) {
          this.$emit('changePage', val)
        }
      },
    },
    pageLayout() {
      // const totalPage = Math.ceil(this.total / this.pageSize)
      // if (totalPage <= this.pagerCount && !this.customLayout) {
      //   return 'total, prev, pager, next'
      // }
      return this.layout
    },
  },
  props: {
    pageSizes: {
      type: Array,
      default: () => {
        return [10, 20, 50, 100]
      },
    },
    customLayout: Boolean,
    small: Boolean,
    single: Boolean,
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper',
    },
    pagerCount: {
      type: Number,
      default: 7,
    },
    currentPage: {
      type: Number,
      default: 1,
    },
    pageSize: {
      default: 10,
      type: Number,
    },
    total: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    /**
     * 每页显示的条数改变时触发
     */
    handleSizeChange(val) {
      this.$emit('showPages', val)
      this.start = 1
    },
    /**
     * 当前页改变时触发
     */
    handleCurrentChange(val) {
      this.cPage = val
      this.start = this.pageSize * (val - 1) + 1
    },
  },
}
</script>

<style lang="less" scoped>
.page-wrapper {
  margin-top: 20px;
  text-align: right;
}
</style>
