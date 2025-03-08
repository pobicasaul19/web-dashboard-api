import express from 'express';
import { login } from '../../../controller/authController.js';

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login
 *     description: Login user and generate bearer token.
 *     tags:
 *       - Auth
 *     parameters:
 *       - in: query
 *         name: email
 *         description: Email
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: password
 *         description: Password
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 */
const router = express.Router()
  .post('/login', login);
export default router;