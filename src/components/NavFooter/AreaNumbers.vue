<template>
  <div class="input-field textarea-numbers">
    <p>Ввести список</p>
    <textarea
      id="textarea"
      cols="35"
      rows="3"
      v-model="textInput"
      placeholder="Введите сюда номера параметров без символа №, только цифры (прим. 1 , 2 , 12 )"
      @blur="handleAreaInput"
      @keydown.enter="handleAreaInput"
    ></textarea>
  </div>
</template>

<script>
import { FIND_NUMBER, SPLITTERS_FOR_TEXTAREA_NAVFOOTER } from '../../constants/regEx'

export default {
  name: "area-numbers",
  data() {
    return {
      textInput: "",
    };
  },
  methods: {
    handleAreaInput() {
      const arrayParametrs = this.textInput
        .split(SPLITTERS_FOR_TEXTAREA_NAVFOOTER)
        .filter((param) => param.length > 0 && FIND_NUMBER.test(param));
      this.emitParametrsNumbers(arrayParametrs);
    },
    emitParametrsNumbers(numbers) {
      this.$emit("inputEvent", numbers);
    },
  },
};
</script>

<style scoped>
textarea {
  outline: none;
  border: none;
  border-bottom: 1px solid var(--colorDarkBlue);
  background-color: transparent;
  margin-bottom: 2px;
  height: 1.2em;
  font-size: 1.2em;
}

textarea::-webkit-input-placeholder {
  color: var(--colorWhite);
  opacity: 0.8;
}
.textarea-numbers textarea {
  resize: none;
  height: initial;
}
</style>
