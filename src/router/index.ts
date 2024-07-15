import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import FormPage from '../views/FormPage.vue';
import FinalPage from '../views/FinalPage.vue';
import DrawingPage from '../views/DrawingPage.vue';
import TapPage from '../views/TapPage.vue';
import ButtonBig from '../views/interactionViews/ButtonLarge.vue';
import ButtonSmall from '../views/interactionViews/ButtonSmall.vue';
import SliderVerticalLargeUp from '../views/interactionViews/SliderVerticalLargeUp.vue'; 
import SliderVerticalLargeDown from '../views/interactionViews/SliderVerticalLargeDown.vue'; 
import SliderVerticalSmallUp from '../views/interactionViews/SliderVerticalSmallUp.vue';
import SliderVerticalSmallDown from '../views/interactionViews/SliderVerticalSmallDown.vue';
import SliderHorizontalLargeLeft from '../views/interactionViews/SliderHorizontalLargeLeft.vue';
import SliderHorizontalLargeRight from '../views/interactionViews/SliderHorizontalLargeRight.vue';
import SliderHorizontalSmallLeft from '../views/interactionViews/SliderHorizontalSmallLeft.vue';
import SliderHorizontalSmallRight from '../views/interactionViews/SliderHorizontalSmallRight.vue';
import SliderRadialLargeClockwise from '../views/interactionViews/SliderRadialLargeClockwise.vue';
import SliderRadialLargeCounterclockwise from '../views/interactionViews/SliderRadialLargeCounterclockwise.vue';
import SliderRadialSmallClockwise from '../views/interactionViews/SliderRadialSmallClockwise.vue';
import SliderRadialSmallCounterclockwise from '../views/interactionViews/SliderRadialSmallCounterclockwise.vue';



const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'Home', component: Home},
  { path: '/form', name: 'FormPage', component: FormPage},
  { path: '/button_large', name: 'Button Large', component: ButtonBig},
  { path: '/button_small', name: 'Button Small', component: ButtonSmall},
  { path: '/slider_vertical_large_up', name: 'Slider Vertical Large Up', component: SliderVerticalLargeUp},
  { path: '/slider_vertical_large_down', name: 'Slider Vertical Large Down', component: SliderVerticalLargeDown},
  { path: '/slider_vertical_small_up', name: 'Slider Vertical Small Up', component: SliderVerticalSmallUp},
  { path: '/slider_vertical_small_down', name: 'Slider Vertical Small Down', component: SliderVerticalSmallDown},
  { path: '/slider_horizontal_large_left', name: 'Slider Horizontal Large Left', component: SliderHorizontalLargeLeft},
  { path: '/slider_horizontal_large_right', name: 'Slider Horizontal Large Right', component: SliderHorizontalLargeRight},
  { path: '/slider_horizontal_small_left', name: 'Slider Horizontal Small Left', component: SliderHorizontalSmallLeft},
  { path: '/slider_horizontal_small_right', name: 'Slider Horizontal Small Right', component: SliderHorizontalSmallRight},
  { path: '/slider_radial_large_clockwise', name: 'Slider Radial Large Clockwise', component: SliderRadialLargeClockwise},
  { path: '/slider_radial_large_counterclockwise', name: 'Slider Radial Large Counterclockwise', component: SliderRadialLargeCounterclockwise},
  { path: '/slider_radial_small_clockwise', name: 'Slider Radial Small Clockwise', component: SliderRadialSmallClockwise},
  { path: '/slider_radial_small_counterclockwise', name: 'Slider Radial Small Counterclockwise', component: SliderRadialSmallCounterclockwise},

  { path: '/final', name: 'FinalPage', component: FinalPage},

  // test pages:
  // { path: '/drawingTest', name: 'DrawingPageTest', component: DrawingPage, meta: { order: 3 } },
  // { path: '/TapTest', name: 'TapPageTest', component: TapPage, meta: { order: 4 } },
];

// Automatically assign order based on array index
routes.forEach((route, index) => {
  route.meta = { ...route.meta, order: index + 1 };
});

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Navigation Guard to determine next route or redirect to home
router.beforeEach((to, from, next) => {
  if ((to.name === 'FinalPage' || to.meta.order > 1) && !from.name) {
    // Redirect to home if accessing final page or any other page directly
    next({ name: 'Home' });
  } else {
    next();
  }
});

function getNextRoute(currentRoute) {
  const routes = router.getRoutes();
  const currentOrder = currentRoute.meta.order;
  const nextRoute = routes.find(route => route.meta.order === currentOrder + 1);
  return nextRoute;
}

export default router;
