<template>
  <el-container>
    <el-aside width="200px" :class="{ closeaside: show }">
      <Menus @herdername="getheadername"></Menus>
    </el-aside>
    <el-container>
      <el-header>
        <div class="left" @click="btnClick">
          <i v-if="active" class="el-icon-s-fold"> </i>
          <i v-else class="el-icon-s-unfold"> </i>
        </div>
        <div class="header">
          {{ headername }}
        </div>
        <div class="right">
          <el-button type="info" icon="el-icon-close" circle @click="btn2Click"></el-button>
        </div>
      </el-header>
      <el-main><router-view /></el-main>
      <el-footer>&copy; coderRex</el-footer>
    </el-container>
  </el-container>
</template>

<script>
import Menus from './menu.vue'
export default {
  components: {
    Menus,
  },
  data() {
    return {
      headername: '主页',
      show: true,
      active: true,
    }
  },
  methods: {
    getheadername(val) {
      this.headername = val
    },
    btnClick() {
      this.show = !this.show
      this.active = !this.active
    },
    btn2Click() {
      this.$confirm('此操作退出学生管理系统?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$router.replace({
            path: '/login',
            query: { n: Date.now() },
          })
          this.$message({
            type: 'success',
            message: '退出成功!',
          })
        })
        .catch(() => {})
    },
  },
}
</script>

<style lang="less" scoped>
.closeaside {
  width: 0 !important;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-header {
  .left,
  .header,
  .right {
    display: inline-block;
  }
  .left {
    float: left;
    font-size: 30px;
    cursor: pointer;
  }
  .right {
    float: right;
    input {
      border: none;
    }
  }
}
.header {
  font-size: 20px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
  height: 100vh;
  overflow: hidden;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  // text-align: center;
  height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.el-footer {
  color: #52595f;
  font-size: 12px;
}
</style>
