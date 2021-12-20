<template>
  <div class="input-field range-numbers">
    <p>Диапазон параметров</p>
    <input-number :defaultValue="from" @inputEvent="acceptValueFrom"
      >От :
    </input-number>
    <input-number :defaultValue="to" @inputEvent="acceptValueTo">
      До :
    </input-number>
  </div>
</template>

<script>
import InputNumber from "./InputNumber.vue";

export default {
  name: "range-numbers",
  components: {
    "input-number": InputNumber,
  },
  data() {
    return {
      to: 9999,
      from: 1,
    };
  },
  methods: {
    acceptValueFrom(value) {
      this.from = value.length ? +value[0] : +this.from;
      this.handleRangeInput();
    },
    acceptValueTo(value) {
      this.to = value.length ? +value[0] : +this.to;
      this.handleRangeInput();
    },
    handleRangeInput() {
      if (this.to > this.from) {
        this.$emit("inputEvent", [this.from, this.to]);
      } else {
        this.$emit("inputEvent", [this.to, this.from]);
      }
    },
  },
};
</script>
