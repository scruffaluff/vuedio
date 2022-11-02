import App from "@/App.vue";
import { createApp } from "vue";
import { registerPlugins } from "@/plugins";
import vuetify from "@/plugins/vuetify";
import { createPinia } from "pinia";

const app = createApp(App);
registerPlugins(app);
app.use(createPinia());
app.use(vuetify);
app.mount("#app");
