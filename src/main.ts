import App from "@/App.vue";
import { registerPlugins } from "@/plugins";
import vuetify from "@/plugins/vuetify";
import { createPinia } from "pinia";
import { createApp } from "vue";

const app = createApp(App);
registerPlugins();
app.use(createPinia());
app.use(vuetify);
app.mount("#app");
