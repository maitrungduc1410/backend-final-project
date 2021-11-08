import Vue from 'vue'
import App from './App.vue'
import router from './router'
import AuthLayout from './components/AuthLayout'
import { io } from "socket.io-client";
import axios from './http'

Vue.config.productionTip = false

Vue.component('AuthLayout', AuthLayout)

Vue.filter('toLocalTime', time => {
  var d = new Date(time)
  return d.toLocaleString()
})

Vue.prototype.$axios = axios

new Vue({
  render: h => h(App),
  router,
  data: {
    user: null,
    socket: null
  },
  created() {
    this.getCurrentUser()
  },
  methods: {
    async getCurrentUser() {
      try {
        const response = await this.$axios.get('/auth/current-user')

        this.user = response.data

        this.initSocket()
      } catch (error) {
        console.log(error)
      }
    },
    initSocket() {
      this.socket = io();
    }
  }
}).$mount('#app')
