import Vue from 'vue'
import App from './App'
import {request} from "./utils/request";
import './style/weui.wxss'

Vue.prototype.$http=request
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
