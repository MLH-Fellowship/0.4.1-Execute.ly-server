import express, { Request, Response } from "express";
import detectHandwritingOCR from "./utils/detectHandwritingOCR";
import getOutputFromCode from "./utils/getOutputFromCode";

/**
 * This class is used to declare routes for express application
 */
export class Routes {
  public routes(app: express.Application, upload: any): void {
    /**
     * register routes here
     */
    app.get("/", async (req: Request, res: Response) => {
      res.json({
        name: "executely",
      });
    });

    app.post("/getText", upload.single("file"), async (req, res) => {
      try {
        const ocrResponse = await detectHandwritingOCR(req.file.buffer);

        return res.json({ text: ocrResponse });
      } catch (error) {
        console.error("error", error);
        return res.status(500).json({ message: "Internal Server Error" });
      }
    });

    app.post("/getOutput", async (req, res) => {
      try {
        const program = {
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
