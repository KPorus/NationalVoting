import { error } from "console";
import { level } from "winston";

const morgan = require('morgan');
const winston = require('winston');

const { createLogger, format, transports } = winston;

const logger = createLogger({
    transports: [
        new transports.File({filename:"Error.log"})
    ],
    format: format.combine(
        format.errors({stack:true}),
        format.printf((info: { level: any; message: any; }) => `${info.level}: ${info.message}`)
    ),
});

export const morganMiddleware = morgan('combined', {
    stream: {
        write: (message: string) => logger.info(message.trim()),
    },
});
