import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"

import HelloWorld from "../components/HelloWorld.vue"
import My from "../components/My.vue"

// 配置路由
const routes: RouteRecordRaw[] = [
  { path: "/", component: My },
  { path: "/hello", component: HelloWorld }
]

// 创建router 路由
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
