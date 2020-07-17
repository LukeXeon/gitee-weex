/*global Vue*/
import Router from 'vue-router'
import boot from "@/pages/index/boot";
import login from "@/pages/index/login";
import home from "@/pages/index/home";
import test from '@/test/test.vue'

Vue.use(Router)

export const router = new Router({
    routes: [
        {
            path: "/home",
            name: "主页面",
            component: home
        },
        {
            path: "/boot",
            name: "启动页面",
            component: boot
        },
        {
            path: "/login",
            name: "登录页面",
            component: login
        },
        {
            path: "/test",
            name: "test",
            component: test
        }
    ]
})
