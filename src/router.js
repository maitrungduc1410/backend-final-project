import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from './components/Login'
import Register from './components/Register'
import Chat from './components/Chat'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Chat',
    component: Chat
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
]

const router = new VueRouter({
  mode: 'history',
  routes,
  linkActiveClass: "active"
})

export default router