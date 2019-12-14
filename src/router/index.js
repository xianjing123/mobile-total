import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Task from '../views/Task'
import Special from '../views/Special'
import Mine from '../views/Mine'
import Login from '../views/Login'
import Report from '../views/Home/Report'
import ReportMap from '../views/Home/Report-map'
import { getCookie } from '../components/cookie'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/home/report',
    name: 'report',
    component: Report
  },
  {
    path: '/home/report/map',
    name: 'reportmap',
    component: ReportMap
  },
  {
    path: '/task',
    name: 'task',
    component: Task
  },
  {
    path: '/special',
    name: 'special',
    component: Special
  },
  {
    path: '/mine',
    name: 'mine',
    component: Mine
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '*',
    redirect: '/home'
  }
]

const router = new VueRouter({
  mode: 'hash',
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === "/login") {
    next()
  } else {
    if(getCookie("name")){
      next()
    }else{
      next("/login")
    }
  }
})

export default router
