import logger from "../utils/logger.js";

export const loggerMiddleware = (req, res, next) => {
  req.logger = logger;
  req.logger.http(`Request recibido: ${req.method} ${req.url}`);
  next();
};
