/*global Vue*/
import Router from 'vue-router'
import boot from "@/boot";
import login from "@/login";
import home from "@/home";
import setting from "@/setting";
import about from "@/about";

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
            path: "/setting",
            name: "设置页面",
            component: setting
        },
        {
            path: "/about",
            name: "关于页面",
            component: about
        }
    ]
})
