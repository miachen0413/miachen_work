<template lang="pug">
#left-bar
  ul
    li.list(v-for="list in lists", :key="list.id", @click="goToRoute(list)")
      i.fi(:class="icon_alias[list.route]")
      span {{ list.title }}
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      icon_alias: {
        home: "fi-rr-home",
        poker: "fi-rr-playing-cards",
        pinball: "fi-rr-dice-alt",
        roulette: "fi-rr-globe-snow",
        stairs: "fi-rr-water-ladder",
        chat: "fi-rr-comment-alt",
        flop_cards: "fi-rr-nfc",
      },
    };
  },
  computed: {
    ...mapState({
      lists: (state) => state.lists,
    }),
  },
  methods: {
    goToRoute(list) {
      this.$router.push({
        path: "/" + list.route,
      });
    },
  },
};
</script>
<style lang="sass" scoped>
#left-bar
  overflow: hidden
  .list
    padding: 1rem
    cursor: pointer
    list-style: none
  span
    margin-left: 20px
</style>