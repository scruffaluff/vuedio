// For details on the virtual import prefix, visit
// https://vitejs.dev/guide/api-plugin.html#virtual-modules-convention.

import App from "@/App.vue";
import "@/index.css";
import { createPinia } from "pinia";
import { createApp } from "vue";

const app = createApp(App);
app.use(createPinia());
app.mount("#app");
