export function uriToBlob(uri) {
  var byteString = window.atob(uri.split(",")[1]);
  var mimeString = uri.split(",")[0].split(":")[1].split(";")[0];
  var buffer = new ArrayBuffer(byteString.length);
  var intArray = new Uint8Array(buffer);
  for (var i = 0; i < byteString.length; i++) {
    intArray[i] = byteString.charCodeAt(i);
  }
  return new Blob([buffer], { type: mimeString });
}

export const getTimestamp = (url) =>
  `${urlConcatPrefix(url)}s=${new Date().getTime()}`;

export const urlConcatPrefix = (url) => {
  if (url && typeof url === "string") {
    if (url.endsWith("?") || url.endsWith("&")) {
      return url;
    }

    if (url.indexOf("?") !== -1) {
      return url + "&";
    }

    if (url.indexOf("&") !== -1) {
      return url + "&";
    }

    return url + "?";
  }
  return "";
};
