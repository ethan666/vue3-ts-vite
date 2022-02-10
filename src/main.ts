/*
 * @Descripttion: 文件描述
 * @version: 1.0
 * @Author: 谭义洋
 * @Date: 2022-02-10 11:14:28
 * @LastEditors: 谭义洋
 * @LastEditTime: 2022-02-10 11:24:35
 */
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(router);

app.mount("#app");
