import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login')
  },
  {
    path: '/layout',
    name: 'layout',
    component: () => import(/* webpackChunkName: "layout" */ '../layout'),
    children: [
      {
        path: '/',
        name: 'test',
        component: () => import(/* webpackChunkName: "test" */ '../views/test')
      },

      {
        path: '/test3',
        name: 'test3',
        component: () => import(/* webpackChunkName: "test2" */ '../views/test3'),
      },
      {
        path: '/test4',
        name: 'test4',
        component: () => import(/* webpackChunkName: "test2" */ '../views/test4'),
      },
      
      {
        path: '/repairList',
        name: 'repairList',
        component: () => import(/* webpackChunkName: "repairList" */ '../views/fault-management/repairList.vue'),
      },
      {
        path: '/troubleshooting',
        name: 'troubleshooting',
        component: () => import(/* webpackChunkName: "troubleshooting" */ '../views/fault-management/troubleshooting.vue'),
      },
      {
        path: '/attendance-management',
        name: 'attendance-management',
        component: () => import(/* webpackChunkName: "attendance-management" */ '../views/attendance-management'),
      },
      {
        path: '/change-password',
        name: 'change-password',
        component: () => import(/* webpackChunkName: "change-password" */ '../views/change-password'),
      },
   
      
    ]
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
