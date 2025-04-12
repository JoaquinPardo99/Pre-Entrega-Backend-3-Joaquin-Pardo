import { Router } from "express";
import adoptionsController from "../controllers/adoptions.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Adoptions
 *   description: Gestión de adopciones de mascotas
 */

/**
 * @swagger
 * /api/adoptions:
 *   get:
 *     summary: Obtener todas las adopciones
 *     tags: [Adoptions]
 *     responses:
 *       200:
 *         description: Lista de adopciones
 */
router.get("/", adoptionsController.getAllAdoptions);

/**
 * @swagger
 * /api/adoptions/{aid}:
 *   get:
 *     summary: Obtener una adopción por ID
 *     tags: [Adoptions]
 *     parameters:
 *       - in: path
 *         name: aid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalles de la adopción
 *       404:
 *         description: Adopción no encontrada
 */
router.get("/:aid", adoptionsController.getAdoption);

/**
 * @swagger
 * /api/adoptions/{uid}/{pid}:
 *   post:
 *     summary: Crear una adopción
 *     tags: [Adoptions]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: pid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Mascota adoptada exitosamente
 *       400:
 *         description: Mascota ya fue adoptada
 *       404:
 *         description: Usuario o mascota no encontrado
 */
router.post("/:uid/:pid", adoptionsController.createAdoption);

export default router;
