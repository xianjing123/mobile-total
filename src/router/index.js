import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Task from '../views/Task'
import Special from '../views/Special'
import Mine from '../views/Mine'
import Login from '../views/Login'
import { getCookie } from '../components/cookie'
import taskdetail from '../views/task/taskdetail'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    component: Home
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
  },
  {
    path: '/taskdetail/:id',
    name: 'home',
    meta: {
      title: '任务名称'
    },
    component: taskdetail
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
    if (getCookie("name")) {
      next()
    } else {
      next("/login")
    }
  }
})

export default router
