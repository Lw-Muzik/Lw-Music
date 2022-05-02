import { createRouter, createWebHistory } from 'vue-router'
import Player from '../views/Home.vue';
import Initial from '../views/Initial.vue';

const routes = [ 
 {
    path: '/initial',
    component: Initial
  },{
      path: '/player',
      component: Player
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router;
