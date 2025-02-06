export const isBase64Image = (str) => {
  const base64Pattern = /^data:image\/(png|jpeg|jpg|gif|bmp);base64,/;
  return base64Pattern.test(str);
};

export const base64toURL = (base64) => {
  //   console.log(base64);
  if (!isBase64Image(base64)) return base64;
  const byteString = atob(base64.split(",")[1]);
  const mimeString = base64.split(",")[0].split(":")[1].split(";")[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  const blob = new Blob([ab], { type: mimeString });
  return URL.createObjectURL(blob);
};

export const blobToBase64 = (blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      resolve(reader.result);
    };
  });
};
