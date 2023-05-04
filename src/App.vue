<template lang="pug">
#app
  .title
    h1 Mia Chen Work
  .content
    leftBar.left
    .middle
      h3 {{ game_title }}
      router-view
</template>
<script>
import { mapState } from "vuex";
import LeftBar from "./views/leftBar.vue";
export default {
  components: {
    LeftBar,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      game_title: (state) => state.game_title,
    }),
  },
};
</script>
<style lang="sass" scoped>
body
  margin: 0
#app
  @media (min-width: 1200px)
    font-size: 16px
  /* desktops */
  @media (max-width: 992px)
    font-size: 18px
  /* tablets */
  @media (max-width: 768px)
    font-size: 20px
  /* phones */
  @media (max-width: 576px)
    font-size: 22px
  .title
    border-bottom: 2px solid
    text-align: center
    height: 6vh
    width: 100vw
  .content
    height: 94vh
    width: 100vw
    display: flex
    .left
      border-right: 1px solid
      width: 30%
      height: 100%
    .middle
      width: 70%
      height: 100%
//   font-family: Avenir, Helvetica, Arial, sans-serif
//   -webkit-font-smoothing: antialiased
//   -moz-osx-font-smoothing: grayscale
//   text-align: center
//   color: #2c3e50

// #nav
//   padding: 30px

//   a
//     font-weight: bold
//     color: #2c3e50

//     &.router-link-exact-active
//       color: #42b983
</style>
