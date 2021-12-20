<template>
  <div class="input-field one-number" ref="one-number">
    <p>Найти параметр</p>
    <input-number @inputEvent="nandleInputNumber" :isActive="isActive">
       Номер : 
    </input-number>
  </div>
</template>

<script>
import InputNumber from "./InputNumber.vue";

export default {
  name: "one-number",
  components: {
    "input-number": InputNumber,
  },
  props : {
    isActive : {
      type : Boolean,
      default: false,
    }
  },
  methods: {
    nandleInputNumber(value) {
      this.emitNumber(value);
    },
    emitNumber(value){
      this.$emit('inputEvent' , value);
    }
  },
};
</script>

