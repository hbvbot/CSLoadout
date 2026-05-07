import express from 'express';
import app from './app'

const PORT = process.env.PORT || 3001;

app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
  }
  console.log(`Listening at PORT: ${PORT}`)
});