<template>
  <div class="table-container">
    <nav-header @moreThisPercent="acceptDeviance" />
    <div class="table-parametrs">
      <div class="table-cap table-row">
        <div
          v-for="title in Object.keys(capTitles)"
          :key="title"
          class="th"
          :class="title"
          v-text="capTitles[title]"
        ></div>
      </div>
      <div class="table-rows">
        <table-row
          v-for="parametr in filteredParametrs"
          :key="parametr.number + parametr.measure"
          :parametr="parametr"
        />
      </div>
    </div>
    <nav-footer>
      <template v-slot:oneNumber>
        <one-number @inputEvent="acceptParametrsNumbers" />
      </template>
      <template v-slot:rangeNumber>
        <range-numbers @inputEvent="acceptParametrsNumbers" />
      </template>
      <template v-slot:areaNumbers>
        <area-numbers @inputEvent="acceptParametrsNumbers" />
      </template>
    </nav-footer>
  </div>
</template>

<script>
import { CAP_TITLES } from "../constants/constants";
import TableRow from "./TableRow.vue";
import NavHeader from "./NavHeader.vue";
import NavFooter from "./NavFooter/NavFooter.vue";
import OneNumber from "./NavFooter/OneNumber.vue";
import RangeNumbers from "./NavFooter/RangeNumbers.vue";
import AreaNumbers from "./NavFooter/AreaNumbers.vue";
import { eventBus } from "../event-bus";

export default {
  name: "table-parametrs",
  components: {
    "table-row": TableRow,
    "nav-header": NavHeader,
    "nav-footer": NavFooter,
    "one-number": OneNumber,
    "range-numbers": RangeNumbers,
    "area-numbers": AreaNumbers,
  },
  props: {
    parametrs: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      filteredParametrs: [],
      deviance: 0,
      inputFieldKeys: {
        "one-number": "1",
        "range-numbers": "2",
        "textarea-numbers": "3",
      },
    };
  },
  created() {
    eventBus.$on('inputEvent' , this.acceptParametrsNumbers );
  },
  mounted() {
    this.filteredParametrs = this.parametrs;
  },
  computed: {
    capTitles() {
      return CAP_TITLES;
    },
  },
  methods: {
    acceptDeviance(deviance) {
      this.hideParametrsWithDevainceSmall(deviance);
      setTimeout(() => {
        this.filterTableForDeviance(deviance);
        this.deviance = deviance;
      }, 500);
    },
    filterTableForDeviance(deviance) {
      this.filteredParametrs = this.parametrs.filter((parametr) => {
        if (!deviance) return this.parametrs;
        return parametr.percentDeviation > deviance;
      });
    },
    hideParametrsWithDevainceSmall(deviance) {
      if (deviance > this.deviance) {
        this.filteredParametrs = this.mapDevianceParametrsRight(
          this.filteredParametrs,
          deviance
        );
      } else {
        this.filteredParametrs = this.mapDevianceParametrsLeft(
          this.parametrs,
          deviance
        );
      }
    },
    mapDevianceParametrsRight(parametrs, deviance) {
      return parametrs.map((parametr) => {
        if (parametr.percentDeviation < deviance) {
          parametr = { ...parametr, hide: true };
        }
        return parametr;
      });
    },
    mapDevianceParametrsLeft(parametrs, deviance) {
      return this.parametrs.filter(
        (parametr) => parametr.percentDeviation > deviance
      );
    },
    acceptParametrsNumbers({value : numbers}) {
      if (numbers === 'continue') return;
      // let numbers = value;
      const actions = {
        0: () => {
          this.filteredParametrs = this.parametrs;
        },
        1: () => {
          this.filteredParametrs = this.parametrs.filter((parametr) => {
            return +parametr.number === +numbers[0];
          });
        },
        2: () => {
          this.filteredParametrs = this.parametrs.filter(
            (parametr) =>
              +parametr.number >= +numbers[0] && +parametr.number <= +numbers[1]
          );
        },
        3: () => {
          numbers.sort((a, b) => +a - +b);
          this.filteredParametrs = numbers
            .map((number) =>
              this.parametrs.find((parametr) => +parametr.number === +number)
            )
            .filter((item) => item !== undefined);
        },
      };
      actions[numbers.length > 2 ? 3 : numbers.length]();
    },
  },
};
</script>

<style scoped>
.table-parametrs {
  margin-top: var(--navHeaderHeight);
  width: 100%;
  color: var(--colorDarkBlue);
}

.table-parametrs >>> .table-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.table-cap {
  font-weight: bold;
  color: var(--colorWhite);
}
.table-row {
  border-bottom: 1px solid var(--colorDarkBlue);
}
.table-row:last-child {
  border: none;
}
.table-row .th,
.table-row >>> .td {
  flex-basis: 100px;
  width: 100%;
  text-align: center;
  border-right: 1px solid var(--colorDarkBlue);
  overflow: hidden;
}
.table-row .th:last-of-type,
.table-row >>> .td:last-of-type {
  border-right: none;
}
.table-row .th.name,
.table-row >>> .td.name {
  flex-basis: 300px;
  overflow: hidden;
}
.table-row .th.number,
.table-row >>> .td.number {
  flex-basis: 40px;
}
.table-row .th.status,
.table-row >>> .td.status {
  flex-basis: 60px;
}
</style>
