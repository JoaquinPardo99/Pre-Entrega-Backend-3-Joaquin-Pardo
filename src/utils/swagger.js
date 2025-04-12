// src/utils/swagger.js
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";

const swaggerOptions = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "AdoptMe API",
      description:
        "Documentación completa de los módulos Sessions, Pets, Users y Adoptions",
      version: "1.0.0",
    },
  },
  apis: ["./src/routes/*.js"],
};

export const specs = swaggerJSDoc(swaggerOptions);
export const swaggerUi = swaggerUiExpress;
