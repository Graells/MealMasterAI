const express = require('express');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');
const router = require('./router');
const cors = require('cors');

dotenv.config();
const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());
app.use(router);

const PORT: number = Number(process.env.PORT) || 3001;

(async () => {
  try {
    await prisma.$connect();
    app.listen(PORT, () =>
      console.log(`Server listening on: http://localhost:${PORT}`)
    );
  } catch (error) {
    console.log('Error in connecting to database :', error);
  }
})();

export {};