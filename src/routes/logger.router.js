import { Router } from "express";
import logger from "../utils/logger.js";

const router = Router();

router.get("/loggerTest", (req, res) => {
  logger.debug("Este es un mensaje de debug");
  logger.http("Este es un mensaje HTTP");
  logger.info("Este es un mensaje de información");
  logger.warning("Este es un mensaje de advertencia");
  logger.error("Este es un mensaje de error");
  logger.fatal("Este es un mensaje fatal");
  res.send({
    status: "success",
    message: "Logs generados en consola y archivo",
  });
});

export default router;
