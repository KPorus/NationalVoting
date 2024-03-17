import express, { Application } from 'express';
import cors from 'cors';
require("dotenv").config();
import connectDB from './config/database';
import router from './app/Router/router';
// import router from './app/Router/router';

const app: Application = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', router)

// const connectionOptions: mongoose.ConnectOptions = {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     // Add other options as needed
// };
// Connect to the MongoDB database using the provided connection string
// mongoose.connect(process.env.MONGODB_CLOUD as string, {
//     useCreateIndex: true,
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// }, ():=>
// {
//     console.log("MongoDB connected.");
// });
connectDB();
export default app;