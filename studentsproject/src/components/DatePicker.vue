<template>
  <el-date-picker
    style="width: 100%"
    v-model="dateVal"
    unlink-panels
    :type="dateType"
    :align="dateAlign"
    :picker-options="pickerOptions"
    :default-time="defaultTime"
    :value-format="valueFormat"
    :default-value="defaultValue"
    :clearable="false"
    editable
    start-placeholder="开始日期"
    end-placeholder="结束日期"
    format="yyyy/MM/dd"
    @change="handleSelectDate"
  ></el-date-picker>
</template>

<script type="text/javascript">
import { formatDate } from '@/utils'
const PICKER_OPTIONS = {
  shortcuts: [
    {
      text: '最近一周',
      onClick(picker) {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
        picker.$emit('pick', [start, end])
      }
    },
    {
      text: '最近一个月',
      onClick(picker) {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
        picker.$emit('pick', [start, end])
      }
    },
    {
      text: '最近三个月',
      onClick(picker) {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
        picker.$emit('pick', [start, end])
      }
    }
  ]
}

export default {
  name: 'DatePicker',
  data() {
    return {
      dateVal: [new Date(Date.now() - 3600 * 1000 * 24 * 7), new Date()]
    }
  },
  props: {
    flag: {
      // 预警通知那块 通知到通知详情时间一致
      type: Boolean,
      default: false
    },
    startTime: {
      // 预警通知那块 通知到通知详情时间一致
      type: String
    },
    endTime: {
      // 预警通知那块 通知到通知详情时间一致
      type: String
    },
    defaultTime: {
      type: Array,
      default: () => ['00:00:00', '23:59:59']
    },
    defaultValue: {
      type: Array,
      default: () => []
    },
    dateType: {
      type: String,
      default: 'date'
    },
    dateAlign: {
      type: String,
      default: 'center'
    },
    pickerOptions: {
      type: Object,
      default: function() {
        if (this.dateType === 'daterange') {
          return PICKER_OPTIONS
        } else {
          return {}
        }
      }
    },
    rangeSeparator: {
      type: String,
      default: '至'
    },
    valueFormat: {
      type: String,
      default: 'yyyy-MM-dd'
    }
  },
  methods: {
    handleSelectDate() {
      this.$emit('getDateVal', this.dateVal)
    }
  },
  created() {
    // 预警通知那块 通知到通知详情时间一致
    if (this.flag) {
      this.dateVal = [this.startTime || new Date(), this.endTime || new Date()]
    }
    this.$on('reset-date', () => {
      this.dateVal = [
        formatDate(new Date(Date.now() - 3600 * 1000 * 24 * 7)),
        formatDate(new Date())
      ]
      this.$emit('getDateVal', this.dateVal)
    })
  }
}
</script>
