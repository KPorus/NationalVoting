const morgan = require('morgan');
const winston = require('winston');

const { createLogger, format, transports } = winston;

const logger = createLogger({
    transports: [
        new transports.Console(), // Log to the console
    ],
    format: format.combine(
        format.printf((info: { level: any; message: any; }) => `${info.level}: ${info.message}`)
    ),
});

export const morganMiddleware = morgan('combined', {
    stream: {
        write: (message: string) => logger.info(message.trim()),
    },
});
