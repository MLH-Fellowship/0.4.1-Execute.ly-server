import { Request, Response } from "express";

/**
 * This class is used to declare routes for express application
 */
export class Routes {
  public routes(app: any): void {
    /**
     * register routes here
     */
    app.route("/").get(async (req: Request, res: Response) => {
      res.json(req.body);
    });
  }
}
