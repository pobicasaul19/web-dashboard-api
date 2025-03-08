import express from 'express';
import { getUsers } from '../../../controller/userController.js';
/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get user list
 *     tags:
 *       - Users
 *     responses:
 *       201:
 *         description: Successfully registered
 *       400:
 *         description: Bad request
 */
const router = express.Router()
  .get('/', getUsers);
export default router;