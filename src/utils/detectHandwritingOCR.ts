import vision from "@google-cloud/vision";

export default function detectHandwritingOCR(fileBuffer: Buffer): Promise<any> {
  return new Promise((resolve, reject) => {
    const client = new vision.ImageAnnotatorClient();

    const request = {
      feature: {
        languageHints: ["en-t-i0-handwrit"],
      },
      image: {
        content: fileBuffer,
      },
    };

    return client
      .documentTextDetection(request)
      .then((results) => {
        const { fullTextAnnotation } = results[0];
        resolve(fullTextAnnotation.text);
      })
      .catch((err) => {
        console.error("[ERROR]: ", err);
        reject(err);
      });
  });
}
