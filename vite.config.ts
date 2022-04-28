/*
 * @Descripttion: 文件描述
 * @version: 1.0
 * @Author: 谭义洋
 * @Date: 2022-02-10 11:14:28
 * @LastEditors: 谭义洋
 * @LastEditTime: 2022-02-10 11:21:35
 */
import { fileURLToPath, URL } from "url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import svgLoader from "vite-svg-loader";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), svgLoader()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    port: 3006,
    proxy: {
      "/custom": {
        target: "https://gxzn-free.oss-cn-zhangjiakou.aliyuncs.com",
        changeOrigin: true,
      },
    },
  },
});
