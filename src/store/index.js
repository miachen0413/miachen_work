import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    game_title: "",
    lists: [{
        id: 1,
        title: "首頁",
        route: "home"
      },
      {
        id: 2,
        title: "撲克牌",
        route: "poker"
      },
      {
        id: 3,
        title: "彈珠台",
        route: "pinball"
      },
      {
        id: 4,
        title: "輪盤",
        route: "roulette"
      },
      {
        id: 5,
        title: "爬梯子",
        route: "stairs"
      },
    ],
  },
  mutations: {
    setGameTitle(state, value) {
      state.game_title = value
    }
  },
  actions: {},
  modules: {}
})