<template>
  <div class="input-field range-numbers">
    <p>Диапазон параметров</p>
    <input-number  @inputEvent="acceptValueFrom"
      >От :
    </input-number>
    <input-number  @inputEvent="acceptValueTo">
      До :
    </input-number>
  </div>
</template>

<script>
import { CLEAR_OTHER_INPUT, INPUT_EVENT } from '../../constants/events';
import { eventBus } from "../../event-bus";
import InputNumber from "./InputNumber.vue";

export default {
  name: "range-numbers",
  components: {
    "input-number": InputNumber,
  },
  data() {
    return {
      to: null,
      from: null,
    };
  },
  created() {
    eventBus.$on(CLEAR_OTHER_INPUT, this.changeFooterInputs);
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
      let to = this.to > this.from ? this.to : this.from;
      let from = this.to > this.from ? this.from : this.to;
      this.$emit('inputEvent' , [from , to] );
      eventBus.$emit(CLEAR_OTHER_INPUT, { from: 'range-numbers'});
    },
    changeFooterInputs({from}){
      if (from === 'range-numbers') return;
      this.$children.forEach( child => {
        if (child.$el.classList.contains('input-number')) child.$data.number = "";
      })
    }
  },
};
</script>
