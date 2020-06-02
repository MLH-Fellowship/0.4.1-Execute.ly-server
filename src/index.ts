import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.SERVER_PORT;
import app from "./app";

app.listen(PORT, () => {
  // tslint:disable-next-line
  console.log("Express server listening on port " + PORT);
});
