<template>
  <div class="app">
    <drop-zone v-if="isShowDropZone" @fileLoad="handlerFileLoad" />
    <div class="app__container" v-else>
      <div class="button__back" @click="destroyProtocol">
        <div class="button__back-text">вернуться</div>
      </div>
      <table-parametrs :parametrs="parametrs" />
    </div>
  </div>
</template>

<script>
import {
  NAME_STRING,
  NAME_STRING_START,
  NUMBER_CLEAR,
  NUMBER_STRING,
  STRING_WITH_NUMBER_PLUS_STATUS,
} from "./constants/regEx";
import DropZone from "./components/DropZone.vue";
import TableParametrs from "./components/TableParametrs.vue";
import { EMOJI_STATUS } from './constants/constants';

export default {
  name: "vue-comp",
  components: {
    "drop-zone": DropZone,
    "table-parametrs": TableParametrs,
  },
  data() {
    return {
      protocol: "",
    };
  },
  mounted() {
    document.addEventListener("dragover", (event) => event.preventDefault());
    document.addEventListener("drop", (event) => event.preventDefault());
  },
  computed: {
    isShowDropZone() {
      return !this.protocol;
    },
    parametrs() {
      const protocolSplitObjectsParams =
        this.protocolWhereParamsAsString.reduce((acc, item) => {
          const objParametr = this.createObjectParametr(item);
          acc.push(objParametr);
          return acc;
        }, []);
      return protocolSplitObjectsParams;
    },
    protocolWhereParamsAsString() {
      const arrayFromFileProtocol = this.protocol
        .split("Параметр")
        .reduce((acc, item, i) => {
          if (i === 0) return [];
          const param = item
            .split("\n")
            .filter((item) => item != 0) //?????
            .filter((item) => item.match(/№/) || item.match(/-?\d\d?.\d\d\d/))
            .join(" ");
          acc.push(param);
          return acc;
        }, []);
      return arrayFromFileProtocol;
    },
  },
  methods: {
    handlerFileLoad(file) {
      this.protocol = file;
    },
    createObjectParametr(arrayItem) {
      // принимает строку-параметра и возвращает объект-параметр
      const stringWithNumberPlusStatus = arrayItem.match(
        STRING_WITH_NUMBER_PLUS_STATUS
      );
      const number = Number(
        arrayItem.match(NUMBER_STRING)[0].match(NUMBER_CLEAR)[0]
      );
      const name = arrayItem
        .match(NAME_STRING)[0]
        .match(NAME_STRING_START)
        .join("")
        .trim();
      const nominal = stringWithNumberPlusStatus[2] || "";
      const rangePlus = Number(stringWithNumberPlusStatus[3]) || "";
      const rangeMinus = Number(stringWithNumberPlusStatus[4]) || "";
      const measure = Number(stringWithNumberPlusStatus[5]) || "";
      const deviance = stringWithNumberPlusStatus[6] || "";
      const pointMeasurment = stringWithNumberPlusStatus[7] || "";
      const status =
        this.emojiStatus(stringWithNumberPlusStatus[8]) ||
        this.emojiStatus(stringWithNumberPlusStatus[11]) ||
        EMOJI_STATUS.other;
      let percentDeviation = null;
      if ( deviance === '' && status !== null ) percentDeviation = status === EMOJI_STATUS.ok ? 0 : 100;
      else {
        percentDeviation = +deviance > 0 ? deviance/rangePlus*100 : deviance/rangeMinus*100;
      } 
      const objectParametr = {
        number,
        name,
        nominal,
        rangePlus,
        rangeMinus,
        measure,
        deviance,
        pointMeasurment,
        status,
        percentDeviation,
      };
      return objectParametr;
    },
    emojiStatus(status) {
      if (status === undefined) return;
      return status.trim() === "ГОДЕН" ? EMOJI_STATUS.ok : EMOJI_STATUS.bad;
    },
    destroyProtocol() {
      this.protocol = "";
    },
  },
};
</script>

<style scoped>
.app {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-x: hidden;

  --colorGood: hsl(120, 63%, 62%);
  --colorBad: hsl(20, 63%, 62%);
  --colorWhiteBlue: hsla(205, 89%, 56%, 0.9);
  --colorWhite: hsla(185, 91%, 91%, 0.8);
  --colorDarkBlue: hsla(206, 86%, 27%, 0.8);
  --border: 2px solid var(--colorWhite);
  --border-radius: 2em;
}

.app__container {
  --widthAppContainer: 950px;
  --navHeaderHeight: 80px;

  width: var(--widthAppContainer);
  margin: 0 auto;
  border: 2px solid hsl(193, 36%, 85%);
  background-color: hsla(221, 82%, 67%, 0.4);
}

.button__back {
  min-height: 30em;
  position: fixed;
  display: flex;
  align-items: center;
  width: 100px;
  left: -80px;
  top: 50%;
  transform: translateY(-50%);
  border: var(--border);
  border-bottom-right-radius: var(--border-radius);
  border-top-right-radius: var(--border-radius);
  background-color: var(--colorWhiteBlue);
  transition: all 0.3s ease;
}

.button__back-text {
  position: relative;
  margin: 0 0.1em 0 auto;
  font-size: 2em;
  padding-top: 0.5em;
  letter-spacing: 0.5em;
  writing-mode: vertical-rl;
  text-transform: uppercase;
  color: var(--colorWhite);
  text-align: justify;
  cursor: pointer;
}
.button__back-text:before {
  content: "";
  position: absolute;
  top: 0px;
  right: 1.2em;
  height: 100%;
  border-right: 25px solid var(--colorWhite);
  border-top: 6em solid transparent;
  border-bottom: 6em solid transparent;
}

.button__back:hover {
  left: -25px;
}
/*  */
</style>
