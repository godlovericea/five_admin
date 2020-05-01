// 设备管理
import request from '@/utils/request'
import qs from 'qs'

// 登录
export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}
// 注册
export function register(data) {
  return request({
    url: '/user/regist',
    method: 'post',
    data
  })
}
// 重置密码
export function reset(data) {
    return request({
        url: '/user/reset',
        method: 'post',
        data:qs.stringify(data)
    })
}
// 增加公司信息
export function addBaseInfo(data) {
  return request({
    url: '/companyBaseInfo/addBaseInfo',
    method: 'post',
    data
  })
}
// 获取公司信息
export function getBaseInfo(data) {
  return request({
    url: '/companyBaseInfo/getBaseInfo',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 修改公司基本信息
export function updateBaseInfo(data) {
  return request({
    url: '/companyBaseInfo/updateBaseInfo',
    method: 'post',
    data
  })
}

//场景列表
export function listCompanyScene(data) {
  return request({
    url: '/companyInfo/listCompanyScene',
    method: 'post',
    data: qs.stringify(data)
  })
}

//场景详情
export function getCompanyScene(data) {
  return request({
    url: '/companyInfo/getCompanyScene',
    method: 'post',
    data: qs.stringify(data)
  })
}


//审核公司
export function checkCompany(data) {
  return request({
    url: '/companyInfo/checkCompany',
    method: 'post',
    data
  })
}

//公司列表
export function listCompany(data) {
  return request({
    url: '/companyInfo/listCompany',
    method: 'post',
    data
  })
}
//公司列表
export function listLog(data) {
  return request({
    url: '/log/listLog',
    method: 'post',
    data
  })
}
