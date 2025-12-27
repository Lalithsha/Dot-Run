import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { createServer } from 'http';
const app = express();
app.use(cors());
dotenv.config();

const httpServer = createServer(app);

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`Ws runner server is running on port ${PORT}`);
});
