import { Router } from "express";
import sessionsController from "../controllers/sessions.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Sessions
 *   description: Autenticación de usuarios
 */

/**
 * @swagger
 * /api/sessions/register:
 *   post:
 *     summary: Registrar nuevo usuario
 *     tags: [Sessions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario registrado exitosamente
 */
router.post("/register", sessionsController.register);

/**
 * @swagger
 * /api/sessions/login:
 *   post:
 *     summary: Login de usuario
 *     tags: [Sessions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login exitoso
 */
router.post("/login", sessionsController.login);

/**
 * @swagger
 * /api/sessions/current:
 *   get:
 *     summary: Obtener sesión actual
 *     tags: [Sessions]
 *     responses:
 *       200:
 *         description: Usuario autenticado
 */
router.get("/current", sessionsController.current);

router.get("/unprotectedLogin", sessionsController.unprotectedLogin);

router.get("/unprotectedCurrent", sessionsController.unprotectedCurrent);

export default router;
