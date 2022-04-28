// import Request from "@/utils/http";
import { getTimestamp } from "@/utils";
import axios from "axios";

const axiosInstance = axios.create();

export function getSvgFile(url) {
  // return Request.http({
  //   url: getTimestamp(url),
  //   method: "GET",
  //   responseType: "text",
  // });
  return axiosInstance.request({
    url,
    method: "get",
    responseType: "text",
  });
}
