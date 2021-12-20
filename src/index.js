import './style/reset.css'
import './style/style.css'

import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

new Vue({
  render : (h) => h(App),
}).$mount("#app");

