<template>
  <transition name="dialog-fade" @after-enter="afterEnter" @after-leave="afterLeave">
    <div v-show="visible" class="el-dialog__wrapper wrap-dialog" @click.self="handleWrapperClick">
      <div
        role="dialog"
        :key="key"
        aria-modal="true"
        :aria-label="title || 'dialog'"
        :class="[
          'el-dialog',
          { 'is-fullscreen': fullscreen, 'el-dialog--center': center },
          customClass,
        ]"
        ref="dialog"
        :style="style"
      >
        <div class="el-dialog__header">
          <slot name="title">
            <span class="el-dialog__title">{{ title }}</span>
          </slot>
          <button
            type="button"
            class="el-dialog__headerbtn"
            aria-label="Close"
            v-if="showClose"
            @click="handleClose"
          >
            <i class="el-dialog__close el-icon el-icon-close"></i>
          </button>
        </div>
        <div class="el-dialog__body" v-if="rendered"><slot></slot></div>
        <div class="el-dialog__footer" v-if="hasFooter">
          <slot name="footer">
            <el-button
              type="default"
              plain
              :icon="cancelIcon"
              v-if="showCancel"
              @click="handleClose"
            >
              {{ cancelText }}
            </el-button>
            <el-button
              type="primary"
              :icon="submitIcon"
              @click="handleSubmit"
              :loading="loading"
              v-if="showSubmit"
              :disabled="disabled"
            >
              {{ submitText }}
            </el-button>
          </slot>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { Dialog } from 'element-ui'

export default {
  name: 'yq-dialog',
  mixins: [Dialog],
  props: {
    loading: Boolean,
    closeOnClickModal: Boolean,

    appendToBody: {
      type: Boolean,
      default: true,
    },
    hasFooter: {
      type: Boolean,
      default: true,
    },
    submitIcon: {
      type: String,
      // default: 'el-icon-circle-check'
    },
    cancelIcon: {
      type: String,
      // default: 'el-icon-circle-close'
    },
    submitText: {
      type: String,
      default: '确 定',
    },
    cancelText: {
      type: String,
      default: '取 消',
    },
    // 是否显示确定按钮
    showSubmit: {
      type: Boolean,
      default: true,
    },
    // 是否显示取消按钮
    showCancel: {
      type: Boolean,
      default: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleSubmit() {
      this.$emit('submit')
    },
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
  // @media screen and (min-height: 800px) {
  //   .el-dialog__body {
  //     max-height: 520px;
  //   }
  // }
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
