// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import '@/assets/reset.css'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'


import $ from 'jquery';
import Zepto from '../../../static/zepto'
import device from '../../../static/device';
// let unionlog = require("../../../static/unionlog.js")
Vue.use(MintUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})

