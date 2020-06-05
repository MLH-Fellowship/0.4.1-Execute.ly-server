import vision from "@google-cloud/vision";
import { OCRApiResponse } from "./interfaces";

function detectHandwritingOCR(fileBuffer: any): any {
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

    client
      .documentTextDetection(request)
      .then((results: any) => {
        const { fullTextAnnotation } = results[0] as OCRApiResponse;
        resolve(fullTextAnnotation.text);
      })
      .catch((err: any) => {
        console.error(`Error : ${err.message}`);
        reject(err);
      });
  });
}

export default detectHandwritingOCR;
