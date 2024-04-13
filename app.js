import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import mongoose from 'mongoose';

import contactsRouter from "./routes/contactsRouter.js";
import usersRouter from "./routes/usersRouter.js";

const app = express();
dotenv.config();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());


app.use("/api/contacts", contactsRouter);
app.use("/api/users", usersRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

const { MONGODB_URL, PORT = 3000 } = process.env;

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Database connection successful`);
    });
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

