import { createApp } from "vue"

import App from "./App.vue"
import store from "./store/index"
import router from "./route"

createApp(App).use(store).use(router).mount("#app")
