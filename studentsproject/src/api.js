import request from './request.js'
// 登录验证
export function Login(data) {
  return request({
    url: `http://127.0.0.1:7001/Login`,
    method: 'get',
    params: data,
  })
}
//查询
export function getAllUserInfo(data) {
  return request({
    url: `http://127.0.0.1:7001/getAllUserInfo`,
    method: 'get',
    params: data,
  })
}

//添加
export function addUserInfo(data) {
  return request({
    url: `http://127.0.0.1:7001/addUserInfo`,
    method: 'get',
    params: data,
  })
}
//删除
export function deleteUserInfo(data) {
  return request({ 
    url: `http://127.0.0.1:7001/deleteUserInfo/${data.username}`,
    method: 'get',
  })
}


//修改
export function fixUserInfo(data) {
  return request({
    url: `http://127.0.0.1:7001/fixUserInfo`,
    method: 'get',
    params: data,
  })
}
//楼宇获取
export function getFloorList(data) {
  return request({
    url: `http://127.0.0.1:7001/getFloorList`,
    method: 'get',
    params: data,
  })
}
//楼宇添加
export function addFloor(data) {
  return request({
    url: `http://127.0.0.1:7001/addFloor`,
    method: 'get',
    params: data,
  })
}
//楼宇删除
export function deleteFloor(data) {
  return request({
    url: `http://127.0.0.1:7001/deleteFloor`,
    method: 'get',
    params: data,
  })
}
//楼宇修改
export function fixFloor(data) {
  return request({
    url: `http://127.0.0.1:7001/fixFloor`,
    method: 'get',
    params: data,
  })
}
//报修列表
export function getfaultManagment(data) {
  return request({
    url: `http://127.0.0.1:7001/getfaultManagment`,
    method: 'get',
    params: data,
  })
}
//添加报修
export function addFault(data) {
  return request({
    url: `http://127.0.0.1:7001/addFault`,
    method: 'get',
    params: data,
  })
}
//修改报修
export function fixFault(data) {
  return request({
    url: `http://127.0.0.1:7001/fixFault`,
    method: 'get',
    params: data,
  })
}
//删除报修
export function deleteFault(data) {
  return request({
    url: `http://127.0.0.1:7001/deleteFault`,
    method: 'get',
    params: data,
  })
}
//获取楼宇号
export function getFloorNo() {
  return request({
    url: `http://127.0.0.1:7001/getFloorNo`,
    method: 'get',
  
  })
}
//获取楼宇号
export function changePassword(data) {
  return request({
    url: `http://127.0.0.1:7001/changePassword`,
    method: 'get',
    params: data,
  })
}
