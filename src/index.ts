/**
 * This file generates a server instance
 */
import dotenv from "dotenv";
import path from "path";
dotenv.config();

process.env.GOOGLE_APPLICATION_CREDENTIALS = path.join(
  __dirname,
  "..",
  process.env.GOOGLE_CLOUD_JSON
);

const PORT = process.env.SERVER_PORT;
import app from "./app";

app.listen(PORT, () => {
  console.log("Express server listening on port " + PORT);
});
