<template lang="pug">
#stairs
  .setting
    .set-box.col-2
      span 幾條路：
      select(v-model="straight")
        option(v-for="item in straights", :key="item.name", :value="item.name") {{ item.value }}
    .set-box.col-2
      span 幾個橫軸：
      select(v-model="horizontal")
        option(
          v-for="item in horizontals",
          :key="item.name",
          :value="item.name"
        ) {{ item.value }}
    button(type="submit", @click="createStairs") 生成梯子
  br
  //- .btn-box
  //-   button.btn(
  //-     type="submit",
  //-     v-for="(item, idx) in straight",
  //-     :key="item.idx",
  //-     @click="getRoadPosition(item - 1)"
  //-   ) 第 {{ item }} 條路
  .stairs-box(ref="stairsBox")
</template>
<script>
// import * as PIXI from "pixi.js";
import * as PIXIBasic from "../../unit/pixiBasic";
export default {
  data() {
    return {
      app: null,
      loader: new this.PIXI.Loader(),
      resources: null,
      stairs_container: null,
      road_container: null,
      start_doll_container: null,
      grey_filter: null,
      road: null,
      roadSetUp: () => {},
      app_width: 900,
      app_height: 600,
      boundary: {
        min_x: 100,
        min_y: 50,
        max_x: 800,
        max_y: 550,
      },
      stairs_style: { width: 15, color: 0xb86741, alpha: 1 },
      road_style: {
        width: 20,
        alignment: 0.5,
        color: 0x48afa7,
        alpha: 1,
        join: "round",
        miterLimit: 100,
      },
      road_position: [],
      straights: [],
      straight: 3,
      straight_position: [],
      horizontals: [],
      horizontal: 8,
      horizontal_position: [],
      start_doll_name: ["eggHead", "flowerTop", "helmlok", "skully"],
      is_start_doll_click: false,
      start_doll_sprite: [],
    };
  },
  mounted() {
    this.init();
  },
  watch: {
    straight: {
      handler(val) {
        this.horizontals = [];
        for (let i = val - 1; i <= val + 3; i++)
          this.horizontals.push({ value: i, name: i });
        this.horizontal = this.horizontals[2].name;
      },
      immediate: true,
    },
    is_start_doll_click(is_click) {
      this.start_doll_sprite.forEach((sprite) => {
        let filters = [];
        sprite.interactive = is_click;
        if (!is_click) filters = [this.grey_filter];
        sprite.filters = filters;
      });
    },
  },
  methods: {
    init() {
      this.straights = [];
      for (let i = 3; i <= 5; i++)
        this.straights.push({ value: `${i} 列`, name: i });
      this.app = new this.PIXI.Application({
        width: this.app_width,
        height: this.app_height,
        backgroundColor: 0xf7f2ea,
      });
      this.grey_filter = new this.PIXI.filters.ColorMatrixFilter();
      this.grey_filter.greyscale(0.2);
      this.stairs_container = new this.PIXI.Container();
      this.road_container = new this.PIXI.Container();
      this.start_doll_container = new this.PIXI.Container();
      this.app.stage.addChild(
        this.stairs_container,
        this.road_container,
        this.start_doll_container
      );
      this.$refs.stairsBox.appendChild(this.app.view);
      this.resources = this.loader.resources;
      this.loader
        .add("eggHead", "/assets/doll/eggHead.png")
        .add("flowerTop", "/assets/doll/flowerTop.png")
        .add("helmlok", "@/doll/helmlok.png")
        .add("skully", "@/doll/skully.png");
      this.loader.load(() => {
        this.createStairs();
      });
    },
    createStairs() {
      this.app.ticker.remove(this.roadSetUp);
      this.horizontal_position = [];
      this.stairs_container.removeChildren();
      this.road_container.removeChildren();
      this.start_doll_container.removeChildren();
      this.start_doll_sprite.forEach((sprite) => sprite.destroyed);
      this.start_doll_sprite = [];
      const { min_x, min_y, max_y } = this.boundary;
      const distance_x = Math.ceil(
        (this.app_width - 2 * min_x) / (this.straight - 1)
      );
      this.straight_position = [];
      let horizontal_start = [];
      for (let i = 0; i < this.straight; i++) {
        const x = min_x + distance_x * i;
        this.initStartSprite(i, x);
        this.straight_position.push({ x, y: min_y });
        const straight = new this.PIXI.Graphics();
        straight.lineStyle(this.stairs_style);
        straight.moveTo(x, min_y);
        straight.lineTo(x, max_y);
        this.stairs_container.addChild(straight);
      }
      for (let i = 0; i < this.horizontal; i++) {
        // const level = i % (this.straight - 1),
        //   assign = (this.app_height - 200) / (this.straight - 1);
        const random_x =
          i < this.straight - 1
            ? i
            : Math.floor(Math.random() * (this.straight - 1));
        const x = this.straight_position[random_x].x;
        const last_point_x =
            random_x > 0
              ? this.straight_position[random_x - 1].x || null
              : null,
          next_point_x = this.straight_position[random_x + 1].x || null;
        let random_y;

        const getRandomY = () => {
          random_y = Math.ceil(min_y + 50 + Math.random() * 400);
          for (let j = 0; j < horizontal_start.length; j++) {
            const { x: point_x, y: point_y } = horizontal_start[j];
            if (
              [x, last_point_x, next_point_x].includes(point_x) &&
              random_y >= point_y - 50 &&
              random_y <= point_y + 50
            ) {
              getRandomY();
              break;
            }
          }
        };
        getRandomY();

        const start_point = { x, y: random_y };
        const horizontal = new this.PIXI.Graphics();
        horizontal.lineStyle(this.stairs_style);
        horizontal.moveTo(start_point.x, start_point.y);
        horizontal.lineTo(distance_x + start_point.x, start_point.y);
        horizontal_start.push({ x: start_point.x, y: start_point.y });
        this.stairs_container.addChild(horizontal);
      }
      this.horizontal_position = horizontal_start.sort((a, b) => a.y - b.y);
      this.is_start_doll_click = true;
      // this.getRoadPosition();
    },
    initStartSprite(whitch_road, x) {
      const start_doll = this.start_doll_name[whitch_road % 4];
      const sprite = PIXIBasic.getPIXISprite(
        this.resources[start_doll].texture,
        x,
        0
      );
      sprite.anchor.set(0.5, 0);
      sprite.scale.set(0.4, 0.4);
      sprite.cursor = "pointer";
      sprite.on("pointerdown", onClick);
      const _this = this;
      function onClick() {
        _this.getRoadPosition(whitch_road);
      }
      this.start_doll_sprite.push(sprite);
      sprite.interactive = true;
      this.start_doll_container.addChild(sprite);
    },
    getRoadPosition(road) {
      // if (this.road !== null) this.road.clear();
      this.is_start_doll_click = false;
      this.road_container.removeChildren();
      let start_road = road;
      this.road_position = [];
      let { x: now_x, y: now_y } = this.straight_position[start_road];
      this.road_position.push({ x: now_x, y: now_y });
      this.horizontal_position.forEach(({ x: pos_x, y: pos_y }) => {
        const last_x =
          start_road === 0 ? null : this.straight_position[start_road - 1].x;
        if (pos_y > now_y && [last_x, now_x].includes(pos_x)) {
          // let next_x;
          this.road_position.push({ x: now_x, y: pos_y });
          if (pos_x === now_x) start_road += 1;
          else if (pos_x === last_x) start_road -= 1;
          this.road_position.push({
            x: this.straight_position[start_road].x,
            y: pos_y,
          });
          now_x = this.straight_position[start_road].x;
        }
      });
      this.road_position.push({ x: now_x, y: this.boundary.max_y });

      this.drawRoad();
    },
    drawRoad() {
      // const start_road = 0;
      this.road = new this.PIXI.Graphics();
      this.road.lineStyle(this.road_style);
      let count = 0,
        now_x = this.road_position[count].x,
        now_y = this.road_position[count].y,
        next_x = now_x,
        next_y = now_y;
      this.roadSetUp = (delta) => {
        const speed = 10 * delta;
        const last_x_point = now_x;
        this.road.moveTo(now_x, now_y);
        if (
          next_x === this.road_position[count].x &&
          next_y === this.road_position[count].y
        ) {
          now_x = this.road_position[count].x;
          now_y = this.road_position[count].y;
          count++;
        }
        if (count >= this.road_position.length) {
          this.app.ticker.remove(this.roadSetUp);
          this.is_start_doll_click = true;
          return;
        }
        const { x, y } = this.road_position[count];
        this.road.lineTo(next_x, next_y);
        if (last_x_point < x) {
          next_x += speed;
          if (next_x > x) {
            next_x = x;
          }
        } else if (last_x_point > x) {
          next_x -= speed;
          if (next_x < x) {
            next_x = x;
          }
        } else if (last_x_point === x && next_y === y) {
          next_x = x;
        }
        if (next_y + speed >= y) {
          next_y = y;
        } else {
          next_y += speed;
        }
        this.road.lineTo(next_x, next_y);
      };
      this.app.ticker.add(this.roadSetUp);
      this.road.endFill();
      this.road_container.addChild(this.road);
    },
  },
};
</script>
<style lang="sass" scoped>
#stairs
  .setting
    display: flex
  .set-box
    width: 30%
  .stairs-box
    // width: 100%
    max-width: 900px
</style>