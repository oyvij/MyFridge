import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue'; // Assuming you have a LoginView for unauthenticated users
import RegisterView from '../views/RegisterView.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomeView,
        meta: { requiresAuth: true } // This route requires authentication
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginView,
        meta: { guest: true } // Only accessible to non-authenticated users
    },
    {
        path: '/register',
        name: 'Register',
        component: RegisterView,
        meta: { guest: true }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const isAuthenticated = sessionStorage.getItem('accountTokenId');
    if (to.meta.requiresAuth && !isAuthenticated) {
        next({ name: 'Login' });
    } else if (to.meta.guest && isAuthenticated) {
        next({ name: 'Home' });
    } else {
        next();
    }
});

export default router;
