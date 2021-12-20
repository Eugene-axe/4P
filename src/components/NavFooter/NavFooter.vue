<template>
  <div class="nav-footer" :class="{ hide: !isOpen }">
    <div class="button-arrow" @click="openNav">{{ isOpen ? "▼" : "▲" }}</div>
    <div class="navigation-number">    
      <slot name="oneNumber"></slot>
      <slot name="rangeNumber"></slot>
      <slot name="areaNumbers"></slot>      
    </div>
  </div>
</template>

<script>
export default {
  name: "nav-footer",
  data() {
    return {
      isOpen: true,
    };
  },
  computed: {},
  methods: {
    openNav() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>

<style scoped>
.nav-footer {
  display: flex;
  flex-direction: column;
  width: var(--widthAppContainer);
  margin-left: -2px;
  height: 100px;
  position: fixed;
  bottom: 0;
  background: var(--colorWhiteBlue);
  color: var(--colorDarkBlue);
  border: 2px solid var(--colorWhite);
  border-top-left-radius: 1em;
  border-top-right-radius: 1em;
  transition: bottom 0.4s ease;
}
.hide {
  bottom: -80px;
}
.button-arrow {
  width: 100%;
  background-color: var(--colorWhite);
  color: var(--colorWhiteBlue);
  text-align: center;
  cursor: pointer;
  font-size: 0.6em;
  border-top-left-radius: 1em;
  border-top-right-radius: 1em;
}
.navigation-number {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
.navigation-number .input-field {
  padding: 0.5em;
  text-align: center;
  border-right: 1px solid var(--colorDarkBlue);
}
.navigation-number > .input-field:last-child {
  border-right: none;
}
.navigation-number .input-field:hover {
  background: radial-gradient(
    rgba(202, 247, 241, 0.55) 10%,
    transparent 80%,
    transparent
  );
}
</style>
