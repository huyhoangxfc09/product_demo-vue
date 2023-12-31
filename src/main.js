import Vue from 'vue'
import App from './App.vue'
import store from './store'
import axios from "axios";
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from "@/router";



Vue.config.productionTip = false
window.axios = axios
Vue.use(ElementUI)



new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
