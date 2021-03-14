export function isDef(val) {
  return val != null
}

export function formatDate(time, format = 'yyyy-mm-dd') {
  if (!time) return ''
  // 处理 IE new Date 传参问题
  if (typeof time === 'string') {
    time = time.replace(/-/g, '/')
  }
  let date = new Date(time)
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  }
  const dateStr = format.replace(/(y|m|d|h|i|s|a)+/gi, (match, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return dateStr
}

// 'Wed Dec 25 2019 20:15:35 GMT+0800 (中国标准时间)' -> 2019-12-25 20:15:35
export function dateFormat(dateData) {
  let date = new Date(dateData)
  let y = date.getFullYear()
  let M = date.getMonth() + 1
  M = M < 10 ? '0' + M : M
  let d = date.getDate()
  d = d < 10 ? '0' + d : d
  let H = date.getHours()
  H = H < 10 ? '0' + H : H
  let m = date.getMinutes()
  m = m < 10 ? '0' + m : m
  let s = date.getSeconds()
  s = s < 10 ? '0' + s : s
  const time = y + '-' + M + '-' + d + ' ' + H + ':' + m + ':' + s
  return time
}

export function rTime(date) {
  var json_date = new Date(date).toJSON()
  return new Date(new Date(json_date) + 8 * 3600 * 1000)
    .toISOString()
    .replace(/T/g, ' ')
    .replace(/\.[\d]{3}Z/, '')
}