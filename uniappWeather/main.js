import Vue from 'vue'
import App from './App'
import request from './network/request.js'
import Fly from 'flyio/dist/npm/wx'

Vue.config.productionTip = false
Vue.prototype.request = request;

App.mpType = 'app'

//网络请求的库
let fly = new Fly
Vue.prototype.$fly = fly

const app = new Vue({
	...App
})
app.$mount()
