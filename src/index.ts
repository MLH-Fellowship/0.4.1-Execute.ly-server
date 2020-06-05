/**
 * This file generates a server instance
 */
import dotenv from "dotenv";
import path from "path";
import app from "./app";
dotenv.config();

const PORT = process.env.SERVER_PORT || 3069;

process.env.GOOGLE_APPLICATION_CREDENTIALS = path.join(
  __dirname,
  "../..",
  process.env.GOOGLE_CLOUD_JSON
);

app.listen(PORT, () => {
  console.log("Express server listening on port " + PORT);
  // console.log(process.env.GOOGLE_APPLICATION_CREDENTIALS);
});
