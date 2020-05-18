// 设备管理
import request from '@/utils/request'
import qs from 'qs'

// 获取公司产品列表,不分页
export function listProductNotPage(data) {
  return request({
    url: '/companyProduct/listProductNotPage',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 获取公司项目列表,不分页
export function listProject(data) {
  return request({
    url: '/companyProject/listProject',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 新增其它需求
export function addOtherDemand(data) {
  return request({
    url: '/companyDemand/addOtherDemand',
    method: 'post',
    data
  })
}

// 新增产品需求
export function addProductDemand(data) {
  return request({
    url: '/companyDemand/addProductDemand',
    method: 'post',
    data
  })
}
// 新增项目需求
export function addProjectDemand(data) {
  return request({
    url: '/companyDemand/addProjectDemand',
    method: 'post',
    data
  })
}

// 审核公司其他需求信息
export function checkCompanyOtherDemand(data) {
  return request({
    url: '/companyDemand/checkCompanyOtherDemand',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 审核公司产品需求信息
export function checkCompanyProductDemand(data) {
  return request({
    url: '/companyDemand/checkCompanyProductDemand',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 审核公司项目需求信息
export function checkCompanyProjectDemand(data) {
  return request({
    url: '/companyDemand/checkCompanyProjectDemand',
    method: 'post',
    data: qs.stringify(data)
  })
}
// 删除其它需求
export function deleteOtherDemand(data) {
  return request({
    url: '/companyDemand/deleteOtherDemand',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 删除产品需求
export function deleteProductDemand(data) {
  return request({
    url: '/companyDemand/deleteProductDemand',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 删除项目需求
export function deleteProjectDemand(data) {
  return request({
    url: '/companyDemand/deleteProjectDemand',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 获取其它需求详情
export function getCompanyOtherDemand(data) {
  return request({
    url: '/companyDemand/getCompanyOtherDemand',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 获取产品需求详情
export function getCompanyProductDemand(data) {
  return request({
    url: '/companyDemand/getCompanyProductDemand',
    method: 'post',
    data: qs.stringify(data)
  })
}
// 获取项目需求详情
export function getCompanyProjectDemand(data) {
  return request({
    url: '/companyDemand/getCompanyProjectDemand',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 获取其它需求列表
export function listCompanyOtherDemand(data) {
  return request({
    url: '/companyDemand/listCompanyOtherDemand',
    method: 'post',
    data
  })
}

// 获取产品需求列表
export function listCompanyProductDemand(data) {
  return request({
    url: '/companyDemand/listCompanyProductDemand',
    method: 'post',
    data
  })
}

// 获取项目需求列表
export function listCompanyProjectDemand(data) {
  return request({
    url: '/companyDemand/listCompanyProjectDemand',
    method: 'post',
    data
  })
}
// 修改其它需求
export function updateOtherDemand(data) {
  return request({
    url: '/companyDemand/updateOtherDemand',
    method: 'post',
    data
  })
}

// 修改产品需求
export function updateProductDemand(data) {
  return request({
    url: '/companyDemand/updateProductDemand',
    method: 'post',
    data
  })
}

// 修改项目需求
export function updateProjectDemand(data) {
  return request({
    url: '/companyDemand/updateProjectDemand',
    method: 'post',
    data
  })
}
