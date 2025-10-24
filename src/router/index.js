import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import PortalHome from "../views/PortalHome.vue"; // create later

const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", component: LoginView },
  {
    path: "/portal",
    component: PortalHome,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("auth_token");
  if (to.meta.requiresAuth && !token) next("/login");
  else next();
});

export default router;
