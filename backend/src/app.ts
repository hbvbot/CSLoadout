import express from "express";
import cors from "cors";

import itemRouter from './routes/itemRouter'

const app = express();
app.use(cors());

app.get('/', (req, res) => {
  res.send('GREETINGS')
})

app.use('/items', itemRouter)

export default app;