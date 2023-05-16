<template lang="pug">
#flop-cards
  .setting
    .set-box.col-2
      span 幾組牌：
      select(v-model="card")
        option(
          v-for="item in select_cards",
          :key="item.value",
          :value="item.value"
        ) {{ item.name }}
    button(type="submit", @click="createFlopCards") 生成牌組
  br
  .flop-cards-box
    .card-box(v-for="item in cards", :key="item.id", @click="cardTurnOn(item)")
      .front(:class="{ turn: item.turn, show: !item.show }") {{ item.value }}
      .back(:class="{ turn: item.turn, show: !item.show }")
</template>
<script>
import { sleep } from "../../unit";
export default {
  data() {
    return {
      card: 3,
      select_cards: [],
      cards: [],
      turn_card: [],
      timer: null,
      is_click: true,
    };
  },
  mounted() {
    for (let i = 3; i < 16; i++) {
      this.select_cards.push({ value: i, name: `${i} 副牌` });
    }
    this.createFlopCards();
  },
  methods: {
    createFlopCards() {
      this.cards = [];
      for (let i = 0; i < this.card; i++) {
        for (let j = 0; j < 2; j++) {
          const card_value = { value: i, turn: false, show: true };
          this.cards.push(card_value);
        }
      }
      this.cards.sort(() => Math.random() - 0.5);
      this.cards = this.cards.map((card, idx) => {
        return { ...card, id: idx };
      });
    },
    async cardTurnOn(item) {
      if (!this.is_click) return;
      if (this.turn_card[0] && item.id === this.turn_card[0].id) return;
      this.is_click = false;
      item.turn = true;
      this.turn_card.push(item);
      if (this.turn_card.length === 2) {
        if (this.turn_card.every((c) => c.value === item.value)) {
          await sleep(1500);
          this.turn_card.forEach(
            ({ id }) => (this.cards[id].show = false)
            // (this.cards = this.cards.filter((card) => card.id !== id))
          );
        } else {
          await sleep(1500);
          this.cards.forEach((c) => (c.turn = false));
        }
        this.turn_card = [];
        this.is_click = true;
      } else {
        this.is_click = true;
      }
    },
  },
};
</script>
<style lang="sass" scoped>
#flop-cards
  .setting
    display: flex
  .set-box
    width: 30%
  .flop-cards-box
    // width: 100%
    border: 1px solid
    background-color: #f7f2ea
    max-width: 880px
    // max-height: 600px
    padding: 0px 5px
    display: flex
    flex-wrap: wrap
    .card-box
      // border: 1px solid
      width: 100px
      height: 150px
      border-radius: 5px
      margin: 10px 5px
      overflow: hidden
      position: relative
      box-sizing: border-box
    .front,.back
      width: 100%
      height: 100%
      position: absolute
      left: 0
      top: 0
      backface-visibility: hidden
      opacity: 1
      transition: transform 1s, opacity .5s
      &.show
        opacity: 0
    .front
      transform: rotateY(180deg)
      // background-color: #0055ff
      border: 1px solid
      box-sizing: border-box
      border-radius: 5px
      line-height: 150px
      text-align: center
      font-size: 80px
      font-weight: bold
      &.turn
        transform: rotateY(0deg)
    .back
      transform: rotateY(0deg)
      background-color: #ff5500
      &.turn
        transform: rotateY(180deg)
</style>