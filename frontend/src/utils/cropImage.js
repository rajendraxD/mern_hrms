/**
 * Create a cropped image from the source URL and crop pixel data.
 * Returns a Promise that resolves to a Blob.
 */
export const getCroppedImg = (imageSrc, pixelCrop, outputType = "image/jpeg") => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.src = imageSrc;

    image.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = pixelCrop.width;
      canvas.height = pixelCrop.height;

      ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
      );

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Canvas is empty"));
            return;
          }
          resolve(blob);
        },
        outputType,
        0.95
      );
    };

    image.onerror = () => {
      reject(new Error("Failed to load image"));
    };
  });
};

/**
 * Convert a blob to a File object with a given filename.
 */
export const blobToFile = (blob, fileName = "avatar.jpg") => {
  const extension = fileName.split(".").pop().toLowerCase();
  const mimeMap = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    webp: "image/webp",
    gif: "image/gif",
  };
  const mimeType = mimeMap[extension] || "image/jpeg";
  return new File([blob], fileName, { type: mimeType });
};
