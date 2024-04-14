import express, { Application } from 'express';
import cors from 'cors';
import helmet from "helmet";
import { rateLimit } from 'express-rate-limit'
require("dotenv").config();
import connectDB from './config/database';
import router from './app/Router/router';
// import toobusy from "toobusy-js";


const numberOfProxies = 1;
const app: Application = express();
app.use(express.json());
app.use(helmet());
app.use(cors());

const limiter = rateLimit({
    windowMs: 20 * 60 * 1000, // 20 minutes
    limit: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
})

app.use(limiter)
app.set("trust proxy", numberOfProxies);
// app.use(function (req, res, next)
// {
//     if (toobusy())
//     {
//         res.status(503).send("Too busy");
//     } else
//     {
//         next();
//     }
// });
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', router)

connectDB();
export default app;