<template>
  <div
    class="input-number"
    :class="{
      wrong: isWrong,
    }"
  >
    <label for="input-number">
      <slot></slot>
    </label>
    <input
      type="number"
      v-model="number"
      @input="handleOneInput"
      @blur="handleOneInput"
      id="input-number"
      placeholder="число > 0 (прим. : 1)"
    />
  </div>
</template>

<script>
export default {
  name: "input-number",
  props: {
    defaultValue: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      number: null,
      isWrong: false,
    };
  },
  created() {
    this.number = this.defaultValue;
  },
  methods: {
    handleOneInput() {
      const number = +this.number;
      if (typeof number !== "number" || number < 0) {
        this.number = null;
        this.isWrong = true;
        return;
      }
      this.isWrong = false;
      this.$emit("inputEvent", number > 0 ? [number] : []);
    },
  },
};
</script>

<style scoped>
.input-number {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
input[type="number"] {
  width: 70%;
  outline: none;
  border: none;
  border-bottom: 1px solid var(--colorDarkBlue);
  background-color: transparent;
  margin-bottom: 2px;
  padding-left: 10px;
  height: 1.2em;
  font-size: 1em;
}
input[type="number"]::-webkit-input-placeholder {
  color: var(--colorWhite);
  opacity: 0.8;
}
.wrong input[type="number"]::-webkit-input-placeholder {
  color: red;
  opacity: 0.8;
}
.wrong input[type="number"] {
  border-bottom: 1px solid red;
}
</style>
