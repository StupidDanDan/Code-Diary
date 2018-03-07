import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/page/home'
import classify from '@/components/page/classify'
import book from '@/components/page/book'
import mine from '@/components/page/mine'
import logandreg from '@/components/page/logandreg'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'home',
            component: home
        },
        {
            path: '/home',
            name: 'home',
            component: home
        },
        {
            path: '/classify',
            name: 'classify',
            component: classify
        },
        {
            path: '/book',
            name: 'book',
            component: book
        },
        {
            path: '/mine',
            name: 'mine',
            component: mine
        },
        {
            path: '/logandreg',
            name: 'logandreg',
            component: logandreg
        },
    ]
})