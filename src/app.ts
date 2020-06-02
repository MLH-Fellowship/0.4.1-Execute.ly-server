import * as bodyParser from "body-parser";
import express from "express";
import { Routes } from "./routes";

class App {
  public app: express.Application;
  public routePrv: Routes = new Routes();

  constructor() {
    this.app = express();
    this.config();
    this.routePrv.routes(this.app);
  }

  private config(): void {
    // support application/json type post data
    this.app.use(bodyParser.json());
    // support application/x-www-form-urlencoded post data
    this.app.use(bodyParser.urlencoded({ extended: false }));
    // responde with indented JSON string
    this.app.set("json spaces", 2);
  }
}

export default new App().app;
