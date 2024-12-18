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
    name: 'Stairs',
    component: () => import( /* webpackChunkName: "about" */ '../components/Stairs/index.vue')
  },
  {
    path: '/flop_cards',
    name: 'FlopCards',
    component: () => import( /* webpackChunkName: "about" */ '../components/flopCards/index.vue')
  },
  {
    path: '/chat',
    name: 'Chat',
    component: () => import( /* webpackChunkName: "about" */ '../components/chat/index.vue')
  },
  {
    path: '*',
    redirect: "/stairs"
  },
]


const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})
const lists = store.state.lists
router.beforeEach((to, from, next) => {
  const list = lists.find(list => to.path.includes(list.route));
  !!list && store.commit("setGameTitle", list.title)
  next()
})

export default router
