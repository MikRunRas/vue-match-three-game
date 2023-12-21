import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GameView from '../views/GameView.vue'
import HighscoreView from '../views/HighscoreView.vue'
import ProfileView from '../views/ProfileView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },  
  {
    path: '/game',
    name: 'game',
    component: GameView
  },  
  {
    path: '/highscores',
    name: 'highscores',
    component: HighscoreView
  },    
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView
  },  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
