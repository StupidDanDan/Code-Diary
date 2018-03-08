import Vue from 'vue'
import Router from 'vue-router'


import home from '@/components/page/home'
import classify from '@/components/page/classify'
import book from '@/components/page/book'
import mine from '@/components/page/mine'
import index from '@/components/page/index'

import logandreg from '@/components/page/logandreg'
import login from '@/components/page/logandreg/login'
import register from '@/components/page/logandreg/register'


Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'logandreg',
            component: logandreg,
            redirect: { name: 'login' },
            children: [{
                    path: 'login',
                    name: 'login',
                    component: login
                },
                {
                    path: 'register',
                    name: 'register',
                    component: register
                },
            ]
        },
        {
            path: '/index',
            name: 'index',
            component: index,
            redirect: { name: 'home' },
            children: [{
                    path: 'home',
                    name: 'home',
                    component: home
                },
                {
                    path: 'classify',
                    name: 'classify',
                    component: classify
                },
                {
                    path: 'book',
                    name: 'book',
                    component: book
                },
                {
                    path: 'mine',
                    name: 'mine',
                    component: mine
                }
            ]
        },
    ]
})