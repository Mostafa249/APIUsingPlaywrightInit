import { createLogger, format, transports } from 'winston'
const { combine, printf, timestamp, colorize } = format;
require("winston-daily-rotate-file");

const myFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level} : ${message}`;
});

const logger = createLogger({
    level: "debug",
    format: combine(colorize(), timestamp({ format: "hh:mm:ss" }), myFormat),

    transports: [
        new transports.Console(),
        new transports.DailyRotateFile({
            level: "debug",
            filename: "Playwright_api_testing-debug-%DATE%.log",
            datePattern: "YYYY-MM-DD-HH",
            options: { flags: "w" },
        }),
    ],
});

export let error = (message = '') => {
    logger.error(message);
};

export let warn = (message = '') => {
    logger.warn(message);
};

export let info = (message = '') => {
    logger.info(message);
};

export let debug = (message = '') => {
    logger.debug(message);
};
