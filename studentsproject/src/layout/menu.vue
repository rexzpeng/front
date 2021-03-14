<template>
  <div>
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-office-building"></i>
          <span>学生宿舍管理</span>
        </template>
        <el-menu-item index="1-2" @click="dump('/test3', '学生管理')">学生管理</el-menu-item>
        <el-menu-item index="1-3" @click="dump('/test4', '宿舍楼管理')">楼宇管理</el-menu-item>
      </el-submenu>

      <el-menu-item index="2" @click="dump('/troubleshooting', '故障报修')">
        <i class="el-icon-s-release"></i>
        <span slot="title">故障报修</span>
      </el-menu-item>
      <el-menu-item index="3" @click="dump('/repairList', '报修列表')">
        <i class="el-icon-s-release"></i>
        <span slot="title">报修列表</span>
      </el-menu-item>

      <el-menu-item index="4" @click="dump('/attendance-management', '考勤管理')">
        <i class="el-icon-document"></i>
        <span slot="title">考勤管理</span>
      </el-menu-item>
      <el-menu-item index="5" @click="dump('/change-password', '修改密码')">
        <i class="el-icon-setting"></i>
        <span slot="title">修改密码</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  methods: {
    dump(past, name) {
      this.$router.push({
        path: past,
        query: { n: Date.now() },
      })
      this.$emit('herdername', name)
    },
  },
}
</script>

<style>
.el-menu {
  border: none;
}
.el-menu-item:hover {
  border-left: 2px white solid;
}
.el-menu-item,
.el-submenu__title {
  border-bottom: 1px rgba(0, 0, 0, 0.1) solid;
}
.el-menu-item-group__title {
  padding: 0;
}
</style>
