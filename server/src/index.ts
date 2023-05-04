import express from 'express';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import router from './router';
import cors from 'cors';

dotenv.config();
const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());
app.use(router);

const PORT: number = Number(process.env.PORT) || 3001;
let server;

(async () => {
  try {
    await prisma.$connect();
    server = app.listen(PORT, () =>
      console.log(`Server listening on: http://localhost:${PORT}`)
    );
  } catch (error) {
    console.log('Error connecting to Prisma database: ', error);
  }
})();

export default server;
