import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import Header from "./Header.vue";

const app = createApp(App);
const header = createApp(Header);

app.mount("#app");
header.mount("#header");
