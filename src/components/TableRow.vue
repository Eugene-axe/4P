<template>
  <div
    class="table-row"
    :style="rowStyle"
    :class="{
      hide: isBirth || parametr.hide,
      scale: scale,
    }"
    @click="handleClick"
  >
    <div
      v-for="colName in colNames"
      :key="colName"
      class="td"
      :class="colName"
      :style="rowStyle"
      v-text="parametr[colName]"
    ></div>
  </div>
</template>

<script>
import { CAP_TITLES, EMOJI_STATUS } from "../constants/constants";

export default {
  name: "table-row",
  props: {
    parametr: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isBirth: true,
      scale: false,
    };
  },
  mounted() {
    setTimeout(() => {
      this.isBirth = !this.isBirth;
    }, 0);
  },
  beforeDestroy() {
    this.isBirth = !this.isBirth;
  },
  computed: {
    colNames() {
      return Object.keys(CAP_TITLES);
    },
    colorDeviation() {
      if (this.parametr.status === EMOJI_STATUS.bad) return 20;
      if (
        this.parametr.status === EMOJI_STATUS.other &&
        this.parametr.deviance === ""
      )
        return 200;
      return this.parametr.percentDeviation < 100
        ? 120 - Math.ceil(this.parametr.percentDeviation)
        : 20;
    },
    rowStyle() {
      return {
        backgroundColor: `hsl(${this.colorDeviation}, 63%, 62%)`,
      };
    },
  },
  methods: {
    handleClick() {
      this.scale = !this.scale;
    },
  },
};
</script>

<style scoped>
.table-row {
  padding: 0.2em 0;
  transition: all 0.5s ease-out;
}
.table-row:last-child {
  margin-bottom: 25px;
}
.table-row:hover {
  position: relative;
  transform: scale(1.05);
}
.hide {
  opacity: 0.2;
  border: none;
}
.scale {
  transform: scale(1.05);
}
</style>
