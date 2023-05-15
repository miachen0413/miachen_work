<template lang="pug">
#left-bar
  ul
    li.list(v-for="list in lists", :key="list.id", @click="goToRoute(list)") {{ list.title }}
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      lists: (state) => state.lists,
    }),
  },
  methods: {
    goToRoute(list) {
      this.$router.push({
        path: "/" +list.route,
      });
    },
  },
};
</script>
<style lang="sass" scoped>
#left-bar
  .list
    padding: 1rem
    cursor: pointer
</style>