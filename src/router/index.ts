import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/LoginView.vue';
import Register from '../views/RegisterView.vue';
import Dashboard from '../views/DashboardView.vue';
import Sets from '../views/SetsView.vue';
import Set from '../views/SetView.vue';


const routes = [
        {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/',
        name: 'Dashboard',
        component: Dashboard
    },
    {
        path: '/sets',
        name: 'Sets',
        component: Sets
    },
    { 
        path: '/sets/:id', 
        name: 'set', 
        component: Set 
    }
]


const router = createRouter({
    history: createWebHistory(),
    routes
  })

  export default router