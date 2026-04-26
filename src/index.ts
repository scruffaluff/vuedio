/**
 * Application entrypoint.
 */

import App from "@/App.vue";
import "@/font";
import "@/index.css";
import * as pinia from "pinia";
import type { ComponentPublicInstance } from "vue";
import * as vue from "vue";

const app = vue.createApp(App);
app.config.errorHandler = (
  err: unknown,
  _instance: ComponentPublicInstance | null,
  _info: string
) => {
  console.error(err);
};
app.use(pinia.createPinia()).mount("#app");
