export const Base64ToBlob = (base64: string): Promise<FormData> => {
  return new Promise((resolve) => {
    fetch(base64)
    .then(res => res.blob())
    .then(blob => {
      const fd = new FormData();
      const file = new File([blob], "avatar.jpeg");
      fd.append('file', file)
      resolve(fd);
    });
  });
}
