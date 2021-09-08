import Vue from "vue"
import VueRouter from "vue-router"
import Home from "../views/Home.vue"
import post from "../views/Posting.vue"
import Signup from "../views/Signup.vue"
import Signin from "../views/Signin.vue"
import User from "@/views/User.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/post",
    name: "post",
    component: post,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/signin",
    name: "Signin",
    component: Signin,
  },
  {
    path: "/user/:uid",
    name: "user",
    component: User,
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
})

export default router
