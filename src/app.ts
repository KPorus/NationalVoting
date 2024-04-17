import express, { Application } from 'express';
import cors from 'cors';
import helmet from "helmet";
const morgan = require("morgan");

require("dotenv").config();
import connectDB from './config/database';
import router from './app/Router/router';
// import toobusy from "toobusy-js";


const numberOfProxies = 1;
const app: Application = express();
app.use(express.json());

//Middleware
app.use(helmet());
app.use(cors());
app.use(morgan("combined")); // Log HTTP requests
app.disable("x-powered-by");
app.set("trust proxy", numberOfProxies);
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', router)
// Handler for route-not-found
app.use((_req, res) =>
{
    res.status(404).json({
        code: 404,
        status: "Error",
        message: "Route not found."
    });
});
connectDB();
export default app;