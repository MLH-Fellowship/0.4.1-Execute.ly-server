import * as bodyParser from "body-parser";
import express from "express";
import { Routes } from "./routes";

/**
 * @class
 * @description Main class which defines the core express instance.
 */
class App {
  public app: express.Application;
  public routePrv: Routes = new Routes();

  /**
   * @constructor
   * @description create an express instance and attach the routes to it.
   */
  constructor() {
    this.app = express();
    this.config();
    this.routePrv.routes(this.app);
  }

  /**
   * @private
   * @description used to set up express application config. Set up new middlewares here
   */
  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.set("json spaces", 2);
  }
}

export default new App().app;
