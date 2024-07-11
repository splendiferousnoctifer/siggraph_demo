import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import FormPage from '../views/FormPage.vue';
import FinalPage from '../views/FinalPage.vue';
import DrawingPage from '../views/DrawingPage.vue'; // Import the new page
import TapPage from '../views/TapPage.vue'; // Import the new page

const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'Home', component: Home },
  { path: '/form', name: 'FormPage', component: FormPage },
  { path: '/drawingTest', name: 'DrawingPageTest', component: DrawingPage }, // Add the new route
  { path: '/TapTest', name: 'TapPageTest', component: TapPage},
  { path: '/final', name: 'FinalPage', component: FinalPage },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
