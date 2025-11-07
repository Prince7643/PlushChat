import winston from "winston";

const logger=winston.createLogger({
    level:'info',
    format:winston.format.combine(
        winston.format.json(),
        winston.format.timestamp()
    ),
    transports:[
        new winston.transports.File({filename:'logs/error.log',level:'error'}),
        new winston.transports.File({filename:'logs/combined.log',})
    ]
})

logger.add(
  new winston.transports.Console({
    format:
      process.env.NODE_ENV === "production"
        ? winston.format.json()
        : winston.format.simple(),
  })
);

export default logger;