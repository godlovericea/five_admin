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

//通过上中下游查询公司基本信息
export function listBaseInfoByStream(data) {
  return request({
    url: '/daPing/listBaseInfoByStream',
    method: 'post',
    data
  })
}

//根据上中下游查询公司产品、项目、需求
export function listProductByStream(data) {
  return request({
    url: '/daPing/listProductByStream',
    method: 'post',
    data
  })
}
// 获取公司项目列表
export function listCompanyProject(data) {
  return request({
    url: '/companyProject/listCompanyProject',
    method: 'post',
    data
  })
}

//获取其它需求详情
export function getCompanyOtherDemand(data) {
  return request({
    url: '/companyDemand/getCompanyOtherDemand',
    method: 'post',
    data:qs.stringify(data)
  })
}

//获取产品需求详情
export function getCompanyProductDemand(data) {
  return request({
    url: '/companyDemand/getCompanyProductDemand',
    method: 'post',
    data:qs.stringify(data)
  })
}

//获取项目需求详情
export function getCompanyProjectDemand(data) {
  return request({
    url: '/companyDemand/getCompanyProjectDemand',
    method: 'post',
    data:qs.stringify(data)
  })
}

//获取公司项目详情
export function getCompanyProject(data) {
  return request({
    url: '/companyProject/getCompanyProject',
    method: 'post',
    data:qs.stringify(data)
  })
}

//获取产品详情
export function getProduct(data) {
  return request({
    url: '/companyProduct/getProduct',
    method: 'post',
    data: qs.stringify(data)
  })
}

//获取产品详情
export function getScale(data) {
  return request({
    url: '/daPing/getScale',
    method: 'post',
    data: qs.stringify(data)
  })
}
