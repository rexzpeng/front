<template>
  <div :id="id" v-if="headerData.length" class="eltable-div">
    <el-table
      ref="elTable"
      size="small"
      width="100%"
      :border="border"
      :stripe="stripe"
      v-loading="loading"
      element-loading-text="数据加载中"
      element-loading-spinner="el-icon-loading"
      v-bind="$attrs"
      v-on="$listeners"
      :data="tableData"
      :height="height"
      :max-height="maxHeight"
      @sort-change="handleSort"
      @select-all="handleSelectAll"
      @select="handleSelect"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        v-if="selection"
        type="selection"
        :selectable="selectable"
        :width="headerOptions.width"
        :fixed="headerOptions.fixed"
        align="center"
      ></el-table-column>
      <el-table-column
        v-if="index"
        type="index"
        label="序号"
        align="center"
        :width="headerOptions.indexWidth"
        :fixed="headerOptions.indexFixed"
      >
        <template v-slot="scope">
          <div class="text-center">
            {{ scope.$index + (currentPage - 1) * pageSize + 1 }}
          </div>
        </template>
      </el-table-column>
      <template v-for="column of headerData">
        <el-table-column
          v-if="column.children && column.children.length && column.visible !== false"
          :header-align="column.headerAlign || 'center'"
          :fixed="column.fixed"
          :min-width="column.minWidth"
          :key="column.prop"
          :label="column.label"
          v-bind="getColumnProps(column.columnProps)"
        >
          <template v-for="child of column.children">
            <el-table-column
              v-if="child.visible !== false"
              :header-align="child.headerAlign || 'center'"
              :fixed="child.fixed"
              :min-width="child.minWidth"
              :key="child.prop"
              :align="child.align"
              :width="child.width"
              :label="child.label"
              :prop="child.prop"
              :sortable="child.sortable"
              :formatter="child.formatter"
              :show-overflow-tooltip="child.overflow"
              v-bind="getColumnProps(child.columnProps)"
            >
              <template v-slot="scope">
                <table-content :context="scope" :config="child"></table-content>
              </template>
            </el-table-column>
          </template>
        </el-table-column>
        <el-table-column
          v-else-if="column.visible !== false"
          :header-align="column.headerAlign || 'center'"
          :min-width="column.minWidth"
          :fixed="column.fixed"
          :key="column.prop"
          :align="column.align"
          :width="column.width"
          :label="column.label"
          :prop="column.prop"
          :sortable="column.sortable"
          :formatter="column.formatter"
          :show-overflow-tooltip="column.overflow"
          v-bind="getColumnProps(column.columnProps)"
        >
          <template v-slot="scope">
            <table-content :context="scope" :config="column"></table-content>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <Pagination
      v-if="showPagination"
      v-bind="pageOptions"
      :single="single"
      :small="small"
      :current-page="currentPage"
      :page-size="pageSize"
      :total="total"
      @showPages="handleSize"
      @changePage="handlePage"
    />
  </div>
</template>

<script>
import Pagination from '../Pagination'
import TableContent from './table-content'

export default {
  inheritAttrs: false,
  name: 'yq-table',
  props: {
    index: {
      default: true,
      type: Boolean,
    },
    id: {
      default: 'table-wrap',
      type: String,
    },
    showPagination: {
      default: true,
      type: Boolean,
    },
    showIndex: {
      default: true,
      type: Boolean,
    },
    border: {
      default: true,
      type: Boolean,
    },
    stripe: {
      default: true,
      type: Boolean,
    },
    pageOptions: {
      type: Object,
      default: () => {},
    },
    options: {
      type: Object,
      default: () => {},
    },
    currentPage: {
      type: Number,
      default: 1,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    single: Boolean,
    small: Boolean,
    selection: Boolean,
    loading: Boolean,
    tableData: Array,
    total: Number,
    selectable: Function,
    height: [String, Number],
    maxHeight: [String, Number],
    headerData: Array,
  },
  computed: {
    headerOptions() {
      const baseOpts = {
        width: '60px',
        fixed: false,
        indexWidth: '60px',
        indexFixed: false,
      }
      return Object.assign({}, baseOpts, this.options)
    },
  },
  methods: {
    getColumnProps(val) {
      if (typeof val !== 'object') return null
      return val
    },
    handleSort(column, prop, order) {
      this.$emit('table-sort', column, prop, order)
    },
    handleSelectionChange(val) {
      this.$emit('select-change', val)
    },
    handleSelectAll(val) {
      this.$emit('select-all', val)
    },
    handleSelect(val, row) {
      this.$emit('select', val, row)
    },
    handlePage(val) {
      this.$emit('now-page', val)
    },
    handleSize(val) {
      this.$emit('now-size', val)
    },
  },
  components: {
    TableContent,
    Pagination,
  },
}
</script>

<style lang="less" scope>
.eltable-div {
  .el-table {
    width: 100%;
  }
  /deep/.el-table--border {
    border: 1px solid #ebeef5;
    th {
      height: 45px !important;
      background: #ecf5ff !important;
      color: #000;
    }
  }
}
</style>
