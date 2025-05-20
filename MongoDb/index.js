// Import required modules
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import Router from './routes/users.js';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(express.json());
app.use('/user',Router)

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));


const mongoURI =process.env.mongoUri;
const port =process.env.port;

mongoose.connect(mongoURI)
  .then(() => {
    console.log("MongoDB connected successfully to MyDataBase");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

app.get('/', (req, res) => {
  res.send('Hello, bro! The server is running and connected to MyDataBase.');
});

// const port = 3000;


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
