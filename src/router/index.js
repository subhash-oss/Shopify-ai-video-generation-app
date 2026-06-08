import { createRouter, createWebHistory } from "vue-router"
import SignUp from "../views/SignUp.vue"
import SignIn from "../views/SignIn.vue"
import EmailValidation from "../views/EmailValidation.vue"
import Password from "../views/Password.vue"
import ForgotPassword from "../views/ForgotPassword.vue"
import ResetLink from "../views/ResetLink.vue"
import ResetPassword from "../views/ResetPassword.vue"
import PasswordUpdation from "../views/PasswordUpdation.vue"
import Home from "../views/Home.vue"
import Settings from "../views/Settings.vue"

const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/settings",
    name: "Settings",
    component: Settings,
  },
  {
    path: "/signup",
    name: "SignUp",
    component: SignUp,
  },
  {
    path: "/signin",
    name: "SignIn",
    component: SignIn,
  },
  {
    path: "/email-validation",
    name: "EmailValidation",
    component: EmailValidation,
  },
  {
    path: "/password",
    name: "Password",
    component: Password,
  },
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: ForgotPassword,
  },
  {
    path: "/reset-link",
    name: "ResetLink",
    component: ResetLink,
  },
  {
    path: "/reset-password",
    name: "ResetPassword",
    component: ResetPassword,
  },
  {
    path: "/password-updation",
    name: "PasswordUpdation",
    component: PasswordUpdation,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
