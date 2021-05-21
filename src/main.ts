import Vue from "vue";
import App from "@/App.vue";
import vuetify from "@/plugins/vuetify";
import router from "@/router";
import store from "@/store";

Vue.config.productionTip = false;

const app = new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");

// Add app to window for only for Cypress integration tests.
/* eslint-disable @typescript-eslint/no-explicit-any */
if (Object.prototype.hasOwnProperty.call(window, "Cypress")) {
  (window as any).app = app;
}
