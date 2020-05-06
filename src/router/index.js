import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/register',
    component: () => import('@/views/login/register'),
    hidden: true
  },
  {
    path: '/reset',
    component: () => import('@/views/login/reset'),
    hidden: true
  },
  {
    path: '/help',
    component: () => import('@/views/login/help'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/home',
    component: Layout,
    children: [
        {
          path: 'basicInfo',
          component: () => import('@/views/basicInfo/basicInfo'),
          name: '消防监控',
          meta: { title: '基本信息', icon: 'dashboard', affix: true }
        }
    ]
  },
  {
    path: '/product',
    component: Layout,
    redirect: '/product/newProduct',
    name: '施工现场管理',
    children: [
      {
        path: 'newProduct',
        component: () => import('@/views/product/product'),
        name: '签到管理',
        meta: { title: '新增产品', icon: 'dashboard', affix: true }
      },
      {
        path: 'productList',
        component: () => import('@/views/product/productList'),
        name: 'sceanManage',
        meta: { title: '产品列表', icon: 'dashboard', affix: true },
        hidden:true
      }
    ]
  },
  {
    path: '/project',
    component: Layout,
    redirect: '/project/newProject',
    children: [
      {
        path: 'newProject',
        component: () => import('@/views/project/project'),
        name: 'sceanManage',
        meta: { title: '新增项目', icon: 'dashboard', affix: true }
      },
      {
        path: 'projectList',
        component: () => import('@/views/project/projectList'),
        name: 'sceanManage',
        meta: { title: '项目列表', icon: 'dashboard', affix: true },
        hidden:true
      }
    ]
  },
  {
    path: '/need',
    component: Layout,
    redirect: '/need/needWaire',
    children: [
      {
        path: 'needWaire',
        component: () => import('@/views/need/need'),
        name: 'market',
        meta: { title: '需求调研', icon: 'dashboard', affix: true }
      },
      {
        path: 'needList',
        component: () => import('@/views/need/needList'),
        name: 'sceanManage',
        meta: { title: '需求列表', icon: 'dashboard', affix: true },
        hidden:true
      }
    ]
  },
  {
    path: '/logs',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'logs',
        component: () => import('@/views/logs/logs'),
        name: 'logs',
        meta: { title: '信息管理', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/admin',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'com',
        component: () => import('@/views/admin/companyList'),
        name: 'myScean',
        meta: { title: '概览', icon: 'dashboard', affix: true }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
