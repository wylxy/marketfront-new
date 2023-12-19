/*
 * @Author: chensanqi 1915656015@qq.com
 * @Date: 2022-12-07 14:47:12
 * @LastEditors: chensanqi 1915656015@qq.com
 * @LastEditTime: 2022-12-12 14:32:05
 * @FilePath: \fruit\src\router\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'home',
        component: HomeView
    },

    {
        path: '/login',
        component: () =>
            import ('../views/login.vue')
    },
    {
        path: '/register',
        component: () =>
            import ('../views/register.vue')
    },
    {
        path: '/good',
        component: () =>
            import ('../views/good.vue')
    },
    {
        path: '/order',
        component: () =>
            import ('../views/order.vue')
    },
    {
        path: '/vip',
        component: () =>
            import ('../views/vip.vue')
    },
    {
        path: '/cgood',
        component: () =>
            import ('../views/cgood.vue')
    },
    {
        path: '/agood',
        component: () =>
            import ('../views/agood.vue')
    },
    {
        path: '/corder',
        component: () =>
            import ('../views/corder.vue')
    },
    {
        path: '/cshop',
        component: () =>
            import ('../views/cshop.vue')
    },
    {
        path: '/ashop',
        component: () =>
            import ('../views/ashop.vue')
    },
    {
        path: '/avip',
        component: () =>
            import ('../views/avip.vue')
    },
    {
        path: '/auser',
        component: () =>
            import ('../views/auser.vue')
    },
    {
        path: '/cart',
        component: () =>
            import ('../views/cart.vue')
    },
    {
        path: '/usercenter',
        component: () =>
            import ('../views/userCenter.vue')
    },
    {
        path: '/orderdetails',
        component: () =>
            import ('../views/orderdetails.vue')
    },
    {
        path: '/cregister',
        component: () =>
            import ('../views/cregister.vue')
    },
    {
        path: '/clogin',
        component: () =>
            import ('../views/clogin.vue')
    },
]

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
})

export default router
