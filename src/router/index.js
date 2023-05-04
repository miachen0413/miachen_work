import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/poker',
    name: 'Poker',
    component: () => import( /* webpackChunkName: "about" */ '../components/Poker/index.vue')
  },
  {
    path: '/pinball',
    name: 'Pinball',
    component: () => import( /* webpackChunkName: "about" */ '../components/Pinball/index.vue')
  },
  {
    path: '/roulette',
    name: 'Roulutte',
    component: () => import( /* webpackChunkName: "about" */ '../components/Roulette/index.vue')
  },
  {
    path: '/stairs',
    name: 'Poker',
    component: () => import( /* webpackChunkName: "about" */ '../components/Stairs/index.vue')
  },
  {
    path: '*',
    redirect: "/home"
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
const lists = store.state.lists
router.beforeEach((to, from, next) => {
  console.log("to=>", to)
  const list = lists.find(list => to.path.includes(list.route))
  console.log("-->", list)
  !!list && store.commit("setGameTitle", list.title)
  next()
})

export default router