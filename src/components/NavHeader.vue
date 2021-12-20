<template>
  <div class="nav-header">
    <div class="nav-range">
      <div class="range__color"></div>
      <div class="nav-range__input">
        <input
          type="range"
          min="0"
          max="100"
          v-model="currentValue"
          step="1"
          id="percentRange"
          ref="range"
          @input="handlerRangeInput"
        />
      </div>
      <div class="current-value" :style="currentValue_style">
        <span v-text="currentValue"></span>
      </div>
    </div>
    <div class="gradations-container">
      <div class="nav-gradations">
        <div
          class="nav-gradation__cell"
          :class="{
            action:
              currentValue >= gradation &&
              currentValue <
                step + (currentValue === 100 ? gradation + 1 : gradation),
          }"
          v-for="(gradation, i) in gradations"
          :key="gradation"
          v-text="romanGradation[i].roman"
          @click="gradationHandler(gradation)"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
//
import { ROMAN_NUMS } from "../constants/constants";

export default {
  name: "nav-header",
  data() {
    return {
      step: 20,
      currentGradation: "",
      currentValue: 0,
      firstClickX: 0,
      widthThumb: 15,
      widthRange: 0,
    };
  },
  mounted() {
    this.widthRange = +this.$refs.range.clientWidth;
  },
  computed: {
    gradations() {
      const grad = [];
      let nextStep = 0;
      while (nextStep < 100) {
        grad.push(nextStep);
        nextStep += this.step;
      }
      return grad;
    },
    romanGradation() {
      return ROMAN_NUMS;
    },
    currentValue_style() {
      return {
        left: this.offsetX + "px",
      };
    },
    widthOneStep() {
      return (this.widthRange - this.widthThumb - 7) / 100;
    },
    offsetX() {
      return this.widthThumb + this.currentValue * this.widthOneStep;
    },
  },
  methods: {
    handlerRangeInput(event) {
      // this.changeCurrentValue(+event.target.value);
      this.$emit("moreThisPercent", +this.currentValue);
    },
    gradationHandler(gradation) {
      this.changeCurrentValue(gradation);
    },
    changeCurrentValue(value) {
      this.currentValue = value;
      this.$emit("moreThisPercent", value);
    },
  },
};
</script>

<style scoped>
.nav-header {
  width: var(--widthAppContainer);
  height: var(--navHeaderHeight);
  top: 0;
  padding-top: 10px;
  margin-left: -2px;
  position: fixed;
  border: 2px solid var(--colorWhite);
  border-bottom-left-radius: 2em;
  border-bottom-right-radius: 2em;
  display: flex;
  align-items: center;
  background-color: var(--colorWhiteBlue);
  color: var(--colorDarkBlue);
}
.nav-range {
  flex: 1;
  margin-top: -15px;
}
.nav-range__input {
  width: 100%;
  padding: 2px 10px 2px 30px;
}
.nav-range__input:before {
  content: "0";
  position: relative;
  top: 0px;
  left: -5px;
}
.nav-range__input:after {
  content: "100%";
  position: relative;
  top: 0px;
  right: 50px;
}
.nav-range__input input {
  background-color: inherit;
  width: 80%;
  -webkit-appearance: none;
}
.nav-range__input input[type="range"]::-webkit-slider-runnable-track {
  border-radius: 2px;
  height: 30px;
  border: 2px solid var(--colorWhiteBlue);
  background: linear-gradient(to right, var(--colorGood), var(--colorBad));
}
.nav-range__input input[type="range"]::-webkit-slider-thumb {
  background: var(--colorWhite);
  border: 1px solid gray;
  border-radius: 2px 2px 10px 10px;
  cursor: pointer;
  width: 15px;
  height: 40px;
  -webkit-appearance: none;
  margin-top: 0px;
}
.nav-range .current-value {
  display: block;
  top: 10px;
  padding: 0px 10px 0px 30px;
  position: relative;
}
.gradations-container {
  margin-top: -15px;
  flex: 1;
}
.nav-gradations {
  display: flex;
  justify-content: space-around;
  font-size: 1.2em;
}
.nav-gradation__cell {
  flex: 1;
  padding: 1em 0;
  border-left: 1px solid var(--colorDarkBlue);
  text-align: center;
  cursor: pointer;
  transition: background 0.3s ease;
}
.nav-gradation__cell:hover {
  background: radial-gradient(
    rgba(202, 247, 241, 0.35) 10%,
    transparent 80%,
    transparent
  );
}
.nav-gradation__cell.action {
  background: radial-gradient(
    rgba(202, 247, 241, 0.55) 30%,
    transparent 72%,
    transparent
  );
}
</style>
