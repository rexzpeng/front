<script>
import Dialog from './Dialog.vue'

export default {
  name: 'dialog-form',
  provide() {
    return {
      Dialog: this,
    }
  },
  mixins: [Dialog],
  created() {
    this.$on('close', () => {
      let dialogBody = document.querySelectorAll('div.el-dialog__body')[0]
      dialogBody.scrollTop = 0
    })
  },
}
</script>

<style lang="less">
.wrap-dialog {
  .el-dialog__header {
    border-bottom: 1px solid #dddfe7;
  }
  .el-dialog__body {
    padding: 20px 40px;
    max-height: 320px;
    overflow-y: auto;
    .el-select {
      width: 100%;
    }
    .el-input__inner {
      width: 100%;
    }
  }
  @media screen and (max-height: 800px) {
    .el-dialog__body {
      max-height: 320px;
    }
  }
  // @media screen and (max-height: 900px) {
  //   .el-dialog__body {
  //     max-height: 420px;
  //   }
  // }
  @media screen and (min-height: 800px) {
    .el-dialog__body {
      max-height: 520px;
    }
  }
  .el-dialog__footer {
    border-top: 1px solid #dddfe7;
    padding: 10px 40px 10px;
    .button-list {
      justify-content: flex-end;
    }
    .el-form-item {
      margin-bottom: 0;
    }
  }
}
</style>
