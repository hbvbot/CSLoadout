import dotenv from "dotenv";
dotenv.config();

import express from 'express';
import app from './app'
import seedItemsJob from './jobs/seedItemsJob';


const PORT = process.env.PORT || 3001;

const start = async () => {
  try {
    await seedItemsJob();
  } catch (error) {
    console.error('Seed error', error);
  }
}

app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
  }
  console.log(`Listening at PORT: ${PORT}`)
});

// start();