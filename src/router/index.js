//导入路由
import VueRouter from "vue-router";
import Vue from "vue";
import Index from "../views/Index";

Vue.use(VueRouter);

//2.创建路由对象
const router = new VueRouter({
    routes: [
        {
            path: '/',
            redirect: '/index',
        },
        {
            path: "/coder/:coder",
            component: Index,
        },
    ],
    mode: 'history',
});
//导出router 实例
export default router;
