import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Users from '../components/user/Users.vue'
import {
	getToken
} from '@/utils/auth'

Vue.use(VueRouter)

const router = new VueRouter({
	routes: [
		{
			path: "/",
			redirect: '/login'
		},
		{
			path: "/login",
			component: Login
		},
		{
			path: "/home",
			component: Home,
			redirect: "/welcome",
			children:[
				{
					path: "/welcome",
					component: Welcome
				},
				{
					path: "/user_list",
					component: Users
				}
			]}
	]
})

//导航守卫
router.beforeEach((to,from,next)=>{
	//to访问路径
	//从哪里跳转
	//放行
	if(to.path ==="/login") return next()
	const token = getToken()
	if(!token) return next('/login')
	next()
})

export default router
