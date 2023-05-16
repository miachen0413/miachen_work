<template lang="pug">
#app
  .title
    h1 Mia Chen Work
  .content
    leftBar.left.col-2.col-lg-2.col-md-4.col-sm-1
    .middle.col-10.col-lg-10.col-md-8.col-sm-11
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
<style lang="sass">
@import "src/assets/sass/basic.sass"
</style>
<style lang="sass" scoped>
#app
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
      height: 100%
    .middle
      height: 100%
      padding: 10px
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
