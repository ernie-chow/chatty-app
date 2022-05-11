import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import authHeader from "@/services/auth-header";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView,
            meta: {
                hideForAuth: true
            }
        },
        {
            path: "/about",
            name: "about",
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import("../views/AboutView.vue")
        },
        {
            path: "/register",
            name: "register",
            component: () => import("../views/RegisterView.vue"),
            props: true
        },
        {
            path: "/chat",
            name: "chat",
            component: () => import("../views/ChatView.vue"),
            props: true,
            meta: {
                requiresAuth: true
            }
        },
    ],
});

router.beforeEach((to, from, next) => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));

    if (to.matched.some(route => route.meta.requiresAuth)) {
        if (!loggedInUser) {
            next({ name: "home" });
        } else {
            next();
        }
    } else if (to.matched.some(route => route.meta.hideForAuth)) {
        if (loggedInUser) {
            next({ name: "chat" });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;
