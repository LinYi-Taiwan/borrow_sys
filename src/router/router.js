import Vue from 'vue'
import Router from 'vue-router'

// import component
import room from '@/components/room/Room/'
import allRooms from '@/components/room/allRooms/'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Record from '@/components/Record'
import ErrorPage from '@/components/ErrorPage'
import testChat from '@/components/testChat'
Vue.use(Router)

export default new Router({
    baseUrl: '/',
    routes: [
        { path: '/', redirect: '/login' },
        { path: '/login', name: 'login', component: Login },

        {
            path: '/allRooms',
            name: 'allRooms',
            component: allRooms,
            meta: { needLogin: true },
        },
        {
            path: '/allRooms/:id',
            name: 'room',
            component: room,
            meta: { needLogin: true },
        },
        {
            path: '/record',
            name: 'Record',
            component: Record,
            meta: { needLogin: true },
        },
        { path: '*', name: 'ErrorPage', component: ErrorPage },
        { path: '/home', name: 'home', component: Home, meta: { needLogin: true } },
        { path: '/testChat', name: 'testChat', component: testChat },
    ],
})
