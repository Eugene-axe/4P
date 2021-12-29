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
import {eventBus} from "../../event-bus";
import { CLEAR_OTHER_INPUT } from '../../constants/events';

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
  created() {
    eventBus.$on(CLEAR_OTHER_INPUT, this.changeFooterInputs);
  },
  methods: {
    nandleInputNumber(value) {
      this.emitNumber(value);
    },
    emitNumber(value){
      this.$emit('inputEvent' , value);
      eventBus.$emit(CLEAR_OTHER_INPUT , {from : 'one-number'})      
    },
    changeFooterInputs({from}){
      if ( from === 'one-number') return;
      this.$children[0].$data.number = null;      
    },
  },
};
</script>

