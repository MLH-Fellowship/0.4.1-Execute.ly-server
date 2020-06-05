import express, { Request, Response } from "express";

import getOutputFromCode from "./utils/getOutputFromCode";
import detectHandwritingOCR from "./utils/detectHandwritingOCR";
import { JdoodleStruct } from "./types";
/**
 * This class is used to declare routes for express application
 */
export class Routes {
  public routes(app: express.Application, upload: any): void {
    /**
     * register routes here
     */
    app.get("/", async (req: Request, res: Response) => {
      res.json(req.body);
    });

    /**
     * Description. Image -> GCloud vision for OCR
     *              Image -> Cloudinary uplaod
     *
     * @return      {object}      { OCRText, ImageURL }
     */
    app.post("/getText", upload.single("file"), async (req, res) => {
      try {
        const text = await detectHandwritingOCR(req.file.buffer);
        return res.json({ text });
      } catch (error) {
        console.error("error", error);
        return res.status(500).json({ message: "Something went wrong." });
      }
    });

    /**
     * Description.    Runs the user-code provided asynchronously
     *                 Uses JDoodle API endpoint to exceute the given code
     *
     * @return        {string}      STDout for the executed code
     */
    app.post("/getOutput", async (req, res) => {
      try {
        const program: JdoodleStruct = {
          clientId: process.env.JDOODLE_CLIENT_ID,
          clientSecret: process.env.JDOODLE_CLIENT_SECRET,
          language: req.body.lang_code,
          script: req.body.code,
          stdin: req.body.stdin ? req.body.stdin : "",
          versionIndex: req.body.lang_ver,
        };

        const output = await getOutputFromCode(program);
        return res.json({ output });
      } catch (error) {
        console.error("error", error);
        return res.status(500).json({ message: "Something went wrong." });
      }
    });
  }
}
