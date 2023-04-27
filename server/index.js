const express = require("express");
require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const router = require("./router");
var cors = require("cors");
const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());
app.use(router);

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

module.exports = app;
