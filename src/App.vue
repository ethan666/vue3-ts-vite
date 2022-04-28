<script setup>
import { ref, nextTick } from "vue";
import { svgAsPngUri } from "@/utils/saveSvgAsPng";
// import { saveSvgAsPng, svgAsPngUri } from "save-svg-as-png";
import { saveAs } from "file-saver";
import { changeDpiBlob } from "changedpi";
import { getSvgFile } from "@/api/order";
import { uriToBlob } from "@/utils/index";
import MySvg from "@/assets/svg/b.svg";
import Svg2 from "oslllo-svg2";

const svgData = ref("");
const svgUrl =
  "http://gxzn-free.oss-cn-zhangjiakou.aliyuncs.com/model-data-center/test-model/fenmian/a.svg";
// const svgUrl =
//   "http://gxzn.free.obs.glinsunai.com/custom/2022/4/26/custom-20220426-220341-740-330aa660ec14416c809556b391bfdc29.svg";
// const svgUrl =
//   "http://gxzn.free.obs.glinsunai.com/custom/2022/4/26/custom-20220426-220341-740-330aa660ec14416c809556b391bfdc29.svg";

const download = async () => {
  const { data } = await getSvgFile(svgUrl);
  svgData.value = data;
  nextTick(async () => {
    const svgDom = document.querySelector("#svg-to-jpg-box svg");
    const w = Number.parseFloat(svgDom.getAttribute("width"));
    const h = Number.parseFloat(svgDom.getAttribute("height"));
    const width = (w * 150) / 25.4;
    const height = (h * 150) / 25.4;
    const uri = await svgAsPngUri(svgDom, {
      // width: w,
      // height: h,
      scale: 75 / 25.4,
      backgroundColor: "#fff",
    });
    const blob = uriToBlob(uri);
    const nb = await changeDpiBlob(blob, 150);
    saveAs(nb, `排料文件-${2}.png`);
  });
};

const download1 = async () => {
  const svgDom = document.querySelector("#aaa");
  const w = Number.parseFloat(svgDom.getAttribute("width"));
  const h = Number.parseFloat(svgDom.getAttribute("height"));
  svgDom.setAttribute("viewBox", `0 0 ${w} ${h}`);
  await new Promise((resolve, reject) => {
    setTimeout(resolve, 1000);
  });
  const width = (w * 150) / 25.4;
  const height = (h * 150) / 25.4;
  // const uri = await svgAsPngUri(svgDom, { width, height });
  const uri = await svgAsPngUri(svgDom);
  const blob = uriToBlob(uri);
  const nb = await changeDpiBlob(blob, 150);
  saveAs(nb, `排料文件-${2}.png`);
};

const download3 = () => {
  Svg2(svgUrl)
    .png()
    .toFile("./path/to/save/example.png")
    .then(() => {
      console.log("done");
    })
    .catch((error) => {
      throw error;
    });
};
</script>

<template>
  <div>
    <button @click="download3">下载</button>
    <div id="svg-to-jpg-box" v-html="svgData"></div>
    <!-- <MySvg id="aaa" /> -->
  </div>
</template>

<style>
@import "@/assets/base.css";

#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;

  font-weight: normal;
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}

nav {
  width: 100%;
  font-size: 12px;
  /* text-align: center; */
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  body {
    /* display: flex;
    place-items: center; */
  }

  #app {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 0 2rem;
  }

  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
