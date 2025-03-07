import logger from "../utils/logger.js";

export const errorHandler = (err, req, res, next) => {
  logger.error(`ERROR: ${err.code || "UNKNOWN_ERROR"} - ${err.message}`);

  res.status(400).send({
    status: "error",
    code: err.code || "UNKNOWN_ERROR",
    message: err.message,
  });
};
