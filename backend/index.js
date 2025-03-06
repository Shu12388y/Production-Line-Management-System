import dotenv from "dotenv";
dotenv.config({
  path: ".env",
});
import { app } from "./server.js";
import { DB } from "./utils/db.js";

DB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("server is on");
    });
  })
  .catch((e) => {
    console.log(e);
  });
