import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Task from '../views/Task'
import Special from '../views/Special'
import Mine from '../views/Mine'
import Login from '../views/Login'
import Report from '../views/Home/Report'
import Detail from '../views/Home/Detail'
import ReportMap from '../views/Home/Report-map'
import { getCookie } from '../components/cookie'
import taskdetail from '../views/task/taskdetail'
import doingdetail from '../views/task/doingdetail'
import waydetail from '../views/task/waydetail'
import xundetail from '../views/task/xundetail'
import successdeyail from '../views/task/successdeyail'
import updetepassword from '../views/mine/updetepassword'
import bridge from '../views/specialshow/bridge'
import drainage from '../views/specialshow/drainage'
import management from '../views/specialshow/management'
import road from '../views/specialshow/road'
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
    path: '/home/detail',
    name: 'detail',
    component: Detail
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
    path: '/special/bridge',
    name: 'bridge',
    component: bridge
  },
  {
    path: '/special/drainage',
    name: 'drainage',
    component: drainage
  },
  {
    path: '/special/management',
    name: 'management',
    component: management
  },
  {
    path: '/special/road',
    name: 'road',
    component: road
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
  },
  {
    path: '/taskdetail/:id',
    name: 'taskdetail',
    meta: {
      title: '任务名称'
    },
    component: taskdetail
  },
  {
    path: '/doingdetail/:id',
    name: 'doingdetail',
    meta: {
      title: '任务名称'
    },
    component: doingdetail
  },
  {
    path: '/waydetail/:id',
    name: 'waydetail',
    meta: {
      title: '任务名称'
    },
    component: waydetail
  },
  {
    path: '/xundetail/:id',
    name: 'xundetail',
    meta: {
      title: '任务名称'
    },
    component: xundetail
  },
  {
    path: '/successdeyail/:id',
    name: 'successdeyail',
    meta: {
      title: '任务名称'
    },
    component: successdeyail
  },
  {
    path: '/updetepassword/',
    name: 'updetepassword',
    meta: {
      title: '任务名称'
    },
    component: updetepassword
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
    if (getCookie("token")) {
      next()
    } else {
      next("/login")
    }
  }
})

export default router
