import express from "express";
require("dotenv").config();
import { PrismaClient } from "@prisma/client";
import router from "./router";
var cors = require("cors");
const app = express();
const prisma = new PrismaClient();

// export default function (database) {
app.use(cors());
app.use(express.json());
app.use(router);
//   return app;
// }

const PORT = process.env.PORT || 3001;
(async () => {
  try {
    await prisma.$connect();
    app.listen(PORT, () =>
      console.log(`Server listening on: http://localhost:${PORT}`)
    );
  } catch (error) {
    console.log("Error in connecting to database :", error);
  }
})();

export default app;
