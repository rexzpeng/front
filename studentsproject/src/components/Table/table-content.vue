<script>
import { isDef } from '../../utils'
const noop = () => {}

export default {
  functional: true,
  name: 'table-content',
  props: {
    context: {
      type: Object,
      required: true,
    },
    config: {
      type: Object,
      required: true,
    },
  },
  render(h, vm) {
    const _toString = (obj) => Object.prototype.toString.call(obj)
    const { context, config } = vm.props
    const { row, column, $index } = context
    const { modifiers = [], isEdit = false, attrs = {} } = config
    const inModifiers = (modifier) => modifiers.includes(modifier)

    let { prop = '', component: componentName = 'span', componentProps = {} } = config
    let childNode = []
    let _value
    let renderDom = ''

    let buttonList = config.buttonList || []

    // 获取深层结构属性的值 建议不要超过3层结构
    _value = getDeepVal(row, prop)

    // 获取深层结构属性的值
    function getDeepVal(obj, prop) {
      let propSplit = prop.split('.')
      if (propSplit.length === 1) {
        return obj[prop]
      }
      return propSplit.reduce((row, property) => row[property], obj)
    }

    // 设置深层结构属性的值
    function setDeepVal(obj, prop, val) {
      let propSplit = prop.split('.')
      if (propSplit.length === 1) {
        obj[prop] = val
        return obj
      }
      let i = 0
      const property = propSplit[propSplit.length - 1]
      while (i < propSplit.length - 1) {
        obj = obj[propSplit[i]]
        i++
      }
      obj[property] = val
      return obj
    }
    // render 存在时 其他配置属性不管用
    if (_toString(config.render) === '[object Function]') {
      renderDom = config.render.call(vm, h, row, $index)
      return renderDom
    }

    // 处理 按钮列表
    if (_toString(buttonList) === '[object Function]') {
      buttonList = buttonList.call(vm, row, $index)
    }
    if (buttonList && buttonList.length) {
      buttonList = buttonList.map((button, index) => {
        let visible = true
        let disabled = false
        let dropDownList = button.dropDownList || []

        if (_toString(button.disabled) === '[object Function]') {
          disabled = button.disabled.call(vm, row, $index)
        }
        if (_toString(button.visible) === '[object Function]') {
          visible = button.visible.call(vm, row, $index)
        }
        // 不可见隐藏
        if (!visible) return ''
        // 处理下拉菜单
        if (button.component === 'dropdown') {
          let downProps = Object.assign(
            {},
            {
              size: 'mini',
              staticClass: button.className || 'text-primary',
              style: {
                marginLeft: '5px',
              },
              trigger: 'click',
              on: {
                click: () => {
                  return (button.event || noop).call(vm, row, $index)
                },
                command: (command) => {
                  return (button.command || noop).call(vm, row, command, $index)
                },
                'visible-change': () => {
                  return (button.change || noop).call(vm, row, $index)
                },
              },
            },
            button.componentProps
          )
          return h('el-dropdown', downProps, [
            h(
              'span',
              {
                staticClass: 'el-dropdown-link',
              },
              [
                vm._v(isDef(button.title) ? button.title : '更多'),
                h('i', {
                  style: {
                    cursor: 'pointer',
                  },
                  staticClass: (button.icon || 'el-icon-arrow-down') + ' el-icon--right',
                }),
              ]
            ),
            h(
              'el-dropdown-menu',
              {
                slot: 'dropdown',
              },
              vm._l(dropDownList, (item) =>
                h('el-dropdown-item', {
                  props: {
                    command: item.text,
                    icon: item.icon,
                  },
                  domProps: {
                    innerText: item.text,
                  },
                })
              )
            ),
          ])
        }
        const buttonDom = h(
          'el-button',
          {
            staticClass: button.className,
            style: config.style,
            props: {
              size: 'medium',
              icon: button.icon,
              type: button.type,
              disabled,
            },
            on: {
              click: () => {
                return button.event.call(vm, row, $index)
              },
            },
          },
          [vm._v(button.text || '')]
        )
        return button.title
          ? h(
              'el-tooltip',
              {
                props: {
                  placement: 'top',
                  content: button.title,
                },
                key: index,
              },
              [buttonDom]
            )
          : buttonDom
      })
      return buttonList
    }

    // 文本格式化
    if (_toString(config.formatter) === '[object Function]') {
      _value = config.formatter.call(vm, row, column, _value, $index)
    }

    // 处理 组件属性
    if (_toString(config.componentProps) === '[object Function]') {
      componentProps = config.componentProps.call(vm, row, column, _value, $index)
    }

    // 初始化 listeners
    // lazy 修饰符 将input事件转换为change
    let eventName = 'input'
    if (inModifiers('lazy')) eventName = 'change'
    let listeners = {
      [eventName](val) {
        if (inModifiers('number')) {
          val = isNaN(+val) ? val : +val
        }
        if (typeof val === 'string') {
          val = val.trim()
        }
        setDeepVal(row, prop, val)
      },
    }

    if (_toString(config.listeners) === '[object Object]') {
      Object.keys(config.listeners).forEach((key) => {
        listeners[key] = function() {
          return config.listeners[key].call(vm, row, arguments, $index)
        }
      })
    }

    // 路由处理
    if (['el-link', 'router-link'].includes(componentName)) {
      if (componentName === 'router-link') {
        let to = {}
        if (componentProps.to) {
          to = componentProps.to
          delete componentProps.to
        } else {
          to = {
            path: componentProps.path,
            name: componentProps.name,
            query: componentProps.query,
            params: componentProps.params,
          }
        }
        componentProps = {
          to,
          ...componentProps,
        }
      }
      childNode.push(
        h(componentName, {
          props: componentProps,
          attrs,
          domProps: {
            innerText: _value,
          },
          on: listeners,
          key: $index,
        })
      )
      return childNode
    }

    // 处理 select
    if (componentName === 'el-select') {
      childNode = (config.options || []).map((option) => {
        return h('el-option', {
          props: option,
          key: option.value,
        })
      })
    }

    // 处理 类似标签的 组件
    if (['el-tag'].includes(componentName)) {
      return h(
        componentName,
        {
          attrs,
          props: componentProps,
          on: listeners,
          key: $index,
        },
        [vm._v(_value)]
      )
    }

    // 默认显示 div
    if (['div', 'span'].includes(componentName)) {
      // 处理用户全路径问题
      if (config.allPath) {
        let str = ''
        try {
          str = _value.split('\\').pop()
        } catch (e) {
          str = _value
        }
        return h(
          'el-tooltip',
          {
            props: {
              placement: 'top',
              content: _value,
            },
            key: $index,
          },
          [h('span', str)]
        )
      }
      // 处理编辑显示input操作
      if (isEdit) {
        return h('el-input', {
          props: {
            value: getDeepVal(row, prop),
          },
          on: {
            ...listeners,
            blur: () => {
              vm.parent.$emit('edit-blur', config)
            },
          },
        })
      }

      // 纯文本节点
      if (!childNode.length) {
        if (isEdit) {
          return h('el-input', {
            props: {
              value: context.row[config.prop],
            },
            on: {
              ...listeners,
              blur: () => {
                config.isEdit = false
              },
            },
          })
        } else {
          return vm._v(_value)
        }
      }

      return h(
        componentName,
        {
          attrs,
          key: $index,
        },
        [...childNode, `${_value}`]
      )
    } else {
      // 渲染组件
      return h(
        componentName,
        {
          props: {
            ...componentProps,
            value: getDeepVal(row, prop),
          },
          attrs: {
            id: `${prop}--${$index}`,
            ...attrs,
          },
          on: listeners,
          key: $index,
        },
        childNode
      )
    }
  },
}
</script>
