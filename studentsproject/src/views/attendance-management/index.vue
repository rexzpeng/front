<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/layout' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>考勤管理</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<style lang="less" scoped>
.el-breadcrumb {
  margin-bottom: 8px;
}
</style>
