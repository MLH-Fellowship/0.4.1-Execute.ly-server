import { Request, Response } from "express";
import detectHandwritingOCR from "./utils/detectHandwritingOCR";
import getOutputFromCode from "./utils/getOutputFromCode";
import { RequestCarryingFile } from "./utils/interfaces";

/**
 * This class is used to declare routes for express application
 */
export class Routes {
  public routes(app: any): void {
    /**
     * register routes here
     */
    app.route("/").get(async (req: Request, res: Response) => {
      res.json({
        name: "executely",
      });
    });

    app.route("/api/getText").post(async (req: Request, res: Response) => {
      try {
        const { file } = req as RequestCarryingFile;
        const ocrResponse = await detectHandwritingOCR(file);

        return res.json({ ocrResponse });
      } catch (error) {
        console.error("error", error);
        return res.status(500).json({ message: "Internal Server Error" });
      }
    });

    app.route("/api/getOutput").post(async (req: Request, res: Response) => {
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
