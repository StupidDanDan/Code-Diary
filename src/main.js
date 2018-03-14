// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import axios from 'axios'
import VueAxios from 'vue-axios'
import qs from 'qs'
Vue.prototype.qs = qs;

Vue.use(VueAxios, axios)
    // Vue.prototype.$http = axios

import VueLazyload from 'vue-lazyload' //引入这个懒加载插件

Vue.use(VueLazyload, {
    preLoad: 1.3,
    error: '/dist/error.jpg',
    loading: '/dist/loading.png',
    attempt: 1
})

import iView from 'iview';
import 'iview/dist/styles/iview.css';


import { getCookie, setCookie, delCookie } from './assets/cookie'
// import { returnAllTime, returnYearMonth, returnTime } from './assets/changedate'
Vue.prototype.$cookieStore = {
    getCookie,
    setCookie,
    delCookie
}

// Vue.prototype.changedate = {
//     returnAllTime,
//     returnYearMonth,
//     returnTime
// }

Vue.config.productionTip = false

Vue.use(iView);
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})