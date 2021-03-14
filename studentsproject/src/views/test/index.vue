<template>
  <div class="test">
    <el-carousel :interval="4000" type="card" height="400px">
      <el-carousel-item>
        <img :src="img_list.one" alt="" class="img-list" @click="btnClick(0)" />
      </el-carousel-item>
      <el-carousel-item>
        <img :src="img_list.two" alt="" class="img-list" @click="btnClick(1)" />
      </el-carousel-item>
      <el-carousel-item>
        <img :src="img_list.three" alt="" class="img-list" @click="btnClick(2)" />
      </el-carousel-item>
      <el-carousel-item>
        <img :src="img_list.four" alt="" class="img-list" @click="btnClick(3)" />
      </el-carousel-item>
      <el-carousel-item>
        <img :src="img_list.five" alt="" class="img-list" @click="btnClick(4)" />
      </el-carousel-item>
      <el-carousel-item>
        <img :src="img_list.six" alt="" class="img-list" @click="btnClick(5)" />
      </el-carousel-item>
    </el-carousel>
    <p>欢迎您!使用宿舍管理系统</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      img_list: {
        one: require('../../assets/img/img1.jpg'), //学生管理
        two: require('../../assets/img/img2.jpg'), //楼宇管理
        three: require('../../assets/img/img3.jpg'), //故障报修
        four: require('../../assets/img/img4.jpg'), //报修列表
        five: require('../../assets/img/img5.jpg'), //考勤管理
        six: require('../../assets/img/img6.jpg'), //修改密码
      },
    }
  },
  methods: {
    btnClick(val) {
      switch (val) {
        case 0:
          this.$router.replace('/test3')
          console.log('1')
          break
        case 1:
          this.$router.replace('/test4')
          break
        case 2:
          this.$router.replace('/troubleshooting')
          break
        case 3:
          this.$router.replace('/repairList')
          break
        case 4:
          this.$router.replace('/attendance-management')
          break
        case 5:
          this.$router.replace('/change-password')
          break

        default:
          break
      }
    },
  },
}
</script>

<style scoped>
.test {
  width: 100%;
  height: 100%;
  background-image: linear-gradient(45deg, #5a768a, #5f517e);
}
.test p {
  text-align: center;
  font-size: 50px;
  color: white;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial,
    sans-serif;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 400px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.img-list {
  width: 100%;
  height: 100%;
}
</style>
